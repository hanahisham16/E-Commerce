"use client";

import Link from "next/link";
import { useContext, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Gift,
  Headset,
  Heart,
  LogOut,
  Mail,
  MapPin,
  Package,
  Phone,
  Search,
  Settings,
  ShoppingCart,
  User,
  UserPlus,
  Van,
} from "lucide-react";
import { Logo } from "./logo";
import { NavMenu } from "./nav-menu";
import { NavigationSheet } from "./navigation-sheet";
import { Spinner } from "../ui/spinner";
import { signOut, useSession } from "next-auth/react";
import { Badge } from "../ui/badge";
import { CartContext } from "@/context/CartContext";
import { WishlistContext } from "@/context/WishlistContext";

type IconName = "cart" | "heart" | "menu" | "search" | "user";

const iconPaths: Record<IconName, string> = {
  cart: "M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2S15.9 22 17 22s2-.9 2-2-.9-2-2-2zM7.16 14.26 6.1 12.32 4.12 5H1V3h4.41l1.64 4H21l-3.29 7.89a3 3 0 0 1-2.77 1.86H9.1a3 3 0 0 1-1.94-.71zM7.87 9l1.15 4h5.92l1.67-4z",
  heart:
    "M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5 18.5 5 20 6.5 20 8.5c0 2.89-3.14 5.74-7.9 10.05z",
  menu: "M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z",
  search:
    "M15.5 14h-.79l-.28-.27a6.5 6.5 0 1 0-.71.71l.27.28v.78l5 4.99L20.49 19l-4.99-5zm-5 0A4.5 4.5 0 1 1 10.5 5a4.5 4.5 0 0 1 0 9z",
  user: "M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z",
};

function IconifyIcon({
  name,
  className = "size-5",
}: {
  name: IconName;
  className?: string;
}) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      data-icon={`material-symbols:${name === "heart" ? "favorite-outline" : name === "cart" ? "shopping-cart-outline" : name}`}
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d={iconPaths[name]} />
    </svg>
  );
}

export default function Navbar() {
  const { noOfCartItems } = useContext(CartContext)!;
  const { noOfWishlistItems } = useContext(WishlistContext)!;
  const session = useSession();

  function signOutUser() {
    signOut({ redirect: true, callbackUrl: "/login" });
  }
  return (
    <header className="w-full border-b bg-background">
      <div className="hidden lg:block text-sm border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-10">
            <div className="flex items-center gap-6 text-gray-500">
              <span className="flex items-center gap-2">
                <Van color="#16A34A" />
                <span>Free Shipping on Orders 500 EGP</span>
              </span>
              <span className="flex items-center gap-2">
                <Gift size={16} color="#16A34A" />
                <span>New Arrivals Daily</span>
              </span>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-4 text-gray-500">
                <a
                  className="flex items-center gap-1.5 hover:text-primary-600 transition-colors"
                  href="tel:+18001234567"
                >
                  <Phone size={16} color="#878787" />
                  <span> +1 (800) 123-4567</span>
                </a>
                <a
                  className="flex items-center gap-1.5 hover:text-primary-600 transition-colors"
                  href="mailto:support@freshcart.com"
                >
                  <Mail color="#878787" />
                  support@freshcart.com
                </a>
              </div>
              <span className="w-px h-4 bg-gray-200"></span>
              <div className="flex items-center gap-4">
                {session.status === "loading" ? (
                  <Spinner />
                ) : session.status === "authenticated" ? (
                  <>
                    <Link
                      className="flex items-center gap-1.5 text-gray-600 hover:text-emerald-600 transition-colors"
                      href="/profile"
                    >
                      <User size={16} />
                      <span>{session.data.user?.name}</span>
                    </Link>

                    <button
                      onClick={signOutUser}
                      className="flex items-center gap-1.5 text-gray-600 hover:text-red-600 transition-colors cursor-pointer"
                    >
                      <LogOut size={16} />
                      <span>Sign Out</span>
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      className="flex items-center gap-1.5 text-gray-600 hover:text-primary-600 transition-colors"
                      href="/login"
                    >
                      <User size={16} color="#878787" />
                      Sign In
                    </Link>
                    <Link
                      className="flex items-center gap-1.5 text-gray-600 hover:text-primary-600 transition-colors"
                      href="/register"
                    >
                      <UserPlus size={16} color="#878787" />
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <nav className="sticky top-0 z-40 bg-white shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 lg:h-[72px] gap-4 lg:gap-8">
            <Logo />

            <form className="relative hidden xl:flex  items-center w-full max-w-2xl bg-white border rounded-full shadow-sm overflow-hidden p-1 focus-within:ring-2 focus-within:ring-emerald-400 transition-all">
              <input
                type="text"
                placeholder="Search for products, brands and more..."
                className="w-full py-2.5 pl-5 pr-14 text-gray-700 bg-transparent outline-none text-sm placeholder-gray-400"
              />

              <button
                type="submit"
                className="absolute right-1 bg-emerald-600 hover:bg-emerald-700 text-white p-2.5 rounded-full transition-colors flex items-center justify-center shadow-md"
              >
                <Search size={16} />
              </button>
            </form>
            <div className="hidden md:flex ">
              <NavMenu />
            </div>
            <div className="flex items-center justify-end gap-3">
              <a className="hidden lg:flex items-center gap-2 pr-3 mr-3 border-r border-gray-200 hover:opacity-80 transition-opacity">
                <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center">
                  <Headset size={16} color="#45B56E" />
                </div>
                <div className="text-xs">
                  <div className="text-gray-400">Support</div>
                  <p className="font-semibold w-14 text-gray-700">24/7 Help</p>
                </div>
              </a>
              <div className="flex items-center gap-2">
                <Link
                  className="relative p-2.5 rounded-full hover:bg-gray-100 transition-colors group flex items-center justify-center"
                  href="/wishlist"
                >
                  {" "}
                  <div className="relative">
                    <Heart className="w-5 h-5 text-gray-500 group-hover:text-emerald-700 transition-colors" />
                    {noOfWishlistItems ? (
                      <>
                        <Badge
                          className="absolute top-[-12] right-[-14]  text-sm p-1"
                          variant="destructive"
                        >
                          {noOfWishlistItems}
                        </Badge>
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                </Link>

                <Link
                  className="relative p-2.5 rounded-full hover:bg-gray-100 transition-colors group flex items-center justify-center"
                  href="/cart"
                >
                  <div className="relative">
                   
                    <ShoppingCart className="w-5 h-5 text-gray-500  group-hover:text-emerald-700 transition-colors" />
                 {noOfCartItems ? <><Badge
                      className="absolute top-[-12] right-[-14]  text-sm p-1"
                      variant="default"
                    >
                      {noOfCartItems}
                    </Badge></> :<></>}   
                  </div>
                </Link>
              </div>

              {session.status === "loading" ? (
                <Spinner />
              ) : session.status === "authenticated" ? (
                <>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        className="relative h-10 w-10 text-gray-500 hover:text-emerald-500 rounded-full"
                      >
                        <User strokeWidth={2.5} className="h-6 w-6" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      className="w-72 rounded-2xl p-2 shadow-lg"
                      align="end"
                    >
                      <div className="flex items-center gap-3 px-3 py-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                          <User className="h-6 w-6" />
                        </div>
                        <div className="flex flex-col space-y-0.5">
                          <p className="text-sm font-bold text-gray-900">
                            {session.data.user?.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {session.data.user?.email}
                          </p>
                        </div>
                      </div>

                      <DropdownMenuSeparator className="my-1" />

                      <DropdownMenuGroup className="space-y-1">
                        <Link href="/profile">
                          {" "}
                          <DropdownMenuItem className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-gray-700 focus:bg-gray-100">
                            <User className="h-4 w-4 text-gray-500" />
                            <span className="font-medium">My Profile</span>
                          </DropdownMenuItem>
                        </Link>
                        <Link href="/allorders">
                          <DropdownMenuItem className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-gray-700 focus:bg-gray-100">
                            <Package className="h-4 w-4 text-gray-500" />
                            <span className="font-medium">My Orders</span>
                          </DropdownMenuItem>{" "}
                        </Link>
                        <Link href="/wishlist">
                          <DropdownMenuItem className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-gray-700 focus:bg-gray-100">
                            <Heart className="h-4 w-4 text-gray-500" />
                            <span className="font-medium">My Wishlist</span>
                          </DropdownMenuItem>
                        </Link>

                        <Link href="/profile">
                          {" "}
                          <DropdownMenuItem className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-gray-700 focus:bg-gray-100">
                            <MapPin className="h-4 w-4 text-gray-500" />
                            <span className="font-medium">Addresses</span>
                          </DropdownMenuItem>
                        </Link>
                        <Link href="/profile">
                          <DropdownMenuItem className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-gray-700 focus:bg-gray-100">
                            <Settings className="h-4 w-4 text-gray-500" />
                            <span className="font-medium">Settings</span>
                          </DropdownMenuItem>
                        </Link>
                      </DropdownMenuGroup>

                      <DropdownMenuSeparator className="my-1" />

                      <DropdownMenuGroup>
                        <DropdownMenuItem
                          onClick={signOutUser}
                          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-red-600 hover:text-red-600"
                        >
                          <LogOut className="h-4 w-4 text-red-600" />
                          <span className="font-medium hover:text-red-600">
                            Sign Out
                          </span>
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </>
              ) : (
                <Link href="/login">
                  <Button className="hidden md:flex items-center gap-2 ml-2 px-5 py-5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold transition-colors shadow-sm shadow-emerald-600/20">
                    <User size={16} />
                    Sign In
                  </Button>
                </Link>
              )}

              <div className="md:hidden">
                <NavigationSheet />
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
