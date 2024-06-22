import React, { useState } from "react";
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
import AntDesign from '@expo/vector-icons/AntDesign';
import PostModal from "@/components/PostModal";


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
  addPostButton: {
    color:"#1D7DFF",
    fontSize: 60,
    position: "absolute",
    bottom: 10,
    right: 20,
    backgroundColor:"#eaeaea",
    borderRadius: 50,
  }
});

export default function HomeScreen({ navigation }: HomeScreenProps) {
  const [isModalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <>
      <PostList />
      <AntDesign name="pluscircle" style={styles.addPostButton} onPress={openModal} />
      <PostModal visible={isModalVisible} onClose={closeModal} />
    </>
  );
}
