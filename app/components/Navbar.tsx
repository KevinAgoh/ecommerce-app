import Link from 'next/link';

const Navbar = () => {
  return (
    <div className='relative bg-white mx-6 border-b-2'>
      <div className='flex items-center justify-between pt-6 md:justify-start md:space-x-10'>
        <div className='flex justify-start lg:w-0 lg:flex-1'>
          <h1 className='text-2xl'>
            <Link href='/' className='cursor-pointer'>
              Next.js e-commerce applicaiton
            </Link>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
