import { Features } from "@/modules/landing/features";
import { HeroSection } from "@/modules/landing/hero-section";
import { ShowCase } from "@/modules/landing/show-case";
import { SocialProof } from "@/modules/landing/social-proof";

export default function Home() {
  return (
    <>
      <HeroSection />
      <ShowCase />
      <SocialProof />
      <Features />
    </>
  );
}
