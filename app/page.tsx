'use client';

import Navbar from '@/app/components/Navbar';
import ProductGrid from '@/app/components/ProductGrid';
import Skelton from '@/app/components/Skeleton';
import { useQuery } from '@tanstack/react-query';
import { NextPage } from 'next';
import Head from 'next/head';

const Home: NextPage = () => {
  const getAllCategories = async () => {
    try {
      const respJSON = await fetch('/api/categories');
      const resp = await respJSON.json();
      return resp;
    } catch (error) {
      throw error;
    }
  };

  const { isLoading, data } = useQuery({
    queryKey: ['AllCategoreiesWithProducts'],
    queryFn: getAllCategories
  });
  const categories = data?.categories;
  return (
    <>
      <Head>
        <title>All Products</title>
        <meta name='description' content='All Products' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Navbar />
      <main className='container mx-auto'>
        {isLoading ? (
          <Skelton />
        ) : (
          <>
            {categories && categories?.length > 0 && (
              <ProductGrid showLink={true} categories={categories} />
            )}
          </>
        )}
      </main>
    </>
  );
};

export default Home;
