
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useLocation } from "react-router-dom" 
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../../components/Header";
import Topbar from "../global/Topbar";
import Sidebar from "../global/Sidebar";
import { useState } from "react";
import { Box, Button,TextField, MenuItem  } from "@mui/material";
//import { useAdminsContext } from "../../../hooks/useAdminsContext"
import { useAuthContext } from "../../../hooks/useAuthContext"
import { useCategoriesContext } from "../../../hooks/useCategoryContext"
import { LocalizationProvider,DatePicker  } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import * as React from 'react';
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useTransactionsContext } from "../../../hooks/useTransContext";
import "./update.css"
const UpdateTransaction= () => {
  const location = useLocation();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const { user } = useAuthContext()
  const { transactions,dispatch } = useTransactionsContext()
  const { categories} = useCategoriesContext()
  const [error, setError] = useState(null)
  const[added,setAdded]=useState(null)
  const [isSidebar, setIsSidebar] = useState(true);
  const [emptyFields, setEmptyFields] = useState([])
  const [checked, setChecked] = React.useState(true);
  let trans
  transactions.forEach((transaction) => {
    if(transaction.id === location.state.id) 
    {
       trans =  transaction  
    }
  })

 const handleFormSubmit =async (values) => {
  console.log("hiii");
  const body =JSON.stringify(values)
  console.log("ana body",body)
  const response = await fetch('http://localhost:8000/api/transaction/' + trans.id, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${user.token}`,
        'Content-Type': 'application/json',
      },
      body: body,
    })
    const json = await response.json()
   if (response.ok) {
      dispatch({type: 'UPDATE_TRANSACTION', payload: json})}

  };
  return (
   <div className="update">
      <div className="update1">
       <Sidebar isSidebar={isSidebar}/>
       <Topbar setIsSidebar={setIsSidebar} />
    </div>
    <div className="update2">
    <Box >
      <div className="mosh">
        <Header title="Update Transaction" subtitle="" />
      </div>
    <div>
     <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(2, minmax(0, 3fr))"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
          >

           
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Title"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.title}
              name="title"
              error={!!touched.title && !!errors.title}
              helperText={touched.title && errors.title}
            />
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Description"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.description}
              name="description"
              error={!!touched.description && !!errors.description}
              helperText={touched.description && errors.description}
            />
             <FormControl>
                <InputLabel id="currency">currency</InputLabel>
                  <Select
                    fullWidth
                    variant="filled"
                    labelId="currency"
                    id="currency"
                    value={values.currency}
                    label="currency"
                    onChange={handleChange}
                    name="currency"
                    onBlur={handleBlur}
                 >
                  <MenuItem value={'USD'}>$</MenuItem>
                  <MenuItem value={'Euro'}>€</MenuItem>
                  <MenuItem value={'LL'}>LL</MenuItem>
                 </Select>
              </FormControl>
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Amount"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.amount}
              name="amount"
              error={!!touched.amount && !!errors.amount}
              helperText={touched.amount && errors.amount}
            />
           
        
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Email"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              name="email"
              error={!!touched.email && !!errors.email}
              helperText={touched.email && errors.email}
            />
              
            {!trans.paid ?  <FormControl>
                 <InputLabel id="Paid">Paid</InputLabel>
                 <Select
                    fullWidth
                    variant="filled"
                    labelId="Paid"
                    id="Paid"
                    value={values.Paid}
                    label="Paid"
                    onChange={handleChange}
                    name="Paid"
                    onBlur={handleBlur}
                 >
                 <MenuItem value={'1'}>Paid</MenuItem>
                 <MenuItem value={'0'}>unPaid</MenuItem>
                </Select>
              </FormControl>:<div></div>}

          </Box>
          <Box ml="32.5rem" mt="20px">
            <Button type="submit" color="secondary" variant="contained">
               Save Changes
            </Button>
            </Box>
          </form>
        )}
      </Formik>
    </div>
            
    </Box>
    </div>
    </div>
  );
};


const initialValues = {
  title: "",
  description:"",
  currency:"",
  amount:"",
  email: "",
  Paid:""
}


export default UpdateTransaction;
