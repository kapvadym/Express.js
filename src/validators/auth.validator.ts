import { z } from 'zod';
import { AccountType } from '@/api-routes/accounts/account.types';

export const registerSchema = z.object({
  username: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
  accountType: z.nativeEnum(AccountType),
  firmName: z.string().optional()
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
})