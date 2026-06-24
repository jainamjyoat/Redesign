import LithosHero from './components/LithosHero';
import PrismaLanding from './components/PrismaLanding'; // Import your newly generated workspace layout component

export default function Home() {
  return (
    <main style={{ backgroundColor: '#000000', width: '100vw', overflowX: 'hidden' }}>
      <LithosHero />
      <PrismaLanding />
    </main>
  );
}