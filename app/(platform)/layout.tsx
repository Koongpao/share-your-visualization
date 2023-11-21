import React from 'react'
import VisNavbar from '../ui/VisNavbar'

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
        <VisNavbar/>
        {children}
    </div>
  )
}

export default layout