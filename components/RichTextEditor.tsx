'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import { useEffect, useRef } from 'react'

interface RichTextEditorProps {
  content: string
  onChange: (html: string) => void
  placeholder?: string
  name?: string
  required?: boolean
}

export default function RichTextEditor({
  content,
  onChange,
  placeholder = 'Start writing your post...',
  name = 'content',
  required = false,
}: RichTextEditorProps) {
  const hiddenInputRef = useRef<HTMLInputElement>(null)

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Placeholder.configure({
        placeholder,
      }),
    ],
    content,
    editorProps: {
      attributes: {
        class: 'prose prose-neutral max-w-none focus:outline-none px-4 py-3 min-h-[400px] text-neutral-900',
      },
    },
    onUpdate: ({ editor }) => {
      const html = editor.getHTML()
      onChange(html)
      if (hiddenInputRef.current) {
        hiddenInputRef.current.value = html
      }
    },
  })

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content)
      if (hiddenInputRef.current) {
        hiddenInputRef.current.value = content
      }
    }
  }, [content, editor])

  if (!editor) {
    return null
  }

  return (
    <div className="border border-neutral-300 rounded-lg bg-white focus-within:ring-2 focus-within:ring-primary-500 focus-within:border-transparent">
      {/* Toolbar */}
      <div className="border-b border-neutral-200 p-2 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`px-3 py-1.5 text-sm rounded hover:bg-neutral-100 transition-colors ${
            editor.isActive('bold') ? 'bg-primary-100 text-primary-700' : 'text-neutral-700'
          }`}
        >
          <strong>B</strong>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`px-3 py-1.5 text-sm rounded hover:bg-neutral-100 transition-colors ${
            editor.isActive('italic') ? 'bg-primary-100 text-primary-700' : 'text-neutral-700'
          }`}
        >
          <em>I</em>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={`px-3 py-1.5 text-sm rounded hover:bg-neutral-100 transition-colors ${
            editor.isActive('strike') ? 'bg-primary-100 text-primary-700' : 'text-neutral-700'
          }`}
        >
          <s>S</s>
        </button>
        <div className="w-px bg-neutral-300 mx-1" />
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={`px-3 py-1.5 text-sm rounded hover:bg-neutral-100 transition-colors ${
            editor.isActive('heading', { level: 1 }) ? 'bg-primary-100 text-primary-700' : 'text-neutral-700'
          }`}
        >
          H1
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`px-3 py-1.5 text-sm rounded hover:bg-neutral-100 transition-colors ${
            editor.isActive('heading', { level: 2 }) ? 'bg-primary-100 text-primary-700' : 'text-neutral-700'
          }`}
        >
          H2
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={`px-3 py-1.5 text-sm rounded hover:bg-neutral-100 transition-colors ${
            editor.isActive('heading', { level: 3 }) ? 'bg-primary-100 text-primary-700' : 'text-neutral-700'
          }`}
        >
          H3
        </button>
        <div className="w-px bg-neutral-300 mx-1" />
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`px-3 py-1.5 text-sm rounded hover:bg-neutral-100 transition-colors ${
            editor.isActive('bulletList') ? 'bg-primary-100 text-primary-700' : 'text-neutral-700'
          }`}
        >
          •
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`px-3 py-1.5 text-sm rounded hover:bg-neutral-100 transition-colors ${
            editor.isActive('orderedList') ? 'bg-primary-100 text-primary-700' : 'text-neutral-700'
          }`}
        >
          1.
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`px-3 py-1.5 text-sm rounded hover:bg-neutral-100 transition-colors ${
            editor.isActive('blockquote') ? 'bg-primary-100 text-primary-700' : 'text-neutral-700'
          }`}
        >
          "
        </button>
        <div className="w-px bg-neutral-300 mx-1" />
        <button
          type="button"
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          className="px-3 py-1.5 text-sm rounded hover:bg-neutral-100 transition-colors text-neutral-700"
        >
          ─
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setHardBreak().run()}
          className="px-3 py-1.5 text-sm rounded hover:bg-neutral-100 transition-colors text-neutral-700"
        >
          ↵
        </button>
        <div className="w-px bg-neutral-300 mx-1" />
        <button
          type="button"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          className="px-3 py-1.5 text-sm rounded hover:bg-neutral-100 transition-colors text-neutral-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          ↶
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          className="px-3 py-1.5 text-sm rounded hover:bg-neutral-100 transition-colors text-neutral-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          ↷
        </button>
      </div>

      {/* Editor */}
      <div className="prose prose-neutral max-w-none">
        <EditorContent editor={editor} />
      </div>

      {/* Hidden input for form submission */}
      <input
        ref={hiddenInputRef}
        type="hidden"
        id={`hidden-${name}`}
        name={name}
        defaultValue={content}
        required={required}
      />
    </div>
  )
}
