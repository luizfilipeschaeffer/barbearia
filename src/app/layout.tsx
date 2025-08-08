import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/components/providers/AuthProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Barbearia Admin - Sistema de Gestão Completo",
  description: "Transforme a gestão da sua barbearia com agendamentos online, controle de clientes, equipe e relatórios. Cadastre-se grátis!",
  keywords: "barbearia, agendamento online, gestão de barbearia, sistema barbearia, cadastro barbearia",
  authors: [{ name: "Barbearia Admin" }],
  openGraph: {
    title: "Barbearia Admin - Sistema de Gestão Completo",
    description: "Transforme a gestão da sua barbearia com agendamentos online, controle de clientes, equipe e relatórios.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
