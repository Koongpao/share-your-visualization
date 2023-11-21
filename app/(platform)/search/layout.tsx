import VisSidebar from '@/app/ui/VisSidebar'
import React from 'react'

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
        <VisSidebar/>
        <main className="w-full lg:pl-60">
        {children}
        </main>
    </div>
  )
}

export default layout