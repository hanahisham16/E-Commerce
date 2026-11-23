"use client";

import { type LucideIcon } from "lucide-react";
import Link from "next/link";
import React, { type ComponentProps } from "react";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

export const NavMenu = (props: ComponentProps<typeof NavigationMenu>) => (
  <NavigationMenu className="mx-auto" {...props}>
    <NavigationMenuList className="data-[orientation=vertical]:-ms-2 data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-start data-[orientation=vertical]:justify-start">
      <NavigationMenuItem>
        <Button
          className="text-gray-700 hover:text-emerald-600 font-medium transition-colors"
          asChild
          variant="ghost"
        >
          <Link href="/">Home</Link>
        </Button>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <Button
          className="text-gray-700 hover:text-emerald-600 font-medium transition-colors"
          asChild
          variant="ghost"
        >
          <Link href="/products">Products</Link>
        </Button>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <NavigationMenuTrigger className="text-gray-700 hover:text-emerald-600 font-medium transition-colors">
          Categories
        </NavigationMenuTrigger>
        <NavigationMenuContent>
          <ul className="grid min-w-[220px] gap-2 p-2">
            <ListItem href="/categories" title="All Categories">
              Browse all categories
            </ListItem>
            <ListItem
              href="/categories/6439d2d167d9aa4ca970649f"
              title="Electronics"
            >
              Phones, laptops & gadgets
            </ListItem>
            <ListItem
              href="/categories/6439d58a0049ad0b52b9003f"
              title="Women's Fashion"
            >
              Clothing, bags & accessories
            </ListItem>
            <ListItem
              href="/categories/6439d5b90049ad0b52b90048"
              title="Men's Fashion"
            >
              Shirts, shoes & wear
            </ListItem>
            <ListItem
              href="/categories/6439d30b67d9aa4ca97064b1"
              title="Beauty & Health"
            >
              Skincare, makeup & care
            </ListItem>
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <Button
          className="text-gray-700 hover:text-emerald-600 font-medium transition-colors"
          asChild
          variant="ghost"
        >
          <Link href="/brands">Brands</Link>
        </Button>
      </NavigationMenuItem>
    </NavigationMenuList>
  </NavigationMenu>
);

const ListItem = React.forwardRef<
  React.ElementRef<typeof Link>,
  React.ComponentPropsWithoutRef<typeof Link> & { icon: LucideIcon }
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          className={cn(
            "select-none min-w-[250] flex-col items-start leading-none no-underline outline-hidden transition block px-4 py-2.5 text-gray-600 hover:text-emerald-600 hover:bg-[#dcfce7] ",
            className,
          )}
          ref={ref}
          {...props}
        >
          <div className="font-medium leading-none">{title}</div>
        </Link>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
