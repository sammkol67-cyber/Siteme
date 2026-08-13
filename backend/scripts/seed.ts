/**
 * Seed script for creating default roles and superadmin user.
 *
 * Run:
 *   npx ts-node --transpile-only scripts/seed.ts
 */

import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding roles...');
  const roles = ['user', 'moderator', 'admin', 'superadmin'];
  for (const name of roles) {
    await prisma.role.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }

  const superadminEmail = 'admin@example.com';
  const superadminUsername = 'superadmin';
  const tempPassword = 'R!9vXq#7bP4mZf2K';

  const existing = await prisma.user.findUnique({ where: { email: superadminEmail } });
  if (!existing) {
    const superRole = await prisma.role.findUnique({ where: { name: 'superadmin' } });
    const hash = await bcrypt.hash(tempPassword, 12);
    const user = await prisma.user.create({
      data: {
        username: superadminUsername,
        email: superadminEmail,
        password: hash,
        roleId: superRole.id,
        forcePasswordChange: true,
      },
    });
    console.log('Created superadmin:', user.email);
  } else {
    console.log('Superadmin already exists:', superadminEmail);
  }
}

main()
  .then(async () => {
    console.log('Seed complete');
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('Seed failed:', e);
    await prisma.$disconnect();
    process.exit(1);
  });
