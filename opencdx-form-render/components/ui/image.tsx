import React from 'react';
import { Image as GlueStackImage } from '@gluestack-ui/themed';

interface ImageProps {
  source: any;
  className?: string;
  ariaLabel?: string;
  alt?: string;
}

export const Image: React.FC<ImageProps> = ({ source, className, ariaLabel, alt }) => {
  return (
    <GlueStackImage
      source={source}
      className={className}
      aria-label={ariaLabel}
      alt={alt}
    />
  );
};
