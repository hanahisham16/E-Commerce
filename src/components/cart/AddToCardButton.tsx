"use client";
import { Button } from "@/components/ui/button";
import addProductToCart from "@/actions/cart.actions";
import { Check, Plus } from "lucide-react";
import { toast } from "sonner";
import { useContext, useState } from "react";
import { CartContext } from "@/context/CartContext";
import { useRouter } from "next/navigation";

export default function AddToCardButton({ productId }: { productId: string }) {
  const [isLoading, setIsLoading] = useState(false);
  const {handelCart} = useContext(CartContext)!
  const router = useRouter()
  async function addToCart(id: string) {
    setIsLoading(true);
    try {
      const response = await addProductToCart(productId);

      console.log(response);
      toast.success(response.message);
      handelCart()
    } catch (error:any) {
      console.log(error);
      toast.error(error.message);
      router.push("/login")
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <>
      <Button
        onClick={() => addToCart(productId)}
        className="h-10 w-10 rounded-full flex items-center justify-center transition bg-emerald-600 text-white hover:bg-emerald-700 disabled:opacity-70"
      >
        {isLoading ? (
          <>
            <Check strokeWidth={3} />
          </>
        ) : (
          <Plus strokeWidth={3} />
        )}
        
      </Button>
    </>
  );
}
