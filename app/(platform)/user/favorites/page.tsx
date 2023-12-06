'use client'
import React from 'react'
import Empty from '../empty'
import { useState, useEffect } from 'react';
import { fetchData } from '@/app/lib/controller';
import Loading from '../loading';

export default function Page() {

  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchDataAndSetState = async () => {
      try {
        setIsLoading(true)
        const data = await fetchData();
        console.log("test", data);
      } catch (error) {
        // Handle error, if needed
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false)
      }
    };
    fetchDataAndSetState();
  },[]);

  if (isLoading) return <Loading/>

  if (true) return <Empty/>

  return (
    <div>Page</div>
  )
}
