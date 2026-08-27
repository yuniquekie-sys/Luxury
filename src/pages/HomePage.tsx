import HeroSection from '../components/home/HeroSection';
import RareFewSection from '../components/home/RareFewSection';
import CuratedCollections from '../components/home/CuratedCollections';
import ShowroomSection from '../components/home/ShowroomSection';
import PerformanceStats from '../components/home/PerformanceStats';
import CategoryBrowser from '../components/home/CategoryBrowser';
import ExperienceSection from '../components/home/ExperienceSection';
import CTASection from '../components/home/CTASection';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <RareFewSection />
      <CuratedCollections />
      <ShowroomSection />
      <PerformanceStats />
      <CategoryBrowser />
      <ExperienceSection />
      <CTASection />
    </>
  );
}
