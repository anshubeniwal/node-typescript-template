import type { Knex } from 'knex';

interface Writer<T> {
  create(item: Omit<T, 'id'>): Promise<T>;
  createMany(item: Omit<T, 'id'>[]): Promise<T[]>;
  update(id: string, item: Partial<T>): Promise<boolean>;
  delete(id: string): Promise<boolean>;
}
interface Reader<T> {
  find(item: Partial<T>): Promise<T[]>;
  findOne(id: string | Partial<T>): Promise<T>;
  exist(id: string | Partial<T>): Promise<boolean>;
}

type BaseRepository<T> = Writer<T> & Reader<T>;

export abstract class KnexRepository<T> implements BaseRepository<T> {
  constructor(public readonly knex: Knex, public readonly tableName: string) {}

  // Shortcut for Query Builder call
  public get qb(): Knex.QueryBuilder {
    return this.knex(this.tableName);
  }

  async create(item: Omit<T, 'id'>): Promise<T> {
    const [output] = await this.qb.insert<T>(item).returning('*');

    return output as Promise<T>;
  }
  createMany(items: T[]): Promise<T[]> {
    return this.qb.insert<T>(items) as Promise<T[]>;
  }

  update(id: string, item: Partial<T>): Promise<boolean> {
    return this.qb.where('id', id).update(item);
  }

  delete(id: string): Promise<boolean> {
    return this.qb.where('id', id).del();
  }

  find(item: Partial<T>): Promise<T[]> {
    return this.qb.where(item).select();
  }

  findOne(id: string | Partial<T>): Promise<T> {
    return typeof id === 'string' ? this.qb.where('id', id).first() : this.qb.where(id).first();
  }

  async exist(id: string | Partial<T>) {
    const query = this.qb.select<[{ count: number }]>(this.knex.raw('COUNT(*)::integer as count'));

    if (typeof id !== 'string') {
      query.where(id);
    } else {
      query.where('id', id);
    }

    const exist = await query.first();

    return exist!.count !== 0;
  }
}
