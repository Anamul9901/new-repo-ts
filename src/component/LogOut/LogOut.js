"use client"
import { auth } from '@/app/firebase/config';
import { signOut } from 'firebase/auth';
import React from 'react';
import { MdLogout } from "react-icons/md";

const LogOut = () => {
    return (
        <div>
            <button className='btn glass btn-sm bg-white hover:text-[#ffffff] text-black font-bold' onClick={()=> signOut(auth)}>
            <MdLogout />
            </button>
        </div>
    );
};

export default LogOut;