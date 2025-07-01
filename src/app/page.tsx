"use client";
import { useState } from "react";
import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const sections = [
    { id: "hero", label: "Accueil" },
    { id: "planning", label: "Planning" },
    { id: "dresscode", label: "Dress code" },
    { id: "accomodations", label: "Hébergements" },
    { id: "rsvp", label: "RSVP & Contacts" },
  ];

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setMenuOpen(false);
    }
  };

  return (
      <div className={styles.page}>
        {/* Menu mobile */}
        <button
            className={styles.menuButton}
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Ouvrir le menu"
        >
          <span className={styles.menuIcon} />
        </button>

        {menuOpen && (
            <nav className={styles.mobileMenu}>
              <ul>
                {sections.map((s) => (
                    <li key={s.id}>
                      <button onClick={() => scrollToSection(s.id)}>{s.label}</button>
                    </li>
                ))}
              </ul>
            </nav>
        )}

        <main className={styles.main}>
          {/* Hero section */}
          <section id="hero" className={styles.heroSection}>
            <Image
                src="/file.svg"
                alt="Image de couverture"
                fill
                style={{ objectFit: "cover" }}
                priority
            />
            <div className={styles.heroOverlay}>
              <h1>Bienvenue à notre mariage !</h1>
            </div>
          </section>

          {/* Planning */}
          <section id="planning" className={styles.section}>
            <h2>Planning de la cérémonie</h2>
            <ul>
              <li>15h00 : Cérémonie à la mairie</li>
              <li>16h30 : Vin d'honneur</li>
              <li>19h00 : Dîner et soirée</li>
              <li>23h00 : Ouverture du bal</li>
            </ul>
          </section>

          {/* Dress code */}
          <section id="dresscode" className={styles.section}>
            <h2>Dress code</h2>
            <p>Merci de privilégier les couleurs pastel et tenues élégantes.</p>
            <p>Évitez le blanc (réservé à la mariée) et le noir complet.</p>
          </section>

          {/* Hébergements */}
          <section id="accomodations" className={styles.section}>
            <h2>Hébergements à proximité</h2>
            <ul>
              <li>Hôtel du Parc – 5 min à pied – Tel: 01 23 45 67 89</li>
              <li>Chambres d'hôtes Les Fleurs – 10 min en voiture</li>
              <li>Airbnb disponibles dans la région</li>
              <li>Camping municipal – 15 min en voiture</li>
            </ul>
          </section>

          {/* RSVP & Contacts */}
          <section id="rsvp" className={styles.section}>
            <h2>RSVP & Contacts</h2>
            <p>Merci de confirmer votre présence avant le 1er août 2025.</p>
            <p>
              Contact :{" "}
              <a href="mailto:mathilde@example.com">mathilde@example.com</a>
            </p>
            <p>
              Téléphone :{" "}
              <a href="tel:+33123456789">01 23 45 67 89</a>
            </p>
          </section>
        </main>
      </div>
  );
}
