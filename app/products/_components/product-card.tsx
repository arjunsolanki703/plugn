"use client";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { StarFilledIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";
import QuantityInput from "./quantity-input";
import { cn } from "@/lib/utils";

const ProductCard = ({
  item_price,
  item_name,
  itemImage,
  // item_description,
  prep_time_unit,
  prep_time,
  slug,
  compare_at_price,
  isCart = false,
}: { isCart?: boolean } & IProduct) => {
  return (
    <Card className="w-full p-3 shadow-none cursor-pointer hover:shadow overflow-hidden mb-2.5">
      <div className="flex flex-wrap gap-2 lg:gap-2">
        <div className="mx-auto w-28 sm:h-28 overflow-hidden shrink-0">
          <AspectRatio ratio={1} className="h-full p-0">
            <Image
              src={`${process.env.NEXT_PUBLIC_CLOUDNARY_END_POINT!}/${
                itemImage?.product_file_name
              }`}
              fill
              alt="Product"
              className="rounded-md sm:rounded-tl-md sm:rounded-bl-md object-cover h-full"
            />
          </AspectRatio>
        </div>
        <div className="p-3 sm:py-2 sm:px-1 flex flex-col gap-4 flex-1">
          <CardHeader className="p-0">
            <Link href={`/products/${slug}`}>
              <CardTitle className="text-xl">{item_name}</CardTitle>
            </Link>
            <div className="flex h-5 items-center space-x-4 text-sm text-green-500">
              <div
                className={cn(
                  "text-xs",
                  isCart ? "sm:text-sm" : "sm:text-base"
                )}
              >
                50% Off
              </div>
              <Separator
                orientation="vertical"
                className=" bg-green-500 !mx-2"
              />
              <div
                className={cn(
                  "text-xs !mx-0",
                  isCart ? "sm:text-sm" : "sm:text-base"
                )}
              >
                Use Coupon
              </div>
            </div>
            <div className="flex gap-2 items-end">
              <p className="text-xl font-bold">
                ${item_price}
                <span className="text-xs line-through font-normal text-gray-600 ml-2">
                  ${compare_at_price ?? 10000}
                </span>
              </p>
            </div>
          </CardHeader>
        </div>
      </div>
      <CardContent className="px-2 py-2 flex flex-wrap gap-2 justify-between">
        <div className="flex justify-start gap-2 items-center text-xs">
          <div className="flex justify-start items-center">
            <StarFilledIcon width={16} height={16} />
            <p>4.1</p>
          </div>
          <span className="inline-block border-2 rounded-full border-black" />
          <p>
            {prep_time ?? 30} {prep_time_unit ?? "min"}
          </p>
          <span className="inline-block border-2 rounded-full border-black" />
          <div>
            <p>Min Order $4</p>
          </div>
        </div>
        <QuantityInput initialQuantity={0} max={10} min={0} />
      </CardContent>
    </Card>
  );
};

export default ProductCard;
