const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Create admin user
  const admin = await prisma.user.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      username: 'admin',
      password: '$2b$10$EpRnTzVlqHNP0.fUbXUwSOyuiXe/QLSUG6xNekdHgTGmrpHEfIoxm', // 'secret42'
      role: 'admin'
    }
  });

  // Create some test events
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const nextWeek = new Date(today);
  nextWeek.setDate(nextWeek.getDate() + 7);

  const events = await Promise.all([
    prisma.event.create({
      data: {
        title: 'Yoga Session',
        date: tomorrow,
        startTime: new Date(tomorrow.setHours(10, 0, 0, 0)),
        duration: 60,
        location: 'Studio 1',
        room: 'Room A',
        price: 25.00,
        visibility: true,
        maxBookings: 10
      }
    }),
    prisma.event.create({
      data: {
        title: 'Meditation Workshop',
        date: nextWeek,
        startTime: new Date(nextWeek.setHours(14, 0, 0, 0)),
        duration: 90,
        location: 'Studio 2',
        room: 'Room B',
        price: 35.00,
        visibility: true,
        maxBookings: 5
      }
    })
  ]);

  console.log({ admin, events });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
