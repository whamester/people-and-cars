import { useMutation, useQuery } from "@apollo/client";
import { Button, Form, Input, Select } from "antd";
import { useEffect, useState } from "react";
import { GET_CARS, GET_OWNERS, UPDATE_CAR } from "../../graphql/queries";

const UpdateCar = (props) => {
  const {
    id,
    make,
    model,
    year,
    price,
    personId: originalOwnerId,
    onButtonClick,
  } = props;
  const [form] = Form.useForm();
  const [, forceUpdate] = useState();

  const [updateCar, { loading }] = useMutation(UPDATE_CAR, {
    onError: console.error,
    update: (cache, { data: { updateCar } }) => {
      if (updateCar.personId !== originalOwnerId) {
        const prevOwnerData = cache.readQuery({
          query: GET_CARS,
          variables: {
            personId: originalOwnerId,
          },
        });

        cache.writeQuery({
          query: GET_CARS,
          variables: {
            personId: originalOwnerId,
          },
          data: {
            ...data,
            cars: prevOwnerData?.cars.filter((car) => car.id !== updateCar.id),
          },
        });

        const currentOwnerData = cache.readQuery({
          query: GET_CARS,
          variables: {
            personId: updateCar.personId,
          },
        });

        cache.writeQuery({
          query: GET_CARS,
          variables: {
            personId: updateCar.personId,
          },
          data: {
            ...data,
            cars: [
              ...currentOwnerData?.cars,
              {
                id: updateCar.id,
                make: updateCar.make,
                model: updateCar.model,
                price: updateCar.price,
                personId: updateCar.personId,
              },
            ],
          },
        });
      } else {
        const sameOwnerData = cache.readQuery({
          query: GET_CARS,
          variables: {
            personId: originalOwnerId,
          },
        });

        cache.writeQuery({
          query: GET_CARS,
          variables: {
            personId: originalOwnerId,
          },
          data: {
            ...data,
            cars: sameOwnerData?.cars.map((car) => {
              if (car.id === updateCar.id) {
                return {
                  id: updateCar.id,
                  make: updateCar.make,
                  model: updateCar.model,
                  price: updateCar.price,
                  personId: updateCar.personId,
                };
              }

              return car;
            }),
          },
        });
      }
    },
  });

  const { loading: loadingPeople, data } = useQuery(GET_OWNERS, {
    onError: console.error,
  });

  const onFinish = (values) => {
    const { make, model, price, year, personId } = values;

    updateCar({
      variables: {
        id,
        make,
        model,
        price: Number(price),
        year: Number(year),
        personId,
      },
    });
    onButtonClick();

    form.resetFields({ id, make, model, price, year, personId });
  };

  useEffect(() => {
    forceUpdate();
  }, []);

  return (
    <Form
      name="update-car-form"
      layout="inline"
      form={form}
      initialValues={{
        make,
        model,
        year,
        price,
        personId: originalOwnerId,
      }}
      style={{ gap: 8 }}
      onFinish={onFinish}
    >
      <Form.Item
        name="year"
        rules={[{ required: true, message: "Please enter the year" }]}
      >
        <Input placeholder="Year" type="number" min={1800} />
      </Form.Item>

      <Form.Item
        name="make"
        rules={[{ required: true, message: "Please enter the make" }]}
      >
        <Input placeholder="Make" />
      </Form.Item>

      <Form.Item
        name="model"
        rules={[{ required: true, message: "Please enter the model" }]}
      >
        <Input placeholder="Model" />
      </Form.Item>

      <Form.Item
        name="price"
        rules={[{ required: true, message: "Please enter the price" }]}
      >
        <Input placeholder="Price" addonBefore="$" type="number" />
      </Form.Item>

      <Form.Item
        name="personId"
        rules={[{ required: true, message: "Please enter the model" }]}
      >
        <Select
          loading={loadingPeople}
          placeholder="Select a person"
          options={data?.owners?.map((owner) => ({
            value: owner.id,
            label: `${owner.firstName} ${owner.lastName}`,
          }))}
        />
      </Form.Item>

      <Form.Item shouldUpdate={true}>
        {() => (
          <Button
            loading={loading}
            type="primary"
            htmlType="submit"
            disabled={
              (!form.isFieldTouched("make") &&
                !form.isFieldTouched("model") &&
                !form.isFieldTouched("year") &&
                !form.isFieldTouched("price") &&
                !form.isFieldTouched("personId")) ||
              form.getFieldsError().filter(({ errors }) => errors.length).length
            }
          >
            Update Car
          </Button>
        )}
      </Form.Item>
      <Button onClick={onButtonClick}>Cancel</Button>
    </Form>
  );
};

export default UpdateCar;
