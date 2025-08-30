import type { Metadata } from "next";
import ThemeProvider from "./components/theme-provider";
import "./styles/globals.css";
import "./styles/colors.css";

export const metadata: Metadata = {
  title: "Mathilde & Laurent - Mariage",
  description: "Site de mariage de Laurent & Mathilde - 29 août 2026",
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
