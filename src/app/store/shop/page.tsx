import { StoreHeader } from "@/components/StoreHeader";
import { StoreFooter } from "@/components/StoreFooter";
import { ShopClient } from "@/components/ShopClient";

export const dynamic = "force-dynamic";

export default async function ShopPage({ searchParams }: { searchParams: Promise<{ category?: string; sort?: string }> }) {
  const params = await searchParams;
  const category = params.category ?? "";
  const title = category || "Shop All";

  return (
    <>
      <StoreHeader />
      <main>
        <section className="relative flex h-[240px] items-center justify-center overflow-hidden bg-rose-pale sm:h-[300px]">
          <img src="/images/collection-flatlay.jpg" alt="ZAZZU collection" className="img-cover opacity-45" />
          <div className="absolute inset-0 bg-gradient-to-b from-offwhite/40 via-offwhite/30 to-offwhite/70" />
          <div className="relative text-center">
            <p className="eyebrow">The collection</p>
            <h1 className="display-type serif mt-3">{title}</h1>
            <p className="mx-auto mt-3 max-w-md px-5 text-xs text-[#6E5C54] sm:text-sm">Considered colour for lips, eyes, face and cheeks — made for every skin tone.</p>
          </div>
        </section>
        <ShopClient initialCategory={category} initialSort={params.sort} />
      </main>
      <StoreFooter />
    </>
  );
}
