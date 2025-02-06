'use client'

import React, { useEffect, useState,lazy } from "react"
import { Product } from '../../../types/products'
import { getCardItems, removedFreomCart, updateCartQuantity } from "../actions/actions"
import Swal from "sweetalert2"
import { useRouter } from "next/navigation"
const CartCard= lazy(() => import("@/components/cartCard"));

const CartPage = () => {
  const [cartItems, setCartItems] = useState<Product[]>([])

  useEffect(() => {
    setCartItems(getCardItems())
  }, [])

  const handleRemove = (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this item!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0a4343",
      cancelButtonColor: "#0a4343",
      confirmButtonText: "Yes, remove it!"
    }).then((result) => {
      if (result.isConfirmed) {
        removedFreomCart(id)
        setCartItems(getCardItems())
        Swal.fire("Removed!", "It has been removed.", "success")
      }
    })
  }

  const handleQuantityChange = (id: string, quantity: number) => {
    updateCartQuantity(id, quantity)
    setCartItems(getCardItems())
  }

  const handleIncrement = (id: string) => {
    const product = cartItems.find((item) => item._id === id)
    if (product) handleQuantityChange(id, product.inventory + 1)
  }

  const handleDecrement = (id: string) => {
    const product = cartItems.find((item) => item._id === id)
    if (product && product.inventory > 1) handleQuantityChange(id, product.inventory - 1)
  }

  const calculatedTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.inventory, 0)
  }
const router = useRouter()
  const handleProceed = () => {
    Swal.fire({
      title: "Proceed to checkout?",
      text: "Please review your cart to checkout!",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#0a4343",
      cancelButtonColor: "#0a4343",
      confirmButtonText: "Yes, proceed!"
    }).then((result) => {
      if (result.isConfirmed) {
        setCartItems([])
        Swal.fire("Success!", "Your order has been successfully processed.", "success")
        router.push("/checkout")
      }
    })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Cart</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <CartCard
                key={item._id}
                item={item}
                onRemove={() => handleRemove(item._id)}
                onIncrement={() => handleIncrement(item._id)}
                onDecrement={() => handleDecrement(item._id)}
              />
            ))
          ) : (
            <div className="text-center text-gray-600">Your cart is empty.</div>
          )}
        </div>

        {/* Order Summary */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>

          {/* Pricing Details */}
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-700">Subtotal</span>
              <span className="text-gray-900">Rs {calculatedTotal().toFixed(2)}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-700">Delivery Charges</span>
              <span className="text-gray-900">TBD</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-700">Sales Tax</span>
              <span className="text-gray-900">TBD</span>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <div className="flex justify-between">
                <span className="text-lg font-bold text-gray-900">Estimated Total</span>
                <span className="text-lg font-bold text-gray-900">
                  Rs {calculatedTotal().toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {/* Checkout Button */}
          <button
            onClick={handleProceed}
            className="mt-6 w-full bg-teal-900 text-white py-3 rounded-lg hover:bg-teal-700 transition-colors"
          >
            Proceed to Checkout
          </button>

          {/* Note */}
          <p className="mt-4 text-sm text-gray-500 text-center">
            Delivery charges and sales tax will be calculated on the checkout page.
          </p>
        </div>
      </div>
    </div>
  )
}

export default CartPage
