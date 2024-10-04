import { About, Achievements, ContactForm, Footer, Hero, Navbar, Projects } from '@/app/components';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Navbar />
      <div className="container mt-24 mx-auto px-5 py-4">
        <Hero />
        <Achievements />
        <About />
        <Projects />
        <ContactForm />
      </div>
      <Footer />
    </main>
  );
}
