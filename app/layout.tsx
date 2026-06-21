import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { BottomNav } from "@/components/BottomNav";

export const metadata: Metadata = {
  title: "Vietnamese Chinese Learning App",
  description: "Hoc tieng Trung cho nguoi Viet moi bat dau.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="vi">
      <body>
        <div className="app-shell">
          {children}
          <BottomNav />
        </div>
      </body>
    </html>
  );
}
