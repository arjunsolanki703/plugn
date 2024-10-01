interface IProduct {
  item_uuid: string;
  restaurant_uuid: string;
  item_name: string;
  item_name_ar: string;
  item_description: string;
  item_description_ar: string;
  item_meta_title: string | null;
  item_meta_title_ar: string | null;
  item_meta_description: string | null;
  item_meta_description_ar: string | null;
  sort_number: number;
  item_type: number;
  stock_qty: number;
  track_quantity: boolean;
  item_image: string | null;
  itemImage: {
    item_image_id: number;
    item_uuid: string;
    product_file_name: string;
    sort_number: number;
  } | null;
  item_price: string;
  compare_at_price: string | null;
  item_status: number;
  slug: string;
  prep_time: string | null;
  prep_time_unit: "min" | "hour" | "day" | null;
  weight: number | null;
  length: number | null;
  height: number | null;
  width: number | null;
  shipping: 0 | 1;
}
