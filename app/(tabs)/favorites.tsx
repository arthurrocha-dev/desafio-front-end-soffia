import React, { useEffect, useState } from "react";
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
import { usePosts } from "@/hooks/usePosts";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import Header from "@/components/Header";

const Container = styled.View`
  flex: 1;
`;

const HeaderContainer = styled.View`
  flex-direction: row;
  margin-bottom: 20px;
`;

const HeaderContainerUserData = styled.View`
  flex: 1;
`;

const PostItem = styled.TouchableOpacity`
  padding: 16px;
  border-radius: 8px;
  margin: 10px 20px;
  border: 1px solid gray;
`;

const Title = styled.Text`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 15px;
`;

type HomeScreenProps = {
  navigation?: HomeScreenNavigationProp;
};

type Posts = {
  id: number;
  title: string;
  body: string;
};

const styles = StyleSheet.create({
  center: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 20,
  },
});

export default function FavoritePosts({ navigation }: HomeScreenProps) {
  const { posts, loading, error, favorites, filterPosts, toggleFavorite } = usePosts();
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
          keyExtractor={(item: Posts) => item.id.toString()}
          renderItem={({ item }) => (
            <PostItem>
              <HeaderContainer>
                <Image
                  source="https://ui-avatars.com/api/?rounded=true&name=Lore+Ipsum"
                  style={styles.avatar}
                />
                <HeaderContainerUserData>
                  <ThemedText>
                    <Title>Lore Ipsum Dolor</Title>
                  </ThemedText>
                  <ThemedText>
                    <Text>@loremipsum</Text>
                  </ThemedText>
                </HeaderContainerUserData>
                <Ionicons
                  name="star"
                  size={30}
                  color="#FFD700"
                  onPress={() => toggleFavorite(item.id)}
                />
              </HeaderContainer>
              <ThemedText type="title">
                <Title>{item.title}</Title>
              </ThemedText>
              <ThemedText>
                <Text>{item.body}</Text>
              </ThemedText>
            </PostItem>
          )}
        />
      </ThemedView>
    </Container>
  );
}
