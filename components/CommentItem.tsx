import { Text } from "react-native";
import { PostComments } from "@/services/api.props";
import styled from "styled-components/native";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";

type CommentItemProps = {
  comment: PostComments;
};

export default function CommentItem({ comment }: CommentItemProps) {
  return (
    <ThemedView>
      <Container>
        <TextContainer>
          <ThemedText type="subtitle">{comment.name}</ThemedText>
          <ThemedText >{comment.body}</ThemedText>
        </TextContainer>
      </Container>
    </ThemedView>
  );
}

const Container = styled.View`
  display: flex;
  flex-direction: row;
  padding: 10px;
  align-items: flex-start;
`;

const TextContainer = styled.View`
  display: flex;
`;

const TextName = styled.View`
  font-weight: bold;
  margin-bottom: 10px;
`;
