//Server Component Version of /user/visualizations Page
// import Empty from "../empty";
// import { GetMyVisualizations } from "@/app/lib/controller";
// import { VisMinicard } from "@/app/ui/small-components/vis-minicard";
// import { TVisualization, TVisualizationsArray } from "@/app/lib/definitions";
// import { getServerAuthSession } from "@/app/lib/auth";

// export default async function Page() {
//   const { data, message, success }: { data: TVisualizationsArray; message: string; success: boolean } =
//     await GetMyVisualizations(() => getServerAuthSession());

//   if (data?.length === 0) return <Empty />;

//   return (
//     <div className="px-6 lg:px-32">
//       <div className="bg-white w-100 h-auto min-h-screen px-6 py-6">
//         <div className="py-5 flex flex-row flex-wrap gap-x-6 gap-y-6 justify-evenly">
//           {data?.map((eachCard: TVisualization, i: number) => (
//             <VisMinicard key={i} cardInfo={eachCard} />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

//Client Component Version of /user/visualizations Page
// 'use client'
// import Empty from "../empty";
// import { GetMyVisualizations } from "@/app/lib/controller";
// import { VisMinicard } from "@/app/ui/small-components/vis-minicard";
// import { TVisualization, TVisualizationsArray } from "@/app/lib/definitions";
// import { useEffect, useState } from "react";
// import { getSession } from "next-auth/react";
// import Loading from "../loading";
// import Unauthenticated from "../../unauthenticated/page";

// export default async function Page() {
//   const [visualizations, setVisualizations] = useState<TVisualizationsArray>([]);

//   const [isLoading, setIsLoading] = useState<boolean>(true);
//   const [session, setSession] = useState<any>(null);

//   const getSessionData = async () => {
//     const session = await getSession();
//     setSession(session);
//   };

//   const getVisualizations = async () => {
//     const { data, message, success }: { data: TVisualizationsArray; message: string; success: boolean } =
//       await GetMyVisualizations(() => getSession());
//       setVisualizations(data);
//   }

//   const initializePage = async () => {
//     await getSessionData();
//     await getVisualizations();
//     setIsLoading(false);
//   }

//   useEffect(() => {
//     initializePage();
//   }, []);

//   if (isLoading) return <Loading />;

//   if (!session) return <Unauthenticated />;

//   if (visualizations?.length === 0) return <Empty />;

//   return (
//     <div className="px-6 lg:px-32">
//       <div className="bg-white w-100 h-auto min-h-screen px-6 py-6">
//         <div className="py-5 flex flex-row flex-wrap gap-x-6 gap-y-6 justify-evenly">
//           {visualizations?.map((eachCard: TVisualization, i: number) => (
//             <VisMinicard key={i} cardInfo={eachCard} />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

//Server Component Version of /user/favorites Page
// import Empty from '../empty'
// import { GetMyFavoriteVisualizations, GetMyVisualizations } from '@/app/lib/controller'
// import { VisMinicard } from '@/app/ui/small-components/vis-minicard'
// import { TVisualization, TVisualizationsArray } from '@/app/lib/definitions'
// import { getServerAuthSession } from '@/app/lib/auth'

// export default async function Page() {
//   const { data, message, success }: { data: TVisualizationsArray; message: string; success: boolean } =
//   await GetMyFavoriteVisualizations(() => getServerAuthSession());

//   if (data?.length === 0) return <Empty />;

//   return (
//     <div className="px-6 lg:px-32">
//       <div className="bg-white w-100 h-auto min-h-screen px-6 py-6">
//         <div className="py-5 flex flex-row flex-wrap gap-x-6 gap-y-6 justify-evenly">
//           {data?.map((eachCard: TVisualization, i: number) => (
//             <VisMinicard key={i} cardInfo={eachCard} />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

//Client Component Version of /user/favorites Page
// 'use client'
// import Empty from '../empty'
// import { GetMyFavoriteVisualizations } from '@/app/lib/controller'
// import { VisMinicard } from '@/app/ui/small-components/vis-minicard'
// import { TVisualization, TVisualizationsArray } from '@/app/lib/definitions'
// import { useEffect, useState } from 'react'
// import { getSession } from 'next-auth/react'
// import Loading from '../loading'
// import Unauthenticated from '../../unauthenticated/page'

// export default async function Page() {
//   // const { data, message, success }: { data: TVisualizationsArray; message: string; success: boolean } =
//   // await GetMyFavoriteVisualizations(() => getServerAuthSession());

//   const [visualizations, setVisualizations] = useState<TVisualizationsArray>([]);

//   const [isLoading, setIsLoading] = useState<boolean>(true);
//   const [session, setSession] = useState<any>(null);

//   const getSessionData = async () => {
//     const session = await getSession();
//     setSession(session);
//   };

//   const getVisualizations = async () => {
//     const { data, message, success }: { data: TVisualizationsArray; message: string; success: boolean } =
//       await GetMyFavoriteVisualizations(() => getSession());
//       setVisualizations(data);
//   }

//   const initializePage = async () => {
//     await getSessionData();
//     await getVisualizations();
//     setIsLoading(false);
//   }

//   useEffect(() => {
//     initializePage();
//   }, []);

//   if (isLoading) return <Loading />;

//   if (!session) return <Unauthenticated />;

//   if (visualizations?.length === 0) return <Empty />;

//   return (
//     <div className="px-6 lg:px-32">
//       <div className="bg-white w-100 h-auto min-h-screen px-6 py-6">
//         <div className="py-5 flex flex-row flex-wrap gap-x-6 gap-y-6 justify-evenly">
//           {visualizations?.map((eachCard: TVisualization, i: number) => (
//             <VisMinicard key={i} cardInfo={eachCard} />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

