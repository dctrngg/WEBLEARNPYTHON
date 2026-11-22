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
} from "firebase/firestore";
import { db, isFirebaseConfigured } from "../firebase/config";
import { Assignment, Submission, UserProfile } from "../types/ide";
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
    localStorage.setItem(
      LS_ASSIGNMENTS_KEY,
      JSON.stringify(INITIAL_ASSIGNMENTS)
    );
  } else {
    try {
      const parsed = JSON.parse(storedAsgns);
      if (!Array.isArray(parsed) || parsed.length < INITIAL_ASSIGNMENTS.length) {
        // Tự động bổ sung các bài tập mới nếu cache chưa đủ
        const existingIds = new Set((parsed || []).map((a: any) => a.id));
        const missing = INITIAL_ASSIGNMENTS.filter((a) => !existingIds.has(a.id));
        const merged = [...(parsed || []), ...missing];
        localStorage.setItem(
          LS_ASSIGNMENTS_KEY,
          JSON.stringify(sortAssignmentsByCurriculum(merged))
        );
      }
    } catch {
      localStorage.setItem(
        LS_ASSIGNMENTS_KEY,
        JSON.stringify(INITIAL_ASSIGNMENTS)
      );
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
      batch.set(doc(db, "users", user.uid), user, { merge: true });
    }

    for (const asgn of INITIAL_ASSIGNMENTS) {
      batch.set(doc(db, "assignments", asgn.id), asgn, { merge: true });
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
      await setDoc(doc(db, "users", profile.uid), profile, { merge: true });
    } catch (err) {
      console.warn("[Firestore] Fallback to local user save:", err);
    }
  }

  ensureLocalSeed();
  const users: UserProfile[] = JSON.parse(
    localStorage.getItem(LS_USERS_KEY) || "[]"
  );
  const idx = users.findIndex((u) => u.uid === profile.uid);
  if (idx >= 0) {
    users[idx] = profile;
  } else {
    users.push(profile);
  }
  localStorage.setItem(LS_USERS_KEY, JSON.stringify(users));
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

export async function getAssignments(forceRefresh: boolean = false): Promise<Assignment[]> {
  ensureLocalSeed();

  // 1. Kiểm tra cache cục bộ (TTL: 15 phút) để tiết kiệm 100% lượt đọc Firestore cho học sinh
  if (!forceRefresh) {
    try {
      const cachedAtStr = localStorage.getItem(LS_ASSIGNMENTS_CACHED_AT_KEY);
      const cachedData = localStorage.getItem(LS_ASSIGNMENTS_KEY);
      if (cachedAtStr && cachedData) {
        const cachedAt = parseInt(cachedAtStr, 10);
        if (Date.now() - cachedAt < ASSIGNMENTS_CACHE_TTL_MS) {
          const parsed = JSON.parse(cachedData);
          if (Array.isArray(parsed) && parsed.length >= INITIAL_ASSIGNMENTS.length) {
            return sortAssignmentsByCurriculum(parsed);
          }
        }
      }
    } catch {}
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

        // Tự động bổ sung các bài tập mới từ mã nguồn nếu Cloud Firestore chưa có
        const existingIds = new Set(rawList.map((a) => a.id));
        const missingAssignments = INITIAL_ASSIGNMENTS.filter(
          (a) => !existingIds.has(a.id)
        );

        let combined = rawList;
        if (missingAssignments.length > 0) {
          combined = [...rawList, ...missingAssignments];
          // Tự động đồng bộ các bài tập mới này lên Cloud Firestore trong nền
          (async () => {
            try {
              const batch = writeBatch(db);
              for (const asgn of missingAssignments) {
                batch.set(doc(db, "assignments", asgn.id), asgn, { merge: true });
              }
              await batch.commit();
              console.log(
                `[Firestore] Đã tự động đồng bộ ${missingAssignments.length} bài tập mới lên Cloud Firestore.`
              );
            } catch (syncErr) {
              console.warn("[Firestore] Lỗi tự động đồng bộ bài tập mới lên Cloud:", syncErr);
            }
          })();
        }

        const sorted = sortAssignmentsByCurriculum(combined);
        localStorage.setItem(LS_ASSIGNMENTS_KEY, JSON.stringify(sorted));
        localStorage.setItem(LS_ASSIGNMENTS_CACHED_AT_KEY, Date.now().toString());
        return sorted;
      } else {
        // Auto-seed the Tin học 10 assignments into empty Cloud Firestore on first connect
        const seeded = await seedCloudFirestoreData();
        if (seeded.success) {
          localStorage.setItem(LS_ASSIGNMENTS_CACHED_AT_KEY, Date.now().toString());
          return sortAssignmentsByCurriculum(INITIAL_ASSIGNMENTS);
        }
      }
    } catch (err) {
      console.warn("[Firestore] Fallback to local assignments:", err);
    }
  }

  const list: Assignment[] = JSON.parse(
    localStorage.getItem(LS_ASSIGNMENTS_KEY) || "[]"
  );
  const existingIds = new Set((list || []).map((a) => a.id));
  const missingAssignments = INITIAL_ASSIGNMENTS.filter(
    (a) => !existingIds.has(a.id)
  );
  const combined =
    missingAssignments.length > 0 ? [...(list || []), ...missingAssignments] : list;
  return sortAssignmentsByCurriculum(combined);
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
    const existingIds = new Set(rawList.map((a) => a.id));
    const missingAssignments = INITIAL_ASSIGNMENTS.filter(
      (a) => !existingIds.has(a.id)
    );
    const combined =
      missingAssignments.length > 0
        ? [...rawList, ...missingAssignments]
        : rawList;
    const sorted = sortAssignmentsByCurriculum(combined);
    localStorage.setItem(LS_ASSIGNMENTS_KEY, JSON.stringify(sorted));
    localStorage.setItem(
      LS_ASSIGNMENTS_CACHED_AT_KEY,
      Date.now().toString()
    );
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

    for (const remoteDoc of snap.docs) {
      if (!currentIdSet.has(remoteDoc.id)) {
        await deleteDoc(doc(db, "assignments", remoteDoc.id));
      }
    }

    // 2. Set/merge all current assignments to Firestore
    for (const asgn of currentAssignments) {
      await setDoc(doc(db, "assignments", asgn.id), asgn, { merge: true });
    }

    // 3. Update local storage with sorted list
    const sorted = sortAssignmentsByCurriculum(currentAssignments);
    localStorage.setItem(LS_ASSIGNMENTS_KEY, JSON.stringify(sorted));

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
    createdAt: assignment.createdAt || new Date().toISOString(),
  };

  if (isFirebaseConfigured && db) {
    try {
      await setDoc(doc(db, "assignments", id), payload, { merge: true });
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
  if (isFirebaseConfigured && db) {
    try {
      await deleteDoc(doc(db, "assignments", assignmentId));
    } catch (err) {
      console.warn("[Firestore] Fallback to local assignment delete:", err);
    }
  }

  ensureLocalSeed();
  const list: Assignment[] = JSON.parse(
    localStorage.getItem(LS_ASSIGNMENTS_KEY) || "[]"
  );
  const filtered = list.filter((a) => a.id !== assignmentId);
  localStorage.setItem(LS_ASSIGNMENTS_KEY, JSON.stringify(filtered));
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
  const payload: Submission = {
    ...submission,
    id: docId,
    updatedAt: new Date().toISOString(),
  };

  if (isFirebaseConfigured && db) {
    try {
      await setDoc(doc(db, "submissions", docId), payload, { merge: true });
    } catch (err) {
      console.warn("[Firestore] Fallback to local submission write:", err);
    }
  }

  ensureLocalSeed();
  const list: Submission[] = JSON.parse(
    localStorage.getItem(LS_SUBMISSIONS_KEY) || "[]"
  );
  const idx = list.findIndex((s) => s.id === docId);
  if (idx >= 0) {
    list[idx] = payload;
  } else {
    list.unshift(payload);
  }
  localStorage.setItem(LS_SUBMISSIONS_KEY, JSON.stringify(list));
  return payload;
}

export async function getAllSubmissions(): Promise<Submission[]> {
  if (isFirebaseConfigured && db) {
    try {
      const snap = await getDocs(collection(db, "submissions"));
      if (!snap.empty) {
        return snap.docs.map((d) => d.data() as Submission);
      }
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
