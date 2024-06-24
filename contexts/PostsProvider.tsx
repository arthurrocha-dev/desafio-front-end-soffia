import React, { createContext, useContext, ReactNode } from 'react';
import { usePosts } from '../hooks/usePosts';

const PostsContext = createContext<ReturnType<typeof usePosts> | undefined>(undefined);

type PostsProviderProps = {
  children: ReactNode;
};

export const PostsProvider = ({ children }: PostsProviderProps) => {
  const posts = usePosts();
  return (
    <PostsContext.Provider value={posts}>
      {children}
    </PostsContext.Provider>
  );
};

export const usePostsContext = () => {
  const context = useContext(PostsContext);
  if (context === undefined) {
    throw new Error('usePostsContext must be used within a PostsProvider');
  }
  return context;
};
