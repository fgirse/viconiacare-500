"use client";

import dynamic from "next/dynamic";
import type { TeamMember } from "./Gallery27Carousel";

const Gallery27Carousel = dynamic(
  () => import("./Gallery27Carousel").then((m) => ({ default: m.Gallery27Carousel })),
  { ssr: false }
);

interface Gallery27ClientProps {
  members: TeamMember[];
  className?: string;
}

export function Gallery27Client({ members, className }: Gallery27ClientProps) {
  return <Gallery27Carousel members={members} className={className} />;
}
