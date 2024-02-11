import { FieldArray, Formik } from "formik";
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

const EMPTY_ROW = { id: Math.random(), donationName: '', amount: 0 };

function App() {

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    {field: "donationName", headerName: "Donation", width: 150, editable: true },
    {field: "amount", headerName: "Amount", width: 150, editable: true },
    {
      field: "action",
      headerName: "Action",
      width: 100,
      renderCell: (params) => (
        <IconButton onClick={() => deleteRow(params.rowIndex)}>
          <GridDeleteIcon />
        </IconButton>
      ),
    },
    
    
  ];

  const [rows, setRows] = useState(initialValues.donations); // Manage rows with useState

  // Function to delete a row
  const deleteRow = (index) => {
    const updatedRows = [...rows];
    updatedRows.splice(index, 1);
    setRows(updatedRows);
  };

  // Function to add a row
  const addRow = () => {
    setRows([...rows, EMPTY_ROW]);
  };

  // Update rows when cell is edited
  const handleCellEditCommit = (params) => {
    const { id, field, value } = params;
    const updatedRows = rows.map((row) => (row.id === id ? { ...row, [field]: value } : row));
    setRows(updatedRows);
  };

  return (
    <MultiStepForm
      initialValues={{
        name: "",
        email: "",
        street: "",
        country: "",
        donations: [{
          donationName: "",
          amount: 0,
        }],
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

      <FormStep
        stepName="Data Table"
        onSubmit={() => console.log("Step Three")}
        //validationSchema={validationSchemas.Person}
      >
        

        <FieldArray name="details">
                {({ insert, remove, push }) => (
                  <div>
                    <DataGrid
                      rows={initialValues.donations}
                      columns={columns}
                      pageSize={5}
                      rowsPerPageOptions={[5]}
                      disableSelectionOnClick
                      autoHeight
                      onCellEditCommit={handleCellEditCommit}
                    />
                    <IconButton onClick={() => addRow()}>
                      Add Row
                    </IconButton>
                  </div>
                )}
              </FieldArray>
              
      </FormStep>
    </MultiStepForm>
  );
}

export default App;
