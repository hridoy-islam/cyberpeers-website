import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Cyberpeers - London Based Digital Agency",
  description: "Get in touch with Cyberpeers for your next web project. Located in Barking, UK. Phone: +44 020 8090 4806.",
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}