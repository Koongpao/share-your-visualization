import VisMinicard from "@/app/ui/VisMinicard";

const page = () => {
  const cardData = [
    {
      source_code: "test",
      title: "Graph Bar",
      user: "@Username",
      date: "12 December 2023",
      library: "d3.js",
      tags: ["test", "test", "test"],
    },
  ] || null
  return (
    <div className="px-6">
      <div className="bg-slate-200 w-100 h-auto min-h-screen px-6 py-6">
        {/* <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-x-6 gap-y-6"> */}
        <div className="flex flex-row flex-wrap gap-x-6 gap-y-6">
        
        {cardData?.map((cardInfo, i) => (
          <VisMinicard key={i} cardInfo={cardInfo} />
        ))}

        </div>
      </div>
    </div>
  );
};

export default page;
