import { randomBytes } from "crypto";

export default function generatePass(length: number = 12): string {
  const charset =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*";
  return Array.from(randomBytes(length))
    .map((byte) => charset.charAt(byte % charset.length))
    .join("");
}
