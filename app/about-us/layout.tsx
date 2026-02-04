import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Cyberpeers - Leading Digital Agency",
  description: "Learn about Cyberpeers mission, vision, and the professional team driving digital innovation in London.",
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}