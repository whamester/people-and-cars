import { DeleteOutlined } from "@ant-design/icons";
import { GET_CARS, REMOVE_CAR } from "../../graphql/queries";
import { useMutation } from "@apollo/client";
import filter from "lodash.filter";

const RemoveCar = ({ id, personId }) => {
  const [removeCar] = useMutation(REMOVE_CAR, {
    update(cache, { data: { removeCar } }) {
      const { cars } = cache.readQuery({
        query: GET_CARS,
        variables: {
          personId,
        },
      });

      cache.writeQuery({
        query: GET_CARS,
        variables: {
          personId,
        },
        data: {
          cars: filter(cars, (c) => {
            return c.id !== removeCar.id;
          }),
        },
      });
    },
  });

  const handleButtonClick = () => {
    let result = window.confirm("Are you sure you want to delete this car?");

    if (result) {
      removeCar({
        variables: {
          id,
        },
      });
    }
  };

  return (
    <DeleteOutlined
      key="delete"
      style={{ color: "red" }}
      onClick={handleButtonClick}
    />
  );
};

export default RemoveCar;
