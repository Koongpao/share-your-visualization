'use client'
import { testFetch } from "@/app/lib/controller";
import React, {useState, useEffect} from "react";

export default function Page() {

    
    useEffect(() => {
        const fetchData = async () => {
          try {
            const result = await testFetch();
            console.log(result)
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };
    
        fetchData();
      }, []);

  return (
    <div>
      <button>click me</button>
    </div>
  );
}
