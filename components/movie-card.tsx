"use client";

import { useMutation } from "@tanstack/react-query";
import { updateBookmark } from "actions/movieActions";
import { queryClient } from "config/ReactQueryClientProvider";
import Link from "next/link";

export default function MovieCard({ movie }) {
  const updateBookmarkMutation = useMutation({
    mutationFn: () => updateBookmark(movie.id, movie.bookmarked),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["movie"] });
    },
  });

  return (
    <div className="col-span-1 relative">
      {/* Image 부분 */}
      <img src={movie.image_url} className="w-full" />

      {/* Bookmark 부분 */}
      <i
        onClick={() => updateBookmarkMutation.mutate()}
        className={`text-yellow-600 drop-shadow-md absolute flex items-center justify-center p-2 text-2xl top-2 right-2 z-20 ${
          movie.bookmarked ? "fa-solid fa-bookmark" : "fa-regular fa-bookmark"
        }`}
      ></i>

      {/* Title Dim */}
      <Link href={`/movies/${movie.id}`}>
        <div className="absolute flex items-center justify-center top-0 bottom-0 left-0 right-0 z-10 bg-black opacity-0 hover:opacity-80 transition-opacity duration-300">
          <p className="text-xl font-bold text-white">{movie.title}</p>
        </div>
      </Link>
    </div>
  );
}
