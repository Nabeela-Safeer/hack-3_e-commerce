// app/product/[slug]/ProductPageClient.tsx (Client Component)
'use client';

import { useState } from "react";
import { FaShoppingCart, FaHeart} from "react-icons/fa";
import { Product } from "../../../../types/products";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Swal from "sweetalert2";
import { addToCart } from "@/app/actions/actions";

interface ProductPageClientProps {
  product: Product;
}

export default function ProductPageClient({ product }: ProductPageClientProps) {
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [isInWishlist, setIsInWishlist] = useState(false);
  

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
  };
//  function add to cart
  const handleAddToCart = (e: React.MouseEvent, product:Product) => {
    e.preventDefault()
    Swal.fire({
      position: "center",
      icon: "success",
      title:`${product.productName} add to cart`,
      timer : 1000,
      showConfirmButton: false
    })
      addToCart(product)
    }

  const handleWishlistToggle = () => {
    setIsInWishlist(!isInWishlist);
    alert(`${product.productName} ${isInWishlist ? "removed from" : "added to"} wishlist!`);
  };


  return (
    <section className="body-font overflow-hidden bg-gray-100 py-12">
      <div className="container px-4 mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap bg-white shadow-lg rounded-lg overflow-hidden">
          {product.image && (
            <div className="w-full lg:w-1/2 p-6">
              <Image
                src={urlFor(product.image).url()}
                alt={product.productName}
                height={500}
                width={500}
                className="w-full h-auto object-cover rounded-lg"
              />
            </div>
          )}
          <div className="w-full lg:w-1/2 p-6">
            <h2 className="text-sm text-gray-500 tracking-widest">PRODUCT DETAILS</h2>
            <h1 className="text-3xl font-bold text-gray-900 mt-2 mb-4">
              {product.productName}
            </h1>

            <div className="border-t border-b border-gray-200 my-6"></div>

            {/* Description */}
            <p className="text-gray-700 leading-relaxed mb-6">
              {product.description}
            </p>

            {/* Colors */}
            <div className="flex items-center mb-6">
              <span className="text-lg font-semibold text-gray-900 mr-4">Color</span>
              <div className="flex space-x-2">
                {["gray", "red", "blue"].map((color) => (
                  <div
                    key={color}
                    className={`w-6 h-6 rounded-full bg-${color}-700 cursor-pointer hover:scale-90 ${
                      selectedColor === color ? "ring-2 ring-offset-2 ring-teal-500" : ""
                    }`}
                    onClick={() => handleColorSelect(color)}
                  ></div>
                ))}
              </div>
            </div>

            {/* border */}
            <div className="border-t border-b border-gray-200 my-6"></div>

            {/* Price and Actions */}
            <div className="flex items-center gap-5 justify-between">
              <span className="text-xl font-bold text-gray-900">
                ${(product.price).toFixed(2)}
              </span>
              <div className="flex space-x-4">
                <button
                  className="flex items-center rounded-full px-6 py-2 bg-teal-900 text-white hover:bg-teal-400 hover:scale-105 transition duration-300"
                  onClick={(e)=>handleAddToCart(e,product )}
                >
                  <FaShoppingCart className="mr-2" />
                  Add to Cart
                </button>
                <button
                  className="flex items-center px-6 py-2 bg-teal-900 text-white rounded-full hover:bg-teal-400 hover:scale-105 transition duration-300"
                  onClick={handleWishlistToggle}
                >
                  <FaHeart className="mr-2" />
                  {isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}