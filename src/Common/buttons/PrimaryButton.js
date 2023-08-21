import React from 'react'

const PrimaryButton = (props) => {
  return (
    <div className={`bg-primary rounded-xl text-[18px] xl:text-md grid place-items-center font-semibold w-36 md:w-48 lg:w-60 hover:text-primary hover:bg-white hover:border hover:border-primary text-white cursor-pointer h-12 ${props.classes}`} onClick={props.onClick} {...props}>{props.text}</div>
  )
}

export default PrimaryButton