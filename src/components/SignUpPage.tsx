import React from 'react'

const SignUpPage = () => {
  return (
    <div className="container mx-auto px-4 py-8"> 
      <h1 className="text-2xl font-bold mb-4">Sign Up</h1>
      <div className="flex flex-col md:flex-row gap-4">
        <button className="bg-customPink text-white border border-customPink rounded-md h-[54px] w-full md:w-auto text-sm font-bold py-2.5 hover:bg-white hover:text-customPink hover:border-customPink"> 
          Individual ISA
        </button>
        <button className="bg-white text-customGrey border border-gray-300 rounded-md h-[54px] w-full md:w-auto text-sm font-bold py-2.5 hover:bg-customPink hover:text-white" disabled> 
          Company ISA
        </button>
      </div>
    </div>
  )
}

export default SignUpPage