import { Card } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useState } from "react";
import RemoveCar from "../buttons/RemoveCar";
import UpdateCar from "../forms/UpdateCar";
import currency from "../../utils/format-currency";

const CarCard = (props) => {
  const [editMode, setEditMode] = useState(false);

  const { id, make, model, year, price, personId } = props;

  const styles = getStyles();

  const handleButtonClick = () => {
    setEditMode(!editMode);
  };

  return (
    <div>
      {editMode ? (
        <UpdateCar
          id={id}
          make={make}
          model={model}
          year={year}
          price={price}
          personId={personId}
          onButtonClick={handleButtonClick}
        />
      ) : (
        <Card
          type="inner"
          style={styles.card}
          actions={[
            <EditOutlined key="edit" onClick={handleButtonClick} />,
            <RemoveCar id={id} personId={personId} />,
          ]}
        >
          {`${year} ${make} ${model} -> ${currency(price)}`}
        </Card>
      )}
    </div>
  );
};

const getStyles = () => ({
  card: {
    width: "65vw",
    backgroundColor: "#f1f0f0",
  },
});

export default CarCard;
