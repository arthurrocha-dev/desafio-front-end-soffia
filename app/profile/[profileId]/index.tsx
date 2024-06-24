import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Text,
  View,
  StyleSheet,
  FlatList,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { ProfileDetailsRouteProp } from "@/app/type";
import { getPostByUserId, getUserById } from "@/services/api";
import { ThemedText } from "@/components/ThemedText";
import { Image } from "expo-image";
import { Post, User } from "@/services/api.props";
import { ThemedView } from "@/components/ThemedView";
import {
  AntDesign,
  Fontisto,
  EvilIcons,
  Entypo,
  Feather,
} from "@expo/vector-icons";
import { Link } from "expo-router";
import { usePostsContext } from "@/contexts/PostsProvider";
import styled from "styled-components/native";
import PostList from "@/components/PostsList";
import { PostItem } from "@/components/PostItem";

export default function ProfileDetailScreen() {
  const route = useRoute<ProfileDetailsRouteProp>();
  const { profileId } = route.params;
  const [profile, setProfile] = useState<User | null>(null);
  const [posts, setPost] = useState<Post[] | null>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toggleFavorite, favorites } = usePostsContext();

  useEffect(() => {
    async function fetchUser() {
      try {
        const userData = await getUserById(profileId);
        setProfile(userData);
      } catch (err) {
        setError("Erro ao carregar o usuário.");
      } finally {
        setLoading(false);
      }
    }

    async function fetchPosts() {
      try {
        const userData = await getPostByUserId(profileId);
        setPost(userData);
      } catch (err) {
        setError("Erro ao carregar o usuário.");
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
    fetchPosts();
  }, [profileId]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text>{error}</Text>
      </View>
    );
  }

  if (!profile) {
    return (
      <View style={styles.center}>
        <Text>Perfil não encontrado</Text>
      </View>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <ContainerUser>
        <HeaderView>
          <Link href={"/"}>
            <ThemedText>
              <AntDesign name="arrowleft" size={24} />
            </ThemedText>
          </Link>
          <ThemedText type="subtitle">Perfil</ThemedText>
        </HeaderView>

        <ContainerUserMain>
          <Image
            source={`https://i.pravatar.cc/?img=${profile.id}`}
            style={styles.avatar}
          />
          <ContainerUserMainDetails>
            <ThemedText type="title">{profile.name}</ThemedText>
            <ThemedText>@{profile.username}</ThemedText>
          </ContainerUserMainDetails>
        </ContainerUserMain>
        <ContainerUserData>
          <ContainerUserDataDetails>
            <Fontisto name="email" size={24} />
            <ThemedText>{profile.email}</ThemedText>
          </ContainerUserDataDetails>
          <ContainerUserDataDetails>
            <EvilIcons name="location" size={24} />
            <ThemedText>
              {profile.address.street} - {profile.address.city}
            </ThemedText>
          </ContainerUserDataDetails>
          <ContainerUserDataDetails>
            <Entypo name="suitcase" size={24} />
            <ThemedText>{profile.company.name}</ThemedText>
          </ContainerUserDataDetails>
          <ContainerUserDataDetails>
            <Feather name="phone" size={24} color="black" />
            <ThemedText>{profile.phone}</ThemedText>
          </ContainerUserDataDetails>
        </ContainerUserData>
      </ContainerUser>
      <Container>
        <ThemedView>
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
    </ThemedView>
  );
}

const HeaderView = styled.View`
  padding: 30px 0 20px;
  display: flex;
  flex-direction: row;
  align-item: center;
  gap: 10px;
`;

const ContainerUser = styled.View`
  display: flex;
  flex-direction: column;
  padding: 20px;
  border-radius: 0 0 20px 20px;
  background-color: #fff;
`;

const ContainerUserMain = styled.View`
  display: flex;
  padding: 20px 0;
  flex-direction: row;
  align-items: center;
`;

const ContainerUserMainDetails = styled.View`
  display: flex;
  flex-direction: column;
`;

const ContainerUserData = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ContainerUserDataDetails = styled.View`
  display: flex;
  flex-direction: row;
  gap: 10px;
  aling-items: center;
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
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "transparent",
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 100,
    marginRight: 20,
  },
});
