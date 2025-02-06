// src/components/SearchBar.tsx
'use client'

import { useState, useEffect } from 'react'
import { FiSearch } from 'react-icons/fi'

interface SearchBarProps {
  onSearch: (searchTerm: string) => void
  placeholder?: string
}

export default function SearchBar({ 
  onSearch, 
  placeholder = 'Search products...' 
}: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState('')

  // Debounce search input
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onSearch(searchTerm.toLowerCase())
    }, 300)

    return () => clearTimeout(timeoutId)
  }, [searchTerm, onSearch])


  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      <div className="relative">
        <input
          type="text"
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-3 pl-12 text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                     transition-all duration-300"
        />
        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
      </div>
    </div>
  )
}