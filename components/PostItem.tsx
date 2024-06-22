import React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { ThemedText } from '@/components/ThemedText';
import { Post } from '@/hooks/usePosts';

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
`;

const Title = styled.Text`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 15px;
`;

type PostItemProps = {
  post: Post;
  isFavorite: boolean;
  onToggleFavorite: () => void;
};

export const PostItem = ({ post, isFavorite, onToggleFavorite }: PostItemProps) => {
  return (
    <PostItemContainer>
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
          name={isFavorite ? "star" : "star-outline"}
          size={30}
          color={isFavorite ? "#FFD700" : "#eaeaea"}
          onPress={onToggleFavorite}
        />
      </HeaderContainer>
      <ThemedText type="title">
        <Title>{post.title}</Title>
      </ThemedText>
      <ThemedText>
        <Text>{post.body}</Text>
      </ThemedText>
    </PostItemContainer>
  );
};

const styles = StyleSheet.create({
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 20,
  },
});
