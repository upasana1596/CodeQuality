import * as bcrypt from 'bcryptjs';

export async function appComparePasswords(plainTextPassword: string, hashedPassword: string) {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
}

export async function appHashPassword(password: string) {
  return await bcrypt.hash(password, 10);
}
