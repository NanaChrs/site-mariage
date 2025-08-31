import Typography from "@mui/joy/Typography";
import Box from "@mui/joy/Box";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";

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

      <Card
        sx={{
          maxWidth: 600,
          margin: '0 auto',
          textAlign: 'center',
          py: 4,
          px: 3,
          backgroundColor: 'primary.50',
          border: '2px solid',
          borderColor: 'primary.300',
        }}
      >
        <CardContent>
          <Typography level="h3" sx={{ mb: 2 }}>
            🎩 Informations à venir
          </Typography>

          <Typography level="body-md" sx={{ color: 'text.secondary' }}>
            Les détails concernant la tenue recommandée pour notre mariage seront bientôt disponibles.
          </Typography>

          <Typography level="body-sm" sx={{ mt: 2, fontStyle: 'italic', color: 'text.tertiary' }}>
            Cette section sera mise à jour prochainement avec toutes les informations nécessaires.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
