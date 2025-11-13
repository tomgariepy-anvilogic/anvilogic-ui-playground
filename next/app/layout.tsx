import type { Metadata } from "next";
import Header from "@/components/common/Header";
import "./globals.css";

export const metadata: Metadata = {
  title: "Next.js TypeScript Sample App",
  description: "A Next.js app migrated from Vite with TypeScript",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="app">
          <Header />
          <main className="app__main">{children}</main>
        </div>
      </body>
    </html>
  );
}

