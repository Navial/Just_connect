import userService from "../../services/userService";
import { Form, Input, Button, DatePicker, message } from "antd";
const AddGoogleEventForm = ({ onEventAdded }) => {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    const timeZone = `Europe/Brussels`;
    const eventToAdd = {
      summary: values.summary,
      description: values.description,
      start: {
        dateTime: values.startDateTime,
        timeZone,
      },
      end: {
        dateTime: values.endDateTime,
        timeZone,
      },
    };

    await userService.addEventGoogle(eventToAdd);
    onEventAdded();
    form.resetFields();
    message.success("Événement ajouté avec succès!");
  };
  return (
    <>
      <h1>Ajoutez un évenement</h1>
      <Form
        form={form}
        name="event-form"
        onFinish={onFinish}
        initialValues={{
          summary: "",
          description: "",
          startDateTime: null,
          endDateTime: null,
        }}
      >
        <Form.Item
          name="summary"
          label="Titre"
          rules={[
            {
              required: true,
              message: "Mettez un titre!",
            },
          ]}
        >
          <Input placeholder="Titre" />
        </Form.Item>

        <Form.Item
          name="description"
          label="Description"
          rules={[
            {
              required: true,
              message: "Mettez une description!",
            },
          ]}
        >
          <Input.TextArea placeholder="Description" />
        </Form.Item>

        <Form.Item
          name="startDateTime"
          label="Date et heure du début"
          rules={[
            {
              required: true,
              message: "Veuillez choisir une date et heure du début",
            },
          ]}
        >
          <DatePicker showTime format="DD-MM-YYYY HH:mm" />
        </Form.Item>

        <Form.Item
          name="endDateTime"
          label="Date et heure de fin"
          rules={[
            {
              required: true,
              message: "Veuillez choisir une date et heure du début",
            },
          ]}
        >
          <DatePicker showTime format="DD-MM-YYYY HH:mm" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Ajouter l'événement
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default AddGoogleEventForm;
