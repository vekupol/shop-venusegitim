import { products } from "./data";
import { fmtTRY } from "@/lib/price";
import AddToCartButton from "@/components/AddToCartButton";

export default function ProductsPage() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {products.map(p => (
        <div key={p.id} className="rounded-xl border border-secondary/40 bg-white p-4 shadow-sm">
          <h3 className="text-xl poetsen-one-regular text-primary">{p.name}</h3>
          <div className="text-foreground/80 mb-4">{fmtTRY(p.priceKurus)}</div>
          <AddToCartButton id={p.id} name={p.name} priceKurus={p.priceKurus} />
        </div>
      ))}
    </div>
  );
}
