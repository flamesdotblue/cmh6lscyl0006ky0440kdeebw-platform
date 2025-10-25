import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Footer from './components/Footer';
import BackgroundFX from './components/BackgroundFX';

function App() {
  return (
    <div className="bg-black text-zinc-100 min-h-screen font-inter relative">
      <BackgroundFX />
      <Header />
      <main>
        <Hero />
        <Services />
      </main>
      <Footer />
    </div>
  );
}

export default App;
