import React from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { usePosts } from "../../hooks/usePosts";
import styled from "styled-components/native";
import { HomeScreenNavigationProp } from "../type";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import PostList from "@/components/PostsList";
import Header from "@/components/Header";

const Container = styled.View`
  flex: 1;
`;

const PostItem = styled.TouchableOpacity`
  padding: 16px;
  background-color: #000;
  border-radius: 8px;
  margin: 10px 20px;
`;

const Title = styled.Text`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 15px;
`;

type HomeScreenProps = {
  navigation: HomeScreenNavigationProp;
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
});

export default function HomeScreen({ navigation }: HomeScreenProps) {
  return (
    <>
      <PostList />
    </>
  );
}
