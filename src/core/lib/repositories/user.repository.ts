import { db } from "@/core/lib/prisma";
import { User, Prisma } from "@prisma/client";

export class UserRepository {
  /**
   * Safe fetch avoiding soft deleted users
   */
  static async findActiveById(id: string): Promise<User | null> {
    return await db.user.findFirst({
      where: { id, deletedAt: null },
    });
  }

  static async findByEmail(email: string): Promise<User | null> {
    return await db.user.findFirst({
      where: { email, deletedAt: null },
    });
  }

  static async create(data: Prisma.UserCreateInput): Promise<User> {
    return await db.user.create({ data });
  }

  static async update(id: string, data: Prisma.UserUpdateInput): Promise<User> {
    return await db.user.update({
      where: { id },
      data,
    });
  }

  /**
   * Safe Soft Delete support
   */
  static async softDelete(id: string): Promise<User> {
    return await db.user.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}
