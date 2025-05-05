const Footer = () => {
  return (
    <>
     <footer className="bg-white rounded-lg shadow m-4 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-6 flex justify-center items-center">
        <span className="text-sm text-gray-500 dark:text-gray-400 font-mono font-bold">
          © {new Date().getFullYear()} Your Company. All Rights Reserved.
        </span>
      </div>
    </footer>
    </>
  )
}
export default Footer