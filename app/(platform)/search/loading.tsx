import React from 'react'
import { VisMinicardSkeleton } from '@/app/ui/small-components/vis-minicard'
import { Skeleton } from '@nextui-org/react'

export default function Loading() {
  return (
    <div className="px-6">
      <div className="bg-white w-100 h-auto min-h-screen px-6 py-6">
        <div className="w-full border-b py-2">
          {/* <div className="text-lg font-medium text-slate-600">Showing Results for </div> */}
          <Skeleton className="h-[28px] w-1/2 rounded-full"/>
        </div>
        <div className="py-5 flex flex-row flex-wrap gap-x-6 gap-y-6 justify-start">
          <VisMinicardSkeleton/>
          <VisMinicardSkeleton/>
          <VisMinicardSkeleton/>
          <VisMinicardSkeleton/>
          <VisMinicardSkeleton/>
          <VisMinicardSkeleton/>
          <VisMinicardSkeleton/>
          <VisMinicardSkeleton/>
        </div>
      </div>
    </div>
    
  )
}
