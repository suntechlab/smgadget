import { CartContainder, CartList, CartSummary } from "@/components/Cart";
export default function Cart() {
  return (
    <section className="py-12">
      <CartList/>
      <CartSummary/>
    </section>
  );
}
