import { NativeStackNavigationProp } from "react-native-screens/lib/typescript/native-stack/types";

export type RootStackParamList = {
  Root: undefined;
  PostDetail: { postId: number };
  UserProfile: undefined;
  CreatePost: undefined;
};

export type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Root'>;

type Posts = {
  id: number;
  title: string;
  body: string;
};