import { OrderI } from "@/types/allOrders.type";


interface OrderSummaryProps {
  order: OrderI;
}

export default function OrderSummary({
  order,
}: OrderSummaryProps) {
  const subtotal = order.cartItems.reduce(
    (total, item) => total + item.price * item.count,
    0
  );

  const shipping = Math.max(
    0,
    order.totalOrderPrice - subtotal
  );

  return (
    <div className="rounded-xl bg-amber-50 p-5">
      <h3 className="mb-4 font-semibold text-gray-800">
        Order Summary
      </h3>

      <div className="space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-500">Subtotal</span>
          <span>{subtotal} EGP</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-500">Shipping</span>
          <span>
            {shipping === 0 ? "Free" : `${shipping} EGP`}
          </span>
        </div>

        <div className="flex justify-between border-t border-amber-200 pt-3 font-bold">
          <span>Total</span>
          <span>{order.totalOrderPrice} EGP</span>
        </div>
      </div>
    </div>
  );
}
