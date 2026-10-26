import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Zohaib Hassan — Data Engineer",
  description:
    "Zohaib Hassan — Data Engineer specialising in scalable data pipelines, ETL, Snowflake, Power BI, and data visualisation.",
  authors: [{ name: "Zohaib Hassan" }],
  openGraph: {
    title: "Zohaib Hassan — Data Engineer",
    description: "Building reliable data infrastructure that transforms raw information into actionable insights.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#070810",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-[#070810] text-[#dde4f0] antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
