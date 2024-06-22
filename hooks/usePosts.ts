import { useState, useEffect } from 'react';
import { getPost } from '../services/api';

type Posts = {
  id: number;
  title: string;
  body: string;
};

export function usePosts() {
  const [posts, setPosts] = useState<Posts[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Posts[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const data = await getPost();
        setPosts(data);
        setFilteredPosts(data); // Inicialmente, a lista filtrada é igual à lista completa
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

    fetchPosts();
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

  return { posts: filteredPosts, loading, error, filterPosts };
}
