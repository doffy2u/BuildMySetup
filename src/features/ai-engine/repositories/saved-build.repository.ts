import { db } from "@/core/lib/prisma";
import { Build, BuildStatus } from "@prisma/client";

export class SavedBuildRepository {
  /**
   * Persists a validated system build manifest directly to a user profile account tracking index framework.
   */
  public static async persistSystemBuild(
    userId: string,
    title: string,
    description: string,
    budget: number,
    componentsIdsList: string[]
  ): Promise<Build> {
    return await db.$transaction(async (tx) => {
      // 1. Instantiates core system manifest row mapping parameters
      const buildHeaderRecord = await tx.build.create({
        data: {
          userId,
          title,
          description,
          budget,
          status: BuildStatus.SAVED,
          isAiCreated: true,
          country: "US"
        }
      });

      // 2. Bind sub items array parameters inside physical storage pivots structures
      if (componentsIdsList.length > 0) {
        await tx.buildItem.createMany({
          data: componentsIdsList.map(cid => ({
            buildId: buildHeaderRecord.id,
            componentId: cid,
            quantity: 1
          }))
        });
      }

      return buildHeaderRecord;
    });
  }

  /**
   * Updates tracking properties on existing persistent setups.
   */
  public static async modifyBuildMeta(buildId: string, userId: string, updatePayload: { title?: string; description?: string }): Promise<Build> {
    return await db.build.update({
      where: { id: buildId, userId },
      data: { ...updatePayload }
    });
  }

  /**
   * Creates a duplicate clone of a configuration tracking node.
   */
  public static async cloneBuildConfiguration(buildId: string, userId: string): Promise<Build> {
    return await db.$transaction(async (tx) => {
      const parentSource = await tx.build.findFirstOrThrow({
        where: { id: buildId },
        include: { items: true }
      });

      const clonedHeader = await tx.build.create({
        data: {
          userId,
          title: `Copy of ${parentSource.title}`,
          description: parentSource.description,
          budget: parentSource.budget,
          status: BuildStatus.DRAFT,
          isAiCreated: parentSource.isAiCreated
        }
      });

      if (parentSource.items.length > 0) {
        await tx.buildItem.createMany({
          data: parentSource.items.map(item => ({
            buildId: clonedHeader.id,
            componentId: item.componentId,
            quantity: item.quantity
          }))
        });
      }

      return clonedHeader;
    });
  }

  /**
   * Safe soft-delete method flag toggle execution engine call.
   */
  public static async softDeleteBuild(buildId: string, userId: string): Promise<void> {
    await db.build.update({
      where: { id: buildId, userId },
      data: { deletedAt: new Date() }
    });
  }
}
