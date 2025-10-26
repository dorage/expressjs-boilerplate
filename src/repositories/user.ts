import { Database } from '@/libs/kysely/types/db';
import { Transaction } from 'kysely';

export class UserRepository {
  async getUserById(db: Transaction<Database>, id: number) {
    const res = await db
      .selectFrom('user')
      .selectAll()
      .where('id', '=', id)
      .executeTakeFirst();

    return res;
  }

  async getUserByName(db: Transaction<Database>, name: string = '') {
    const res = await db
      .selectFrom('user')
      .selectAll()
      .where('name', 'like', `%${name}%`)
      .execute();

    return res;
  }
}
