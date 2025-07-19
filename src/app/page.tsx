import Image from "next/image";
import AccommodationsCarousel from "./components/accommodations";
import RSVPForm from "./components/rsvp-form";
import Typography from "@mui/joy/Typography";
import CardCover from "@mui/joy/CardCover";
import CardContent from "@mui/joy/CardContent";
import Card from "@mui/joy/Card";
import Footer from "./components/footer";

export default function Home() {
  return (
    <>
      <Card
        sx={{
          position: "relative",
          width: "100vw",
          height: "100vh",
          overflow: "hidden",
          borderRadius: 0,
        }}
      >
        <CardCover>
          <Image
            src="/file.svg"
            alt="Background"
            fill
            priority
            style={{ objectFit: "cover" }}
          />
        </CardCover>
        <CardCover
          sx={{
            background: "rgba(0,0,0,0.3)",
          }}
        />
        <CardContent
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            color: "white",
            fontSize: "3rem",
            fontWeight: "bold",
            textShadow: "0 2px 8px rgba(0,0,0,0.5)",
            textAlign: "center",
            zIndex: 2,
          }}
        >
          Laurent & Mathilde
        </CardContent>
      </Card>
      <section
        style={{
          position: "relative",
          zIndex: 2,
          background: "white",
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
            Nous avons le plaisir de vous inviter à notre mariage qui aura lieu le <span style={{ fontWeight: 'bold' }}>samedi 29 août 2026 à 16h</span> au <span style={{ fontWeight: 'bold' }}>Chateau de Vins-sur-Caramy, 1 Les Prés du Château, 83170 Vins-sur-Caramy</span>.
          </Typography>
          <Typography
            level="body-md"
          >
            Merci de confirmer votre présence avant le <span style={{ fontWeight: 'bold' }}>1er mars 2026</span>.<br />
            Nous avons hâte de partager ce moment unique avec vous !
          </Typography>
          <Typography sx={{ mt: 2, fontStyle: 'italic' }}>
            Vous trouverez plus d'informations sur le site : suggestions de logements sur place, dress code et formulaire pour confirmer votre présence.
          </Typography>
        </div>
        <AccommodationsCarousel />
        <div style={{ maxWidth: 400, margin: '48px auto 0 auto' }}>
          <RSVPForm />
        </div>
      </section>
      <Footer />
    </>
  );
}
