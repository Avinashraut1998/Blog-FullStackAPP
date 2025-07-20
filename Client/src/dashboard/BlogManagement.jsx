import React, { useState } from 'react'
import { Description, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { FaX } from "react-icons/fa6";
import CreateBlogs from './CreateBlogs';

const BlogManagement = () => {
  let [isOpen, setIsOpen] = useState(false)
  return (
    <div>
      <h1>BlogManagement</h1>
      <div className='flex justify-end'>
        <button
          onClick={() => setIsOpen(true)}
          className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded'>Create Blog</button>
          <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
            <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" aria-hidden="true" />
            <div className="fixed inset-0 flex w-screen items-center justify-center p-1">
              <DialogPanel className="w-3/4 h-3/4 space-y-4 border border-white rounded-2xl bg-gray-900 p-6">
                 <div className="flex justify-between">
                 <DialogTitle className="font-bold text-2xl text-white">Add Blog </DialogTitle>
                 <span>
                 <FaX color='white' className='cursor-pointer' onClick={() => setIsOpen(false)}/>
                 </span>
                 </div>
                 <CreateBlogs  />
              </DialogPanel>
            </div>
          </Dialog>
      </div>
      <div >

      </div>
    </div>
  )
}

export default BlogManagement