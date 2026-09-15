# Image Assets

This directory contains all image assets for the Nichols Transportation website.

## Directory Structure

- **hero/** - Hero section background images
  - container-yard-aerial.jpg - Aerial view of container yard (primary hero)
  - desert-highway-truck.jpg - Truck on desert highway (CTA hero)
  - foggy-highway-trailer.jpg - Trailer truck on foggy highway (full-page image)

- **features/** - Feature card images
  - Images for horizontal scroll feature section

- **services/** - Service-related images
  - white-truck.jpg - White truck image for stats section

## Image Optimization Guidelines

### Hero Images
- Target size: < 500KB
- Dimensions: 1920x1080 (Full HD)
- Formats: WebP with JPEG fallback
- Compression: 80% quality for JPEG, high quality for WebP

### Feature Images
- Target size: < 200KB
- Dimensions: 600x400
- Formats: WebP with JPEG fallback
- Compression: 85% quality

### Service Images
- Target size: < 150KB
- Dimensions: 400x300
- Formats: WebP with PNG fallback for logos
- Compression: 85% quality

## Lazy Loading

All images below the fold should be lazy-loaded using the `loading="lazy"` attribute.

## Responsive Images

Use `srcset` and `sizes` attributes for responsive images:

```html
<img
  src="/images/hero/container-yard-aerial.jpg"
  srcset="
    /images/hero/container-yard-aerial-640.jpg 640w,
    /images/hero/container-yard-aerial-1024.jpg 1024w,
    /images/hero/container-yard-aerial-1920.jpg 1920w
  "
  sizes="(max-width: 640px) 640px, (max-width: 1024px) 1024px, 1920px"
  alt="Aerial view of container yard"
/>
```

## Placeholder Images

For development, use placeholder services like:
- https://placehold.co/1920x1080 for hero images
- https://placehold.co/600x400 for feature images
- https://placehold.co/400x300 for service images
