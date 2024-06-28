import { DeleteOutlined } from "@ant-design/icons";
import { GET_CARS, GET_OWNERS, REMOVE_OWNER } from "../../graphql/queries";
import { useMutation } from "@apollo/client";
import filter from "lodash.filter";

const RemoveOwner = ({ id }) => {
  const [removeOwner] = useMutation(REMOVE_OWNER, {
    update(cache, { data: { removeOwner } }) {
      const { owners } = cache.readQuery({ query: GET_OWNERS });

      cache.writeQuery({
        query: GET_OWNERS,
        data: {
          owners: filter(owners, (c) => {
            return c.id !== removeOwner.id;
          }),
        },
      });

      cache.writeQuery({
        query: GET_CARS,
        variables: {
          personId: removeOwner.id,
        },
        data: {
          cars: [],
        },
      });
    },
  });

  const handleButtonClick = () => {
    let result = window.confirm("Are you sure you want to delete this person?");

    if (result) {
      removeOwner({
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

export default RemoveOwner;
