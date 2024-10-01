"use client";

import { usePathname } from "next/navigation";
import {
  Bell,
  Home,
  Package,
  Package2,
  ShoppingCart,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
const Aside = () => {
  const pathname = usePathname();

  return (
    <div className="hidden border-r bg-muted/40 md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link
            href="/"
            className="flex items-center gap-2 font-semibold"
          >
            <Package2 className="h-6 w-6" />
            <span className="">Plugn</span>
          </Link>
          <Button
            variant="outline"
            size="icon"
            className="ml-auto h-8 w-8"
          >
            <Bell className="h-4 w-4" />
            <span className="sr-only">Toggle notifications</span>
          </Button>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            <Link
              href="/"
              className={cn(
                "flex items-center gap-3 rounded-lg  px-3 py-2 text-muted-foreground  transition-all hover:text-primary",
                {
                  "text-primary bg-muted": pathname === "/",
                }
              )}
            >
              <Home className="h-4 w-4" />
              Dashboard
            </Link>
            <Link
              href="/store-info"
              className={cn(
                "flex items-center gap-3 rounded-lg  px-3 py-2 text-muted-foreground  transition-all hover:text-primary",
                {
                  "text-primary bg-muted": pathname === "/store-info",
                }
              )}
            >
              <ShoppingCart className="h-4 w-4" />
              Store Info
            </Link>
            <Link
              href="/products"
              className={cn(
                "flex items-center gap-3 rounded-lg  px-3 py-2 text-muted-foreground  transition-all hover:text-primary",
                {
                  "text-primary bg-muted": pathname === "/products",
                }
              )}
            >
              <Package className="h-4 w-4" />
              Products
              <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                5
              </Badge>
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Aside;
