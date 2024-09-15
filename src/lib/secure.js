import crypto from "crypto";
import { config } from "dotenv";

config();

export class Secure {
  /**
   * Encrypts given data. It is supposed to encrypt jwt token
   * inside the cookie containing user data for security reasons.
   * @param {*} data
   * @returns encryptedData
   */
  static encrypt(data) {
    // made by randomBytes(24).toString('hex')
    const key = Buffer.from(process.env.ENCRYPTION_KEY, "hex");
    // made by randomBytes(16).toString('hex')
    const iv = Buffer.from(process.env.INITIALIZATION_VECTOR, "hex");
    const cipher = crypto.createCipheriv("aes-192-cbc", key, iv);
    let encryptedData = cipher.update(data, "utf-8", "hex");
    encryptedData += cipher.final("hex");
    return encryptedData;
  }
  /**
   * Decrypts given encrypted data. It is supposed to decrypt
   * the jwt token inside the cookie to retrieve user data.
   * @param {String} encryptedData
   * @returns {*} data
   */
  static decrypt(encryptedData) {
    const key = Buffer.from(process.env.ENCRYPTION_KEY, "hex");
    const iv = Buffer.from(process.env.INITIALIZATION_VECTOR, "hex");
    const decipher = crypto.createDecipheriv("aes-192-cbc", key, iv);
    let decryptedData = decipher.update(encryptedData, "hex", "utf-8");
    decryptedData += decipher.final("utf-8");
    return decryptedData;
  }
}
