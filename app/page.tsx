import { SiteNav } from "@/components/sections/nav";
import { Hero } from "@/components/sections/hero";
import { Credibility } from "@/components/sections/credibility";
import { Problem } from "@/components/sections/problem";
import { Process } from "@/components/sections/process";
import { Work } from "@/components/sections/work";
import { Technical } from "@/components/sections/technical";
import { About } from "@/components/sections/about";
import { FAQ } from "@/components/sections/faq";
import { Apply } from "@/components/sections/apply";
import { SiteFooter } from "@/components/sections/footer";

export default function Page() {
  return (
    <>
      <SiteNav />
      <main id="main">
        <Hero />
        <Credibility />
        <Problem />
        <Process />
        <Work />
        <Technical />
        <About />
        <FAQ />
        <Apply />
      </main>
      <SiteFooter />
    </>
  );
}
