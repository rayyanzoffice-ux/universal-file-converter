import { Check, Clipboard, Download, Moon, Sun } from 'lucide-react'
import { useState } from 'react'
import { downloadBlob } from '../utils/download'

export function CopyButton({ value }: { value: string }) { const [copied,setCopied]=useState(false); return <button className="btn-secondary" disabled={!value} onClick={async()=>{await navigator.clipboard.writeText(value);setCopied(true);setTimeout(()=>setCopied(false),1600)}}>{copied?<Check size={16}/>:<Clipboard size={16}/>} {copied?'Copied':'Copy'}</button> }
export function DownloadButton({ value, mime, extension, blob }: { value?: string; mime?: string; extension: string; blob?: Blob }) { return <button className="btn-primary" disabled={!value&&!blob} onClick={()=>downloadBlob(blob || new Blob([value!],{type:mime}),`converted.${extension}`)}><Download size={16}/> Download</button> }
export function ThemeToggle({ dark, onToggle }: { dark:boolean; onToggle:()=>void }) { return <button aria-label="Toggle theme" className="icon-btn" onClick={onToggle}>{dark?<Sun size={19}/>:<Moon size={19}/>}</button> }
