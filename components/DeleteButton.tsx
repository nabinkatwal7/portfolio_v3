'use client'

import { useTransition } from 'react'

interface DeleteButtonProps {
  id: string
  title: string
  deleteAction: (formData: FormData) => Promise<void>
  className?: string
  children?: React.ReactNode
}

export default function DeleteButton({ 
  id, 
  title, 
  deleteAction, 
  className = '',
  children = 'Delete'
}: DeleteButtonProps) {
  const [isPending, startTransition] = useTransition()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    if (!confirm(`Are you sure you want to delete "${title}"? This action cannot be undone.`)) {
      return
    }

    const formData = new FormData()
    formData.append('id', id)
    
    startTransition(async () => {
      await deleteAction(formData)
    })
  }

  return (
    <form onSubmit={handleSubmit} className="inline">
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        disabled={isPending}
        className={`${className} ${isPending ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {isPending ? 'Deleting...' : children}
      </button>
    </form>
  )
}
