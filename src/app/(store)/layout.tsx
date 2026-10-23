import { CartProvider } from "@/components/CartProvider";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { TabBar } from "@/components/TabBar";
import dynamic from "next/dynamic";
const CursorGlow = dynamic(() => import("@/components/CursorGlow").then((m) => m.CursorGlow), { ssr: false });
const WelcomePopup = dynamic(() => import("@/components/WelcomePopup").then((m) => m.WelcomePopup), { ssr: false });
import { Tracker } from "@/components/Tracker";
import { getProducts } from "@/lib/queries";

export const revalidate = 60;

export default async function StoreLayout({ children }: { children: React.ReactNode }) {
  const products = await getProducts();
  return (
    <CartProvider products={products}>
      <Tracker />
      <Header />
      <main className="relative z-[2] min-h-[60vh]">{children}</main>
      <Footer />
      <CartDrawer />
      <TabBar />
      <WelcomePopup />
      <CursorGlow />
    </CartProvider>
  );
}
