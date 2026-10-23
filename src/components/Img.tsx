import Image, { type ImageProps } from "next/image";
import { BLUR } from "@/lib/blur";

/** next/image with high quality (90), modern formats (AVIF/WebP) and an instant blur placeholder. */
export function Img(props: ImageProps) {
  const src = typeof props.src === "string" ? props.src : "";
  const blur = BLUR[src];
  return <Image quality={90} {...(blur ? { placeholder: "blur" as const, blurDataURL: blur } : {})} {...props} />;
}
