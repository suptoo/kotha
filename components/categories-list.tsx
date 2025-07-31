import { getCategoriesWithCounts } from "@/lib/supabase"
import Link from "next/link"

export async function CategoriesList() {
  const categories = await getCategoriesWithCounts()

  return (
    <div className="space-y-2">
      {categories.map((category) => (
        <Link
          key={category.name}
          href={`/?category=${category.name}`}
          className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-gray-50 text-gray-700 hover:text-gray-900"
        >
          <span>{category.name}</span>
          <span className="text-sm text-gray-500">({category.count})</span>
        </Link>
      ))}
    </div>
  )
}
