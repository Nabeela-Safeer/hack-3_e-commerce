'use client'

import { useEffect, useState } from 'react'
import { Product } from '../../../types/products'
import { getCardItems } from '../actions/actions'
import Link from 'next/link'
import { client } from '@/sanity/lib/client'

export default function CheckOutPage () {
  const [cartItems, setCartItems] = useState<Product[]>([])
  const [discount, setDiscount] = useState<number>(0)
  const [formValues, setFormValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    zipCode: '',
    city: '',
  })
  const [formErrors, setFormErrors] = useState({
    firstName: false,
    lastName: false,
    email: false,
    phone: false,
    address: false,
    zipCode: false,
    city: false,
  })

  useEffect(() => {
    setCartItems(getCardItems())
    const appliedDiscount = localStorage.getItem('appliedDiscount')
    if (appliedDiscount) {
      setDiscount(Number(appliedDiscount))
    }
  }, [])

  const subTotal = cartItems.reduce((total, item) => total + item.price * item.inventory, 0)
  const total = subTotal - discount

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({
      ...formValues,
      [e.target.id]: e.target.value,
    })
  }

  const validateForm = () => {
    const errors = {
      firstName: !formValues.firstName,
      lastName: !formValues.lastName,
      email: !formValues.email,
      phone: !formValues.phone,
      address: !formValues.address,
      zipCode: !formValues.zipCode,
      city: !formValues.city,
    }
    setFormErrors(errors)
    return Object.values(errors).every((error) => !error)
  }

  const handlePlaceOrder = async () => {
    if (validateForm()) {
      localStorage.removeItem('appliedDiscount')
      alert('Order placed successfully!')
    };
    const orderData ={
        _type: "order",
        firstName: formValues.firstName,
        lastName: formValues.lastName,
        address: formValues.address,
        city: formValues.city,
        zipcode: formValues.zipCode,
        email: formValues.email,
        cartItems:cartItems.map(item => ({
            _type:"reference",
            _ref: item._id
        })),
        total: total,
        discount: discount,
        orderDate: new Date().toISOString
    };
    try {
        await client.create(orderData)
        localStorage.removeItem("appliedDiscount")
    } catch(error){
        console.error("error creating order", error)
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
          <Link href="/cart" className="hover:text-teal-700">
            Cart
          </Link>
          <span>/</span>
          <span className="text-gray-900">Checkout</span>
        </nav>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Shipping Details</h2>
            <form className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    value={formValues.firstName}
                    onChange={handleInputChange}
                    className={`mt-1 block w-full px-4 py-2 border ${
                      formErrors.firstName ? 'border-red-500' : 'border-gray-300'
                    } rounded-lg shadow-sm focus:ring-teal-500 focus:border-teal-500`}
                  />
                  {formErrors.firstName && (
                    <p className="text-sm text-red-500 mt-1">First Name is required</p>
                  )}
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    value={formValues.lastName}
                    onChange={handleInputChange}
                    className={`mt-1 block w-full px-4 py-2 border ${
                      formErrors.lastName ? 'border-red-500' : 'border-gray-300'
                    } rounded-lg shadow-sm focus:ring-teal-500 focus:border-teal-500`}
                  />
                  {formErrors.lastName && (
                    <p className="text-sm text-red-500 mt-1">Last Name is required</p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formValues.email}
                  onChange={handleInputChange}
                  className={`mt-1 block w-full px-4 py-2 border ${
                    formErrors.email ? 'border-red-500' : 'border-gray-300'
                  } rounded-lg shadow-sm focus:ring-teal-500 focus:border-teal-500`}
                />
                {formErrors.email && (
                  <p className="text-sm text-red-500 mt-1">Email is required</p>
                )}
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={formValues.phone}
                  onChange={handleInputChange}
                  className={`mt-1 block w-full px-4 py-2 border ${
                    formErrors.phone ? 'border-red-500' : 'border-gray-300'
                  } rounded-lg shadow-sm focus:ring-teal-500 focus:border-teal-500`}
                />
                {formErrors.phone && (
                  <p className="text-sm text-red-500 mt-1">Phone is required</p>
                )}
              </div>

              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  value={formValues.address}
                  onChange={handleInputChange}
                  className={`mt-1 block w-full px-4 py-2 border ${
                    formErrors.address ? 'border-red-500' : 'border-gray-300'
                  } rounded-lg shadow-sm focus:ring-teal-500 focus:border-teal-500`}
                />
                {formErrors.address && (
                  <p className="text-sm text-red-500 mt-1">Address is required</p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700">
                    ZIP Code
                  </label>
                  <input
                    type="text"
                    id="zipCode"
                    value={formValues.zipCode}
                    onChange={handleInputChange}
                    className={`mt-1 block w-full px-4 py-2 border ${
                      formErrors.zipCode ? 'border-red-500' : 'border-gray-300'
                    } rounded-lg shadow-sm focus:ring-teal-500 focus:border-teal-500`}
                  />
                  {formErrors.zipCode && (
                    <p className="text-sm text-red-500 mt-1">ZIP Code is required</p>
                  )}
                </div>
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                    City
                  </label>
                  <input
                    type="text"
                    id="city"
                    value={formValues.city}
                    onChange={handleInputChange}
                    className={`mt-1 block w-full px-4 py-2 border ${
                      formErrors.city ? 'border-red-500' : 'border-gray-300'
                    } rounded-lg shadow-sm focus:ring-teal-500 focus:border-teal-500`}
                  />
                  {formErrors.city && (
                    <p className="text-sm text-red-500 mt-1">City is required</p>
                  )}
                </div>
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>

            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-700">Subtotal</span>
                <span className="text-gray-900">Rs {subTotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-700">Discount</span>
                <span className="text-gray-900">- Rs {discount.toFixed(2)}</span>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between">
                  <span className="text-lg font-bold text-gray-900">Total</span>
                  <span className="text-lg font-bold text-gray-900">Rs {total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <button
              onClick={handlePlaceOrder}
              className="mt-6 w-full bg-teal-900 text-white py-3 rounded-lg hover:bg-teal-700 transition-colors"
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}