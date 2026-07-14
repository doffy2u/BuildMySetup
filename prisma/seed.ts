import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const adminEmail = "admin@buildsetup.ai";

  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail },
  });

  if (!existingAdmin) {
    await prisma.user.create({
      data: {
        name: "Headquarters Administrator",
        email: adminEmail,
        emailVerified: true,
        role: "admin",
      },
    });
    // eslint-disable-next-line no-console
    console.log("🌱 Admin user seed initialized successfully.");
  } else {
    // eslint-disable-next-line no-console
    console.log("🌱 Seed execution skipped. Admin user already populated.");
  }
}

main()
  .catch((e) => {
    // eslint-disable-next-line no-console
    console.error("❌ Seed Script Failure:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
