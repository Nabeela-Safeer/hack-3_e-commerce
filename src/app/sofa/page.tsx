'use client'
import React, { useEffect } from 'react'
import {useState} from 'react';
import Image from 'next/image'
import { Product } from '../../../types/products';
import { client } from '@/sanity/lib/client';
import { allproducts } from '@/sanity/lib/queries';
import { urlFor } from '@/sanity/lib/image';
import SearchBar from "@/components/searchbar";
import Link from 'next/link';

export default function Sofa() {

    const [product, setProduct] = useState<Product[]>([])

    useEffect(() => {
        async function fetchproduct(){
            const fetchedproduct: Product[] = await client.fetch(allproducts)
            setProduct(fetchedproduct)
        }
        fetchproduct()
    },[]);
    function handleSearch(searchTerm: string): void {
      const filteredProducts = product.filter((p) =>
        p.productName.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setProduct(filteredProducts);
    }
    return (
        <div className="container mx-auto px-4 py-10">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
            Our <span className="text-teal-400">SofasSets</span>
          </h2>
          <SearchBar onSearch={handleSearch} />

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {product.map((product) => (
              <div
                key={product._id}
                className="bg-white shadow-lg rounded-lg p-5 hover:shadow-xl transition-shadow duration-300"
              >
                {product.image && (
                  <div>
                    <Image
                      src={urlFor(product.image).url()}
                      alt={product.productName}
                      width={400}
                      height={400}
                      loading="lazy"
                    />
                  </div>
                )}
                <div className="mt-4">
                  <h3 className="text-xl font-semibold text-gray-900 line-clamp-1">
                    {product.productName}
                  </h3>
                  <p className="text-gray-600 mt-2 line-clamp-3">
                    {product.description}
                  </p>
                  <p className="text-lg font-bold text-teal-900 mt-3">
                    ${product.price}
                  </p>
                  <Link href={`/product/${product.slug.current}`}><button className="mt-4 w-full bg-teal-900 text-white py-2 hover:bg-teal-400 hover:scale-105 transition duration-300 rounded-full">
                Details
              </button></Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
}

