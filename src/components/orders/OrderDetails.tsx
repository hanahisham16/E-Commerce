
import { OrderI } from "@/types/allOrders.type";
import OrderSummary from "./OrderSummary";

interface OrderDetailsProps {
  order: OrderI;
}

export default function OrderDetails({
  order,
}: OrderDetailsProps) {
  return (
    <div className="border-t border-gray-100 p-5">
      <div className="mb-5">
        <h3 className="mb-4 font-semibold text-gray-800">
          Order Items
        </h3>

        <div className="space-y-3">
          {order.cartItems.map((item) => (
            <div
              key={item._id}
              className="flex items-center justify-between rounded-xl border border-gray-100 p-3"
            >
              <div className="flex items-center gap-3">
                <img
                  src={item.product.imageCover}
                  alt={item.product.title}
                  className="h-14 w-14 rounded-lg object-contain"
                />

                <div>
                  <h4 className="text-sm font-medium text-gray-800">
                    {item.product.title}
                  </h4>

                  <p className="text-xs text-gray-500">
                    {item.count} x {item.price} EGP
                  </p>
                </div>
              </div>

              <span className="text-sm font-semibold">
                {item.count * item.price} EGP
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-gray-100 p-4">
          <h3 className="mb-3 font-semibold text-gray-800">
            Delivery Address
          </h3>

          <p className="mb-2 text-sm text-gray-600">
            {order.shippingAddress?.city}
          </p>

          <p className="mb-2 text-sm text-gray-500">
            {order.shippingAddress?.details}
          </p>

          <p className="text-sm text-gray-500">
            {order.shippingAddress?.phone}
          </p>
        </div>

        <OrderSummary order={order} />
      </div>
    </div>
  );
}
