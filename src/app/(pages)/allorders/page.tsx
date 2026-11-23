



import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";


import OrdersList from "@/components/orders/OrdersList";
import { authOptions } from "@/lib/authOptions";
import { getUserOrders } from "@/actions/allOrders.actions";

export default async function OrdersPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/login");
  }


console.log("SESSION USER:", session?.user);
  const orders = await getUserOrders();

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="mx-auto max-w-5xl">

        <div className="mb-8">
          <p className="mb-2 text-sm text-gray-400">
            Home / My Orders
          </p>

          <h1 className="text-3xl font-bold text-gray-900">
            My Orders
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Track and manage your purchases
          </p>
        </div>

        <OrdersList orders={orders} />

      </div>
    </main>
  );
}
