// Usage: npm run hash-password -- "your-strong-password"
// Prints the env lines to paste into .env.local and into Vercel.
import bcrypt from "bcryptjs";
import { randomBytes } from "node:crypto";

const password = process.argv[2];
if (!password || password.length < 10) {
  console.error('Give a password of at least 10 characters: npm run hash-password -- "your-password"');
  process.exit(1);
}

// Base64 so the "$" signs in a bcrypt hash don't get mangled by .env parsing.
const hash = Buffer.from(bcrypt.hashSync(password, 12)).toString("base64");
console.log(`ADMIN_PASSWORD_HASH=${hash}`);
console.log(`JWT_SECRET=${randomBytes(32).toString("hex")}`);
