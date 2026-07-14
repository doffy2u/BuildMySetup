import { db } from "@/core/lib/prisma";

export interface PaginationMeta {
  totalCount: number;
  totalPages: number;
  currentPage: number;
  limit: number;
}

export interface PaginatedResult<T> {
  data: T[];
  meta: PaginationMeta;
}

/**
 * Handles boilerplate pagination offsets and formatting.
 */
export async function paginate<T>(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  model: any,
  args: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    where?: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    orderBy?: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    include?: any;
    page?: number;
    limit?: number;
  }
): Promise<PaginatedResult<T>> {
  const page = Math.max(1, args.page ?? 1);
  const limit = Math.max(1, Math.min(100, args.limit ?? 20));
  const skip = (page - 1) * limit;

  const [data, totalCount] = await Promise.all([
    model.findMany({
      where: args.where,
      include: args.include,
      orderBy: args.orderBy,
      skip,
      take: limit,
    }),
    model.count({ where: args.where }),
  ]);

  const totalPages = Math.ceil(totalCount / limit);

  return {
    data,
    meta: {
      totalCount,
      totalPages,
      currentPage: page,
      limit,
    },
  };
}

/**
 * Helper to wrap logic in ACID transactions.
 */
export async function runInTransaction<T>(
  callback: (tx: Omit<typeof db, "$connect" | "$disconnect" | "$use" | "$on">) => Promise<T>
): Promise<T> {
  return await db.$transaction(callback);
}
