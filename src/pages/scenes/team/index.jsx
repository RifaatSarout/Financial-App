import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import AutoDeleteOutlinedIcon from '@mui/icons-material/AutoDeleteOutlined';
import Header from "../../../components/Header";
import { useState ,useEffect, } from "react";
import Topbar from "../global/Topbar";
import Sidebar from "../global/Sidebar";
import { useAdminsContext } from "../../../hooks/useAdminsContext"
import { useAuthContext } from "../../../hooks/useAuthContext"
import "./team.css"

const Team = () => {
  const [isSidebar, setIsSidebar] = useState(true);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const {admins, dispatch} = useAdminsContext();
  const {user} = useAuthContext();
  
  useEffect(() => {
    const fetchAdmins = async () => {
      const response = await fetch('http://localhost:8000/api/admin', {
        headers: {'Authorization': `Bearer ${user.token}`},
      });
      const json = await response.json();
      if (response.ok) {
        dispatch({type: 'SET_ADMINS', payload: json});
        
      }
    };
  
    if (user) {
        fetchAdmins();
    }
  }, [dispatch, user]);

  const handleClick = async (row) => {
    const newAdmins = admins.filter((admin) => admin.id !== row.id);
    dispatch({ type: "SET_ADMINS", payload: newAdmins });
   const response= await fetch('http://localhost:8000/api/admin/remove/' + row.id, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })
  }

  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "accessLevel",
      headerName: "",
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <Box
            width="60%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={
                colors.greenAccent[700]
            }
            borderRadius="4px"
          >
            <div onClick={() => handleClick(row)}>
             <AutoDeleteOutlinedIcon/>
             </div>
          </Box>
        );
      },
    },
  ];
  return (
  <div className="team">
    <div className="team1">
       <Sidebar isSidebar={isSidebar}/>
       <Topbar setIsSidebar={setIsSidebar} />
    </div>
    <div className="team2">
    <Box m="20px">
      <Header title="Admins" subtitle="Managing Admins" />
      <Box
        m="40px 0 0 0"
        height="75vh"
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
        }}
      >
        <DataGrid checkboxSelection rows={admins} columns={columns} />
      </Box>
    </Box>
    </div>
  </div>
  );
};

export default Team;
