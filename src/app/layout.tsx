import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Ameer Suhail | B.Tech IT Student • AI & ML Enthusiast • Full Stack Developer",
  description: "Official portfolio of Ameer Suhail, a 3rd-Year B.Tech Information Technology student at APJ Abdul Kalam Technological University (KTU), India. Showcasing AI-powered software, Machine Learning projects (CareerOS, House Price Prediction), and modern web applications.",
  keywords: [
    "Ameer Suhail",
    "Ameer Suhail Portfolio",
    "Ameer Suhail Developer",
    "AI Developer Portfolio",
    "Machine Learning Portfolio",
    "Full Stack Developer Portfolio",
    "KTU Student Developer",
    "Information Technology India",
    "CareerOS",
    "Activity Point Manager KTU"
  ],
  authors: [{ name: "Ameer Suhail" }],
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
