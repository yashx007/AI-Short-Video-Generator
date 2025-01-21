"use client";
import React, { useEffect, useState } from 'react';
import Header from './_components/Header';
import SideNav from './_components/SideNav';
import { VideoDataContext } from '../_context/VideoDataContext';
import { UserDetailContext } from '../_context/UserDetailContext';
import { useUser } from '@clerk/nextjs';

function DashboardLayout({ children }) {
  const [videoData, setVideoData] = useState([]);
  const [userDetail, setUserDetail] = useState([]);
  const { user } = useUser();

  useEffect(() => {
    if (user?.primaryEmailAddress?.emailAddress) {
      fetchUserDetail(user.primaryEmailAddress.emailAddress);
    }
  }, [user]);

  const fetchUserDetail = async (email) => {
    try {
      const response = await fetch(`/api/getUserDetails?email=${email}`);
      if (!response.ok) {
        throw new Error('Failed to fetch user details');
      }
      const data = await response.json();
      setUserDetail(data);
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  return (
    <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
      <VideoDataContext.Provider value={{ videoData, setVideoData }}>
        <div className="flex">
          {/* Sidebar */}
          <div className="hidden md:block h-screen bg-white fixed top-0 left-0 w-64 z-10">
            <SideNav />
          </div>

          {/* Main Content */}
          <div className="flex-1 ml-0 md:ml-64">
            <Header />
            <div className="pt-16 p-10">{children}</div>
          </div>
        </div>
      </VideoDataContext.Provider>
    </UserDetailContext.Provider>
  );
}

export default DashboardLayout;
