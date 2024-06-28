import { List } from "antd";
import OwnerCard from "../listItems/OwnerCard";
import { useQuery } from "@apollo/client";
import { GET_OWNERS } from "../../graphql/queries";

const Owners = () => {
  const styles = getStyles();

  const { loading, error, data } = useQuery(GET_OWNERS);

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  return (
    <List style={styles.list} grid={{ gutter: 20, column: 1 }}>
      {data.owners.map(({ id, firstName, lastName }) => (
        <List.Item key={id} style={{ minWidth: "68vw" }}>
          <OwnerCard id={id} firstName={firstName} lastName={lastName} />
        </List.Item>
      ))}
    </List>
  );
};

const getStyles = () => ({
  list: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
  },
});

export default Owners;
