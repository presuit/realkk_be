import { SetMetadata } from '@nestjs/common';

export type AuthRoleType = 'Allowed' | 'OnlyLogin';

export const AuthRole = (role: AuthRoleType) => SetMetadata('role', role);
