import { Suspense } from 'react'
import { getPublicProducts, getCategories, getBrands } from '@/lib/api'
import CatalogClient from './CatalogClient'

export default async function CatalogPage() {
  const [products, categories, brands] = await Promise.all([
    getPublicProducts(), getCategories(), getBrands(),
  ])
  return (
    <Suspense>
      <CatalogClient products={products} categories={categories} brands={brands} />
    </Suspense>
  )
}
