"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Product } from "./../../types/products";
import { client } from "@/sanity/lib/client";
import { eight } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import Link from "next/link";

const Recamended = () => {
  const [product, setProduct] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchProduct() {
      const fetchedProduct: Product[] = await client.fetch(eight);
      setProduct(fetchedProduct);
    }
    fetchProduct();
  }, []);

  return (
    <div className="container mx-auto p-5">
         <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
        Our <span className="text-teal-400">Sofas</span> Collection
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {product.map((product) => (
          <div
            key={product._id}
            className="bg-white rounded-lg shadow-md overflow-hidden p-3"
          >
            <div>
              {product.image && (
                <Image
                  src={urlFor(product.image).url()}
                  alt={product.productName}
                  height={400}
                  width={400}
                  loading="lazy"
                  className="w-full h-48 object-cover"
                />
              )}
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold line-clamp-1">{product.productName}</h3>
              <p className="text-gray-600 line-clamp-3">
                {product.description}
              </p>
              <p className="text-lg font-bold mt-2 text-teal-900">${product.price}</p>
              <Link href={`/product/${product.slug.current}`}><button className="mt-4 w-full bg-teal-900 text-white py-2 hover:bg-teal-400 hover:scale-105 transition duration-300 rounded-full">
                Details
              </button></Link>
            </div>
          </div>
        ))}
      </div>
      <Link href={"/sofa"}>
        <div className="flex place-content-center">
          <button className="mt-4 text-lg font-semibold text-teal-900 py-2 hover:text-teal-400 hover:scale-110 duration-300 capitalize">
            view more
          </button>
        </div>
      </Link>
    </div>
  );
};

export default Recamended;
