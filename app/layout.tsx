import "@/app/ui/global.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Community Development Programme | Kastina",
  description: "Community Development Programme",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={` antialiased`}>{children}</body>
    </html>
  );
}
