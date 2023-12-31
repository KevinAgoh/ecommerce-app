import {
  randBetweenDate,
  randNumber,
  randProduct,
  randProductAdjective,
} from "@ngneat/falso";


const main = async () => {
  try {
    await prisma.category.deleteMany();
    await prisma.product.deleteMany();
    const fakeProducts = randProduct({
      length: 1000,
    });
    for (let index = 0; index < fakeProducts.length; index++) {
      const product = fakeProducts[index];
      const productAdjective = randProductAdjective();
      await prisma.product.upsert({
        where: {
          title: `${productAdjective} ${product.title}`,
        },
        create: {
          title: `${productAdjective} ${product.title}`,
          description: product.description,
          price: product.price,
          image: product.image,
          quantity: randNumber({ min: 10, max: 100 }),
          category: {
            connectOrCreate: {
              where: {
                name: product.category,
              },
              create: {
                name: product.category,
                createdAt: randBetweenDate({
                  from: new Date("10/06/2020"),
                  to: new Date(),
                }),
              },
            },
          },
          createdAt: randBetweenDate({
            from: new Date("10/07/2020"),
            to: new Date(),
          }),
        },
        update: {},
      });
    }
  } catch (error) {
    throw error;
  }
};

main().catch((err) => {
  console.warn("Error While generating Seed: \n", err);
});