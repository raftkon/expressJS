import { scrypt, randomBytes } from "crypto";
import { promisify } from "util";

/**
 * The `scrypt()` function is callback based
 * so we use the `promisify()` built-in to node
 * function to make it work with async/await.
 */
const scryptAsync = promisify(scrypt);

export class Password {
  /**
   * Static methods are methods that we
   * can access without creating an instance
   * of the class.
   */
  static async toHash(password) {
    const salt = randomBytes(8).toString("hex");
    const buffer = await scryptAsync(password, salt, 64);
    return `${buffer.toString("hex")}.${salt}`;
  }

  static async compare(storedPassword, suppliedPassword) {
    const [hashedPassword, salt] = storedPassword.split(".");
    const buffer = await scryptAsync(suppliedPassword, salt, 64);
    return buffer.toString("hex") === hashedPassword;
  }
}
