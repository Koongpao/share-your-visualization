import VisSidebar from '@/app/ui/vis-sidebar'
import React from 'react'

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
        <VisSidebar/>
        <main className="w-full lg:pl-80">
        {children}
        </main>
    </div>
  )
}

export default layout