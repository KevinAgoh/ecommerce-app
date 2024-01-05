'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { TApiAllCategoriesResp } from '../../src/types';
import Image from 'next/image';
import { AiOutlineRight } from 'react-icons/ai';

interface IProductGrid extends TApiAllCategoriesResp {
  showLink: boolean;
  hasMore?: boolean;
  loadMoreFun?: Function;
}

const ProductGrid = (props: IProductGrid) => {
  const { categories, showLink, loadMoreFun, hasMore } = props;
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      if (loadMoreFun) loadMoreFun();
    }
  }, [inView, loadMoreFun]);

  return (
    <div className='bg-white'>
      {categories.map(category => (
        <div className='mt-12  p-6' key={category.name}>
          <div className='flex flex-row justify-between items-center'>
            <span className='shadow inline-flex items-center rounded-md bg-amber-600 px-8 py-2 text-md font-medium text-white'>
              {category.name}
            </span>
            {showLink && (
              <Link href={`/categories/${category.id}`}>
                <p className='text-amber-600 no-underline flex flex-row gap-2 hover:cursor-pointer items-center'>
                  View More
                  <AiOutlineRight />
                </p>
              </Link>
            )}
          </div>
          <div className='mt-6 grid grid-cols-1 gap-y-10 gap-x-6 xl:gap-x-8 sm:grid-cols-2 lg:grid-cols-4'>
            {category?.products.map(product => (
              <Link
                className='p-6 group rounded-lg bg-white shadow-[0_3px_8px_#0000001f]'
                key={product.title}
                href={`/products/${product.title.replaceAll(' ', '_')}`}
              >
                <div className='h-[75%] w-full overflow-hidden rounded-md group-hover:opacity-75 lg:aspect-none lg:h-80'>
                  <Image
                    priority={true}
                    layout='responsive'
                    width='25'
                    height='25'
                    src={`${product.image}`}
                    alt={product.title}
                    className='h-full w-full object-cover object-center lg:h-full lg:w-full'
                  />
                </div>
                <div className='relative mt-2'>
                  <h3 className='text-sm font-medium text-gray-900'>
                    {product.title}
                  </h3>
                  <p className='mt-1 text-sm text-gray-500'>{product.price}€</p>
                </div>
              </Link>
            ))}
          </div>
          {!showLink && (
            <div className='flex items-center justify-center mt-8'>
              {hasMore ? (
                <button
                  ref={ref}
                  type='button'
                  className='inline-flex items-center rounded-md border border-transparent bg-sky-800 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-sky-900'
                >
                  Loading...
                </button>
              ) : (
                <div className='border-l-4 border-yellow-400 bg-yellow-50 p-4 w-full'>
                  <div className='flex'>
                    <div className='ml-3'>
                      <p className='text-sm text-yellow-700'>
                        You have viewed all the Products under this category.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
          {showLink && (
            <div className='w-full border-b-2 border-gray-300 mt-24' />
          )}
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;
