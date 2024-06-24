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
        <ThemedText type="subtitle">{post.title}</ThemedText>
        <ThemedText>{post.body}</ThemedText>
      </Link>
    </PostItemContainer>
  );
};

const PostItemContainer = styled(TouchableOpacity)`
  border-radius: 8px;
  margin-top: 10px;
  margin-bottom: 10px;
  padding: 15px;
  background-color: #fff;
  width: calc(100% - 20px);
`;

const HeaderContainer = styled.View`
  flex-direction: row;
  margin-bottom: 15px;
`;

const HeaderContainerUserData = styled.View`
  flex: 1;
`;

const styles = StyleSheet.create({
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 20,
  },
  LinkContainer: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    justifyContent:'space-between',
    padding: 10,
    gap: 10,
  }
});
