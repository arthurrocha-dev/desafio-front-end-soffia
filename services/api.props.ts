export type Post = {
  id: number;
  userId: number;
  title: string;
  body: string;
  user: User;
};

export type User = {
  id: number,
  name: string,
  username: string,
  email: string,
  address: {},
  phone: string,
  website: string,
  company: {},
}

export type PostComments = {
  id: number,
  postId: number,
  name: string,
  email: string,
  body: string,
}