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
import { getSession } from "next-auth/react";
import { Skeleton } from "@nextui-org/react";
import { toast, ToastContainer } from "react-toastify";
import { set } from "date-fns";

export default function LikesFavorite({ visId }: { visId: string }) {
  const [isFavorited, setIsFavorited] = useState<boolean>(false);
  const [isLiked, setIsLiked] = useState<boolean>(false);

  const [iconLoading, setIconLoading] = useState<boolean>(true);


  const getIsLikedFavorited = async () => {
    setIconLoading(true);
    const { message: likeMessage, data: likeData, success: likeSuccess } = await IsLiked(() => getSession(), visId);
    setIsLiked(likeData);

    const {
      message: favoriteMessage,
      data: favoriteData,
      success: favoriteSuccess,
    } = await IsFavorited(() => getSession(), visId);

    setIsFavorited(favoriteData);
    setIconLoading(false);
  };

  useEffect(() => {
    getIsLikedFavorited();
  }, []);

  const handleFavoriteClick = async () => {
    setIconLoading(true);
    if (isFavorited) {
      const { message, success } = await UnfavoriteVisualizations(() => getSession(), visId);
      if (success) {
        setIsFavorited(false);
      }
      fireToast(message);
    } else {
      const { message, success } = await FavoriteVisualizations(() => getSession(), visId);
      if (success) {
        setIsFavorited(true);
      }
      fireToast(message);
    }
    setIconLoading(false);
  };

  const handleLikeClick = async () => {
    setIconLoading(true);
    if (isLiked) {
      const { message, data, success } = await UnlikeVisualizations(() => getSession(), visId);
      if (success) {
        setIsLiked(false);
      }
      fireToast(message);
    } else {
      const { message, data, success } = await LikeVisualizations(() => getSession(), visId);
      if (success) {
        setIsLiked(true);
      }
      fireToast(message);
    }
    setIconLoading(false);
  };

  const fireToast = (message: string) => {
    toast.info(message, {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  if (iconLoading) return <TransparentLoading isFavorited={isFavorited} isLiked={isLiked} />;

  return (
    <div className="flex flex-row gap-x-2">
      <div className="flex flex-row items-center gap-x-2 cursor-pointer" onClick={() => handleFavoriteClick()}>
        {isFavorited ? (
          <FaStar className="text-yellow-400 text-2xl" />
        ) : (
          <FaRegStar className="text-slate-600 text-2xl" />
        )}
        <p>Favorite</p>
      </div>
      <div className="flex flex-row items-center gap-x-2 cursor-pointer" onClick={() => handleLikeClick()}>
        {isLiked ? <FaHeart className="text-red-400 text-xl" /> : <FaRegHeart className="text-slate-600 text-xl" />}
        <p>Like</p>
      </div>
      <ToastContainer />
    </div>
  );
}

// function IconLoading() {
//   return (
//     <div className="flex items-center">
//       <Skeleton className="w-[10rem] h-[1.5rem] rounded-full" />
//     </div>
//   );
// }

function TransparentLoading({ isFavorited, isLiked }: { isFavorited: boolean; isLiked: boolean }) {
  return (
    <div className="flex flex-row gap-x-2">
      <div className="flex flex-row items-center gap-x-2 opacity-50">
        {isFavorited ? (
          <FaStar className="text-yellow-400 text-2xl" />
        ) : (
          <FaRegStar className="text-slate-600 text-2xl" />
        )}
        <p>Favorite</p>
      </div>
      <div className="flex flex-row items-center gap-x-2 opacity-50">
        {isLiked ? <FaHeart className="text-red-400 text-xl" /> : <FaRegHeart className="text-slate-600 text-xl" />}
        <p>Like</p>
      </div>
      <ToastContainer />
    </div>
  );
}
