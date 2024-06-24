import { useState, useEffect, useCallback } from "react";
import { getPost } from "../services/api";
import { getFavoritesPosts, saveFavoritesPosts } from "../utils/storage";
import { Post } from "@/services/api.props";

export function usePosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [favorites, setFavorites] = useState<number[]>([]);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const data = await getPost();
        setPosts(data);
        setFilteredPosts(data);
      } catch (err) {
        setError(
          new Error(
            err instanceof Error ? err.message : "An unknown error occurred"
          )
        );
      } finally {
        setLoading(false);
      }
    }

    async function loadFavorites() {
      const savedFavorites = await getFavoritesPosts();
      setFavorites(savedFavorites);
    }

    fetchPosts();
    loadFavorites();
  }, []);

  const filterPosts = useCallback(
    (query: string, userId?: number) => {
      if (query) {
        const lowercasedQuery = query.toLowerCase();
        const filtered = posts.filter(
          (post) =>
            post.title.toLowerCase().includes(lowercasedQuery) ||
            post.body.toLowerCase().includes(lowercasedQuery)
        );
        setFilteredPosts(filtered);
      } else {
        setFilteredPosts(posts);
      }
    },
    [posts]
  );

  const toggleFavorite = useCallback(
    async (postId: number) => {
      const newFavorites = favorites.includes(postId)
        ? favorites.filter((id) => id !== postId)
        : [...favorites, postId];
      setFavorites(newFavorites);
      await saveFavoritesPosts(newFavorites);
    },
    [favorites]
  );

  return {
    posts: filteredPosts,
    loading,
    error,
    filterPosts,
    favorites,
    toggleFavorite,
  };
}
