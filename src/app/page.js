import Image from 'next/image'
import Footer from '@/components/Footer'
import Head from "next/head";
import NavbarHome from '@/components/NavbarHome'
import Hero from '@/components/Hero';
import SectionTitle from '@/components/SectionTitle';
import Faq from '@/components/faq';
import Benefits from '@/components/benefits';
import { benefitOne, benefitTwo } from '@/components/data';
import "../styles/bg-home.css"

export default function Home() {
  return (
    <main className="home-page flex min-h-screen flex-col items-center justify-between px-16">
      <NavbarHome />
      <Hero />
      <SectionTitle
        title="Why should you use Manage Now">
        Manage Now is a completely free project management platform. 
        The software is highly optimized for managing, monitoring and accelerating project progress.
      </SectionTitle>
      <Benefits data={benefitOne} />
      <Benefits imgPos="right" data={benefitTwo} />
      <SectionTitle title="Frequently Asked Questions">
      </SectionTitle>
      <Faq />
      <Footer />
    </main>
  )
}
