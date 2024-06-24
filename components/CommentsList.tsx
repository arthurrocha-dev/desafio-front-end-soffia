import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  FlatList,
} from "react-native";
import { getCommentsByPostId } from "@/services/api";
import { PostComments } from "@/services/api.props";
import { ThemedView } from "./ThemedView";
import CommentItem from "./CommentItem";
import styled from "styled-components/native";

type CommentsListProps = {
  postId: number;
};

const Container = styled.View`
  flex: 1;
  padding: 20px;
`;

export default function CommentsList({ postId }: CommentsListProps) {
  const [comments, setComments] = useState<PostComments[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchComments() {
      try {
        const commentsData = await getCommentsByPostId(postId);
        setComments(commentsData);
      } catch (err) {
        setError("Erro ao carregar os comentários.");
      } finally {
        setLoading(false);
      }
    }

    fetchComments();
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

  if (!comments.length) {
    return (
      <View style={styles.center}>
        <Text>Nenhum comentário encontrado.</Text>
      </View>
    );
  }

  return (
    <Container>
      <ThemedView>
        <FlatList
          data={comments}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <CommentItem comment={item} />}
        />
      </ThemedView>
    </Container>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
