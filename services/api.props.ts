export type Post = {
  id: number;
  userId: number;
  title: string;
  body: string;
  user: User;
};

export type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
};

export type PostComments = {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
};
