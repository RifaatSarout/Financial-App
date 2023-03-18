
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../../components/Header";
import { tokens } from "../../../theme";
import Topbar from "../global/Topbar";
import Sidebar from "../global/Sidebar";
import { useState , useRef} from "react";
import { Box, Button,  Typography, useTheme, TextField  } from "@mui/material";
import { useAdminsContext } from "../../../hooks/useAdminsContext"
import { useAuthContext } from "../../../hooks/useAuthContext"
import axios from "axios"
import "./form.css"

const Form = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const { user } = useAuthContext()
  const { dispatch } = useAdminsContext()
  const [error, setError] = useState(null)
  const[added,setAdded]=useState(null)
  const [isSidebar, setIsSidebar] = useState(true);
  const fileInputRef = useRef(null);
  const [image, setImage] = useState('')
  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    // Here you can handle the selected file as needed.
    setImage(file);
  };

  const handleFormSubmit =async (values) => {
   
    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('email', values.email);
    formData.append('password', values.password);
    formData.append('password_confirmation', values.password_confirmation);
    formData.append('image',image);
    console.log("formdata",formData)
     try{ 
      const response = await axios({
       url:'http://localhost:8000/api/register', 
       method: 'POST',
       headers: {
         'Content-Type': 'multipart/form-data',
         'Authorization': `Bearer ${user.token}`
      },
      data: formData
     })
  
 
    const json = await response.data
     if (response.status===201) {
  
      setImage('')
       setAdded("uploaded successfully")
      dispatch({type: 'CREATE_ADMIN', payload: json.message.user})
       
     }
     else{
       setError(json.error)
     }
   }
   catch{
      
         setError("error")
         setAdded(null)
   }
  };

  return (
   <div className="form">
      <div className="form1">
       <Sidebar isSidebar={isSidebar}/>
       <Topbar setIsSidebar={setIsSidebar} />
    </div>
    <div className="form2">
    <Box m="20px">
      <div className="mosh">
        <Header title="CREATE ADMIN" subtitle="Create a New Admin Profile" />
      </div>
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
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.name}
                name="name"
                error={!!touched.name && !!errors.name}
                helperText={touched.name && errors.name}
                sx={{ gridColumn: "span 2" }}
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
                sx={{ gridColumn: "span 2" }}
              />
            
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
                name="password"
                error={!!touched.password && !!errors.password}
                helperText={touched.password && errors.password}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Password Confirmation"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password_confirmation}
                name="password_confirmation"
                error={!!touched.password_confirmation && !!errors.password_confirmation}
                helperText={touched.password_confirmation && errors.password_confirmation}
                sx={{ gridColumn: "span 4" }}
              />

              <label style={{marginLeft:'1rem', marginBottom:'2rem' ,fontWeight: 'bold' }} onClick={handleUploadClick}>Upload photo</label>
             <input
               type="file"
               ref={fileInputRef}
               onChange={handleFileInput}
               style={{display: 'none',color:'blue', fontWeight: 'bold' }}
             />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Create New Admin
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
    </div>
    </div>
  );
};


const checkoutSchema = yup.object().shape({
  name: yup.string().required("required"),

  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
  password_confirmation: yup.string().required("required"),
});
const initialValues = {
  name: "",
  email: "",
  password: "",
  password_confirmation: "",
};

export default Form;
