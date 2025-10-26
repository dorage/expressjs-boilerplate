import { UserRepository } from '@/repositories/user';
import { ServiceBase } from './base';

export class UserService extends ServiceBase {
  constructor(private userRepository: UserRepository) {
    super();
  }

  async searchUser(name: string) {
    return await this.transaction((trx) => {
      const res = this.userRepository.getUserByName(trx);

      return res;
    });
  }

  async getUserDetail(id: number) {
    return await this.transaction((trx) => {
      const res = this.userRepository.getUserById(trx, id);

      return res;
    });
  }
}
