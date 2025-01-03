import { SetMetadata } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { IS_PUBLIC, PERMISSION } from 'src/object/constant';
import UserPermissions from 'src/object/enums/user.permissions.enum';

/**
 * generate hash from password or string
 * @param {string} password
 * @returns {string}
 */
export function generateHash(password: string): string {
  return bcrypt.hashSync(password, 10);
}

/**
 * validate text with hash
 * @param {string} password
 * @param {string} hash
 * @returns {Promise<boolean>}
 */
// eslint-disable-next-line @typescript-eslint/require-await
export async function validateHash(
  password: string | undefined,
  hash: string | undefined,
): Promise<boolean> {
  if (!password || !hash) {
    return false;
  }

  return bcrypt.compare(password, hash);
}

export const Public = () => SetMetadata(IS_PUBLIC, true);
export const Permission = (...roles: UserPermissions[]) =>
  SetMetadata(PERMISSION, roles);
