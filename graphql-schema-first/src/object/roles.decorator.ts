import { PERMISSION } from './constant';
import UserPermissions from './enums/user.permissions.enum';
import { SetMetadata } from '@nestjs/common';

export const Roles = (...roles: UserPermissions[]) => {
  return SetMetadata(PERMISSION, roles);
};
