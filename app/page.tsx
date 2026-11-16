import About from "./_components/About";
import Contact from "./_components/Contact";
import Header from "./_components/Header";
import Hero from "./_components/Hero";
import Milestones from "./_components/Milestones";
import MotionProvider from "./_components/MotionProvider";
import Stack from "./_components/Stack";
import Ticker from "./_components/Ticker";
import Work from "./_components/Work";

export default function Home() {
  return (
    <MotionProvider>
      <Header />
      <main>
        <Hero />
        <Ticker />
        <About />
        <Stack />
        <Work />
        <Milestones />
        <Contact />
      </main>
    </MotionProvider>
  );
}
