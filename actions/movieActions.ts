"use server";

import { createServerSupabaseClient } from "utils/supabase/server";

function handleError(error) {
  if (error) {
    console.error(error);
    throw error;
  }
}

export async function searchMovies({ search, page, pageSize }) {
  const supabase = await createServerSupabaseClient();

  const { data, error } = await supabase
    .from("movie")
    .select("*")
    .like("title", `%${search}%`)
    .order("bookmarked", { ascending: false })
    .order("id", { ascending: true })
    .range((page - 1) * pageSize, page * pageSize - 1);

  if (error) {
    console.error(error);
    return {
      data: [],
      page: null,
      pageSize: null,
      error,
    };
  }

  return { data, page, pageSize };
}

export async function getMovie(id) {
  const supabase = await createServerSupabaseClient();

  const { data, error } = await supabase
    .from("movie")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  handleError(error);

  return data;
}

export async function updateBookmark(id, status) {
  const supabase = await createServerSupabaseClient();

  const { error } = await supabase
    .from("movie")
    .update({ bookmarked: !status }) // 현재 상태 반대로 변경
    .eq("id", id);

  handleError(error);

  return !status;
}
