"use client";
import React from 'react'
import Image from 'next/image'
import { UserButton } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'
import { useContext } from 'react'
import { UserDetailContext } from '@/app/_context/UserDetailContext'

function Header() {

  const {userDetail, setUserDetail}=useContext(UserDetailContext);

  return (
    <div className='p-3 px-5 flex items-center justify-between shadow-md'>
        <div className='flex gap-3 items-center'>
            <Image src={'/logo.png'} width={100} height={100} alt='logo'></Image>
            <h2 className='font-bold text-xl'>AI Shorts</h2>
        </div>
        <div className='flex gap-3 items-center'>

            <div className='flex gap-1 items-center'>
              <Image src={'/coin.png'} width={20} height={20} alt='coin'/>
              <h2>{userDetail?.credits}</h2>
            </div>

            <Button>Dashboard</Button>
            <UserButton/>
        </div>
    </div>
  )
}

export default Header
