'use client'

import { useState } from 'react'
import { Plus, Save, X } from 'lucide-react'

interface NoteFormProps {
  onSubmit: (title: string, content: string) => void
  onCancel?: () => void
  initialTitle?: string
  initialContent?: string
  isEditing?: boolean
}

export default function NoteForm({ 
  onSubmit, 
  onCancel, 
  initialTitle = '', 
  initialContent = '', 
  isEditing = false 
}: NoteFormProps) {
  const [title, setTitle] = useState(initialTitle)
  const [content, setContent] = useState(initialContent)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (title.trim() && content.trim()) {
      onSubmit(title.trim(), content.trim())
      if (!isEditing) {
        setTitle('')
        setContent('')
      }
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Título da nota..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <div className="mb-4">
        <textarea
          placeholder="Conteúdo da nota..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          required
        />
      </div>
      <div className="flex gap-2">
        <button
          type="submit"
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          {isEditing ? <Save size={16} /> : <Plus size={16} />}
          {isEditing ? 'Salvar' : 'Adicionar Nota'}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="flex items-center gap-2 px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
          >
            <X size={16} />
            Cancelar
          </button>
        )}
      </div>
    </form>
  )
}
