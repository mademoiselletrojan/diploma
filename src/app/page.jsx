"use client";
import { useEffect } from "react";
import { startTextChange } from "../js/titleCards";

import Topbar from '../components/Topbar/Topbar';
import Header from '../components/Header/Header';
import CardSection from '../components/CardSection/CardSection';
import About from '../components/About/About';
import InteractiveCardSection from '../components/InteractiveCardSection/InteractiveCardSection';
import RegistrationInvite from '../components/RegistrationInvite/RegistrationInvite';
import UpFooter from "@/components/UpFooter/UpFooter";
import Footer from "@/components/Footer/Footer";

export default function HomePage() {
  useEffect(() => {
    startTextChange();
  }, []);

  const scrollToAboutMiddle = () => {
    const aboutSection = document.getElementById('about-section');
    if (aboutSection) {
      const sectionTop = aboutSection.getBoundingClientRect().top + window.scrollY;
      const sectionHeight = aboutSection.offsetHeight;
      const middleOffset = sectionTop + sectionHeight / 2 - window.innerHeight / 2;

      window.scrollTo({
        top: middleOffset,
        behavior: 'smooth',
      });
    }
  };

  return (
    <>
      <Topbar />
      <Header />    
      <main className="main p-4">
        <div className="overlay">
          <h1 className="title">Добро пожаловать на платформу обучения иностранным языкам</h1>
          <button className="start-button" onClick={scrollToAboutMiddle}>
            Начать
          </button>
        </div>
      </main>
      <About />
      <div className="sectionCards">
        <div className="flex items-center justify-center mt-[100px] mb-[5px] mx-auto">
          <div className="flex items-center">
            <div className="changing-text"></div>
            <h2 className="text-black text-5xl font-bold">Учи языки эффективно!</h2>
          </div>
        </div>
        <CardSection />
      </div>
      <InteractiveCardSection />
      <RegistrationInvite />
      <UpFooter />
      <Footer />
    </>
  );
}