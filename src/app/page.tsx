'use client'
import { useSession } from "next-auth/react";
import Link from "next/link";

function MyComponent() {
  const { data: session } = useSession();
  console.log("Session data:", session);

  return( 
  <>
  
    <div>Welcome, {session?.user?.username}</div>
    <div>
      <Link href="/sign-in">
      
        <h3 className="mt-4 p-4 text-4xl bg-green-600">signin page click here</h3>
      </Link>
    </div>
  </>
  );
  
}


export default MyComponent;


