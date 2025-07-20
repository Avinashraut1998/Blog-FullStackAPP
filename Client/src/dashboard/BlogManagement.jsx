import React, { useState } from 'react'
import { Description, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { FaX } from "react-icons/fa6";

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
            <div className="fixed inset-0 flex w-screen items-center justify-center p-1">
              <DialogPanel className="w-3/4 h-3/4 space-y-4 border bg-white p-6">
                 <div className="flex justify-between">
                 <DialogTitle className="font-bold text-2xl">Add Blog </DialogTitle>
                 <span>
                 <FaX className='cursor-pointer' onClick={() => setIsOpen(false)}/>
                 </span>
                 </div>
                
                
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