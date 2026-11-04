import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../components/ui/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { SITE } from "@/lib/site";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { AuthToast } from "@/components/auth/auth-toast";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: { default: `${SITE.name} | ${SITE.tagline}`, template: `%s | ${SITE.name}` },
  description: SITE.description,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} min-h-screen antialiased`}>
<ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
  <Navbar />
  <main>{children}</main>
  <Footer />
<Toaster richColors position="top-center" />
<AuthToast />
</ThemeProvider>
      </body>
    </html>
  );
}