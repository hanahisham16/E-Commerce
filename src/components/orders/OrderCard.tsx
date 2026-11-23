
"use client";

import { useState } from "react";
import OrderDetails from "./OrderDetails";
import { OrderI } from "@/types/allOrders.type";

interface OrderCardProps {
  order: OrderI;
  showDetails: boolean;
  onToggle: () => void;
}

export default function OrderCard({
  order,
  showDetails,
  onToggle,
}: OrderCardProps) {

  const status = order.isDelivered
    ? "Delivered"
    : "In Transit";

  const statusColor = order.isDelivered
    ? "bg-blue-100 text-blue-600"
    : "bg-amber-100 text-amber-600";

  const firstProduct = order.cartItems[0]?.product;

  return (
    <article className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md">

      <div className="flex flex-wrap items-center justify-between gap-4 p-5">

        <div className="flex items-center gap-4">

          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl bg-gray-50 p-2">
            {firstProduct?.imageCover && (
              <img
                src={firstProduct.imageCover}
                alt={firstProduct.title}
                className="h-full w-full object-contain"
              />
            )}
          </div>

          <div>
            <span
              className={`mb-2 inline-block rounded-md px-2 py-1 text-xs font-semibold ${statusColor}`}
            >
              {status}
            </span>

            <h3 className="mb-2 font-bold text-gray-900">
              Order #{order._id.slice(-6).toUpperCase()}
            </h3>

            <div className="flex flex-wrap gap-3 text-xs text-gray-500">
              <span>
                {new Date(order.createdAt).toLocaleDateString("en-GB")}
              </span>

              <span>•</span>

              <span>
                {order.paymentMethodType}
              </span>

              <span>•</span>

              <span>
                {order.cartItems.length} Items
              </span>
            </div>

            <p className="mt-3 font-bold text-gray-900">
              {order.totalOrderPrice}{" "}
              <span className="text-xs font-normal text-gray-500">
                EGP
              </span>
            </p>
          </div>
        </div>

        <button onClick={onToggle}>
        {showDetails ? "Hide Details ↑" : "Details ↓"}
      </button>

      </div>

     {showDetails && (
        <OrderDetails order={order} />
      )}
    </article>
  );
}







