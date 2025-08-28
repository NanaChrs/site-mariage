import Typography from "@mui/joy/Typography";
import Box from "@mui/joy/Box";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";

export default function ComingSoon({ title, description }: { title: string; description?: string }) {
  return (
    <Box sx={{ mb: 6, px: 3 }}>
      <Typography level="h2" sx={{ mb: 3, textAlign: "center" }}>
        {title}
      </Typography>

      <Card
        sx={{
          maxWidth: 600,
          margin: '0 auto',
          textAlign: 'center',
          py: 4,
          px: 3,
          backgroundColor: 'primary.50',
          border: '2px dashed',
          borderColor: 'primary.300',
        }}
      >
        <CardContent>
          <Typography level="h3" sx={{ mb: 2 }}>
            🚧 Bientôt disponible
          </Typography>

          {description && (
            <Typography level="body-md" sx={{ color: 'text.secondary' }}>
              {description}
            </Typography>
          )}

          <Typography level="body-sm" sx={{ mt: 2, fontStyle: 'italic', color: 'text.tertiary' }}>
            Cette section sera mise à jour prochainement avec toutes les informations nécessaires.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
