import { FieldArray, Formik, useFormikContext } from "formik";
import { TextField, Button, IconButton } from "@mui/material";
import { DataGrid, GridDeleteIcon } from '@mui/x-data-grid';
import * as yup from "yup";
import "./App.css";
import InputField from "./InputField";
import MultiStepForm, { FormStep } from "./MultiStepForm";
import { useState } from "react";

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

// Define the initial values for your form fields
const initialValues = {
  name: '',
  email: '',
  street: '',
  country: '',
  donations: [{ id: Math.random(), donationName: '', amount: 0 }],
};

const DonationsFieldArray = () => {
  const { values, setFieldValue } = useFormikContext();

  const handleAddRow = () => {
    const rowId = Math.random();
    const newDonations = [...values.donations, { id: rowId, donationName: '', amount: 0 }];
    setFieldValue('donations', newDonations);
  };

  const handleDeleteRow = (id) => {
    const newDonations = values.donations.filter(donation => donation.id !== id);
    setFieldValue('donations', newDonations);
  };

  const handleEditCellChangeCommitted = ({ id, field, props }) => {
    const newDonations = values.donations.map((donation) =>
      donation.id === id ? { ...donation, [field]: props.value } : donation
    );
    setFieldValue('donations', newDonations);
  };

  const columns = [
    { field: 'donationName', headerName: 'Donation Name', width: 200, editable: true },
    { field: 'amount', headerName: 'Amount', type: 'number', width: 200, editable: true },
    {
      field: 'actions',
      headerName: 'Actions',
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
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={values.donations}
          columns={columns}
          pageSize={5}
          onCellEditCommit={handleEditCellChangeCommitted}
        />
      </div>
    </>
  );
};


function App() {

  return (
    
    <MultiStepForm
      initialValues={initialValues}
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

      <FormStep
        stepName="Data Table"
        onSubmit={() => console.log("Step Three")}
        //validationSchema={validationSchemas.Person}
      >
        

        <FieldArray name="donations" component={DonationsFieldArray} />
              
      </FormStep>
    </MultiStepForm>
    
  );
  
}

export default App;
