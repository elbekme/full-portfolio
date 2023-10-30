import User from "./user";

interface Portfolio {
  _id: string;
  name: string;
  photo: {
    _id: string;
    name: string;
  };
  url: string;
  description: string;
  user: User;
  __v: number;
}

export default Portfolio;