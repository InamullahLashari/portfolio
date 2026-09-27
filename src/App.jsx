import { useState } from "react";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import Experience from "./components/Experience.jsx";
import Skills from "./components/Skills.jsx";
import Education from "./components/Education.jsx";
import Availability from "./components/Availability.jsx";
import Games from "./components/Games/Games.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";
import VisitorGate from "./components/VisitorGate/VisitorGate.jsx";
import { getVisitorName } from "./utils/visitor.js";

import "./components/Navbar.css";
import "./components/Hero.css";
import "./components/About.css";
import "./components/Experience.css";
import "./components/Skills.css";
import "./components/Education.css";
import "./components/Availability.css";
import "./components/Contact.css";
import "./components/Footer.css";

export default function App() {
  const [entered, setEntered] = useState(() => Boolean(getVisitorName()));

  if (!entered) {
    return <VisitorGate onContinue={() => setEntered(true)} />;
  }

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Education />
        <Availability />
        <Games />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
