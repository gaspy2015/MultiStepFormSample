import { FieldArray, Formik } from "formik";
import { TextField, Button, IconButton } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
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

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    {field: "donationName", headerName: "Donation", width: 150, editable: true },
    // {
    //   field: "action",
    //   headerName: "Action",
    //   width: 100,
    //   renderCell: (params) => (
    //     <IconButton onClick={() => deleteRow(params.rowIndex)}>
    //       <GridDeleteIcon />
    //     </IconButton>
    //   ),
    // },
    
    
  ];


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
        validationSchema={validationSchemas.Person}
      >
        <FieldArray name="details">
                {({ insert, remove, push }) => (
                  <div>
                    <DataGrid
                      rows={values.donations}
                      columns={columns}
                      pageSize={5}
                      rowsPerPageOptions={[5]}
                      disableSelectionOnClick
                      autoHeight
                      onCellEditCommit={(params) => {
                        const { id, field, value } = params;
                        const updatedRows = values.donations.map((row) =>
                          row.id === id ? { ...row, [field]: value } : row
                        );
                        setFieldValue("details", updatedRows);
                      }}
                    />
                    <IconButton onClick={() => push(EMPTY_ROW)}>
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
