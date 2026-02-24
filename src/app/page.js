import dynamic from 'next/dynamic';

import Hero from '../components/Hero';
import About from '../components/About';
import Services from '../components/Services';

const Why = dynamic(() => import('../components/Why'));
const LogosClients = dynamic(() => import('../components/LogosClients'));
const WhyCIS = dynamic(() => import('../components/WhyCIS'));
const Block7 = dynamic(() => import('../components/Block7'));
const Contact = dynamic(() => import('../components/Contact'));
const LogosEnhancer = dynamic(() => import('../components/LogosEnhancer'));
const ContactEnhancer = dynamic(() => import('../components/ContactEnhancer'));

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
