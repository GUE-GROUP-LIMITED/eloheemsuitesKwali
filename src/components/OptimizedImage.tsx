import React, { useState } from 'react';

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    src: string;
    alt: string;
    /** 'eager' for above-the-fold / hero images, 'lazy' (default) for everything else */
    priority?: boolean;
    className?: string;
    wrapperClassName?: string;
}

/**
 * Drop-in <img> replacement with:
 * - Lazy loading (IntersectionObserver native API) by default
 * - priority=true sets loading="eager" + fetchpriority="high" for LCP images
 * - decoding="async" on all images
 * - Fade-in on load to prevent layout shift flash
 */
const OptimizedImage: React.FC<OptimizedImageProps> = ({
    src,
    alt,
    priority = false,
    className = '',
    wrapperClassName = '',
    ...rest
}) => {
    const [loaded, setLoaded] = useState(false);

    return (
        <span
            className={`opt-img-wrapper ${wrapperClassName}`}
            style={{ display: 'contents' }}
        >
            <img
                src={src}
                alt={alt}
                loading={priority ? 'eager' : 'lazy'}
                decoding="async"
                {...(priority ? { fetchPriority: 'high' } : {})}
                onLoad={() => setLoaded(true)}
                className={`opt-img ${loaded ? 'opt-img--loaded' : ''} ${className}`}
                {...rest}
            />
        </span>
    );
};

export default OptimizedImage;
