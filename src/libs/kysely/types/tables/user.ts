import { GeneratedAlways, Insertable, Selectable, Updateable } from 'kysely';

export interface UserTable {
  id: GeneratedAlways<number>;
  name: string | null;
}

export type User = Selectable<UserTable>;
export type NewUser = Insertable<UserTable>;
export type UserUpdate = Updateable<UserTable>;
