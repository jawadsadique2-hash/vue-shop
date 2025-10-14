import { supabase } from './supabaseClient'
import { PRODUCT_TABLE } from './tables'

export async function getAllProducts() {
  const { data, error } = await supabase.from(PRODUCT_TABLE).select('*')

  if (error) throw error
  return data
}

export async function insertProduct(product) {
  const { data, error } = await supabase.from(PRODUCT_TABLE).insert([product])

  if (error) throw error
  return data
}

export async function updateProduct(id,product) {
  const { data, error } = await supabase.from(PRODUCT_TABLE).update([product]).eq('id', id)

  if (error) throw error
  return data
}

export async function deleteProduct(product) {
  const { data, error } = await supabase.from(PRODUCT_TABLE).delete().eq('id', product.id)

  if (error) throw error
  return data
}

export async function getProductDetailBySlug(slug) {
  const { data, error } = await supabase.from(PRODUCT_TABLE).select('*').eq('slug', slug).single()

  if (error) throw error
  return data
}
