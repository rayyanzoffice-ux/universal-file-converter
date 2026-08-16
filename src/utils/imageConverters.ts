export type ImageOptions = { format: 'image/jpeg' | 'image/png' | 'image/webp'; width?: number; height?: number; quality?: number }

export async function processImage(file: File, options: ImageOptions): Promise<{ url: string; blob: Blob; width: number; height: number }> {
  if (!file.type.startsWith('image/')) throw new Error('Please choose a valid image file.')
  const bitmap = await createImageBitmap(file)
  const width = options.width || bitmap.width; const height = options.height || bitmap.height
  if (width < 1 || height < 1 || width > 12000 || height > 12000) throw new Error('Dimensions must be between 1 and 12,000 pixels.')
  const canvas = document.createElement('canvas'); canvas.width = width; canvas.height = height
  const context = canvas.getContext('2d'); if (!context) throw new Error('Canvas is not supported by this browser.')
  context.drawImage(bitmap, 0, 0, width, height); bitmap.close()
  const blob = await new Promise<Blob>((resolve, reject) => canvas.toBlob(value => value ? resolve(value) : reject(new Error('Could not convert this image.')), options.format, options.quality ?? .9))
  return { url: URL.createObjectURL(blob), blob, width, height }
}
