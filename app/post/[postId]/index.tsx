import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Text,
  View,
  StyleSheet,
  TextInput,
  ScrollView,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { PostDetailsRouteProp } from "@/app/type";
import { getPostById, getUserById } from "@/services/api";
import { ThemedText } from "@/components/ThemedText";
import styled from "styled-components/native";
import { Image } from "expo-image";
import { Post } from "@/services/api.props";
import { ThemedView } from "@/components/ThemedView";
import CommentsList from "@/components/CommentsList";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { usePostsContext } from "@/contexts/PostsProvider";

export default function PostDetailScreen() {
  const route = useRoute<PostDetailsRouteProp>();
  const { postId } = route.params;
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toggleFavorite, favorites } = usePostsContext();

  useEffect(() => {
    async function fetchPost() {
      try {
        const postData = await getPostById(postId);
        const userData = await getUserById(postData.userId);
        setPost({ ...postData, user: userData });
      } catch (err) {
        setError("Erro ao carregar o post.");
      } finally {
        setLoading(false);
      }
    }

    fetchPost();
  }, [postId]);

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

  if (!post) {
    return (
      <View style={styles.center}>
        <Text>Post não encontrado</Text>
      </View>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <HeaderView>
        <Link href={"/"}>
          <ThemedText>
            <AntDesign name="arrowleft" size={24} />
          </ThemedText>
        </Link>
        <ThemedText type="subtitle">Post</ThemedText>
      </HeaderView>

      <HeaderContainer>
        <ContainerUser>
          <Image
            source={`https://i.pravatar.cc/?img=${post.userId}`}
            style={styles.avatar}
          />
          <ContainerUserData>
            <ThemedText type="subtitle">{post.user.name}</ThemedText>
            <ThemedText>@{post.user.username}</ThemedText>
          </ContainerUserData>
        </ContainerUser>
        <Ionicons
          name={favorites.includes(post.id) ? "star" : "star-outline"}
          size={30}
          color={favorites.includes(post.id) ? "#FFD700" : "#eaeaea"}
          onPress={() => toggleFavorite(post.id)}
        />
      </HeaderContainer>

      <ThemedText type="subtitle">{post.title}</ThemedText>
      <ThemedText style={styles.body}>{post.body}</ThemedText>

      <ContainerComments>
        <ThemedText type="title" style={styles.containerCommentsTitle}>
          Comentários
        </ThemedText>
        <CommentsList postId={post.id} />
      </ContainerComments>
      <InputContainer>
        <Ionicons name="chatbox-ellipses-outline" size={30} />
        <TextInput placeholder="Adicione um título" />
      </InputContainer>
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

const HeaderContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: start;
  border-top: 5px solid;
  border-color: black;
`;
const ContainerUser = styled.View`
  display: flex;
  padding: 20px 0;
  flex-direction: row;
  border-color: #000;
  border-bottom: 2px solid;
`;

const ContainerUserData = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ContainerComments = styled.View`
  flex-direction: column;
  gap: 5px;
  flex: 1;
  margin: 10px 0;
`;

const InputContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  background-color: #eaeaea;
  border-radius: 10px; 
  padding: 10px;
`;

const styles = StyleSheet.create({
  containerCommentsTitle: {
    borderTopWidth: 2,
    borderColor: "#eaeaea",
    borderBottomWidth: 2,
    borderBottomColor: "#eaeaea",
    paddingTop: 15,
    paddingBottom: 10,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  body: {
    fontSize: 16,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 20,
  },
});
