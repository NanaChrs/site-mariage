import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div>
      <Image
        src="/file.svg"
        alt="Background"
        fill
        className={styles.fullscreenBg}
        priority
        style={{ objectFit: "cover" }}
      />
      <div className={styles.overlayText}>Laurent & Mathilde</div>
    </div>
  );
}
