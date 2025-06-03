import Card from "./Card"


const LandingPage = () => {


  // let image = <img src="https://flowbite.com/docs/images/blog/image-1.jpg" alt="" />

  // let category = ["Article", "Blog", "Short-Paragraph", "News-Note"]

  const books = [
    {
      Title: "The Secret Garden",
      Author: "Frances Hodgson Burnett",
      ImageLink: <img className="rounded-t-lg w-75" src="https://flowbite.com/docs/images/blog/image-1.jpg" alt="" />,
      Categories: ["Children", "Classic", "Fiction"]
    },
    {
      Title: "Atomic Habits",
      Author: "James Clear",
      ImageLink: <img className="rounded-t-lg w-75" src="https://flowbite.com/docs/images/blog/image-1.jpg" alt="" />,
      Categories: ["Self-Help", "Productivity", "Psychology"]
    },
    {
      Title: "The Hobbit",
      Author: "J.R.R. Tolkien",
      ImageLink: <img className="rounded-t-lg w-75" src="https://flowbite.com/docs/images/blog/image-1.jpg" alt="" />,
      Categories: ["Fantasy", "Adventure", "Classic"]
    },
    {
      Title: "Thinking, Fast and Slow",
      Author: "Daniel Kahneman",
      ImageLink: <img className="rounded-t-lg w-75" src="https://flowbite.com/docs/images/blog/image-1.jpg" alt="" />,
      Categories: ["Psychology", "Non-fiction", "Business"]
    },
    {
      Title: "To Kill a Mockingbird",
      Author: "Harper Lee",
      ImageLink: <img className="rounded-t-lg w-75" src="https://flowbite.com/docs/images/blog/image-1.jpg" alt="" />,
      Categories: ["Classic", "Historical", "Fiction"]
    },
    {
      Title: "Dune",
      Author: "Frank Herbert",
      ImageLink: <img className="rounded-t-lg w-75" src="https://flowbite.com/docs/images/blog/image-1.jpg" alt="" />,
      Categories: ["Science Fiction", "Adventure", "Classic"]
    },
    {
      Title: "The Catcher in the Rye",
      Author: "J.D. Salinger",
      ImageLink: <img className="rounded-t-lg w-75" src="https://flowbite.com/docs/images/blog/image-1.jpg" alt="" />,
      Categories: ["Classic", "Coming-of-Age", "Fiction"]
    },
    {
      Title: "The Power of Now",
      Author: "Eckhart Tolle",
      ImageLink:  <img className="rounded-t-lg w-75" src="https://flowbite.com/docs/images/blog/image-1.jpg" alt="" />,
      // ImageLink: "https://flowbite.com/docs/images/blog/image-1.jpg",
      Categories: ["Spirituality", "Self-Help", "Mindfulness"]
    }
  ];
  

  return (
    <>
    <div className="flex justify-center overflow-scroll items-center h-screen flex-wrap  ">

      {
        books.map((book) => (
          <Card 
          image={book.ImageLink}
          title={book.Title}
          author={book.Author}
          category={book.Categories}
          />
        ))
      }
       
          {/* <Card image={"image"} title={books.Title} author={books.Author}  category={books.Categories} /> */}
          {/* <Card image={image} title={"Blog Title"} author={"Adarsh"}  category={category} />
          <Card image={image} title={"Blog Title"} author={"avinash"}  category={category} /> */}
        </div>
    

    </>
  )
}
export default LandingPage