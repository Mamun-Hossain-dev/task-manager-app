import ProtectedLayoutClient from "@/components/Providers/ProtectedLayOut";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ProtectedLayoutClient>{children}</ProtectedLayoutClient>;
}
