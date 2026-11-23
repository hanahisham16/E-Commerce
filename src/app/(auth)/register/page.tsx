import { ShieldHalf, Star, TruckElectric } from "lucide-react";
import Image from "next/image";
import reviewAuthor from "@/assets/review-author.webp";
import RegisterForm from "@/components/common/RegisterForm";
export default function Register() {
  return (
    <>
      <main className="py-10">
        <div className="container max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 p-4">
          <div>
            <h1 className="text-4xl font-bold text-[#364153]">
              Welcome to <span className="text-emerald-600">FreshCart</span>
            </h1>
            <p className="text-xl mt-2 mb-4 text-[#364153]">
              Join thousands of happy customers who enjoy fresh groceries
              delivered right to their doorstep.
            </p>
            <ul className="*:flex *:text-[#364153] *:items-start *:gap-4 space-y-6 my-8">
              <li>
                <div className="icon size-12 text-lg bg-emerald-200  text-emerald-600 rounded-full flex justify-center items-center">
                  <Star className="fill-emerald-600" />
                </div>
                <div className="">
                  <h2 className="text-lg font-semibold">Premium Quality</h2>
                  <p className="text-gray-600">
                    Premium quality products sourced from trusted suppliers.
                  </p>
                </div>
              </li>
              <li>
                <div className="icon size-12 text-lg bg-emerald-200 text-emerald-600 rounded-full flex justify-center items-center">
                  <TruckElectric />
                </div>
                <div className="">
                  <h2 className="text-lg font-semibold">Fast Delivery</h2>
                  <p className="text-gray-600">
                    Same-day delivery available in most areas
                  </p>
                </div>
              </li>
              <li>
                <div className="icon size-12 text-lg bg-emerald-200 text-emerald-600 rounded-full flex justify-center items-center">
                  <ShieldHalf />
                </div>
                <div className="">
                  <h2 className="text-lg font-semibold">Secure Shopping</h2>
                  <p className="text-gray-600">
                    Your data and payments are completely secure
                  </p>
                </div>
              </li>
            </ul>
            <div className=" bg-white shadow-sm p-4 rounded-md">
              <div className="flex items-center gap-4 mb-4">
                <Image
                  src={reviewAuthor}
                  width={512}
                  height={512}
                  alt="review-auther"
                  className="size-12 rounded-full"
                />
                <div className="text-[#364153]">
                  <h3>Sarah Johnson</h3>
                  <div className="flex  *:fill-yellow-300 *:text-yellow-300">
                     {[0, 1, 2, 3, 4].map(() => {return<><Star size={16}/></>})}
                  </div>
                </div>
              </div>
              <p className="italic text-gray-600">"FreshCart has transformed my shopping experience. The quality of the products is outstanding, and the delivery is always on time. Highly recommend!"</p>
            </div>
          </div>
          <RegisterForm/>
        </div>
      </main>
    </>
  );
}
