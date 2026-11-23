
"use client";

import { LogOut, User, UserPlus } from "lucide-react";
import { Spinner } from "../ui/spinner";
import { signOut, useSession } from "next-auth/react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Headset, Heart, Menu, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Logo } from "@/components/Navbar/logo";
import SearchForm from "../common/SearchForm";

export const NavigationSheet = () => {
  const session = useSession();
  function signOutUser() {
    signOut({ redirect: true, callbackUrl: "/login" });
  }
  return (
    <Sheet>
      <VisuallyHidden>
        <SheetTitle>Navigation Menu</SheetTitle>
      </VisuallyHidden>

      <div className="lg:hidden">
        <SheetTrigger asChild>
          <Button
            size="icon"
            className="ml-1 w-10 h-10 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white hover:text-white flex items-center justify-center transition-colors"
            variant="outline"
          >
            <Menu />
          </Button>
        </SheetTrigger>
      </div>

      <SheetContent>
        <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-gray-50/50">
          <Logo />
        </div>
        <div className="p-4 border-b border-gray-100">
          <SearchForm />
        </div>

        <div className="p-4">
          <div className="space-y-1">
            <Link
              className="flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 transition-colors"
              href="/"
            >
              Home
            </Link>
            <Link
              className="flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 transition-colors"
              href="/products"
            >
              Products
            </Link>
            <Link
              className="flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 transition-colors"
              href="/categories"
            >
              Categories
            </Link>
            <Link
              className="flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 transition-colors"
              href="/brands"
            >
              Brands
            </Link>
          </div>
        </div>
        <div className="mx-4 border-t border-gray-100"></div>
        <div className="p-4 space-y-1">
          <Link
            className="flex items-center justify-between px-4 py-3 rounded-xl hover:bg-emerald-50 transition-colors"
            href="/wishlist"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-red-50 flex items-center justify-center">
                <Heart size={16} color="red" />
              </div>
              <span className="font-medium text-gray-700">Wishlist</span>
            </div>
          </Link>
          <Link
            className="flex items-center justify-between px-4 py-3 rounded-xl hover:bg-emerald-50 transition-colors"
            href="/cart"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-emerald-50 flex items-center justify-center">
                <ShoppingCart size={16} color="#16A34A" />
              </div>
              <span className="font-medium text-gray-700">Cart</span>
            </div>
          </Link>
        </div>
        <div className="mx-4 border-t border-gray-100"></div>
        <div className="p-4 space-y-1">
          {session.status === "loading" ? (
            <Spinner />
          ) : session.status === "authenticated" ? (
            <>
              <Link
                className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-emerald-50 transition-colors"
                href="/profile"
              >
                <div className="w-9 h-9 rounded-full text-gray-700 bg-gray-100 flex items-center justify-center">
                  {" "}
                  <User size={16} />
                </div>
                <span className="font-medium text-gray-700">
                  {session.data.user?.name}
                </span>
              </Link>

              <button
                onClick={signOutUser}
                className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-50 transition-colors w-full text-left"
              >
                <div className="w-9 h-9 rounded-full text-red-600 bg-red-50 flex items-center justify-center">
                  <LogOut size={16} />
                </div>

                <span className="font-medium text-red-600">Sign Out</span>
              </button>
            </>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-3 pt-2">
                <Link
                  className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition-colors"
                  href="/login"
                >
                  Sign In
                </Link>
                <Link
                  className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 border-emerald-600 text-emerald-600 font-semibold hover:bg-emerald-50 transition-colors"
                  href="/register"
                >
                  Sign Up
                </Link>
              </div>
            </>
          )}
        </div>
        <a className="mx-4 mt-2 p-4 rounded-xl bg-gray-50 border border-gray-100 flex items-center gap-3 hover:bg-emerald-50 transition-colors">
          <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
            <Headset size={16} color="#45B56E" />
          </div>
          <div>
            <div className="text-sm font-semibold text-gray-700">
              Need Help?
            </div>
            <p className="text-sm text-emerald-600">Contact Support</p>
          </div>
        </a>
      </SheetContent>
    </Sheet>
  );
};
