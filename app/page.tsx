import LithosHero from './components/LithosHero';
import PrismaCrowd from './components/PrismaCrowd';
import PrismaLanding from './components/PrismaLanding';

export default function Home() {
  return (
    <main style={{ backgroundColor: '#000000', width: '100vw', overflowX: 'hidden' }}>
      
      {/* Section 1: Cinematic Interactive Spotlight Hero */}
      <LithosHero />

      {/* Section 2:  Editorial About Card & Studio Workflows */}
      <PrismaLanding />

      {/* Section 3 & 4: Grid Standalone Contemporary Crowd Canvas Block*/}
      
      <PrismaCrowd />

    </main>
  );
}