import { homeSections } from "@/data/navigation";
import { FlowRail } from "@/components/layout/FlowRail";
import { Hero } from "@/components/home/Hero";
import { Offers } from "@/components/home/Offers";
import { Tools } from "@/components/home/Tools";
import { Maintenance } from "@/components/home/Maintenance";
import { Ownership } from "@/components/home/Ownership";
import { Method } from "@/components/home/Method";
import { RealisationsPreview } from "@/components/home/RealisationsPreview";
import { Products } from "@/components/home/Products";
import { About } from "@/components/home/About";
import { Contact } from "@/components/home/Contact";

export default function HomePage() {
  return (
    <>
      <FlowRail items={homeSections} />
      <Hero />
      <RealisationsPreview />
      <Offers />
      <Tools />
      <Maintenance />
      <Ownership />
      <Method />
      <Products />
      <About />
      <Contact />
    </>
  );
}
