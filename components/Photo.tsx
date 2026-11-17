import type { CSSProperties } from "react";
import { SCIENCE_IMAGES, type ScienceImageKey } from "@/content/images";

/** A telescope image, dimmed, behind a page header. Decoration only: the heading carries the meaning. */
export function PhotoBackdrop({
  image,
  position = "50% 50%",
  priority,
}: {
  image: ScienceImageKey;
  /** CSS object-position: which part of the picture stays in view when it is cropped. */
  position?: string;
  priority?: boolean;
}) {
  const photo = SCIENCE_IMAGES[image];
  return (
    <div className="photo-backdrop" aria-hidden="true" style={{ "--pos": position } as CSSProperties}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={photo.src}
        alt=""
        width={photo.width}
        height={photo.height}
        decoding="async"
        loading={priority ? "eager" : "lazy"}
      />
    </div>
  );
}

/** A full-width band with one telescope image and its caption and credit. */
export function ImageBand({
  image,
  position = "50% 50%",
}: {
  image: ScienceImageKey;
  position?: string;
}) {
  const photo = SCIENCE_IMAGES[image];
  return (
    <figure className="image-band cine" style={{ "--pos": position } as CSSProperties}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={photo.src} alt={photo.alt} width={photo.width} height={photo.height} decoding="async" loading="lazy" />
      <figcaption className="container">
        <span className="label">{photo.title}</span>
        <span className="label image-credit">{photo.credit}</span>
      </figcaption>
    </figure>
  );
}
