import Layout from "../components/layout/Layout";
import { Hero, CTA } from "../components/shared/home/HomeHero";
import { Metrics, Expertise } from "../components/shared/home/HomeSections";
import { ExplorationHub } from "../components/shared/home/ExplorationHub";

export default function Home() {
  return (
    <Layout showDotGrid={false}>
      <main>
        <Hero />
        <Metrics />
        <Expertise />
        <ExplorationHub />
        <CTA />
      </main>
    </Layout>
  );
}
