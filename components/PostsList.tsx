import React, { useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import styled from "styled-components/native";
import { ThemedView } from "@/components/ThemedView";
import { HomeScreenNavigationProp, RootStackParamList } from "@/app/type";
import { usePostsContext } from "@/contexts/PostsProvider";
import Header from "@/components/Header";
import { PostItem } from "@/components/PostItem";

type PostListProps = {
  navigation?: HomeScreenNavigationProp;
};

export default function PostList({ navigation }: PostListProps) {
  const { posts, loading, error, filterPosts, toggleFavorite, favorites } =
    usePostsContext();

  if (loading) {
    return (
      <Container style={styles.center}>
        <ActivityIndicator size="large" color="#0000ff" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container style={styles.center}>
        <Text>Erro ao carregar as postagens</Text>
      </Container>
    );
  }

  return (
    <Main>
      <Header title="Início" onSearch={filterPosts} />
      <Container>
        <ThemedView style={styles.customThemeView}>
          <FlatList
            data={posts}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <PostItem
                post={item}
                isFavorite={favorites.includes(item.id)}
                onToggleFavorite={() => toggleFavorite(item.id)}
              />
            )}
          />
        </ThemedView>
      </Container>
    </Main>
  );
}

const Main = styled.View`
display: felx;
flex: 1;
flex-direction: column;
`;

const Container = styled.View`
  display: flex;
  flex-direction: column;
  background-color: #eaeaea;
  padding: 10px;
  gap: 10px;
`;
const styles = StyleSheet.create({
  center: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  customThemeView:{ 
    backgroundColor: "transparent",
  }
});
