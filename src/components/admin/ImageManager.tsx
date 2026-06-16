"use client"

import { useState, useRef } from "react"
import { Plus, X, GripVertical, ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface ImageManagerProps {
  images: string[]
  onChange: (images: string[]) => void
  maxImages?: number
}

export function ImageManager({ images, onChange, maxImages = 5 }: ImageManagerProps) {
  const [urlInput, setUrlInput] = useState("")
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const addUrl = () => {
    const url = urlInput.trim()
    if (!url || images.length >= maxImages) return
    if (!images.includes(url)) {
      onChange([...images, url])
    }
    setUrlInput("")
  }

  const addFiles = (files: FileList | null) => {
    if (!files) return
    const remaining = maxImages - images.length
    const newImages: string[] = []
    Array.from(files)
      .slice(0, remaining)
      .forEach((file) => {
        const url = URL.createObjectURL(file)
        newImages.push(url)
      })
    if (newImages.length > 0) {
      onChange([...images, ...newImages])
    }
  }

  const removeImage = (index: number) => {
    const updated = images.filter((_, i) => i !== index)
    onChange(updated)
  }

  const moveImage = (from: number, to: number) => {
    if (to < 0 || to >= images.length) return
    const updated = [...images]
    const [moved] = updated.splice(from, 1)
    updated.splice(to, 0, moved)
    onChange(updated)
  }

  const handleDragStart = (index: number) => setDraggedIndex(index)
  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault()
    if (draggedIndex !== null && draggedIndex !== index) {
      moveImage(draggedIndex, index)
      setDraggedIndex(index)
    }
  }
  const handleDragEnd = () => setDraggedIndex(null)

  return (
    <div className="space-y-3">
      {images.length > 0 && (
        <div className="grid grid-cols-3 gap-3">
          {images.map((url, index) => (
            <div
              key={url + index}
              className="relative group aspect-[16/10] rounded-lg overflow-hidden border border-[var(--color-rule)] bg-[var(--color-paper-2)]"
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDragEnd={handleDragEnd}
            >
              <img
                src={url}
                alt={`Image ${index + 1}`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  ;(e.target as HTMLImageElement).src = ""
                  ;(e.target as HTMLImageElement).style.display = "none"
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center bg-[var(--color-paper-2)]/80 hidden [img[src='']:not([src]) + &]:flex">
                <ImageIcon className="h-6 w-6 text-[var(--color-muted)]" />
              </div>
              <div className="absolute top-1 left-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <GripVertical className="h-4 w-4 text-[var(--color-ink)] drop-shadow cursor-grab" />
              </div>
              <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                  variant="destructive"
                  size="icon"
                  className="h-6 w-6"
                  onClick={(e) => {
                    e.stopPropagation()
                    removeImage(index)
                  }}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
              {index === 0 && (
                <div className="absolute bottom-1 left-1">
                  <span className="text-[10px] font-medium bg-[var(--color-accent)] text-[var(--color-accent-ink)] px-1.5 py-0.5 rounded">
                    Principal
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {images.length < maxImages && (
        <div className="flex gap-2">
          <div className="flex-1 flex gap-2">
            <Input
              placeholder="URL de l'image..."
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addUrl())}
            />
            <Button
              type="button"
              variant="outline"
              onClick={addUrl}
              disabled={!urlInput.trim()}
              className="shrink-0"
            >
              Ajouter
            </Button>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(e) => {
              addFiles(e.target.files)
              e.target.value = ""
            }}
          />
          <Button
            type="button"
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
            className="shrink-0"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      )}

      {images.length >= maxImages && (
        <p className="text-xs text-[var(--color-muted)]">
          Maximum de {maxImages} images atteint
        </p>
      )}
    </div>
  )
}
