import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import styled from "styled-components/native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { HomeScreenNavigationProp } from "@/app/type";
import { usePostsContext } from "@/contexts/PostsProvider";
import Header from "@/components/Header";
import { PostItem } from "@/components/PostItem";

const Container = styled.View`
  flex: 1;
`;

type HomeScreenProps = {
  navigation?: HomeScreenNavigationProp;
};

export default function FavoritePosts({ navigation }: HomeScreenProps) {
  const { posts, loading, error, favorites, filterPosts, toggleFavorite } = usePostsContext();
  const favoritePosts = posts.filter((post) => favorites.includes(post.id));

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
    <Container>
      <Header title="Favoritos" onSearch={filterPosts} />
      <ThemedView>
        <FlatList
          data={favoritePosts}
          extraData={favorites}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <PostItem
              post={item}
              isFavorite
              onToggleFavorite={() => toggleFavorite(item.id)}
            />
          )}
        />
      </ThemedView>
    </Container>
  );
}

const styles = StyleSheet.create({
  center: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
});
