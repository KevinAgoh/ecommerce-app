import { TApiAllCategoriesResp, TApiErrorResp } from "@/src/types";
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/src/lib/prisma";

const handler = async (
  _req: NextApiRequest,
  res: NextApiResponse<TApiAllCategoriesResp | TApiErrorResp>
) => {
  if (_req.method !== 'GET') {
    res.status(405).send({ message: 'Method Not Allowed' });
    return;
  }

  try {
    const categories = await prisma.category.findMany({
      select: {
        id: true,
        name: true,
        products: {
          orderBy: {
            createdAt: "desc",
          },
          take: 8,
          select: {
            title: true,
            description: true,
            image: true,
            price: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return res.json({ categories });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong!! Please try again after sometime",
    });
  }
};


export default handler;