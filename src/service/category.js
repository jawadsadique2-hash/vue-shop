import { supabase } from './supabaseClient'
import { CATEGORY_TABLE, PRODUCT_TABLE } from './tables'

export async function getAllCategories() {
  const { data, error } = await supabase.from(CATEGORY_TABLE).select('*')

  if (error) throw error
  return data
}

export async function insertCategory(category) {
  const { data, error } = await supabase.from(CATEGORY_TABLE).insert([category])

  if (error) throw error
  return data
}

export async function updateCategory(category) {
  const { data, error } = await supabase.from(CATEGORY_TABLE).update([category])

  if (error) throw error
  return data
}

export async function deleteCategory(category) {
  const { data, error } = await supabase.from(CATEGORY_TABLE).delete().eq('id', category.id)

  if (error) throw error
  return data
}

export async function getCategoryBySlug(slug) {
  const { data, error } = await supabase.from(CATEGORY_TABLE).select('*').eq('slug', slug).single()

  if (error) throw error
  return data
}

export async function getProductByCategoryId(categoryId) {
  const { data, error } = await supabase
    .from(PRODUCT_TABLE)
    .select('*')
    .eq('category', categoryId)

  if (error) throw error
  return data
}
