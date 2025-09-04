import Image from "next/image";
import RSVPForm from "./components/rsvp-form";
import Typography from "@mui/joy/Typography";
import Footer from "./components/footer";
import Accommodations from "./components/accommodations";
import DressCode from "./components/dress-code";
import { IMAGES } from "./constants/images";

export default function Home() {
  return (
    <div style={{ margin: 0, padding: 0 }}>
      <section
        style={{
          position: "relative",
          width: "100vw",
          height: "100vh",
          overflow: "hidden",
          margin: 0,
          padding: 0,
        }}
      >
        <Image
          src={IMAGES.HOME_PICTURE}
          alt="Background"
          fill
          priority
          style={{
            objectFit: "cover",
            objectPosition: "center 40%",
            filter: "grayscale(100%)"
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "var(--color-overlay-light)",
            zIndex: 1,
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "70%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
            zIndex: 2,
            width: "90%",
            maxWidth: "600px",
          }}
        >
          <img
            src={IMAGES.LOGO}
            alt="Laurent & Mathilde"
            style={{
              objectFit: 'contain',
              filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.5))',
              width: '100%',
              height: 'auto',
              maxWidth: '750px',
              maxHeight: '40vh'
            }}
          />
        </div>
      </section>
      <section
        style={{
          position: "relative",
          zIndex: 2,
          background: "var(--color-background-main)",
          padding: "48px 0",
        }}
      >
        <div
          style={{
            maxWidth: 600,
            margin: "0 auto 48px auto",
            textAlign: "center",
          }}
        >
          <Typography
            level="body-lg"
            sx={{ mb: 2 }}
          >
            Nous avons le plaisir de vous inviter à notre mariage qui aura lieu le{" "}
            <Typography component="span" sx={{ fontWeight: 'bold' }}>
              samedi 29 août 2026 à 16h
            </Typography>{" "}
            au{" "}
            <Typography component="span" sx={{ fontWeight: 'bold' }}>
              Chateau de Vins-sur-Caramy, 1 Les Prés du Château, 83170 Vins-sur-Caramy
            </Typography>.
          </Typography>
          <Typography
            level="body-md"
          >
            Merci de confirmer votre présence avant le{" "}
            <Typography component="span" sx={{ fontWeight: 'bold' }}>
              1er Novembre 2025
            </Typography>.<br />
            Nous avons hâte de partager ce moment unique avec vous !
          </Typography>
          <Typography sx={{ mt: 2, fontStyle: 'italic' }}>
            Vous trouverez plus d'informations sur le site : suggestions de logements sur place, dress code et formulaire pour confirmer votre présence.
          </Typography>
        </div>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '32px',
          paddingTop: '32px'
        }}>
          <DressCode />

          <Accommodations />

          <div style={{
            position: 'relative',
            width: '100%',
            height: '950px',
            margin: 0 // Supprimé la marge car gérée par le gap
          }}>
            <img
              src={IMAGES.FORM_BACKGROUND}
              alt="Laurent & Mathilde"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center 70%'
              }}
            />
            <div
              className="form-overlay-desktop"
              style={{
                position: 'absolute',
                top: '0',
                right: '0',
                width: '50%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '20px', // Réduit de 32px à 20px
                boxSizing: 'border-box'
              }}
            >
              <RSVPForm showCard={true} />
            </div>
          </div>

          {/* Formulaire mobile en dessous de la photo */}
          <div
            className="form-mobile"
            style={{
              display: 'none',
              padding: '32px 24px',
              background: 'var(--color-background-main)'
            }}
          >
            <RSVPForm showCard={false} />
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
