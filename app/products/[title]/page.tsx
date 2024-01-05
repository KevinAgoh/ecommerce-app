'use client';

import Navbar from '@/app/components/Navbar';
import Skelton from '@/app/components/Skeleton';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { useMutation, useQuery } from '@tanstack/react-query';
import Head from 'next/head';
import NextImage from 'next/image';

const stripePromiseclientSide = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

const SingleProduct = () => {
  let pathmane = window.location.pathname;
  const productTitle = pathmane.replace('/products/', '');
  const requestProductTitle = productTitle.replaceAll('_', ' ');

  const getSingleProduct = async () => {
    try {
      const respJSON = await fetch(`/api/products/${requestProductTitle}`);
      const resp = await respJSON.json();
      return resp;
    } catch (error) {
      throw error;
    }
  };

  const { mutate, isPending } = useMutation({
    mutationFn: async (body: any) => {
      try {
        const respJSON = await fetch('/api/create-checkout-session', {
          method: 'POST',
          body: JSON.stringify(body)
        });
        const resp = await respJSON.json();
        const stripe = (await stripePromiseclientSide) as Stripe;
        const result = await stripe.redirectToCheckout({
          sessionId: resp.id
        });
        return result;
      } catch (error) {
        throw error;
      }
    }
  });

  const queryKey = `singleProduct, ${productTitle}`;

  const { data, isLoading } = useQuery({
    queryKey: [queryKey],
    queryFn: getSingleProduct,
    enabled: !!productTitle
  });

  const product = data?.product;

  return (
    <div>
      <Head>
        <title>{isLoading ? 'Loading...' : `${product?.title}`}</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className='container mx-6 md:mx-auto'>
        <Navbar />
        {isLoading ? (
          <Skelton />
        ) : (
          <div className='bg-white'>
            <div className='pt-6 pb-16 sm:pb-24'>
              <div className='mx-auto mt-8'>
                <div className='flex flex-col md:flex-row gap-x-8'>
                  <div className='min-h-80 w-full overflow-hidden rounded-md group-hover:opacity-75 lg:aspect-none lg:h-80'>
                    <NextImage
                      layout='responsive'
                      width='25'
                      height='25'
                      src={`${product.image}`}
                      alt={product.title}
                      className='h-full w-full object-cover object-center lg:h-full lg:w-full'
                    />
                  </div>
                  <div className='lg:col-span-5 lg:col-start-8 mt-8 md:mt-0'>
                    <h1 className='text-xl font-medium text-gray-900 '>
                      {product.title}
                    </h1>
                    <p className='text-xl font-light text-gray-700 mt-4'>
                      {product.description}
                    </p>
                    <p className='text-xl font-normal text-gray-500 mt-4'>
                      USD {product.price}
                    </p>
                    <button
                      onClick={() =>
                        mutate({
                          title: product.title,
                          image: product.image,
                          description: product.description,
                          price: product.price
                        })
                      }
                      disabled={isPending}
                      type='button'
                      className='inline-flex items-center rounded-md border border-transparent bg-sky-800 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-sky-900  mt-4'
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default SingleProduct;
