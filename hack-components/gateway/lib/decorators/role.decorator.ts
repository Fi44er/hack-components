import { SetMetadata } from '@nestjs/common';
import { Role } from 'proto/user_svc';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);