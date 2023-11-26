import VisMinicard from "@/app/ui/small-components/VisMinicard";

const page = () => {
  var cardData =
    [
      {
        source_code: "test",
        title: "Loess Regression",
        image: "/loess_regression.png",
        user: "@Username",
        date: "12 December 2023",
        library: "d3.js",
        tags: ["graph", "static", "dynamic", "interactive"],
      },
      {
        source_code: "test2",
        title: "test",
        image: "/country.png",
        user: "@Admin",
        date: "15 December 2023",
        library: "vega",
        tags: ["graph"],
      },
      {
        source_code: "test2",
        title: "test",
        image: "/high.png",
        user: "@Admin",
        date: "15 December 2023",
        library: "vega",
        tags: ["graph"],
      },
    ] || null;

  cardData = Array.from({ length: 6 }, () => [...cardData]).flat();

  return (
    <div className="px-6">
      <div className="bg-white w-100 h-auto min-h-screen px-6 py-6">
        {/* <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-x-6 gap-y-6"> */}
        <div className="w-full border-b py-2">
          <div className="text-lg font-medium text-slate-600">Showing Results for </div>
        </div>
        <div className="py-5 flex flex-row flex-wrap gap-x-6 gap-y-6 justify-evenly">
          {cardData?.map((cardInfo, i) => (
            <VisMinicard key={i} cardInfo={cardInfo} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;
