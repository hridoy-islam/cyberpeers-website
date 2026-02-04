import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Services | Cyberpeers",
  description: "Comprehensive digital services including Web Development, SEO, and Digital Marketing in the UK.",
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}