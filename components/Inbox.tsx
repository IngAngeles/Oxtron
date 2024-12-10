import Image from 'next/image'
import React from 'react'

const user = [
    {
        img: "/assets/images/user1.png",
        name: "Manager",
        position: "Micheal B.",
    },
    {
        img: "/assets/images/user2.png",
        name: "Micheal B.",
        position: "Chief Sustainability Officer",
    },
    {
        img: "/assets/images/user3.png",
        name: "Marry J.",
        position: "Manager",
    },
    {
        img: "/assets/images/user4.png",
        name: "Allen J.",
        position: "Manager",
    },
    {
        img: "/assets/images/user5.png",
        name: "Rafa C.",
        position: "Manager",
    }
    
]

const Inbox = () => {
  return (
    <div className='bg-white shadow-custom px-7 py-5 flex flex-col gap-4 rounded-[8px] min-w-[7rem]'>
        <div className='flex justify-between'>
            <h2 className='font-bold text-neutral-700 text-xl'>Inbox</h2>
            <Image 
                width={300}
                height={300}
                src='/assets/images/inboxIcon.png'
                alt='Agregar Chat'
                className='w-6 h-6'
            />
        </div>
        <div className='flex flex-col gap-8'>
            {user.map((item, index) => 
                <div key={index}>
                    <div className='flex gap-4'>
                        {/* <Image 
                            width={300}
                            height={300}
                            src={item.img}
                            alt='user'
                            className='w-12 h-12'
                        /> */}
                        <div>
                            <h3 className='text-lg text-neutral-700'>{item.name}</h3>
                            <p className='text-sm text-neutral-400'>{item.position}</p>
                        </div>
                    </div>
                    <div className='h-[1px] w-full bg-neutral-200 mt-5'/>
                </div>
            )}
        </div>

    </div>
  )
}

export default Inbox