import { useMutation } from "@apollo/client";
import { Button, Form, Input } from "antd";
import { useEffect, useState } from "react";
import { UPDATE_OWNER } from "../../graphql/queries";

const UpdateOwner = (props) => {
  const { id, firstName, lastName, onButtonClick } = props;
  const [form] = Form.useForm();
  const [, forceUpdate] = useState();

  const [updateOwner] = useMutation(UPDATE_OWNER);

  const onFinish = (values) => {
    const { firstName, lastName } = values;

    updateOwner({
      variables: {
        id,
        firstName,
        lastName,
      },
    });
    onButtonClick();
    form.resetFields({ id, firstName, lastName });
  };

  useEffect(() => {
    forceUpdate();
  }, []);

  return (
    <Form
      name="update-owner-form"
      layout="inline"
      form={form}
      initialValues={{
        firstName,
        lastName,
      }}
      onFinish={onFinish}
    >
      <Form.Item
        name="firstName"
        rules={[{ required: true, message: "Please enter a first name" }]}
      >
        <Input placeholder="i.e. John" />
      </Form.Item>
      <Form.Item
        name="lastName"
        rules={[{ required: true, message: "Please enter a last name" }]}
      >
        <Input placeholder="i.e. Smith" />
      </Form.Item>
      <Form.Item shouldUpdate={true}>
        {() => (
          <Button
            type="primary"
            htmlType="submit"
            disabled={
              (!form.isFieldTouched("firstName") &&
                !form.isFieldTouched("lastName")) ||
              form.getFieldsError().filter(({ errors }) => errors.length).length
            }
          >
            Update Person
          </Button>
        )}
      </Form.Item>
      <Button onClick={onButtonClick}>Cancel</Button>
    </Form>
  );
};

export default UpdateOwner;
