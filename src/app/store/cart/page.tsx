import { StoreHeader } from "@/components/StoreHeader";
import { StoreFooter } from "@/components/StoreFooter";
import { CartPageClient } from "@/components/CartPageClient";

export const dynamic = "force-dynamic";

export default function CartPage() {
  return (<><StoreHeader /><main className="min-h-[70vh]"><CartPageClient /></main><StoreFooter /></>);
}
