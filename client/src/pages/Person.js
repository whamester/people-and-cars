import { useQuery } from "@apollo/client";
import { GET_OWNER_WITH_CARS } from "../graphql/queries";
import { useParams } from "react-router-dom";
import { Card, List, Result, Spin, Typography } from "antd";
import Link from "antd/es/typography/Link";
import currency from "../utils/format-currency";

const Person = () => {
  const { personId } = useParams();

  const { loading, error, data } = useQuery(GET_OWNER_WITH_CARS, {
    variables: {
      id: personId,
    },
  });


  if (error) {
    return (
      <Result
        status="500"
        title="500"
        subTitle="Sorry, something went wrong."
        extra={<Link href="/">Back Home</Link>}
      />
    );
  }

  if (loading) {
    return <Spin />;
  }

  if (!data) {
    <Result
      status="404"
      title="404"
      subTitle="Person Not Found"
      extra={<Link href="/">Back Home</Link>}
    />;
  }

  const person = data?.ownerWithCars;

  return (
    <div style={{ minWidth: "60vw" }}>
      <Typography.Title>
        {person?.firstName} {person?.lastName}
      </Typography.Title>

      <List
        grid={{
          gutter: 8,
          column: 2,
        }}
        dataSource={person.cars}
        renderItem={(car) => {
          return (
            <List.Item>
              <Card title={`${car.make} ${car.model} - ${car.year}`}>
                {currency(car.price)}
              </Card>
            </List.Item>
          );
        }}
      />
    </div>
  );
};

export default Person;
