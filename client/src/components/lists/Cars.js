import { List } from "antd";
import { useQuery } from "@apollo/client";
import { GET_CARS } from "../../graphql/queries";
import CarCard from "../listItems/CarCard";

const Cars = ({ personId }) => {
  const styles = getStyles();

  const { loading, error, data } = useQuery(GET_CARS, {
    variables: {
      personId,
    },
  });

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  if (!data?.cars?.length) {
    return null;
  }

  return (
    <List style={styles.list} grid={{ gutter: 20, column: 1 }}>
      {data?.cars?.map(({ id, make, model, year, price }) => (
        <List.Item key={id}>
          <CarCard
            id={id}
            make={make}
            model={model}
            year={year}
            price={price}
            personId={personId}
          />
        </List.Item>
      ))}
    </List>
  );
};

const getStyles = () => ({
  list: {
    display: "flex",
    justifyContent: "center",
    marginTop: "12px",
    width: "100%",
  },
});

export default Cars;
