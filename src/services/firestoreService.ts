import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  writeBatch,
  onSnapshot,
  updateDoc,
  deleteField,
} from "firebase/firestore";
import { db, isFirebaseConfigured } from "../firebase/config";
import { Assignment, Submission, UserProfile } from "../types/ide";
import { hashPassword } from "./passwordHash";
import {
  INITIAL_ASSIGNMENTS,
  INITIAL_SUBMISSIONS,
  INITIAL_USERS,
  sortAssignmentsByCurriculum,
} from "./seedData";

const LS_USERS_KEY = "chroma_py_users_v9";
const LS_ASSIGNMENTS_KEY = "chroma_py_assignments_v14_145";
const LS_SUBMISSIONS_KEY = "chroma_py_submissions_v11";
const LS_ASSIGNMENTS_CACHED_AT_KEY = "chroma_py_asgn_cache_time_v14";
const ASSIGNMENTS_CACHE_TTL_MS = 15 * 60 * 1000; // 15 phút cache trình duyệt để tối ưu lượt đọc Firestore

/**
 * Firestore từ chối mọi trường có giá trị `undefined` (lỗi invalid-argument),
 * khiến cả lần ghi thất bại và chỉ còn lưu được ở localStorage.
 * Loại bỏ các trường undefined trước khi ghi để đồng bộ đám mây luôn thành công.
 */
function stripUndefined<T extends object>(obj: T): T {
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(obj)) {
    if (v !== undefined) out[k] = v;
  }
  return out as T;
}

/** Bài tập đã bị giáo viên xoá được giữ lại dạng "bia mộ" (deleted: true)
 * để bộ đồng bộ không tự động khôi phục lại bài mẫu từ mã nguồn. */
const isActiveAssignment = (a: Assignment) => !a.deleted;

function readLocalList<T>(key: string): T[] {
  try {
    const parsed = JSON.parse(localStorage.getItem(key) || "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeLocalList<T>(key: string, list: T[]) {
  try {
    localStorage.setItem(key, JSON.stringify(list));
  } catch (err) {
    console.warn("[LocalStore] Không thể ghi localStorage:", err);
  }
}

function ensureLocalSeed() {
  // Dọn dẹp cache cũ nếu có
  [
    "chroma_py_assignments_v10",
    "chroma_py_assignments_v11",
    "chroma_py_assignments_v12",
    "chroma_py_assignments_v13",
    "chroma_py_asgn_cache_time",
  ].forEach((k) => {
    try {
      localStorage.removeItem(k);
    } catch {}
  });

  if (!localStorage.getItem(LS_USERS_KEY)) {
    localStorage.setItem(LS_USERS_KEY, JSON.stringify(INITIAL_USERS));
  }

  const storedAsgns = localStorage.getItem(LS_ASSIGNMENTS_KEY);
  if (!storedAsgns) {
    writeLocalList(LS_ASSIGNMENTS_KEY, INITIAL_ASSIGNMENTS);
  } else {
    const parsed = readLocalList<Assignment>(LS_ASSIGNMENTS_KEY);
    const existingIds = new Set(parsed.map((a) => a.id));
    const missing = INITIAL_ASSIGNMENTS.filter((a) => !existingIds.has(a.id));
    if (missing.length > 0) {
      writeLocalList(LS_ASSIGNMENTS_KEY, [...parsed, ...missing]);
    }
  }

  if (!localStorage.getItem(LS_SUBMISSIONS_KEY)) {
    localStorage.setItem(
      LS_SUBMISSIONS_KEY,
      JSON.stringify(INITIAL_SUBMISSIONS)
    );
  }
}

ensureLocalSeed();

/**
 * Push all 22 Tin học 10 assignments & sample users into live Cloud Firestore
 */
export async function seedCloudFirestoreData(): Promise<{
  success: boolean;
  count: number;
  error?: string;
}> {
  if (!isFirebaseConfigured || !db) {
    return {
      success: false,
      count: 0,
      error: "Chưa cấu hình khóa kết nối Firebase.",
    };
  }

  try {
    const batch = writeBatch(db);

    for (const user of INITIAL_USERS) {
      // Không ghi đè tài khoản đã tồn tại (tránh reset mật khẩu giáo viên đã đổi)
      const existing = await getDoc(doc(db, "users", user.uid));
      if (existing.exists()) continue;
      // Không bao giờ đẩy mật khẩu dạng rõ lên Cloud — chỉ lưu bản băm
      const { password, ...rest } = user;
      const passwordHash = password ? await hashPassword(user.uid, password) : undefined;
      batch.set(doc(db, "users", user.uid), stripUndefined({ ...rest, passwordHash }), { merge: true });
    }

    for (const asgn of INITIAL_ASSIGNMENTS) {
      // deleted: false — khôi phục cả các bài mẫu đã bị xoá mềm
      batch.set(doc(db, "assignments", asgn.id), { ...asgn, deleted: false }, { merge: true });
    }

    for (const sub of INITIAL_SUBMISSIONS) {
      batch.set(doc(db, "submissions", sub.id), sub, { merge: true });
    }

    await batch.commit();
    return {
      success: true,
      count: INITIAL_ASSIGNMENTS.length,
    };
  } catch (err: any) {
    console.error("[Firestore] Seed Cloud Firestore Error:", err);
    return {
      success: false,
      count: 0,
      error: err?.message || String(err),
    };
  }
}

// --- USERS COLLECTION (docId = uid) ---

export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  if (isFirebaseConfigured && db) {
    try {
      const snap = await getDoc(doc(db, "users", uid));
      if (snap.exists()) {
        return snap.data() as UserProfile;
      }
    } catch (err) {
      console.warn("[Firestore] Fallback to local user lookup:", err);
    }
  }

  ensureLocalSeed();
  const users: UserProfile[] = JSON.parse(
    localStorage.getItem(LS_USERS_KEY) || "[]"
  );
  return users.find((u) => u.uid === uid) || null;
}

export async function upsertUserProfile(profile: UserProfile): Promise<void> {
  if (isFirebaseConfigured && db) {
    try {
      await setDoc(doc(db, "users", profile.uid), stripUndefined(profile), { merge: true });
    } catch (err) {
      console.warn("[Firestore] Fallback to local user save:", err);
    }
  }

  ensureLocalSeed();
  const users: UserProfile[] = JSON.parse(
    localStorage.getItem(LS_USERS_KEY) || "[]"
  );
  const idx = users.findIndex((u) => u.uid === profile.uid);
  // Hợp nhất như `merge: true` để không làm mất passwordHash khi lưu hồ sơ phiên
  if (idx >= 0) {
    users[idx] = { ...users[idx], ...stripUndefined(profile) };
  } else {
    users.push(stripUndefined(profile));
  }
  writeLocalList(LS_USERS_KEY, users);
}

/**
 * Ghi mật khẩu đã băm và xoá hẳn trường mật khẩu dạng rõ (nếu có) của tài khoản.
 */
export async function setUserPasswordHash(
  uid: string,
  passwordHash: string
): Promise<void> {
  if (isFirebaseConfigured && db) {
    try {
      await updateDoc(doc(db, "users", uid), {
        passwordHash,
        password: deleteField(),
      });
    } catch (err) {
      console.warn("[Firestore] Fallback to local password update:", err);
    }
  }
  ensureLocalSeed();
  const users = readLocalList<UserProfile>(LS_USERS_KEY);
  const idx = users.findIndex((u) => u.uid === uid);
  if (idx >= 0) {
    const { password: _legacy, ...rest } = users[idx];
    users[idx] = { ...rest, passwordHash };
    writeLocalList(LS_USERS_KEY, users);
  }
}

export async function deleteUserById(uid: string): Promise<void> {
  if (isFirebaseConfigured && db) {
    try {
      await deleteDoc(doc(db, "users", uid));
    } catch (err) {
      console.warn("[Firestore] Fallback to local user delete:", err);
    }
  }

  ensureLocalSeed();
  const users: UserProfile[] = JSON.parse(
    localStorage.getItem(LS_USERS_KEY) || "[]"
  );
  const filtered = users.filter((u) => u.uid !== uid);
  localStorage.setItem(LS_USERS_KEY, JSON.stringify(filtered));
}

/**
 * Tìm tài khoản theo username bằng truy vấn có điều kiện —
 * không tải toàn bộ danh sách người dùng về trình duyệt khi đăng nhập.
 */
export async function findUserByUsername(
  username: string
): Promise<UserProfile | null> {
  if (isFirebaseConfigured && db) {
    try {
      const snap = await getDocs(
        query(collection(db, "users"), where("username", "==", username))
      );
      if (!snap.empty) return snap.docs[0].data() as UserProfile;
      return null;
    } catch (err) {
      console.warn("[Firestore] Fallback to local username lookup:", err);
    }
  }
  ensureLocalSeed();
  return (
    readLocalList<UserProfile>(LS_USERS_KEY).find(
      (u) => (u.username || "").toLowerCase() === username
    ) || null
  );
}

export async function getAllUsers(): Promise<UserProfile[]> {
  if (isFirebaseConfigured && db) {
    try {
      const snap = await getDocs(collection(db, "users"));
      if (!snap.empty) {
        return snap.docs.map((d) => d.data() as UserProfile);
      } else {
        const seeded = await seedCloudFirestoreData();
        if (seeded.success) {
          return INITIAL_USERS;
        }
      }
    } catch (err) {
      console.warn("[Firestore] Fallback to local users list:", err);
    }
  }

  ensureLocalSeed();
  return JSON.parse(localStorage.getItem(LS_USERS_KEY) || "[]");
}

// --- ASSIGNMENTS COLLECTION (docId = auto-generated or custom slug) ---

/**
 * Hợp nhất danh sách bài từ nguồn (Firestore/localStorage) với bài mẫu trong mã nguồn.
 * Bài mẫu chỉ được bổ sung khi CHƯA từng tồn tại (kể cả dạng bia mộ đã xoá).
 */
function mergeWithSeed(list: Assignment[]): {
  all: Assignment[];
  missing: Assignment[];
} {
  const existingIds = new Set(list.map((a) => a.id));
  const missing = INITIAL_ASSIGNMENTS.filter((a) => !existingIds.has(a.id));
  return { all: missing.length > 0 ? [...list, ...missing] : list, missing };
}

function activeSorted(list: Assignment[]): Assignment[] {
  return sortAssignmentsByCurriculum(list.filter(isActiveAssignment));
}

export async function getAssignments(forceRefresh: boolean = false): Promise<Assignment[]> {
  ensureLocalSeed();

  // 1. Cache cục bộ (TTL: 15 phút) để tiết kiệm lượt đọc Firestore cho học sinh
  if (!forceRefresh) {
    const cachedAt = parseInt(
      localStorage.getItem(LS_ASSIGNMENTS_CACHED_AT_KEY) || "0",
      10
    );
    if (cachedAt && Date.now() - cachedAt < ASSIGNMENTS_CACHE_TTL_MS) {
      const cached = readLocalList<Assignment>(LS_ASSIGNMENTS_KEY);
      if (cached.length > 0) return activeSorted(cached);
    }
  }

  // 2. Chỉ gửi request lên Cloud Firestore khi hết hạn cache hoặc forceRefresh = true
  if (isFirebaseConfigured && db) {
    try {
      const snap = await getDocs(collection(db, "assignments"));
      if (!snap.empty) {
        const rawList = snap.docs.map((d) => ({
          ...(d.data() as Assignment),
          id: d.id,
        }));
        const { all, missing } = mergeWithSeed(rawList);

        if (missing.length > 0) {
          // Đồng bộ các bài mẫu mới (chưa từng có trên Cloud) trong nền
          const firestore = db;
          (async () => {
            try {
              const batch = writeBatch(firestore);
              for (const asgn of missing) {
                batch.set(doc(firestore, "assignments", asgn.id), asgn, { merge: true });
              }
              await batch.commit();
            } catch (syncErr) {
              console.warn("[Firestore] Lỗi tự động đồng bộ bài tập mới lên Cloud:", syncErr);
            }
          })();
        }

        writeLocalList(LS_ASSIGNMENTS_KEY, all);
        localStorage.setItem(LS_ASSIGNMENTS_CACHED_AT_KEY, Date.now().toString());
        return activeSorted(all);
      }
      // Cloud trống: tự seed bài tập Tin học 10 ở lần kết nối đầu tiên
      const seeded = await seedCloudFirestoreData();
      if (seeded.success) {
        localStorage.setItem(LS_ASSIGNMENTS_CACHED_AT_KEY, Date.now().toString());
        return activeSorted(INITIAL_ASSIGNMENTS);
      }
    } catch (err) {
      console.warn("[Firestore] Fallback to local assignments:", err);
    }
  }

  return activeSorted(mergeWithSeed(readLocalList<Assignment>(LS_ASSIGNMENTS_KEY)).all);
}

export async function syncAssignmentsFromCloud(): Promise<{
  success: boolean;
  count: number;
  error?: string;
}> {
  if (!isFirebaseConfigured || !db) {
    return {
      success: false,
      count: 0,
      error: "Chưa cấu hình khóa kết nối Firebase.",
    };
  }

  try {
    const snap = await getDocs(collection(db, "assignments"));
    const rawList = snap.docs.map((d) => ({
      ...(d.data() as Assignment),
      id: d.id,
    }));
    const { all } = mergeWithSeed(rawList);
    writeLocalList(LS_ASSIGNMENTS_KEY, all);
    localStorage.setItem(LS_ASSIGNMENTS_CACHED_AT_KEY, Date.now().toString());
    return {
      success: true,
      count: all.filter(isActiveAssignment).length,
    };
  } catch (err: any) {
    return {
      success: false,
      count: 0,
      error: err?.message || String(err),
    };
  }
}

export async function pushAssignmentsToCloud(
  currentAssignments: Assignment[]
): Promise<{
  success: boolean;
  count: number;
  error?: string;
}> {
  if (!isFirebaseConfigured || !db) {
    return {
      success: false,
      count: 0,
      error: "Chưa cấu hình khóa kết nối Firebase.",
    };
  }

  try {
    // 1. Fetch remote docs and delete any that are not in currentAssignments
    const snap = await getDocs(collection(db, "assignments"));
    const currentIdSet = new Set(currentAssignments.map((a) => a.id));

    const deletedAt = new Date().toISOString();
    const tombstones: Assignment[] = [];
    // Ghi theo lô (tối đa 450 thao tác/lô, giới hạn Firestore là 500) thay vì từng request
    let batch = writeBatch(db);
    let ops = 0;
    const flush = async () => {
      if (ops > 0) {
        await batch.commit();
        batch = writeBatch(db!);
        ops = 0;
      }
    };

    for (const remoteDoc of snap.docs) {
      const data = remoteDoc.data() as Assignment;
      if (!currentIdSet.has(remoteDoc.id)) {
        const tomb = { ...data, id: remoteDoc.id, deleted: true, deletedAt: data.deletedAt || deletedAt };
        tombstones.push(tomb);
        if (!data.deleted) {
          batch.set(doc(db, "assignments", remoteDoc.id), { deleted: true, deletedAt }, { merge: true });
          if (++ops >= 450) await flush();
        }
      }
    }

    // 2. Set/merge all current assignments to Firestore
    for (const asgn of currentAssignments) {
      batch.set(
        doc(db, "assignments", asgn.id),
        stripUndefined({ ...asgn, deleted: false }),
        { merge: true }
      );
      if (++ops >= 450) await flush();
    }
    await flush();

    // 3. Update local storage with sorted list (kèm bia mộ)
    const sorted = sortAssignmentsByCurriculum(currentAssignments);
    writeLocalList(LS_ASSIGNMENTS_KEY, [...sorted, ...tombstones]);

    return {
      success: true,
      count: sorted.length,
    };
  } catch (err: any) {
    return {
      success: false,
      count: 0,
      error: err?.message || String(err),
    };
  }
}

export async function saveAssignment(assignment: Assignment): Promise<Assignment> {
  const id =
    assignment.id ||
    `asgn_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 6)}`;
  const payload: Assignment = {
    ...assignment,
    id,
    deleted: false,
    createdAt: assignment.createdAt || new Date().toISOString(),
  };

  if (isFirebaseConfigured && db) {
    try {
      await setDoc(doc(db, "assignments", id), stripUndefined(payload), { merge: true });
    } catch (err) {
      console.warn("[Firestore] Fallback to local assignment save:", err);
    }
  }

  ensureLocalSeed();
  const list: Assignment[] = JSON.parse(
    localStorage.getItem(LS_ASSIGNMENTS_KEY) || "[]"
  );
  const idx = list.findIndex((a) => a.id === id);
  if (idx >= 0) {
    list[idx] = payload;
  } else {
    list.push(payload);
  }
  localStorage.setItem(LS_ASSIGNMENTS_KEY, JSON.stringify(list));
  return payload;
}

export async function deleteAssignmentById(assignmentId: string): Promise<void> {
  const deletedAt = new Date().toISOString();
  if (isFirebaseConfigured && db) {
    try {
      // Xoá mềm: giữ "bia mộ" để bài mẫu không tự hồi sinh ở lần đồng bộ sau
      await setDoc(
        doc(db, "assignments", assignmentId),
        { id: assignmentId, deleted: true, deletedAt },
        { merge: true }
      );
    } catch (err) {
      console.warn("[Firestore] Fallback to local assignment delete:", err);
    }
  }

  ensureLocalSeed();
  const list = readLocalList<Assignment>(LS_ASSIGNMENTS_KEY);
  const idx = list.findIndex((a) => a.id === assignmentId);
  if (idx >= 0) {
    list[idx] = { ...list[idx], deleted: true, deletedAt };
  }
  writeLocalList(LS_ASSIGNMENTS_KEY, list);
}

// --- SUBMISSIONS COLLECTION (docId = ${uid}_${assignmentId}) ---

export async function getSubmission(
  userId: string,
  assignmentId: string
): Promise<Submission | null> {
  const docId = `${userId}_${assignmentId}`;

  if (isFirebaseConfigured && db) {
    try {
      const snap = await getDoc(doc(db, "submissions", docId));
      if (snap.exists()) {
        return snap.data() as Submission;
      }
    } catch (err) {
      console.warn("[Firestore] Fallback to local submission read:", err);
    }
  }

  ensureLocalSeed();
  const list: Submission[] = JSON.parse(
    localStorage.getItem(LS_SUBMISSIONS_KEY) || "[]"
  );
  return list.find((s) => s.id === docId) || null;
}

export async function saveSubmission(submission: Submission): Promise<Submission> {
  const docId = `${submission.userId}_${submission.assignmentId}`;
  const payload: Submission = stripUndefined({
    ...submission,
    id: docId,
    updatedAt: new Date().toISOString(),
  });

  if (isFirebaseConfigured && db) {
    try {
      await setDoc(doc(db, "submissions", docId), stripUndefined(payload), { merge: true });
    } catch (err) {
      console.warn("[Firestore] Fallback to local submission write:", err);
    }
  }

  ensureLocalSeed();
  const list: Submission[] = JSON.parse(
    localStorage.getItem(LS_SUBMISSIONS_KEY) || "[]"
  );
  const idx = list.findIndex((s) => s.id === docId);
  // Hợp nhất giống `merge: true` của Firestore: giữ lại passedCount/totalCount cũ
  // khi lần lưu tự động không gửi kèm kết quả chấm.
  const merged: Submission = idx >= 0 ? { ...list[idx], ...payload } : payload;
  if (idx >= 0) {
    list[idx] = merged;
  } else {
    list.unshift(merged);
  }
  writeLocalList(LS_SUBMISSIONS_KEY, list);
  return merged;
}

export async function getAllSubmissions(): Promise<Submission[]> {
  if (isFirebaseConfigured && db) {
    try {
      const snap = await getDocs(collection(db, "submissions"));
      return snap.docs.map((d) => d.data() as Submission);
    } catch (err) {
      console.warn("[Firestore] Fallback to local submissions list:", err);
    }
  }

  ensureLocalSeed();
  return JSON.parse(localStorage.getItem(LS_SUBMISSIONS_KEY) || "[]");
}

export async function getUserSubmissions(userId: string): Promise<Submission[]> {
  if (isFirebaseConfigured && db) {
    try {
      // Query có filter userId giúp chỉ đọc đúng bài nộp của học sinh, không đọc toàn trường
      const q = query(
        collection(db, "submissions"),
        where("userId", "==", userId)
      );
      const snap = await getDocs(q);
      if (!snap.empty) {
        return snap.docs.map((d) => d.data() as Submission);
      }
      return [];
    } catch (err) {
      console.warn("[Firestore] Query user submissions error, fallback to local:", err);
    }
  }

  ensureLocalSeed();
  const list: Submission[] = JSON.parse(
    localStorage.getItem(LS_SUBMISSIONS_KEY) || "[]"
  );
  return list.filter((s) => s.userId === userId);
}

/**
 * Real-time listener for Submissions in Projector & Classroom Live Mode
 */
export function subscribeToSubmissions(
  callback: (submissions: Submission[]) => void
): () => void {
  if (isFirebaseConfigured && db) {
    try {
      const q = query(
        collection(db, "submissions"),
        orderBy("updatedAt", "desc")
      );
      return onSnapshot(
        q,
        (snapshot) => {
          const list: Submission[] = [];
          snapshot.forEach((d) => list.push(d.data() as Submission));
          callback(list);
        },
        (err) => {
          console.warn("[Firestore] Live subscription error:", err);
          getAllSubmissions().then(callback);
        }
      );
    } catch (err) {
      console.warn("[Firestore] Failed to attach onSnapshot:", err);
    }
  }

  // Fallback to local polling
  getAllSubmissions().then(callback);
  const interval = setInterval(() => {
    getAllSubmissions().then(callback);
  }, 3000);
  return () => clearInterval(interval);
}
