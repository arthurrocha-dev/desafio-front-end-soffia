import React, { useEffect, useState } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from "react-native";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { ThemedText } from "@/components/ThemedText";
import { Post } from "@/services/api.props";
import { Link } from "expo-router";
import { getUserById } from "@/services/api";

type PostItemProps = {
  post: Post;
  isFavorite: boolean;
  onToggleFavorite?: () => void;
};

const userDefault = {
  name: "",
  username: "",
  email: "",
  phone: "",
  website: "",
  address: {
    street: "",
    suite: "",
    city: "",
    zipcode: "",
    geo: {
      lat: "",
      lng: "",
    },
  },
  company: {
    name: "",
    catchPhrase: "",
    bs: "",
  },
};

export const PostItem = ({
  post,
  isFavorite,
  onToggleFavorite,
}: PostItemProps) => {
  const [user, setUser] = useState(userDefault);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUserById(post.userId);
        setUser(userData);
      } catch (error) {
        alert(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [post.userId]);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <PostItemContainer>
      <HeaderContainer>
        <Image
          source={`https://i.pravatar.cc/?img=${post.userId}`}
          style={styles.avatar}
        />
        <HeaderContainerUserData>
          <ThemedText>{user.name}</ThemedText>
          <ThemedText>@{user.username}</ThemedText>
        </HeaderContainerUserData>
        <Ionicons
          name={isFavorite ? "star" : "star-outline"}
          size={30}
          color={isFavorite ? "#FFD700" : "#eaeaea"}
          onPress={onToggleFavorite}
        />
      </HeaderContainer>
      <Link
        href={{
          pathname: "post/[postId]/",
          params: { postId: post.id },
        }}
      >
        <PostBody>
          <ThemedText type="subtitle">{post.title}</ThemedText>
          <ThemedText>{post.body}</ThemedText>
        </PostBody>
      </Link>
    </PostItemContainer>
  );
};

const HeaderContainer = styled.View`
  flex-direction: row;
  margin-bottom: 20px;
`;

const HeaderContainerUserData = styled.View`
  flex: 1;
`;

const PostItemContainer = styled(TouchableOpacity)`
  padding: 16px;
  border-radius: 8px;
  margin: 10px 20px;
  border: 1px solid gray;
  width: calc(100% - 40px);
`;

const Title = styled.Text`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 15px;
`;

const PostBody = styled.View`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const styles = StyleSheet.create({
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 20,
  },
});
