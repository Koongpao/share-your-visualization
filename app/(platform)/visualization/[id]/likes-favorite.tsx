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


//<LikesFavorite visId={params.id} />
export default function LikesFavorite(visId: string) {
  const [isFavorited, setIsFavorited] = useState<boolean>(false);
  const [isLiked, setIsLiked] = useState<boolean>(false);

  const getIsLiked = async () => {
    const {message, data, success} = await IsLiked(visId);
    setIsLiked(data);
  }

  const getIsFavorited = async () => {
    const {message, data, success} = await IsFavorited(visId);
    setIsFavorited(data);
  }

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


function IconLoading() {
  return (
    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-900"></div>
  );
}