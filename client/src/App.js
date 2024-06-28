import "./App.css";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import Title from "./components/layout/Title";
import Owners from "./components/lists/Owners";
import AddOwner from "./components/forms/AddOwner";
import AddCar from "./components/forms/AddCar";

import { Divider } from "antd";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Title />
        <Divider />
        <AddOwner />
        <AddCar />
        <Owners />
      </div>
    </ApolloProvider>
  );
};

export default App;
