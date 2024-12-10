"use client"

import React from 'react'
import Lottie from "lottie-react";
import animationData from "@/public/assets/lotties/loading-white.json"
import Link from 'next/link';
import Image from 'next/image';

const NoAccess = () => {
  return (
    <div className="flex h-screen max-h-screen bg-dark-300">
        <Image 
        src="/assets/images/bg-login.jpeg"
        height={1000}
        width={1000}
        alt="patient"
        className="side-img lg:max-w-[30%] md:max-w-[20%]"
        />
        <section className="remove-scrollbar container my-auto flex flex-col justify-center gap-5">
            <Lottie
                animationData={animationData}
                className="flex justify-center items-center h-20"
                loop={true}
            />
            <p className='text-center text-lg my-5'>Your user is in the process of review and validation, the administrator will contact you as soon as possible.</p>

            <Link href="https://www.oxtron.mx/es" className="text-white uppercase title-geometos text-center">
                About to start your Journey to <span className="text-[#2A8CFE]">Net Zero</span>
            </Link>
        </section>
        <Image
            src="/assets/images/bg-login-2.jpeg"
            height={1000}
            width={1000}
            alt="patient"
            className="side-img lg:max-w-[30%] md:max-w-[20%]"
        />
    </div>
  )
}

export default NoAccess