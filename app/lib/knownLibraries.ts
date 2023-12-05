// export const KnownLibraries: Record<string, [string, string]> = {
//   "vega": ["bg-blue-400", "/library-icons/vega_logo.png"],
//   "altair": ["bg-blue-400", "/library-icons/altair_logo.png"],
//   "d3.js": ["bg-orange-300", "/library-icons/d3js_logo.png"],
//   "apache_echarts": ["bg-red-400", "/library-icons/echarts_logo.png"]
// };

export const KnownLibraries: {
  [key: string]: {
    bgColor: string;
    logo: string;
    language?: string;
    // fontColor?: string;
  };
} = {
  vega: { bgColor: "bg-blue-400", logo: "/library-icons/vega_logo.png", language: "JSON" },
  altair: { bgColor: "bg-blue-400", logo: "/library-icons/altair_logo.png", language: "Python" },
  "d3.js": { bgColor: "bg-orange-300", logo: "/library-icons/d3js_logo.png", language: "JS" },
  apache_echarts: { bgColor: "bg-red-400", logo: "/library-icons/echarts_logo.png", language: "JS" },
  plotly: { bgColor: "bg-gray-600", logo: "/library-icons/plotly_logo.png", language: "JS" },
  "c3.js": { bgColor: "bg-sky-300", logo: "/library-icons/c3js_logo.png", language: "JS" },
  "chart.js": { bgColor: "bg-sky-400", logo: "/library-icons/chartjs_logo.png", language: "JS" },
  highcharts: { bgColor: "bg-indigo-950", logo: "/library-icons/highcharts_logo.png" },
  bokeh: { bgColor: "bg-slate-900", logo: "/library-icons/bokeh_logo.png" },
  matplotlib: { bgColor: "bg-slate-400", logo: "/library-icons/matplotlib_logo.png" },
  seaborn: { bgColor: "bg-sky-600", logo: "/library-icons/seaborn_logo.png" },
  recharts: { bgColor: "bg-blue-500", logo: "/library-icons/recharts_logo.png" },
  victory: { bgColor: "bg-red-400", logo: "/library-icons/victory_logo.png" },
};
