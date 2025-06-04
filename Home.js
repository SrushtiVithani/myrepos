import React from "react";

function Home(){

   const name = localStorage.getItem("name");

  return <p>Welcome, {name ? name : "User"}!</p>;
}
export default Home;