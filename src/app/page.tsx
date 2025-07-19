import Image from "next/image";
import styles from "./page.module.css";
import AccommodationsCarousel from "./components/accommodations";

export default function Home() {
  return (
    <>
      <section
        style={{
          position: "relative",
          width: "100vw",
          height: "100vh",
          overflow: "hidden",
        }}
      >
        <Image
          src="/file.svg"
          alt="Background"
          fill
          className={styles.fullscreenBg}
          priority
          style={{ objectFit: "cover" }}
        />
        <div className={styles.overlayText}>Laurent & Mathilde</div>
      </section>
      <section
        style={{
          position: "relative",
          zIndex: 2,
          background: "white",
          padding: "48px 0",
        }}
      >
        <AccommodationsCarousel />
      </section>
    </>
  );
}
