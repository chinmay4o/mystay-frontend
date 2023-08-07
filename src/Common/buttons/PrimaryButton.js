import React from 'react'

const PrimaryButton = (props) => {
  return (
    <div className='bg-primary rounded-xl text-[18px] xl:text-xl grid place-items-center font-semibold w-36 md:w-48 lg:w-60 text-white cursor-pointer h-12' onClick={props.onClick} {...props}>{props.text}</div>
  )
}

export default PrimaryButton