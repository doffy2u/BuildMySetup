import { db } from "@/core/lib/prisma";
import { Build, Prisma } from "@prisma/client";
import { paginate, PaginatedResult } from "@/core/lib/db-helpers";

export class BuildRepository {
  static async findById(id: string): Promise<Build | null> {
    return await db.build.findFirst({
      where: { id, deletedAt: null },
      include: {
        items: {
          include: {
            component: true,
          },
        },
        scores: true,
      },
    });
  }

  static async getPaginatedUserBuilds(
    userId: string,
    page = 1,
    limit = 20
  ): Promise<PaginatedResult<Build>> {
    return paginate<Build>(db.build, {
      where: { userId, deletedAt: null },
      orderBy: { updatedAt: "desc" },
      page,
      limit,
    });
  }

  static async create(
    data: Prisma.BuildUncheckedCreateInput,
    items: Array<{ componentId: string; quantity: number }>
  ): Promise<Build> {
    return await db.$transaction(async (tx) => {
      const build = await tx.build.create({
        data,
      });

      if (items.length > 0) {
        await tx.buildItem.createMany({
          data: items.map((item) => ({
            buildId: build.id,
            componentId: item.componentId,
            quantity: item.quantity,
          })),
        });
      }

      return build;
    });
  }

  static async softDelete(id: string): Promise<Build> {
    return await db.build.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}
