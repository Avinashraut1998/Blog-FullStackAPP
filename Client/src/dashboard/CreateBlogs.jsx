import React, { useState } from 'react'

const CreateBlogs = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const handlePublish = () => {
    console.log('Publishing blog:', { title, content, status: 'published' })
    // later: call your API to save as published
  }

  const handleSaveAsDraft = () => {
    console.log('Saving blog as draft:', { title, content, status: 'draft' })
    // later: call your API to save as draft
  }

  const handleCancel = () => {
    console.log('Cancelled')
    setTitle('')
    setContent('')
  }

  return (
    <div className="space-y-4 bg-gray-900 p-6 rounded-md shadow-md">
      {/* Blog Title */}
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-200">
          Blog Title
        </label>
        <input
          id="title"
          name="title"
          type="text"
          placeholder="Enter blog title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 block w-full rounded-md border border-gray-600 bg-gray-800 text-gray-100 p-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
        />
      </div>

      {/* Text Editor Placeholder */}
      <div className="border border-dashed border-gray-600 rounded-md h-60 flex items-center justify-center text-gray-400">
        {/* later replace with text editor */}
        <textarea
          placeholder="Blog content..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="bg-transparent w-full h-full resize-none outline-none text-gray-100 p-2"
        />
      </div>

      <div className="flex justify-end space-x-2">
        <button
          onClick={handlePublish}
          className="bg-green-600 text-white px-4 py-2 rounded shadow hover:bg-green-700 transition"
        >
          Publish
        </button>
        <button
          onClick={handleSaveAsDraft}
          className="bg-yellow-500 text-gray-900 px-4 py-2 rounded shadow hover:bg-yellow-400 transition"
        >
          Save as Draft
        </button>
        <button
          onClick={handleCancel}
          className="bg-gray-700 text-gray-100 px-4 py-2 rounded shadow hover:bg-gray-600 transition"
        >
          Cancel
        </button>
      </div>
    </div>
  )
}

export default CreateBlogs
