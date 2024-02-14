import React from 'react'
import '../stylesheets/global.scss'

const PopupPage = () => {
  const data = 1;
  console.log(data)
	return (
    <div className="flex justify-center items-center w-[400px] h-[600px] p-[24px] bg-primary-500">
      <p className="text-[24px] text-textPrimary">
        Hello This is popup Page
      </p>
    </div>
  )
}

export default PopupPage
