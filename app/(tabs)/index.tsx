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
import { AntDesign } from "@expo/vector-icons";
import PostModal from "@/components/PostModal";

type HomeScreenProps = {
  navigation: HomeScreenNavigationProp;
};

export default function HomeScreen({ navigation }: HomeScreenProps) {
  const [isModalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <Main>
      <AntDesign
        name="pluscircle"
        style={styles.addPostButton}
        onPress={openModal}
      />
      <PostList seachable />
      <PostModal visible={isModalVisible} onClose={closeModal} />
    </Main>
  );
}

const Main = styled.View`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

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

const styles = StyleSheet.create({
  center: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  addPostButton: {
    color: "#1D7DFF",
    position: "absolute",
    bottom: 20,
    right: 20,
    fontSize: 50,
    zIndex: 100,
  },
});
