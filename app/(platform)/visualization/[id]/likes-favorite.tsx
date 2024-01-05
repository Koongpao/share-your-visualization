"use client";
import { FaRegStar, FaStar, FaHeart, FaRegHeart } from "react-icons/fa";
import { useEffect, useState } from "react";
import {
  IsLiked,
  IsFavorited,
  LikeVisualizations,
  UnlikeVisualizations,
  FavoriteVisualizations,
  UnfavoriteVisualizations,
} from "@/app/lib/controller";
import { useSearchParams } from "next/navigation";
import { getSession } from "next-auth/react";


//<LikesFavorite visId={params.id} />
export default function LikesFavorite(visId: string) {
  const [isFavorited, setIsFavorited] = useState<boolean>(false);
  const [isLiked, setIsLiked] = useState<boolean>(false);

  const [session, setSession] = useState<any>(null);

  const getSessionData = async () => {
    const session = await getSession();
    setSession(session);
  }

  const getIsLiked = async () => {
    const {message, data, success} = await IsLiked(session?.user.accessToken, visId);
    setIsLiked(data);
  }

  const getIsFavorited = async () => {
    const {message, data, success} = await IsFavorited(session?.user.accessToken, visId);
    setIsFavorited(data);
  }

  useEffect(() => {
    getSessionData();
  }, [])

  return (
    <div className="flex flex-row gap-x-2">
      <div className="flex flex-row items-center gap-x-2 cursor-pointer">
        {isFavorited ? (
          <FaRegStar className="text-slate-600 text-2xl" />
        ) : (
          <FaStar className="text-slate-600 text-2xl" />
        )}
        <p>Favorite</p>
      </div>
      <div className="flex flex-row items-center gap-x-2 cursor-pointer">
        <FaRegHeart className="text-slate-600 text-xl" />
        <FaHeart className="text-slate-600 text-xl" />
        <p>Likes</p>
      </div>
    </div>
  );
}
