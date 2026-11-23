import { getProductDetails } from "@/services/product.services";
import { ProductDetailsI } from "@/types/productDetails.type";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  House,
  RotateCcw,
  Share2,
  ShieldCheck,
  Star,
  Truck,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ProductSlider from "@/components/products/ProductSlider";
import ProductPurchaseActions from "@/components/products/ProductPurchaseActions";
import AddToWishlistDetailBtn from "@/components/products/AddToWishlistDetailBtn";

type ProductDetailsPageProps = {
  params: Promise<{ id: string }>;
};
export default async function page({
  params,
}: ProductDetailsPageProps) {
  const { id } = await params;
  const response = await getProductDetails(id);
  const products: ProductDetailsI = response.data;

  return (
    <>
      <nav className="py-4">
        <div className="container mx-auto px-4">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink
                  className="flex items-center gap-1 hover:text-green-600"
                  href="/"
                >
                  <House size={16} strokeWidth={2.25} /> Home
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink
                  className="hover:text-green-600"
                  href="/products"
                >
                  Products
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink
                  className="hover:text-green-600"
                  href="/products"
                >
                  {products.category.name}
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-gray-900 font-medium truncate max-w-xs">
                  {products.title}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </nav>
      <section className="py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="carosole lg:w-1/4">
              <div className="rounded-2xl p-4 shadow-sm">
                <ProductSlider images={products.images}/>
              </div>
            </div>
            <div className="details lg:w-3/4">
            <Card className="gap-0 rounded-2xl py-0 shadow-sm">
              <CardContent className="space-y-5 p-5 sm:p-7">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                    {products.category.name}
                  </span>
                  <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                   { products.brand.name}
                  </span>
                </div>

                <div className="space-y-2">
                  <h1 className="font-heading text-2xl font-bold tracking-tight sm:text-3xl">
                   { products.title}
                  </h1>
                  <div className="flex flex-wrap items-center gap-2 text-sm">
                    <div
                      className="flex items-center text-amber-500"
                      aria-label={`${products.ratingsAverage} out of 5 stars`}
                    >
                      {[0, 1, 2, 3, 4].map((star) => (
                        <Star
                          key={star}
                          className={`size-4 ${
                            star < Math.round(products.ratingsAverage)
                              ? "fill-current"
                              : ""
                          }`}
                        />
                      ))}
                    </div>
                    <span className="font-medium">
                      {products.ratingsAverage.toFixed(1)}
                    </span>
                    <span className="text-muted-foreground">
                     ( { products.ratingsQuantity} reviews)
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <p className="font-heading text-3xl font-bold">
                    {products.price} <span className="text-xl">EGP</span>
                  </p>
                </div>

                <div>
                  <span
                    className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium ${
                      products.quantity > 0
                        ? "bg-primary/10 text-primary"
                        : "bg-destructive/10 text-destructive"
                    }`}
                  >
                    <span
                      className={`size-2 rounded-full ${
                        products.quantity > 0 ? "bg-primary" : "bg-destructive"
                      }`}
                    />
                    {products.quantity > 0 ? "In Stock" : "Out of Stock"}
                  </span>
                </div>

               <div className="border-t border-gray-100 pt-5 mb-6">
                <p className="text-gray-600 text-lg ">
                  {products.description}
                </p>
               </div>

                {/* static part */}

                <ProductPurchaseActions products={products}/>

                <div className="flex gap-3">
                 <AddToWishlistDetailBtn productId={products._id} />
                  <Button
                    variant="outline"
                    size="icon-lg"
                    className="h-12 w-12"
                    aria-label="Share product"
                  >
                    <Share2 />
                  </Button>
                </div>


                <div className="grid gap-4 border-t border-gray-100 pt-6 sm:grid-cols-3">
                  <div className="flex items-center gap-3">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Truck className="size-5" />
                    </span>
                    <div>
                      <p className="text-sm font-medium">Free Delivery</p>
                      <p className="text-xs text-muted-foreground">
                        Orders over $50
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <RotateCcw className="size-5" />
                    </span>
                    <div>
                      <p className="text-sm font-medium">30 Days Return</p>
                      <p className="text-xs text-muted-foreground">
                        Money back
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <ShieldCheck className="size-5" />
                    </span>
                    <div>
                      <p className="text-sm font-medium">Secure Payment</p>
                      <p className="text-xs text-muted-foreground">
                        100% Protected
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          </div>
        </div>
      </section>
    </>
  );
}
