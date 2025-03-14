import Image from 'next/image';
import Link from 'next/link';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Card, CardContent } from '@/components/ui/card';

interface CategoryCardProps {
  name: string;
  image: string;
  slug: string;
}

export function CategoryCard({ name, image, slug }: CategoryCardProps) {
  return (
    <Link href={`/category/${slug}`} className="block group">
      <Card className="overflow-hidden border-gray-200 transition-all hover:shadow-md">
        <AspectRatio ratio={1 / 1} className="bg-gray-50">
          <Image
            src={image}
            alt={name}
            fill
            priority
            className="object-cover transition-transform group-hover:scale-105"
            sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 16vw"
            quality={85}
          />
        </AspectRatio>
        <CardContent className="p-3">
          <h3 className="text-sm font-medium text-center truncate">{name}</h3>
        </CardContent>
      </Card>
    </Link>
  );
}
