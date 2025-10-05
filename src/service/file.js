import { supabase } from './supabaseClient'
import { FILE_STORAGE } from './tables'

const sanitizeFileName = (file) => {
  const originalName = file.name
  const lastDotIndex = originalName.lastIndexOf('.')

  // Split name and extension
  const namePart = lastDotIndex !== -1 ? originalName.slice(0, lastDotIndex) : originalName
  const extension = lastDotIndex !== -1 ? originalName.slice(lastDotIndex) : ''

  // Sanitize name
  const sanitizedName = namePart
    .trim() // Remove leading/trailing spaces
    .replace(/\s+/g, '-') // Replace spaces with dashes
    .replace(/[\/\\?%*:|"<>]/g, '') // Remove unsafe characters

  return sanitizedName + extension
}

export async function getAllFiles(folderName) {
  const { data, error } = await supabase.storage.from(FILE_STORAGE).list(folderName)

  if (error) throw error

  // Map each file to include its public URL
  const filesWithUrls = data
    .filter((file) => file.name !== '.emptyFolderPlaceholder') // skip placeholder
    .map((file) => ({
      ...file,
      publicUrl: supabase.storage.from(FILE_STORAGE).getPublicUrl(`${folderName}/${file.name}`).data
        .publicUrl,
    }))

  return filesWithUrls
}

export async function uploadFile(file, folderName) {
  const { data, error } = await supabase.storage
    .from(FILE_STORAGE)
    .upload(`${folderName}/${sanitizeFileName(file)}`, file, { upsert: true })

  if (error) throw error
  return data
}

export async function deleteFile(fileName, folderName) {
  const { error } = await supabase.storage.from(FILE_STORAGE).remove([`${folderName}/${fileName}`])

  if (error) throw error
  return true
}
