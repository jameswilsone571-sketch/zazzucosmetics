import { StoreHeader } from "@/components/StoreHeader";
import { StoreFooter } from "@/components/StoreFooter";
import { AccountPanel } from "@/components/AccountPanel";

export const dynamic = "force-dynamic";

export default function AccountPage() {
  return (
    <>
      <StoreHeader />
      <main className="mx-auto max-w-[1240px] px-5 py-14 sm:px-8 lg:px-12">
        <p className="eyebrow">Your space</p>
        <h1 className="display-type serif mt-3">My account</h1>
        <div className="mt-10"><AccountPanel /></div>
      </main>
      <StoreFooter />
    </>
  );
}
