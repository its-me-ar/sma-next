"use client"

import { fetchPosts } from "@/lib/features/postSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";

export default function Home() {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state)=>state.post)
  console.log(state)
  return (
    <div className="flex justify-center items- p-10">
      <button className="bg-red-500 px-3 py-1" onClick={()=>dispatch(fetchPosts())}>Get post</button>
    </div>
  );
}
