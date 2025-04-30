const Card = ({title, author, image, category}) => {
  return (
    <>
       {/* <div className="border w-50 p-5 m-5"> */}
        <div className=" p-5 m-5 font-mono  bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-300 dark:border-gray-400">
            <div className="rounded-t-lg min-w-full">
                {image}
            </div>
          <h2>{title}</h2>
          <h3>{author}</h3>
          <hr />
           <p>{category.join(" ")}</p>
          </div>
      
    </>
  )
}
export default Card