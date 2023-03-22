import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import { mockDataInvoices } from "../../../data/mockData";
import Header from "../../../components/Header";
import { useTransactionsContext } from "../../../hooks/useTransContext";
import { useAuthContext } from "../../../hooks/useAuthContext"
import EditIcon from '@material-ui/icons/Edit';
import Checkbox from '@mui/material/Checkbox';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useState ,useEffect,Link } from "react";
import {

  useNavigate,
} from "react-router-dom";

import * as React from 'react';

const Transactions = () => {

    const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const {transactions, dispatch} = useTransactionsContext();
  const {user} = useAuthContext();
  const handleBatata = async (id) => {
    
    navigate("/dashboard"); 
 }

  const handleClick = async (id) => {
    
    navigate("/updatetransactions", { state: { id } }); 


  }
  useEffect(() => {
    const fetchTransactions = async () => {
      const response = await fetch('http://localhost:8000/api/transaction', {
        headers: {'Authorization': `Bearer ${user.token}`},
      });
      const json = await response.json();
      if (response.ok) {
        const updatedTransactions = json.map(transaction => {
          return {
            ...transaction,
            checked: false,
          }
        })
        dispatch({type: 'SET_TRANSACTIONS', payload: updatedTransactions});
      }
    };
  
    if (user) {
        fetchTransactions();
    }
  }, [dispatch, user]);


  const columns = [
    { field: "id", headerName: "ID" },
    { field: "category", headerName: "Category" },
    {
      field: "title",
      headerName: "Title",
      flex: 1,
      cellClassName: "name-column--cell",
    },

    {
      field: "amount",
      headerName: "Amount",
      flex: 1,
    },
    {
      field: "type",
      headerName: "Type",
      flex: 1,
    },
    {
      field: "date",
      headerName: "Date",
      flex: 1,
    },
    {
      field: "paid",
      headerName: "Paid",
      flex: 1,
       renderCell: ({ row }) => {
        return (
          <div>
            {row.paid === 1 ? (
              <Checkbox
                checked={true}
                disabled={true}
                inputProps={{ 'aria-label': 'controlled' }}
              />
            ) : (
              <Checkbox
                checked={row.checked}
                inputProps={{ 'aria-label': 'controlled' }}
                disabled={row.checked}
              />
            )}
          </div>
        );
      },
    },
    
    {
      field:"created_by",
      headerName:"created_by",
      flex:1,
    },
    {
      field: "accessLevel",
      headerName: "",
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <Box
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={
                colors.greenAccent[700]
            }
            borderRadius="4px"
          >
            <div onClick={() => handleClick(row.id)}>
              <EditIcon />
            </div>
          </Box>
        );
      },
    },
  ];

  return (
    <Box m="20px">
      <Header title="TRANSACTIONS" subtitle />
      <Box
        m="0 0 0 0"
        height="84.635vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          rows={transactions}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    
      <div
       style={{marginTop: '0.5rem', marginLeft:'0.25rem', cursor: 'pointer'}}
        onClick={() => handleBatata()}
      >
        <ArrowBackIcon/>
       </div>

      
    </Box>

  );
};

export default Transactions;
