import React from 'react'
import Link from 'next/link'

function page() {
  return (
    <div>
      <h1 className='bg-red-800 p-4 text-3xl '>itis dashborad page </h1>
      <p>
        <Link href='/sign-in'>
sign-in page        
        </Link>
      </p>
    </div>
  )
}

export default page
