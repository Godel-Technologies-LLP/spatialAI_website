import Layout from "../components/layout/Layout";
import { Hero, CTA } from "../components/features/home/HomeHero";
import { Metrics, Expertise } from "../components/features/home/HomeSections";
import { ExplorationHub } from "../components/features/home/ExplorationHub";

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
