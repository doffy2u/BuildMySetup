import { PrismaClient, UserRole } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // eslint-disable-next-line no-console
  console.log("🚀 Starting database seeding...");

  // 1. Core System Plans
  const plans = [
    {
      name: "Standard Free",
      code: "free",
      description: "Basic PC custom builder access.",
      price: 0.00,
      billingPeriod: "MONTHLY",
      features: { aiGenerationsLimit: 3, savedBuildsLimit: 5 },
    },
    {
      name: "Pro Creator",
      code: "pro",
      description: "Unlimited AI PC generation runs and custom builds.",
      price: 9.99,
      billingPeriod: "MONTHLY",
      features: { aiGenerationsLimit: 9999, savedBuildsLimit: 9999 },
    },
  ];

  for (const plan of plans) {
    await prisma.plan.upsert({
      where: { code: plan.code },
      update: {},
      create: plan,
    });
  }

  // 2. Hardware Categories
  const categories = [
    { name: "CPU", slug: "cpu", description: "Central Processing Units" },
    { name: "GPU", slug: "gpu", description: "Graphics Processing Cards" },
    { name: "Motherboard", slug: "motherboard", description: "System Boards" },
    { name: "Memory", slug: "ram", description: "Random Access Memory" },
    { name: "Storage", slug: "storage", description: "SSDs & NVMe Units" },
  ];

  for (const cat of categories) {
    await prisma.componentCategory.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    });
  }

  // 3. Tech Manufacturers
  const manufacturers = [
    { name: "Intel", slug: "intel", website: "https://intel.com" },
    { name: "AMD", slug: "amd", website: "https://amd.com" },
    { name: "NVIDIA", slug: "nvidia", website: "https://nvidia.com" },
    { name: "ASUS", slug: "asus", website: "https://asus.com" },
  ];

  for (const mfg of manufacturers) {
    await prisma.manufacturer.upsert({
      where: { slug: mfg.slug },
      update: {},
      create: mfg,
    });
  }

  // 4. Default System Flags
  const flags = [
    { key: "ENABLE_AI_GENERATION", isEnabled: true, description: "Toggles AI builder system wide." },
    { key: "MAINTENANCE_MODE", isEnabled: false, description: "Blocks global client entry during updates." },
  ];

  for (const flag of flags) {
    await prisma.featureFlag.upsert({
      where: { key: flag.key },
      update: {},
      create: flag,
    });
  }

  // 5. Default Super Administrator
  const adminEmail = "root@buildsetup.ai";
  await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      name: "Root Executive",
      email: adminEmail,
      emailVerified: true,
      role: UserRole.SUPERADMIN,
      settings: {
        create: {
          preferredCurrency: "USD",
          preferredCountry: "US",
        },
      },
    },
  });

  // eslint-disable-next-line no-console
  console.log("🌱 Database seeding completed successfully.");
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
