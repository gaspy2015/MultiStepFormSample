import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button, IconButton } from "@mui/material";

const DonationGridField = ({ name, value = [], onChange }) => {
  const [donations, setDonations] = useState(value);

  const handleAddRow = () => {
    setDonations([...donations, { id: Math.random(), donationName: '', amount: 0 }]);
    onChange(name, [...donations, { id: Math.random(), donationName: '', amount: 0 }]);
  };

  const handleDeleteRow = (id) => {
    const updatedDonations = donations.filter(donation => donation.id !== id);
    setDonations(updatedDonations);
    onChange(name, updatedDonations);
  };

  const handleDonationChange = (id, field, value) => {
    const updatedDonations = donations.map(donation => donation.id === id ? { ...donation, [field]: value } : donation);
    setDonations(updatedDonations);
    onChange(name, updatedDonations);
  };

  const columns = [
    { field: 'donationName', headerName: 'Donation Name', flex: 1, editable: true },
    { field: 'amount', headerName: 'Amount', flex: 1, editable: true },
    {
      field: 'actions',
      headerName: 'Actions',
      sortable: false,
      filterable: false,
      flex: 1,
      renderCell: (params) => (
        <IconButton onClick={() => handleDeleteRow(params.row.id)} aria-label="delete">
          Delete
        </IconButton>
      ),
    },
  ];

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={donations}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5, 10, 20]}
        disableColumnFilter
        disableColumnMenu
        onEditCellChangeCommitted={(params) => handleDonationChange(params.id, params.field, params.props.value)}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddRow}
        style={{ marginTop: '10px' }}
      >
        Add Row
      </Button>
    </div>
  );
};

export default DonationGridField;
