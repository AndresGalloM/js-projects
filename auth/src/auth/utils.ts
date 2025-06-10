import crypto from "crypto";

export function hashPassword(password: string, salt: string): Promise<string> {
  return new Promise((resolve, reject) => {
    crypto.scrypt(password, salt, 64, (err, hast) => {
      if (err) {
        return reject(err);
      }

      resolve(hast.toString("hex"));
    });
  });
}

export async function comparePassword({
  password,
  hashedPassword,
  salt,
}: {
  password: string;
  hashedPassword: string;
  salt: string;
}) {
  const inputHashedPassword = await hashPassword(password, salt);

  return crypto.timingSafeEqual(
    Buffer.from(inputHashedPassword, "hex"),
    Buffer.from(hashedPassword, "hex")
  );
}

export function generateSalt() {
  return crypto.randomBytes(16).toString("hex");
}
