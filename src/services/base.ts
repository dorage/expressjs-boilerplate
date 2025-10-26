import { db } from '@/libs/kysely';
import { Database } from '@/libs/kysely/types/db';
import { Transaction } from 'kysely';

export class ServiceBase {
  async transaction<T>(callback: (trx: Transaction<Database>) => T) {
    const trx = await db.startTransaction().execute();

    try {
      const res = callback(trx);
      return res;
    } catch (err) {
      await trx.rollback().execute();
      throw err;
    }
  }
}
