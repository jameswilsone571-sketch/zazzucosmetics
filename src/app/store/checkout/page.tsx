import { StoreHeader } from "@/components/StoreHeader";
import { StoreFooter } from "@/components/StoreFooter";
import { CheckoutClient } from "@/components/CheckoutClient";

export const dynamic = "force-dynamic";

export default function CheckoutPage() {
  return (<><StoreHeader /><main className="min-h-[70vh]"><CheckoutClient /></main><StoreFooter /></>);
}
