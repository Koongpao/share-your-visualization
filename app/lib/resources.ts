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

export const searchSuggestion = [
  "bar_chart",
  "line_chart",
  "pie_chart",
  "scatter_plot",
  "map",
  "candlestick",
  "boxplot",
  "heatmap",
  "tree_chart",
];
export const librarySuggestion = ["plotly", "chart.js", "d3.js", "matplotlib", "seaborn", "altair", "bokeh", "vega"];

export const sidebarLibraryList = [
  "d3.js",
  "altair",
  "vega",
  "apache_echarts",
  "chart.js",
  "seaborn",
  "recharts",
  "victory",
  "c3.js",
  "matplotlib",
  "bokeh",
  "highcharts",
  "plotly",
];
export const sidebarChartTypeList = [
  "bar_chart",
  "line_chart",
  "pie_chart",
  "scatter_plot",
  "map",
  "candlestick",
  "boxplot",
  "heatmap",
  "tree_chart",
];
export const sidebarPresentationList = ["static", "interactive", "animated"];
export const sidebarMiscList = ["case_study"];
//This is for local defined for classifying tags in sidebar. For all global available tags, see tagList.ts

export const placeholderCode = `# importing the required module 
import matplotlib.pyplot as plt 
	
x = [1,2,3] 
y = [2,4,1] 
	
plt.plot(x, y) 
	
plt.xlabel('x - axis') 
plt.ylabel('y - axis') 
	
plt.title('My first graph!') 
	
plt.show() `;
