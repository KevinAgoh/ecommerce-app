import Link from 'next/link';
import React from 'react';
import Image from 'next/image';

// export async function getServerSideProps(context) {
//   // Fetch data from external API
//   const res = await fetch(`https://.../data`);
//   const data = await res.json();

//   // Pass data to the page via props
//   return { props: { data } };
// }

interface IProductProps {
  title: string;
  description: string;
  image: string;
  price: string;
}

const ProductTile = (props: { product: IProductProps }) => {
  return (
    <Link
      className='p-6 group rounded-lg bg-white shadow-[0_3px_8px_#0000001f] flex flex-col justify-center'
      key={props.product.title}
      href={`/products/${props.product.title.replaceAll(' ', '_')}`}
    >
      <div className='!h-[100%] w-full overflow-hidden rounded-md group-hover:opacity-75 lg:aspect-none lg:h-80'>
        <Image
          priority={true}
          layout='responsive'
          width='25'
          height='25'
          src={`${props.product.image}`}
          alt={props.product.title}
          className='h-full w-full object-cover object-center lg:h-full lg:w-full'
        />
      </div>
      <div className='relative mt-2'>
        <h3 className='text-sm font-medium text-gray-900'>
          {props.product.title}
        </h3>
        <p className='mt-1 text-sm text-gray-500'>
          {props.product.price.replace('.', ',')}€
        </p>
      </div>
    </Link>
  );
};

export default ProductTile;
