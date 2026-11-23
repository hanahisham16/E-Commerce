
"use client";

import { useState } from "react";
import OrderCard from "./OrderCard";
import { OrderI } from "@/types/allOrders.type";

interface OrdersListProps {
  orders?: OrderI[];
}

export default function OrdersList({
   orders = [],
}: OrdersListProps) {
  const [expandedOrder, setExpandedOrder] = useState<string | null>(
    orders[0]?._id ?? null
  );

  if (!orders.length) {
    return (
      <div className="rounded-xl border border-gray-200 py-16 text-center">
        <h3 className="text-lg font-semibold text-gray-800">
          No Orders Found
        </h3>

        <p className="mt-2 text-sm text-gray-500">
          You haven't placed any orders yet.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <OrderCard
          key={order._id}
          order={order}
          showDetails={expandedOrder === order._id}
          onToggle={() =>
            setExpandedOrder((prev) =>
              prev === order._id ? null : order._id
            )
          }
        />
      ))}
    </div>
  );
}
