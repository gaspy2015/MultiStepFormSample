import { Formik } from "formik";
import { TextField, Button } from "@mui/material";
import * as yup from "yup";
import "./App.css";
import InputField from "./InputField";
import MultiStepForm, { FormStep } from "./MultiStepForm";

const validationSchema = yup.object({
  name: yup.string().required("Name is required!"),
  email: yup
    .string()
    .email("Plase enter correct email!")
    .required("Email is required!"),
});

function App() {
  return (
    <MultiStepForm
      initialValues={{
        name: "",
        email: "",
        street: "",
        country: "",
      }}
      onSubmit={(values) => {
        alert(JSON.stringify(values, null, 2));
      }}
    >
      <FormStep
        stepName="Person"
        onSubmit={() => console.log("Step One")}
        validationSchema={validationSchema}
      >
        <InputField variant="standard" name="name" label="Name" />
        <InputField variant="standard" name="email" label="Email" />
      </FormStep>

      <FormStep
        stepName="Address"
        onSubmit={() => console.log("Step Two")}
        validationSchema={yup.object({
          street: yup.string().required("street is required!"),
          country: yup.string().required("Email is required!"),
        })}
      >
        <InputField variant="standard" name="street" label="Street" />
        <InputField variant="standard" name="country" label="Country" />
      </FormStep>
    </MultiStepForm>
  );
}

export default App;
