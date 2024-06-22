import { useState, useEffect } from 'react';
import { getPost } from '../services/api';
import { getFavoritesPosts, saveFavoritesPosts } from '../utils/storage';

export function usePosts() {
  const [posts, setPosts] = useState<Posts[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Posts[]>([]);
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
        if (err instanceof Error) {
          setError(err);
        } else {
          setError(new Error('An unknown error occurred'));
        }
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

  const filterPosts = (query: string) => {
    if (query) {
      const lowercasedQuery = query.toLowerCase();
      const filtered = posts.filter(post =>
        post.title.toLowerCase().includes(lowercasedQuery) ||
        post.body.toLowerCase().includes(lowercasedQuery)
      );
      setFilteredPosts(filtered);
    } else {
      setFilteredPosts(posts);
    }
  };

  const toggleFavorite = async (postId: number) => {
    const newFavorites = favorites.includes(postId)
      ? favorites.filter(id => id !== postId)
      : [...favorites, postId];
    setFavorites(newFavorites);
    await saveFavoritesPosts(newFavorites);
  };

  return { posts: filteredPosts, loading, error, filterPosts, favorites, toggleFavorite };
}
