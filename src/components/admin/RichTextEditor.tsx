'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import TextAlign from '@tiptap/extension-text-align'
import Underline from '@tiptap/extension-underline'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import { useCallback } from 'react'
import styles from './RichTextEditor.module.css'

interface RichTextEditorProps {
  value: string
  onChange: (content: string) => void
  placeholder?: string
  disabled?: boolean
}

export default function RichTextEditor({
  value,
  onChange,
  placeholder = 'Write your article content here...',
  disabled = false,
}: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        codeBlock: false,
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Underline,
      Link.configure({
        openOnClick: false,
      }),
      Image.configure({
        allowBase64: true,
      }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
    editable: !disabled,
    immediatelyRender: false,
  })

  const addLink = useCallback(() => {
    const url = prompt('Enter the URL:')
    if (url) {
      editor?.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
    }
  }, [editor])

  const addImage = useCallback(() => {
    const url = prompt('Enter the image URL:')
    if (url) {
      editor?.chain().focus().setImage({ src: url }).run()
    }
  }, [editor])

  if (!editor) {
    return null
  }

  return (
    <div className={styles.editorContainer}>
      <div className={styles.toolbar}>
        {/* Text Formatting */}
        <div className={styles.toolGroup}>
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            disabled={disabled}
            className={`${styles.toolButton} ${editor.isActive('bold') ? styles.active : ''}`}
            title="Bold (Ctrl+B)"
          >
            <strong>B</strong>
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            disabled={disabled}
            className={`${styles.toolButton} ${editor.isActive('italic') ? styles.active : ''}`}
            title="Italic (Ctrl+I)"
          >
            <em>I</em>
          </button>
          <button
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            disabled={disabled}
            className={`${styles.toolButton} ${editor.isActive('underline') ? styles.active : ''}`}
            title="Underline (Ctrl+U)"
          >
            <u>U</u>
          </button>
          <button
            onClick={() => editor.chain().focus().toggleStrike().run()}
            disabled={disabled}
            className={`${styles.toolButton} ${editor.isActive('strike') ? styles.active : ''}`}
            title="Strikethrough"
          >
            <s>S</s>
          </button>
        </div>

        <div className={styles.divider}></div>

        {/* Headings */}
        <div className={styles.toolGroup}>
          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            disabled={disabled}
            className={`${styles.toolButton} ${editor.isActive('heading', { level: 1 }) ? styles.active : ''}`}
            title="Heading 1"
          >
            H1
          </button>
          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            disabled={disabled}
            className={`${styles.toolButton} ${editor.isActive('heading', { level: 2 }) ? styles.active : ''}`}
            title="Heading 2"
          >
            H2
          </button>
          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            disabled={disabled}
            className={`${styles.toolButton} ${editor.isActive('heading', { level: 3 }) ? styles.active : ''}`}
            title="Heading 3"
          >
            H3
          </button>
        </div>

        <div className={styles.divider}></div>

        {/* Lists */}
        <div className={styles.toolGroup}>
          <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            disabled={disabled}
            className={`${styles.toolButton} ${editor.isActive('bulletList') ? styles.active : ''}`}
            title="Bullet List"
          >
            •
          </button>
          <button
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            disabled={disabled}
            className={`${styles.toolButton} ${editor.isActive('orderedList') ? styles.active : ''}`}
            title="Ordered List"
          >
            1.
          </button>
        </div>

        <div className={styles.divider}></div>

        {/* Alignment */}
        <div className={styles.toolGroup}>
          <button
            onClick={() => editor.chain().focus().setTextAlign('left').run()}
            disabled={disabled}
            className={`${styles.toolButton} ${editor.isActive({ textAlign: 'left' }) ? styles.active : ''}`}
            title="Align Left"
          >
            ◀
          </button>
          <button
            onClick={() => editor.chain().focus().setTextAlign('center').run()}
            disabled={disabled}
            className={`${styles.toolButton} ${editor.isActive({ textAlign: 'center' }) ? styles.active : ''}`}
            title="Align Center"
          >
            ▬
          </button>
          <button
            onClick={() => editor.chain().focus().setTextAlign('right').run()}
            disabled={disabled}
            className={`${styles.toolButton} ${editor.isActive({ textAlign: 'right' }) ? styles.active : ''}`}
            title="Align Right"
          >
            ▶
          </button>
        </div>

        <div className={styles.divider}></div>

        {/* Links and Images */}
        <div className={styles.toolGroup}>
          <button
            onClick={addLink}
            disabled={disabled}
            className={`${styles.toolButton} ${editor.isActive('link') ? styles.active : ''}`}
            title="Add Link"
          >
            🔗
          </button>
          <button
            onClick={addImage}
            disabled={disabled}
            className={styles.toolButton}
            title="Add Image"
          >
            🖼️
          </button>
        </div>

        <div className={styles.divider}></div>

        {/* Code and Quote */}
        <div className={styles.toolGroup}>
          <button
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            disabled={disabled}
            className={`${styles.toolButton} ${editor.isActive('codeBlock') ? styles.active : ''}`}
            title="Code Block"
          >
            &lt;&gt;
          </button>
          <button
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            disabled={disabled}
            className={`${styles.toolButton} ${editor.isActive('blockquote') ? styles.active : ''}`}
            title="Quote"
          >
            "
          </button>
        </div>

        <div className={styles.divider}></div>

        {/* Undo/Redo */}
        <div className={styles.toolGroup}>
          <button
            onClick={() => editor.chain().focus().undo().run()}
            disabled={disabled || !editor.can().undo()}
            className={styles.toolButton}
            title="Undo"
          >
            ↶
          </button>
          <button
            onClick={() => editor.chain().focus().redo().run()}
            disabled={disabled || !editor.can().redo()}
            className={styles.toolButton}
            title="Redo"
          >
            ↷
          </button>
        </div>
      </div>

      <EditorContent editor={editor} className={styles.editor} />
    </div>
  )
}
