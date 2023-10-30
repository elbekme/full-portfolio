import User from "./user";

interface Education {
  _id: string;
  name: string;
  user: User;
  level: string;
  description: string;
  startDate: string;
  endDate: string;
  __v: 0;
}

export default Education;