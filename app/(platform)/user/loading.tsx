
import { VisMinicardSkeleton } from '@/app/ui/small-components/vis-minicard'

export default function Loading() {
  return (
    <div className="px-6 lg:px-32">
      <div className="bg-white w-100 h-auto min-h-screen px-6 py-6">
        <div className="py-5 flex flex-row flex-wrap gap-x-6 gap-y-6 justify-evenly">
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