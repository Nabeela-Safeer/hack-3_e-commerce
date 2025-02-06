// app/product/[slug]/page.tsx (Server Component)
import { Product } from "../../../../types/products";
import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";
import ProductPageClient from "./ProductPageClient";


async function getProduct(slug: string): Promise<Product | null> {
  return client.fetch(
    groq`*[_type == "product" && slug.current == $slug][0]{
      _id,
      name,
      _type,
      image,
      originalPrice,
      seatingCapacity,
      fuelCapacity,
      pricePerDay,
      description,
      productName,
      price
    }`,
    { slug }
  );
}

// ✅ Explicitly Define `params` as an Object, NOT a Promise
export default async function ProductPage({
  params,
}: { params: { slug: string } }) {
  if (!params?.slug) {
    return <div>Product not found</div>;
  }

  const product = await getProduct(params.slug);
  if (!product) {
    return <div>Product not found</div>;
  }
  return <ProductPageClient product={product} />;
}