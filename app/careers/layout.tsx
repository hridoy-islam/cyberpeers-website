import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Careers | Join the Cyberpeers Team",
  description: "Find your dream job at Cyberpeers. Explore opportunities in Development, Design, and Marketing.",
};

export default function CareerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}