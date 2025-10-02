// src/app/[locale]/page.jsx

import Hero from '../components/Hero';
import About from '../components/About';
import Services from '../components/Services';
import Why from '../components/Why';
import LogosPartners from '../components/LogosPartners';
import LogosClients from '../components/LogosClients';
import WhyCIS from '../components/WhyCIS';
import Block7 from '../components/Block7';
import Contact from '../components/Contact';

import LogosEnhancer from '../components/LogosEnhancer';
import ContactEnhancer from '../components/ContactEnhancer';

export default function Page() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <Why />
      {/* <LogosPartners /> */}
      <LogosClients />
      <WhyCIS />
      <Block7 />
      <Contact />
      <LogosEnhancer />
      <ContactEnhancer />
    </>
  );
}
