import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const products = [
    { name: "Latte", description: "Smooth and creamy", price: 250, category: "drink" },
    { name: "Matcha Latte", description: "Green harmony", price: 280, category: "drink" },
    { name: "Iced Filter", description: "Refreshing and light", price: 260, category: "drink" },
    { name: "Almond Croissant", description: "Crispy outside, tender inside", price: 220, category: "treat" },
    { name: "Berry Cheesecake", description: "Soft dessert with seasonal berries", price: 260, category: "treat" },
    { name: "Chocolate Chip Cookie", description: "Warm, soft, and very chocolatey", price: 160, category: "treat" },
    { name: "Leaf & Grain Blend", description: "House blend beans", price: 1200, category: "bean" }
  ];

  console.log('Seeding products...');
  for (const product of products) {
    await prisma.product.create({ data: product });
  }
  console.log('Done!');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
