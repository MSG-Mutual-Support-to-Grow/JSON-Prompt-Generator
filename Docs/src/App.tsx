import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import TechStack from './components/TechStack';
import ProjectStructure from './components/ProjectStructure';
import Installation from './components/Installation';
import ApiEndpoints from './components/ApiEndpoints';
import Examples from './components/Examples';
import FrontendFeatures from './components/FrontendFeatures';
import Development from './components/Development';
import Troubleshooting from './components/Troubleshooting';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <main className="bg-white rounded-t-[40px] relative z-10 -mt-10">
        <Features />
        <TechStack />
        <ProjectStructure />
        <Installation />
        <ApiEndpoints />
        <Examples />
        <FrontendFeatures />
        <Development />
        <Troubleshooting />
      </main>
      <Footer />
    </div>
  );
}

export default App;
