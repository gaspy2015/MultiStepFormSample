import { FieldArray, Formik, useFormikContext } from "formik";
import { TextField, Button, IconButton, Grid, Typography } from "@mui/material";
import { DataGrid, GridDeleteIcon } from "@mui/x-data-grid";
import * as yup from "yup";
import "./App.css";
import InputField from "./InputField";
import MultiStepForm, { FormStep } from "./MultiStepForm";
import React, { useState } from "react";

const validationSchemas = {
  Person: yup.object({
    name: yup.string().required("Name is required!"),
    email: yup
      .string()
      .email("Please enter a correct email!")
      .required("Email is required!"),
  }),
  Address: yup.object({
    street: yup.string().required("Street is required!"),
    country: yup.string().required("Country is required!"),
  }),
};

// Define the initial values for your form fields
const initialValues = {
  name: "",
  email: "",
  street: "",
  country: "",
  donations: [{id: 0, donationName: "", amount: 0 }],
};

const DonationsFieldArray = () => {
  const { values, setFieldValue } = useFormikContext();

  const handleAddRow = () => {
    const newDonation = { 
      id: values.donations.length + 1, // Using the length of the donations array as ID
      donationName: "", 
      amount: 0 
    };
    setFieldValue("donations", [...values.donations, newDonation]);
    console.log(values)
  };

  const handleDeleteRow = (id) => {
    const newDonations = values.donations.filter(
      (donation) => donation.id !== id
    );
    setFieldValue("donations", newDonations);
  };

  const handleEditCellChangeCommitted = React.useCallback(
    (params) => {
      const { id, field, value } = params;
      // Log the params to ensure they're correct
      console.log("Edit params:", params);
  
      const newDonations = values.donations.map((donation, index) =>
        index === id ? { ...donation, [field]: value } : donation
      );
      setFieldValue("donations", newDonations);
      console.log(values);
    },
    [values, setFieldValue], // Correct dependencies array
    
  );
  

  const columns = [
    {
      field: "donationName",
      headerName: "Donation Name",
      width: 200,
      editable: true,
    },
    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      width: 200,
      editable: true,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <IconButton onClick={() => handleDeleteRow(params.id)}>
          <GridDeleteIcon />
        </IconButton>
      ),
    },
  ];

  return (
    <>
      <Button onClick={handleAddRow} variant="contained" color="primary">
        Add Donation
      </Button>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={values.donations.map((donation, index) => ({
            id: index + 1, 
            ...donation,
          }))}
          columns={columns}
          pageSize={5}
          onCellEditCommit={handleEditCellChangeCommitted}
          //onCellEditStart={handleEditCellChangeCommitted}
          editable
        />
      </div>
    </>
  );
};

function App() {
  // const { values } = useFormikContext();

  return (
    <MultiStepForm
      initialValues={initialValues}
      onSubmit={(values) => {
        console.log("Submitting values:", values);
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

      <FormStep
        stepName="Data Table"
        onSubmit={() => console.log("Step Three")}
        // validationSchema={validationSchemas.Person}
      >
        
        <FieldArray
          name="donations"
          render={arrayHelpers => (
            <DonationsFieldArray
              {...arrayHelpers}
              form={arrayHelpers.form}
            />
          )}
        />
        
      </FormStep>
    </MultiStepForm>
  );
}

export default App;
