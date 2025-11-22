import { compare, hash, genSalt } from "bcrypt"

export async function saltAndHashPassword(password: string) {
  try {
    const hashedPassword = await hash(password,10)
    return hashedPassword;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

export async function comparePassword(password: string, hash: string) {
  try {
    const comPassword = await compare(password, hash)
    return comPassword;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

export const generatePasswordHash = async (password: string) => {
  const salt = await genSalt(10);
  return hash(password, salt);
};
