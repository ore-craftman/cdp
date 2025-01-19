import "@/app/ui/global.css";
import type { Metadata } from "next";
import QueryProvider from "./lib/query-provider";

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
      <body className={` antialiased`}>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
