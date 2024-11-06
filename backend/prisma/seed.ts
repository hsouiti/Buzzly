// prisma/seed.ts

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create sample users
  const user1 = await prisma.user.create({
    data: {
      name: "John Doe",
      email: "john@example.com",
      password: "hashedpassword123",
      role: "ADMIN",
    },
  });

  const user2 = await prisma.user.create({
    data: {
      name: "Jane Smith",
      email: "jane@example.com",
      password: "hashedpassword456",
      role: "MANAGER",
    },
  });

  // Create sample brands for each user
  const brand1 = await prisma.brand.create({
    data: {
      name: "Brand A",
      description: "First brand for marketing",
      userId: user1.id,
    },
  });

  const brand2 = await prisma.brand.create({
    data: {
      name: "Brand B",
      description: "Second brand for marketing",
      userId: user1.id,
    },
  });

  // Create accounts for each brand
  const account1 = await prisma.account.create({
    data: {
      brandId: brand1.id,
      platform: "FACEBOOK",
      accountHandle: "brandA_facebook",
      accessToken: "fakeAccessToken123",
      refreshToken: "fakeRefreshToken123",
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30), // 30 days from now
    },
  });

  const account2 = await prisma.account.create({
    data: {
      brandId: brand2.id,
      platform: "INSTAGRAM",
      accountHandle: "brandB_instagram",
      accessToken: "fakeAccessToken456",
      refreshToken: "fakeRefreshToken456",
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30), // 30 days from now
    },
  });

  // Create sample posts for each account
  const post1 = await prisma.post.create({
    data: {
      accountId: account1.id,
      brandId: brand1.id,
      userId: user1.id,
      content: "Hello from Brand A!",
      mediaUrl: "https://example.com/image.jpg",
      scheduledAt: new Date(Date.now() + 1000 * 60 * 60 * 24), // 1 day from now
      status: "SCHEDULED",
    },
  });

  const post2 = await prisma.post.create({
    data: {
      accountId: account2.id,
      brandId: brand2.id,
      userId: user2.id,
      content: "Hello from Brand B!",
      mediaUrl: "https://example.com/image2.jpg",
      scheduledAt: new Date(),
      status: "PUBLISHED",
      publishedAt: new Date(),
    },
  });

  // Add comments to the posts
  await prisma.comment.create({
    data: {
      postId: post1.id,
      accountId: account1.id,
      content: "Great post!",
      userName: "User123",
    },
  });

  await prisma.comment.create({
    data: {
      postId: post2.id,
      accountId: account2.id,
      content: "Nice update!",
      userName: "User456",
    },
  });

  // Add reactions to the posts
  await prisma.reaction.create({
    data: {
      postId: post1.id,
      accountId: account1.id,
      reactionType: "LIKE",
      count: 10,
    },
  });

  await prisma.reaction.create({
    data: {
      postId: post2.id,
      accountId: account2.id,
      reactionType: "SHARE",
      count: 5,
    },
  });

  // Add analytics for posts
  await prisma.analytics.create({
    data: {
      postId: post1.id,
      impressions: 500,
      engagementRate: 0.1,
      reach: 450,
    },
  });

  await prisma.analytics.create({
    data: {
      postId: post2.id,
      impressions: 1000,
      engagementRate: 0.15,
      reach: 850,
    },
  });

  console.log("Seeding completed!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
