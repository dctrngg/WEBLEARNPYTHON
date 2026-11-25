import { UserProfile } from "../types/ide";

/**
 * Băm mật khẩu bằng SHA-256 (Web Crypto) với salt gắn theo uid.
 * Không còn lưu mật khẩu dạng rõ trong collection `users`.
 */
export async function hashPassword(uid: string, password: string): Promise<string> {
  const data = new TextEncoder().encode(`cocode:v1:${uid}:${password}`);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/** So khớp mật khẩu với hồ sơ — hỗ trợ cả dữ liệu cũ còn lưu dạng rõ. */
export async function verifyPassword(
  profile: UserProfile,
  password: string
): Promise<boolean> {
  if (profile.passwordHash) {
    return (await hashPassword(profile.uid, password)) === profile.passwordHash;
  }
  if (profile.password !== undefined && profile.password !== "") {
    return profile.password === password;
  }
  // Tài khoản không đặt mật khẩu (VD: đăng nhập Google) — không cho đăng nhập bằng mật khẩu
  return false;
}

/** Bỏ các trường nhạy cảm trước khi lưu vào phiên/localStorage hoặc state React. */
export function toSessionProfile(profile: UserProfile): UserProfile {
  const { password: _p, passwordHash: _h, ...rest } = profile;
  return rest;
}
