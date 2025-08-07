'use client'

import { useState } from 'react'
import { Edit, Trash2, Calendar } from 'lucide-react'

interface Note {
  id: string
  title: string
  content: string
  createdAt: string
  updatedAt: string
}

interface NoteCardProps {
  note: Note
  onEdit: (note: Note) => void
  onDelete: (id: string) => void
}

export default function NoteCard({ note, onEdit, onDelete }: NoteCardProps) {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    if (confirm('Tem certeza que deseja deletar esta nota?')) {
      setIsDeleting(true)
      try {
        await onDelete(note.id)
      } catch (error) {
        console.error('Erro ao deletar nota:', error)
      } finally {
        setIsDeleting(false)
      }
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-semibold text-gray-800">{note.title}</h3>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(note)}
            className="p-2 text-blue-500 hover:bg-blue-50 rounded-md transition-colors"
            title="Editar nota"
          >
            <Edit size={16} />
          </button>
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="p-2 text-red-500 hover:bg-red-50 rounded-md transition-colors disabled:opacity-50"
            title="Deletar nota"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
      
      <p className="text-gray-600 mb-4 whitespace-pre-wrap">{note.content}</p>
      
      <div className="flex items-center gap-1 text-sm text-gray-500">
        <Calendar size={14} />
        <span>Criado em: {formatDate(note.createdAt)}</span>
      </div>
    </div>
  )
}
