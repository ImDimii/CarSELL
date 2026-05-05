import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CarSELL | Concessionaria Premium",
  description:
    "Scopri la nostra collezione esclusiva di auto premium. Ogni veicolo è selezionato con cura per offrirti il meglio del mercato automotive.",
  keywords: "auto, concessionaria, premium, vendita auto, Ferrari, Porsche, BMW, Mercedes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it">
      <body className="font-body bg-bg text-text min-h-screen">
        {children}
      </body>
    </html>
  );
}
