import { supabase } from './supabaseClient'
import { FILE_STORAGE } from './tables'

// --- 1. Get all files from category folder ---
export async function getAllCategoryFiles() {
  const { data, error } = await supabase.storage.from(FILE_STORAGE).list('category')

  if (error) throw error
  return data
}

// --- 2. Get all files from product folder ---
export async function getAllProductFiles() {
  const { data, error } = await supabase.storage.from(FILE_STORAGE).list('product')

  if (error) throw error
  return data
}

// --- 3. Upload file to category folder ---
export async function uploadCategoryFile(file) {
  const { data, error } = await supabase.storage
    .from(FILE_STORAGE)
    .upload(`category/${file.name}`, file, { upsert: true })

  if (error) throw error
  return data
}

// --- 4. Upload file to product folder ---
export async function uploadProductFile(file) {
  const { data, error } = await supabase.storage
    .from(FILE_STORAGE)
    .upload(`product/${file.name}`, file, { upsert: true })

  if (error) throw error
  return data
}

// --- 5. Delete file from category folder ---
export async function deleteCategoryFile(fileName) {
  const { error } = await supabase.storage.from(FILE_STORAGE).remove([`category/${fileName}`])

  if (error) throw error
  return true
}

// --- 6. Delete file from product folder ---
export async function deleteProductFile(fileName) {
  const { error } = await supabase.storage.from(FILE_STORAGE).remove([`product/${fileName}`])

  if (error) throw error
  return true
}

// --- 7. Get public URL from category folder ---
export function getCategoryFileUrl(fileName) {
  const { data } = supabase.storage.from(FILE_STORAGE).getPublicUrl(`category/${fileName}`)

  return data.publicUrl
}

// --- 8. Get public URL from product folder ---
export function getProductFileUrl(fileName) {
  const { data } = supabase.storage.from(FILE_STORAGE).getPublicUrl(`product/${fileName}`)

  return data.publicUrl
}
