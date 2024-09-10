import React from "react";
import Link from "next/link";

function Home() {
  return (
    <>
      <div>
        <h1 className="bg-red-500 p-6 text-center text-white ">
          chandan polai
        </h1>

        <Link href="/sign-in">signin</Link>
      </div>
    </>
  );
}

export default Home;
