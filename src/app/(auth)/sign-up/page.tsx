import React from 'react'
import Link from 'next/link'

function Signup() {
  return (
    <div>
      <h1 className='bg-green-500 text-8xl p-4 '>
        ding dong this is signup form
      </h1>
      <h1 className='bg-red-800 text-white p-4 mt-4 '>
        <Link href="/">
          go  to home 
        </Link>
      </h1>
    </div>
  )
}

export default Signup
