import React, { useMemo } from 'react';
import { Image  as NativeImage} from 'react-native';

interface ImageProps {
  source: any;
  className?: string;
  ariaLabel?: string;
  alt?: string;
}

export const Image: React.FC<ImageProps> = React.memo(({ source, className, ariaLabel, alt }) => {

  return (
    <NativeImage
      source={source}
      className={className}
      aria-label={ariaLabel}
      alt={alt}
    />
  );
});
