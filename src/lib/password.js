import { scrypt, randomBytes } from "crypto";
import { promisify } from "util";

/**
 * The `scrypt()` function is callback based
 * so we use the `promisify()` built-in to node
 * function to make it work with async/await.
 */
const scryptAsync = promisify(scrypt);

// * Static methods are methods that we can access without creating an instance of the class.
export class Password {
  /**
   * Hashes the given password using a random salt and returns the hashed password
   * @param {String} password
   * @returns {String} hashedPassword
   */
  static async toHash(password) {
    const salt = randomBytes(8).toString("hex");
    const buffer = await scryptAsync(password, salt, 64);
    return `${buffer.toString("hex")}.${salt}`;
  }

  /**
   * Hashes the supplied password and compares it to the stored hashed password.
   * Returns true if the passwords match
   * @param {String} storedPassword
   * @param {String} suppliedPassword
   * @returns boolean
   */
  static async compare(storedPassword, suppliedPassword) {
    const [hashedPassword, salt] = storedPassword.split(".");
    const buffer = await scryptAsync(suppliedPassword, salt, 64);
    return buffer.toString("hex") === hashedPassword;
  }
}
