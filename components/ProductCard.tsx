'use client';

import { UseContext } from '@/context';
import { useState } from 'react'

import { HeartIcon } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardDescription, CardTitle, CardFooter, CardContent } from '@/components/ui/card'

import { cn } from '@/lib/utils'
import Image from 'next/image';
interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

export default function ProductCard({ product }: { product: Product }) {
  const [liked, setLiked] = useState<boolean>(false)
  const { addToCart } = UseContext();

  const handleAddToCart = () => {
    addToCart({ ...product, quantity: 1 });
  };

  return (
    <div className='relative max-w-md rounded-xl bg-gradient-to-r from-neutral-600 to-violet-300 pt-0 shadow-lg'>
      <div className='flex h-60 items-center justify-center'>
        <Image src={product.thumbnail} alt='Shoes' width={300} height={300}/>
      </div>
      <Button
        size='icon'
        onClick={() => setLiked(!liked)}
        className='bg-primary/10 hover:bg-primary/20 absolute top-4 right-4 rounded-full'
      >
        <HeartIcon className={cn('size-4', liked ? 'fill-destructive stroke-destructive' : 'stroke-white')} />
        <span className='sr-only'>Like</span>
      </Button>
      <Card className='border-none'>
        <CardHeader>
          <CardTitle>{product.title}</CardTitle>
          <CardDescription className='flex items-center gap-2'>
            <Badge variant='outline'>EU38</Badge>
            <Badge variant='outline'>Black and White</Badge>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>
            {product.description}
          </p>
        </CardContent>
        <CardFooter className='justify-between gap-3 max-sm:flex-col max-sm:items-stretch'>
          <div className='flex flex-col'>
            <span className='text-sm font-medium uppercase'>Price</span>
            <span className='text-xl font-semibold'>${product.price}</span>
          </div>
          <Button onClick={handleAddToCart} size='lg'>Add to cart</Button>
        </CardFooter>
      </Card>
    </div>
  );
}