import Image from 'next/image';
import Link from 'next/link';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { cn } from '@/lib/utils';

interface PromoBannerProps {
  image: string;
  title: string;
  subtitle?: string;
  className?: string;
  link?: string;
}

export function PromoBanner({ image, title, subtitle, className, link = '/' }: PromoBannerProps) {
  const content = (
    <div className={cn('relative overflow-hidden rounded-lg', className)}>
      <AspectRatio ratio={16 / 9} className="bg-gray-200">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
        />
      </AspectRatio>
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex flex-col justify-end p-6 md:p-8">
        <h3 className="text-xl md:text-2xl font-bold text-white mb-2">{title}</h3>
        {subtitle && (
          <p className="text-white/80 max-w-md">{subtitle}</p>
        )}
      </div>
    </div>
  );

  if (link) {
    return (
      <Link href={link} className="block">
        {content}
      </Link>
    );
  }

  return content;
}
