import { useMutation, useQuery } from "@apollo/client";
import { Button, Divider, Form, Input, Select, notification } from "antd";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { ADD_CAR, GET_CARS, GET_OWNERS } from "../../graphql/queries";

const AddCar = () => {
  const [id, setId] = useState(uuidv4());
  const [form] = Form.useForm();
  const [, forceUpdate] = useState();

  const [addCar, { loading }] = useMutation(ADD_CAR);

  const { loading: loadingPeople, data } = useQuery(GET_OWNERS, {
    onError: console.error,
  });

  const onFinish = (values) => {
    const { year, make, model, price, personId } = values;

    addCar({
      variables: {
        id,
        year: Number(year),
        make,
        model,
        price: Number(price),
        personId,
      },
      update: (cache, { data: { addCar } }) => {
        const data = cache.readQuery({
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
            ...data,
            cars: [...data?.cars, addCar],
          },
        });
      },
    });
    form.resetFields();
    setId(uuidv4());
  };

  useEffect(() => {
    forceUpdate({});
  }, []);

  if (!data?.owners?.length) {
    return null;
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Divider>
        <h2>Add Car</h2>
      </Divider>
      <Form
        name="add-car-form"
        layout="inline"
        size="large"
        style={{ marginBottom: "40px", gap: 8 }}
        form={form}
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
              type="primary"
              htmlType="submit"
              loading={loading}
              disabled={
                !form.isFieldsTouched(true) ||
                form.getFieldsError().filter(({ errors }) => errors.length)
                  .length
              }
            >
              Add Car
            </Button>
          )}
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddCar;
