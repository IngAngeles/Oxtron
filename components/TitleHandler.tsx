import React from 'react'

interface Props {
    title: string,
    text: string,
} 

const TitleHandler = ({title, text}: Props) => {
  return (
    <div>
        <h1 className='title-geometos font-[400] text-2xl text-neutral-900'>{title}</h1>
        <p className='font-light text-neutral-500'>{text}</p>
    </div>
  )
}

export default TitleHandler