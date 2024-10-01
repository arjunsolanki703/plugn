"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import ProductCard from "./_components/product-card";

async function getProducts() {
  const response = await fetch(
    "https://api.plugn.io/v2/item/items?restaurant_uuid=rest_d7f4f8b8-ebc7-11ea-808a-0673128d0c9c&expand=options,itemImage&page=1"
  );

  const data = await response.json();
  console.log(response, data);

  return data;
}

const Page = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["getProducts"],
    queryFn: getProducts,
  });

  const [open, setOpen] = useState(false);

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex justify-between items-center">
        <h4 className="text-xl sm:text-3xl font-semibold">
          All Products!
        </h4>
        <Button onClick={() => setOpen(true)}>View Cart</Button>
      </div>
      {isLoading && (
        <div className="grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3 gap-4">
          {Array.from({ length: 10 }).map((_, index) => (
            <Skeleton key={index} className="h-[166px] w-full" />
          ))}
        </div>
      )}
      {!isLoading && data && (
        <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {data.map((item: IProduct, index: number) => (
            <ProductCard key={index} {...item} />
          ))}
        </div>
      )}

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle className="mb-4">Your cart</SheetTitle>
          </SheetHeader>
          {data?.map((item: IProduct, index: number) => (
            <ProductCard
              key={`cart-${index}`}
              {...item}
              isCart={true}
            />
          ))}
        </SheetContent>
      </Sheet>
    </main>
  );
};

export default Page;
