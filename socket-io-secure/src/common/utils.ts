
import bcrypt from 'bcrypt';

export function generateHash(password: string): string {
    return bcrypt.hashSync(password, 10);
  }

export function comparePassword(password: string, hash: string){
  return bcrypt.compareSync(password || '', hash || '');
};
  