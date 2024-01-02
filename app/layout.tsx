
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import Providers from "./providers";
import VisNavbar from "./ui/vis-navbar";
import SsProvider from "./SsProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Visualization Project",
  description: "-",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <SsProvider>
            {<VisNavbar />}
            {children}
          </SsProvider>
        </Providers>
      </body>
    </html>
  );
}
