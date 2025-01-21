"use client";
import React, { useState, useEffect, useCallback, useContext } from "react";
import { Button } from "@/components/ui/button";
import EmptyState from "./_components/EmptyState";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import VideoList from "./_components/VideoList";


function Dashboard() {
  const { user } = useUser();
  const [videoList, setVideoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  

  const GetVideoList = useCallback(async (email) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch(`/api/videos?email=${email}`);
      if (!response.ok) {
        throw new Error("Failed to fetch videos");
      }
      const data = await response.json();
      setVideoList(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (user) {
      const email = user.primaryEmailAddress?.emailAddress;
      if (email) {
        GetVideoList(email);
      }
    }
  }, [user, GetVideoList]);

  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-2xl text-primary">Dashboard</h2>

        <Link href={"/dashboard/create-new"}>
          <Button>+ Create New</Button>
        </Link>
      </div>

      {/* Error State */}
      {error && (
        <div className="text-red-500 mt-4">
          <p>Error: {error}</p>
        </div>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="mt-4">
          <p>Loading...</p>
        </div>
      )}

      {/* Empty State */}
      {!isLoading && videoList?.length === 0 && (
        <div>
          <EmptyState />
        </div>
      )}

      {/* List of Videos */}
      {!isLoading && videoList?.length > 0 && <VideoList videoList={videoList} />}
    </div>
  );
}

export default Dashboard;
