import { useMutation } from "@apollo/client";
import { Button, Divider, Form, Input } from "antd";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { ADD_OWNER, GET_OWNERS } from "../../graphql/queries";

const AddOwner = () => {
  const [id, setId] = useState(uuidv4());
  const [form] = Form.useForm();
  const [, forceUpdate] = useState();

  const [addOwner, { loading }] = useMutation(ADD_OWNER);

  useEffect(() => {
    forceUpdate({});
  }, []);

  const onFinish = (values) => {
    const { firstName, lastName } = values;

    addOwner({
      variables: {
        id,
        firstName,
        lastName,
      },
      update: (cache, { data: { addOwner } }) => {
        const data = cache.readQuery({ query: GET_OWNERS });

        cache.writeQuery({
          query: GET_OWNERS,
          data: {
            ...data,
            owners: [
              ...data.owners,
              {
                id: addOwner.id,
                firstName: addOwner.firstName,
                lastName: addOwner.lastName,
              },
            ],
          },
        });
      },
    });

    form.resetFields();
    setId(uuidv4());
  };

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
        <h2>Add Person</h2>
      </Divider>
      <Form
        name="add-person-form"
        layout="inline"
        size="large"
        style={{ marginBottom: "40px" }}
        form={form}
        onFinish={onFinish}
      >
        <Form.Item
          name="firstName"
          rules={[{ required: true, message: "Please enter a first name" }]}
        >
          <Input placeholder="First Name" />
        </Form.Item>
        <Form.Item
          name="lastName"
          rules={[{ required: true, message: "Please enter a last name" }]}
        >
          <Input placeholder="Last Name" />
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
              Add Person
            </Button>
          )}
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddOwner;
