import { SetMetadata } from '@nestjs/common';

export const ADMIN_ROLE = 'admin';
export const Admin = () => SetMetadata('roles', [ADMIN_ROLE]);
