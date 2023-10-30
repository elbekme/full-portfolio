import User from "./user";

interface Experience {
  _id: string;
  name: string;
  user: User;
  companyName: string;
  workName: string;
  description: string;
  startDate: string;
  endDate: string;
  __v: 0;
}

export default Experience;