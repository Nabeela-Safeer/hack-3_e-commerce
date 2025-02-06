// src/components/cartCard.tsx
'use client'

import { FiTrash2, FiMinus, FiPlus } from "react-icons/fi"
import { Product } from "../../types/products"
import { urlFor } from '../sanity/lib/image';
import Image from "next/image";

interface CartCardProps {
  item: Product
  onRemove: () => void
  onIncrement: () => void
  onDecrement: () => void
}

export default function CartCard({ item, onRemove, onIncrement, onDecrement }: CartCardProps) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between bg-white shadow-lg rounded-lg p-4 mb-4">
      <div className="flex items-center space-x-4">
        <Image
          src={urlFor(item.image).url()}
          alt={item.productName}
          height={100}
          width={100}
          loading="lazy"
          className="object-cover rounded-lg"
        />
        <div>
          <h2 className="text-lg font-semibold text-gray-900">{item.productName}</h2>
          <p className="text-gray-700">Rs {item.price.toFixed(2)}</p>
        </div>
      </div>

      <div className="flex items-center space-x-4 mt-4 sm:mt-0">
        <div className="flex items-center space-x-2">
          <button
            onClick={onDecrement}
            className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            title="decrement"
          >
            <FiMinus className="text-gray-700" />
          </button>
          <span className="text-lg font-semibold text-gray-900">{item.inventory}</span>
          <button
            onClick={onIncrement}
            className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            title="increment"
          >
            <FiPlus className="text-gray-700" />
          </button>
        </div>

        <button
          onClick={onRemove}
          className="p-2 bg-red-100 rounded-lg hover:bg-red-200 transition-colors"
          title="remove"
        >
          <FiTrash2 className="text-red-700" />
        </button>
      </div>
    </div>
  )
}