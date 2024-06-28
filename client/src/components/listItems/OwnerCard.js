import { Card, Typography } from "antd";
import RemoveOwner from "../buttons/RemoveOwner";
import { EditOutlined } from "@ant-design/icons";
import { useState } from "react";
import UpdateOwner from "../forms/UpdateOwner";
import Cars from "../lists/Cars";
import Link from "antd/es/typography/Link";

const OwnerCard = (props) => {
  const [editMode, setEditMode] = useState(false);

  const { id, firstName, lastName } = props;

  const handleButtonClick = () => {
    setEditMode(!editMode);
  };

  return (
    <div>
      {editMode ? (
        <UpdateOwner
          id={id}
          firstName={firstName}
          lastName={lastName}
          onButtonClick={handleButtonClick}
        />
      ) : (
        <Card
          actions={[
            <EditOutlined key="edit" onClick={handleButtonClick} />,
            <RemoveOwner id={id} />,
          ]}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Typography.Text>
              {firstName} {lastName}
            </Typography.Text>
            <Cars personId={id} />
            <Link href="#">Learn More</Link>
          </div>
        </Card>
      )}
    </div>
  );
};

export default OwnerCard;
