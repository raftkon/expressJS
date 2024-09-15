import { Schema, model } from "mongoose";
import { Password } from "../../lib/password.js";

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      // select: false,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret.password;
        delete ret.__v;
        delete ret._id;
        delete ret.createdAt;
        delete ret.updatedAt;
      },
    },
  }
);
/**
 * When the user is first created .isModified('password') is going to run,
 * in that case we want to store the hashed password instead of the raw password.
 * Also when the user changes something like the email, we don't want to hash
 * the already hashed password, only when the password changes.
 */
userSchema.pre("save", async function () {
  if (this.isModified("password")) {
    const hashedPassword = await Password.toHash(this.get("password"));
    this.set("password", hashedPassword);
  }
});

const User = model("User", userSchema);

export { User };
