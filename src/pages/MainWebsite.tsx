import React from 'react';
import { Header, Hero, Services, About, Contact, Footer } from '../components/website';

export default function MainWebsite() {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <Services />
      <About />
      <Contact />
      <Footer />
    </div>
  );
}