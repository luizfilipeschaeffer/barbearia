'use client'

import { useState, useEffect } from 'react'
import NoteForm from '@/components/NoteForm'
import NoteCard from '@/components/NoteCard'

interface Note {
  id: string
  title: string
  content: string
  createdAt: string
  updatedAt: string
}

export default function Home() {
  const [notes, setNotes] = useState<Note[]>([])
  const [loading, setLoading] = useState(true)
  const [editingNote, setEditingNote] = useState<Note | null>(null)

  // Carregar notas
  const fetchNotes = async () => {
    try {
      const response = await fetch('/api/notes')
      if (response.ok) {
        const data = await response.json()
        setNotes(data)
      }
    } catch (error) {
      console.error('Erro ao carregar notas:', error)
    } finally {
      setLoading(false)
    }
  }

  // Criar nova nota
  const handleCreateNote = async (title: string, content: string) => {
    try {
      const response = await fetch('/api/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, content }),
      })

      if (response.ok) {
        const newNote = await response.json()
        setNotes([newNote, ...notes])
      }
    } catch (error) {
      console.error('Erro ao criar nota:', error)
    }
  }

  // Atualizar nota
  const handleUpdateNote = async (title: string, content: string) => {
    if (!editingNote) return

    try {
      const response = await fetch(`/api/notes/${editingNote.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, content }),
      })

      if (response.ok) {
        const updatedNote = await response.json()
        setNotes(notes.map(note => 
          note.id === editingNote.id ? updatedNote : note
        ))
        setEditingNote(null)
      }
    } catch (error) {
      console.error('Erro ao atualizar nota:', error)
    }
  }

  // Deletar nota
  const handleDeleteNote = async (id: string) => {
    try {
      const response = await fetch(`/api/notes/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        setNotes(notes.filter(note => note.id !== id))
      }
    } catch (error) {
      console.error('Erro ao deletar nota:', error)
    }
  }

  // Iniciar edição
  const handleEditNote = (note: Note) => {
    setEditingNote(note)
  }

  // Cancelar edição
  const handleCancelEdit = () => {
    setEditingNote(null)
  }

  useEffect(() => {
    fetchNotes()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            📝 App de Notas
          </h1>
          <p className="text-gray-600">
            Gerencie suas notas de forma simples e eficiente
          </p>
        </div>

        {/* Formulário */}
        <NoteForm
          onSubmit={editingNote ? handleUpdateNote : handleCreateNote}
          onCancel={editingNote ? handleCancelEdit : undefined}
          initialTitle={editingNote?.title || ''}
          initialContent={editingNote?.content || ''}
          isEditing={!!editingNote}
        />

        {/* Lista de notas */}
        <div className="space-y-4">
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
              <p className="mt-2 text-gray-600">Carregando notas...</p>
            </div>
          ) : notes.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">Nenhuma nota encontrada. Crie sua primeira nota!</p>
            </div>
          ) : (
            notes.map((note) => (
              <NoteCard
                key={note.id}
                note={note}
                onEdit={handleEditNote}
                onDelete={handleDeleteNote}
              />
            ))
          )}
        </div>
      </div>
    </div>
  )
}
