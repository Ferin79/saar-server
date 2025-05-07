import { UserRole } from '../entities/user.entity.js';

export interface JwtPayload {
  sub: number; // User ID
  email: string;
  role: UserRole;
}
