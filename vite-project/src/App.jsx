import { Formik } from "formik";
import { TextField, Button } from "@mui/material";
import * as yup from "yup";
import "./App.css";
import InputField from "./InputField";
import MultiStepForm, { FormStep } from "./MultiStepForm";

const validationSchemas = {
  Person: yup.object({
    name: yup.string().required("Name is required!"),
    email: yup.string().email("Please enter a correct email!").required("Email is required!"),
  }),
  Address: yup.object({
    street: yup.string().required("Street is required!"),
    country: yup.string().required("Country is required!"),
  }),
};

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
        validationSchema={validationSchemas.Person}
      >
        <InputField variant="standard" name="name" label="Name" />
        <InputField variant="standard" name="email" label="Email" />
      </FormStep>

      <FormStep
        stepName="Address"
        onSubmit={() => console.log("Step Two")}
        validationSchema={validationSchemas.Address}
      >
        <InputField variant="standard" name="street" label="Street" />
        <InputField variant="standard" name="country" label="Country" />
      </FormStep>
    </MultiStepForm>
  );
}

export default App;
