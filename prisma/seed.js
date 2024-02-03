const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function seed() {
  try {
    // Seeder for Users table
    await prisma.users.createMany({
      data: [
        {
          username: "user1",
          email: "user1@example.com",
          password: "password1",
          phone: "1234567890",
        },
        {
          username: "user2",
          email: "user2@example.com",
          password: "password2",
          phone: "9876543210",
        },
      ],
    });

    // Seeder for Auth table
    await prisma.auth.createMany({
      data: [
        {
          user_id: 1,
          token: "token1",
          expired_date: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
        },
        {
          user_id: 2,
          token: "token2",
          expired_date: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
        },
      ],
    });

    // Seeder for Categories table
    await prisma.categories.createMany({
      data: [{ name: "Category A" }, { name: "Category B" }],
    });

    // Seeder for Tasks table
    await prisma.tasks.createMany({
      data: [
        {
          user_id: 1,
          category_id: 1,
          title: "Task 1",
          description: "Description 1",
          due_date: new Date(new Date().getTime() + 3 * 24 * 60 * 60 * 1000),
          is_completed: false,
          created_date: new Date(),
        },
        {
          user_id: 2,
          category_id: 2,
          title: "Task 2",
          description: "Description 2",
          due_date: new Date(new Date().getTime() + 5 * 24 * 60 * 60 * 1000),
          is_completed: false,
          created_date: new Date(),
        },
      ],
    });

    console.log("Seeding completed successfully.");
  } catch (error) {
    console.error("Error seeding the database:", error);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
