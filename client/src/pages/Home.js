import Title from "../components/layout/Title";
import Owners from "../components/lists/Owners";
import AddOwner from "../components/forms/AddOwner";
import AddCar from "../components/forms/AddCar";

import { Divider } from "antd";

const Home = () => {
  return (
    <>
      <Title />
      <Divider />
      <AddOwner />
      <AddCar />
      <Owners />
    </>
  );
};

export default Home;
