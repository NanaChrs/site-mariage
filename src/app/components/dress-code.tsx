import Typography from "@mui/joy/Typography";
import Box from "@mui/joy/Box";
import { IMAGES } from "../constants/images";

export default function DressCode() {
  return (
    <Box sx={{ mb: 6, px: 3 }}>
      <Typography
        level="h2"
        sx={{
          mb: 3,
          textAlign: "center",
          fontFamily: 'hijrnotes, "Times New Roman", Georgia, serif',
          fontSize: { xs: '2rem', sm: '2.5rem' },
          fontWeight: 'normal'
        }}
      >
        Dress code
      </Typography>

      <Box sx={{ maxWidth: 600, margin: '0 auto', textAlign: 'center', py: 2 }}>
        <Typography level="body-lg" sx={{ mb: 3, lineHeight: 1.6 }}>
            Vous êtes déjà magnifiques, mais pour ce grand jour, on vous invite à sortir vos plus belles tenues !
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
          <img
            src={IMAGES.COLOR_PALETTE}
            alt="Palette de couleurs du mariage"
            style={{
              maxWidth: '100%',
              height: 'auto',
            }}
          />
        </Box>
          <Typography level="body-md" sx={{ mb: 3, fontStyle: 'italic' }}>
              Voici nos couleurs… à utiliser seulement si ça vous amuse !
          </Typography>

      </Box>
    </Box>
  );
}
