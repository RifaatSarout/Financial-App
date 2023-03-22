import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../../components/Header";
import Topbar from "../global/Topbar";
import Sidebar from "../global/Sidebar";
import { useState } from "react";
import { Box, Button,TextField, MenuItem  } from "@mui/material";
import { useAdminsContext } from "../../../hooks/useAdminsContext"
import { useAuthContext } from "../../../hooks/useAuthContext"
import { useCategoriesContext } from "../../../hooks/useCategoryContext"
import { useTransactionsContext } from "../../../hooks/useTransContext";
import "./trans.css"
import { LocalizationProvider,DatePicker  } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import * as React from 'react';
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


const TransactionForm = () => {

  const isNonMobile = useMediaQuery("(min-width:600px)");
  const { user } = useAuthContext()
  const { transactions,dispatch } = useTransactionsContext()
  const { categories} = useCategoriesContext()
  const [error, setError] = useState(null)
  const[added,setAdded]=useState(null)
  const [isSidebar, setIsSidebar] = useState(true);
  const [endDate, setEndDate] = useState(null);
  const [startDate, setStartDate] = useState(null);
   const [D, setD] = useState(null);
  const [emptyFields, setEmptyFields] = useState([])

  const handleDateChangeS = (date) => {
  
       setStartDate(date)
   
  };
  const handleDateChangeE = (date) => {
    setEndDate(date);
  };
  const handleDateChangeD = (date) => {
    setD(date);
  };
  const handleFormSubmit =async (values) => {
    const date = new Date(D);
    const formattedDate = date.toISOString().replace("T", " ").replace("Z", "");
    
    const date1 = new Date(startDate);
    const formattedDate1 = date1.toISOString().replace("T", " ").replace("Z", "");
    
    const date2 = new Date(endDate);
    const formattedDate2 = date2.toISOString().replace("T", " ").replace("Z", "");

  const transaction={
    'title':values.title,
    'description':values.description,
    'amount':values.amount,
    'currency':values.currency,
    'type':values.type,
    'frequency':values.frequency,
    'date':formattedDate ,
    'start_date':formattedDate1,
    'end_date':formattedDate2,
    'category_id':values.category,
  

  }

  const body =JSON.stringify(transaction)
  const response = await fetch('http://localhost:8000/api/transaction', {
   method: 'POST',
   body: body,
   headers: {
     'Content-Type': 'application/json',
     'Authorization': `Bearer ${user.token}`
   }
 })
 const json = await response.json()
 console.log(json)
 if (!response.ok) {
   setError(json.error)
   setEmptyFields(json.emptyFields)
 }
 if (response.ok) {
   values=""
   setError(null)
   setEmptyFields([])
   dispatch({type: 'CREATE_TRANSACTION', payload: json})
 }
 
    
  };
  return (
   <div className="transform">
      <div className="transform1">
       <Sidebar isSidebar={isSidebar}/>
       <Topbar setIsSidebar={setIsSidebar} />
    </div>
    <div className="transform2">
    <Box >
      <div className="mosh">
        <Header title="Add Transaction" subtitle="" />
      </div>
    <div>
    {categories.length===0 ? <p> cant create transaction if you dont have category</p>:
    <div>
     <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
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

            <FormControl>
            <InputLabel id="category">category</InputLabel>
            <Select
              fullWidth
              variant="filled"
              labelId="category"
              id="category"
              value={values.category} 
              label="category"
              onChange={handleChange}
              name="category"
              onBlur={handleBlur}
            >
            {categories?.map(item => (
            <MenuItem value={item.id} key={item.id}>
              {item.name}
           </MenuItem>           
  ))}
</Select>

</FormControl>
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
           
            <FormControl>
              <InputLabel id="type">Type</InputLabel>
              <Select
                fullWidth
                variant="filled"
                labelId="type"
                id="type"
                value={values.type}
                label="Type"
                onChange={handleChange}
                name="type"
                onBlur={handleBlur}
              >
              <MenuItem value={'recurring'}>Recurring</MenuItem>
              <MenuItem value={'fixed'}>Fixed</MenuItem>
              </Select>
             </FormControl>
           
             <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Date"
                    variant="filled"
                    fullWidth
                    onBlur={handleBlur}
                    value={D}
                    onChange={handleDateChangeD}
                  />
                </LocalizationProvider>
            
               {values.type==='recurring'? <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Start Date"
                    variant="filled"
                    fullWidth
                    onBlur={handleBlur}
                    value={startDate}
                    onChange={handleDateChangeS}
                  />
                </LocalizationProvider>:<div></div>}
                {values.type ==='recurring'? <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="End Date"
                    variant="filled"
                    fullWidth
                    onBlur={handleBlur}
                    value={endDate}
                    onChange={handleDateChangeE}
         
                  
                  />
                </LocalizationProvider> : <div></div>}
                {values.type ==='recurring'? 
                <FormControl>
                 <InputLabel id="frequency">frequency</InputLabel>
                  <Select
                    fullWidth
                    variant="filled"
                    labelId="frequency"
                    id="frequency"
                    value={values.frequency}
                    label="Frequency"
                    onChange={handleChange}
                    name="frequency"
                    onBlur={handleBlur}
                  >
                  <MenuItem value={'weekly'}>Weekly</MenuItem>
                  <MenuItem value={'monthly'}>Monthly</MenuItem>
                  <MenuItem value={'yearly'}>Yearly</MenuItem>
                 </Select>
                 </FormControl>
                 :<div></div>}

           {values.type === 'recurring'?
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
            />:<div></div>
            }
              
          </Box>
          <Box ml="32.5rem" mt="20px">
            <Button type="submit" color="secondary" variant="contained">
              Create New Transaction
            </Button>
            </Box>
          </form>
        )}
      </Formik>
      </div> 
     }
    </div>
            
    </Box>
    </div>
    </div>
  );
};


const checkoutSchema = yup.object().shape({
  
 });
const initialValues = {
  category:"",
  title: "",
  description:"",
  currency:"",
  amount:"",
  type:"",
  email: "",
  start_date:"",
  end_date:"",
  frequency:"",
}

export default TransactionForm;
