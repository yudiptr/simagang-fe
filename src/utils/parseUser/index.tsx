import { jwtVerify } from 'jose';
import { ParsedUser } from './interface';

export const parseUser = async () => {
  if (typeof window === 'undefined') {
    return null;
  }

  const token = localStorage.getItem('at');

  if (!token) return null;

  if (!process.env.NEXT_PUBLIC_JWT_SECRET) throw new Error('env not set');

  const secret = new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET);

  try {
    const parsed = await jwtVerify(token, secret);
    return { ...parsed.payload, id: parsed.payload.sub } as ParsedUser;
  } catch {
    return null;
  }
};

