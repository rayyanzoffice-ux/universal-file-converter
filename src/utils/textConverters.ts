import Papa from 'papaparse'
import { marked } from 'marked'

export type ConversionResult = { output: string; mime: string; extension: string }

const result = (output: string, mime = 'text/plain', extension = 'txt'): ConversionResult => ({ output, mime, extension })

export function csvToJson(input: string) {
  const parsed = Papa.parse<Record<string, string>>(input, { header: true, skipEmptyLines: true })
  if (parsed.errors.length) throw new Error(parsed.errors[0].message)
  return result(JSON.stringify(parsed.data, null, 2), 'application/json', 'json')
}

export function jsonToCsv(input: string) {
  const value: unknown = JSON.parse(input)
  const rows = Array.isArray(value) ? value : [value]
  if (!rows.every(row => row && typeof row === 'object' && !Array.isArray(row))) throw new Error('JSON must be an object or an array of objects.')
  return result(Papa.unparse(rows), 'text/csv', 'csv')
}

export function formatJson(input: string, minify = false) {
  return result(JSON.stringify(JSON.parse(input), null, minify ? 0 : 2), 'application/json', 'json')
}

export async function markdownToHtml(input: string) {
  return result(await marked.parse(input), 'text/html', 'html')
}

export type TextCase = 'upper' | 'lower' | 'title' | 'sentence' | 'camel' | 'snake' | 'kebab'
export function convertCase(input: string, mode: TextCase) {
  const words = input.trim().split(/[\s_-]+/).filter(Boolean)
  const lower = words.map(word => word.toLowerCase())
  const cap = (word: string) => word.charAt(0).toUpperCase() + word.slice(1)
  const outputs: Record<TextCase, string> = {
    upper: input.toUpperCase(), lower: input.toLowerCase(), title: lower.map(cap).join(' '),
    sentence: cap(input.toLowerCase()), camel: lower.map((w, i) => i ? cap(w) : w).join(''),
    snake: lower.join('_'), kebab: lower.join('-'),
  }
  return result(outputs[mode])
}

export function base64Convert(input: string, decode = false) {
  try {
    if (decode) return result(new TextDecoder().decode(Uint8Array.from(atob(input.trim()), c => c.charCodeAt(0))))
    const bytes = new TextEncoder().encode(input)
    let binary = ''; bytes.forEach(byte => { binary += String.fromCharCode(byte) })
    return result(btoa(binary))
  } catch { throw new Error(decode ? 'This is not valid Base64 input.' : 'Unable to encode this text.') }
}

export function urlConvert(input: string, decode = false) {
  try { return result(decode ? decodeURIComponent(input) : encodeURIComponent(input)) }
  catch { throw new Error('This is not valid URL-encoded text.') }
}

export function formatXml(xml: string) {
  const parser = new DOMParser(); const doc = parser.parseFromString(xml, 'application/xml')
  const error = doc.querySelector('parsererror'); if (error) throw new Error('Invalid XML: please check tags and attributes.')
  const raw = new XMLSerializer().serializeToString(doc).replace(/>\s*</g, '><')
  let depth = 0
  const lines = raw.replace(/</g, '\n<').trim().split('\n').map(node => {
    if (/^<\//.test(node)) depth = Math.max(0, depth - 1)
    const line = `${'  '.repeat(depth)}${node}`
    if (/^<[^!?/][^>]*[^/]>/i.test(node) && !/<\/[^>]+>$/.test(node)) depth++
    return line
  })
  return result(lines.join('\n'), 'application/xml', 'xml')
}
