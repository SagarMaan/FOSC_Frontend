import React, { useEffect, useState } from "react";
import  "./Dashboard.css"

import { getPosts } from "../../scripts/dashboard";

export default function Dashboard() {
  const [posts, setPosts] = useState([]);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    getPosts()
      .then((response) => {
        setPosts(response.data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>      
    <button>Create Book</button>    
    <button>Update Book</button> 
    <button>Add to cart</button>  
    <button>Order</button>                           
    <div style={{ display: "flex", justifyContent: "center" }}>
      {posts.length > 0 &&
        posts.map((post) => {
          const { bookName, authorName, category, price } = post;
          return (
            <div className="backgroundColour" key={Math.random()}>
              <div className="max-w-md rounded overflow-hidden shadow-lg">
                {/* <img className="w-full" src="https://example.com/book-image.jpg" alt="Book Image" /> */}
                <div className="px-6 py-4">
                  <div className="flex items-center mb-2">
                    <div>
                      <div className="font-bold text-xl">{bookName}</div>
                      <p className="text-gray-700 text-base"><strong>Author Name</strong> -  {authorName}</p>
                      <p className="text-gray-700 text-base"><strong>Category</strong> - {category}</p>
                      <p className="text-gray-700 text-base"><strong>Price</strong> - {price}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
    </div>
    </>
  );
 }  

