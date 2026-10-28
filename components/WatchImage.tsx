import Image from "next/image";
import { lookFor } from "@/lib/looks";
import { WatchIllustration } from "./WatchIllustration";

type Props = { src: string | null; alt: string; category: "watch" | "clock"; slug: string; priority?: boolean };

export function WatchImage({ src, alt, category, slug, priority }: Props) {
  if (src) {
    return (
      <div className="relative aspect-square bg-ink">
        <Image src={src} alt={alt} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" priority={priority} />
      </div>
    );
  }
  return (
    <div className="aspect-square">
      <WatchIllustration look={lookFor(slug)} category={category} slug={slug} />
    </div>
  );
}
