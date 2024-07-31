import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import axios from "../../axios";
import { toast } from "react-toastify";
// import Switch from '@mui/material/Switch';
// import { styled } from '@mui/material/styles';
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Switch,
  styled,
  Tooltip,
} from "@material-ui/core";

// import { Delete } from '@material-ui/icons';
import VisibilityIcon from "@material-ui/icons/Visibility";
import BlockIcon from "@material-ui/icons/Block";
// import ArrowBackIcon from "@material-ui/icons/ArrowBack";

// For Table
import SearchBar from "material-ui-search-bar";
import { orderBy, get } from "lodash";

//history
import { useHistory } from "react-router-dom";
// import AddEditCategory from "../AccountManagement/Account_Details";

// import './Category_Management.css' ;
import EditIcon from "@material-ui/icons/Edit";
import { DeleteOutline, Mail, WidgetsOutlined } from "@material-ui/icons";
import { Modal } from '../../components/Modal/Modal';
import { CategoryBox, CatRow, CatLabel, ButtonBox, CatButton, CatTitle } from "../CategoryManagement/CategoryElements"
import Input from "../../components/Input"
import Select from "react-select"
import Overlay from "../../components/Overlay";
import { SubAdminManagementValidator } from "../../utils/validators"
import { Formik, Field, Form } from "formik";
import "./SubAdmin.css"

const useStyles = makeStyles((theme) => ({
  root: {
    flexWrap: "wrap",
    // marginTop: '5rem',
  },
  margin: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  paperHeading: {
    padding: "1rem 0rem",
  },
  table: {
    minWidth: 650,
  },
  textMiddle: {
    verticalAlign: "middle !important",
  },
  iconMargin: {
    margin: "0.5rem",
    color: "#fff",
    backgroundColor: "#696969",
  },
  iconcolor: {
    margin: "0.5rem",
    color: "#fff",
    backgroundColor: "#0294b3 !important",
  },
  headingButton: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    padding: "10px",
  },
  headingAlignment: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    // padding: "0 2rem 0 2rem"
    alignItems: "center",
    flexWrap: "wrap",
    ["@media (max-width:780px)"]: {
      // eslint-disable-line no-useless-computed-key
      flexDirection: "column",
      width: "100%",
      gap: "1rem",
      justifyContent: "center",
      textAlign: "center",
    },
  },
  Marginbutton: {
    margin: "0.5rem",
  },
  container: {
    maxHeight: "58vh",
  },
  paperPaddingRightLeft: {
    padding: "0rem 1rem",
  },
}));

const Android12Switch = styled(Switch)(({ theme }) => ({
  padding: 8,
  "& .MuiSwitch-track": {
    borderRadius: 22 / 2,
    "&:before, &:after": {
      content: '""',
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
      width: 16,
      height: 16,
    },
    "&:before": {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main)
      )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
      left: 12,
    },
    "&:after": {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main)
      )}" d="M19,13H5V11H19V13Z" /></svg>')`,
      right: 12,
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "none",
    width: 16,
    height: 16,
    margin: 2,
  },
}));

export default function SubAdmin_Management(props) {
  const classes = useStyles();

  // const history=useHistory();

  const [tableData, setTableData] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
const [subAdminData,setSubAdminData]=useState({
  email:"",
  roll_access_id:"",
  _id:""
})
const [isSubAdmin,setIsSubAdmin]=useState(false)
const [optionsData,setOptionsData]=useState([])
const [selectedOption,setSelectedOption]=useState([])
  // status switch
  // const [checked, setChecked] = useState(true);

  // For Pagination
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    // console.log(event);
    // console.log(newPage);
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    getCategoriesContent();
    getRoleData()
  }, []);

  //get content
  const getCategoriesContent = async () => {
    try {
      const { data } = await axios.get("/admin/getSubAdminsList");
      console.log(data);
      setTableData(data.response);
      setSearchedData(data.response);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  // edit category itself
  const getRoleData = async () => {
    try {
      const { data } = await axios.get("/admin/get_roll_management");
      console.log(data);
 let result= data.data.map((ele)=>({label:ele.roll_name.charAt(0).toUpperCase() + ele.roll_name.slice(1),value:ele._id}))
      setOptionsData(result)
    } catch (error) {
      console.log(error);
    }
  };
  //   const EditCategory=(category)=>{

  //     props.history.push({
  //       pathname: "/AddEditCategory",
  //       state:category

  //     });

  //   }

  //edit  categories attribute

  //  const EditAttributeContent=(category)=>{
  // console.log(tableData);
  //   props.history.push({
  //     pathname: "/EditCategoryAttributes",
  //     state:category
  //   });

  // delete category
  //  }
  //  const DeleteCategory=async(id)=>{

  //   try {

  //     if(window.confirm('Are you sure you want to delete this category?')){

  //     const { data } = await axios.post("/admin/delete_category",{category_id:id});
  //     console.log(data);
  //   getCategoriesContent();
  //   toast.success(data.message, {
  //     position: toast.POSITION.TOP_RIGHT,
  //   });
  //     }else {
  //       toast.error('You have cancelled the operation', {
  //         position: toast.POSITION.TOP_RIGHT,
  //       });
  //     }
  //    }
  //     catch (error) {
  //       console.log(error);
  //       toast.error(error, {
  //         position: toast.POSITION.TOP_RIGHT,
  //       });
  //     }

  //  }

  // status switch

  const statusSwitch = async (e, id) => {
    try {
      console.log(id);

      const { data } = await axios.post("/admin/blockUnblockSubAdmin", { subAdminId: id, is_blocked: !e.target.checked });
      // props.history.push({
      //     pathname: "/Category_Management",
      //   });
      getCategoriesContent();
      toast.success(data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  // useEffect(() => {
  //    window.localStorage.setItem('query',JSON.stringify([]))

  // }, [])

  // For Search
  const [searched, setSearched] = useState("");
  const [searchedData, setSearchedData] = useState([]);

  const requestSearch = (searchedVal) => {
    console.log(searchedVal);

    const filteredRows = searchedData.filter((row) => {
      let email = row.email;
      return email.toLowerCase().includes(searchedVal.toLowerCase());
    });
    setTableData(filteredRows);
  };

  const cancelSearch = () => {
    getCategoriesContent();
    // setSearched("");
    //  console.log(searchedData);
    //  requestSearch()
  };
  const deleteSubAdmin = async (email) => {
    if (window.confirm("Are you sure you want to delete this SubAdmin?")) {
      try {
        const { data } = await axios.post(`/admin/removeSubAdmin`, {
          email: email,
        });
        getCategoriesContent();
        toast.success(data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      } catch (err) {
        console.log(err);
      }
    } else {
      getCategoriesContent();
    }
  };
  const handleSubAdmin = async (values) => {
    console.log(values)
    setIsLoading(true)
    if (values._id) {
      try {
        const { data } = await axios.post("/admin/updateSubAdmin", {
         subAdminId: values._id,

       email: values.email,
       roll_access_id:values.roll_access_id
        })
        toast.success(`${data.message}`, {
          position: toast.POSITION.TOP_RIGHT,
        });
        getCategoriesContent()
        setIsLoading(false)
        setIsSubAdmin(false)
        setSubAdminData({ email:"",
        roll_access_id:"",
        _id:""})
        setSelectedOption([])
      } catch (error) {
        toast.error(`${error.response.data.message}`, {
          position: toast.POSITION.TOP_RIGHT,
        });
        setIsLoading(false)
        setIsSubAdmin(false)
        setSubAdminData({ email:"",
        roll_access_id:"",
        _id:""})
        setSelectedOption([])
      }
    }
    else {
      try {
        const { data } = await axios.post("/admin/createSubAdmin", {
             email: values.email,

             roll_access_id:values.roll_access_id,
             
        })
        toast.success(`${data.message}`, {
          position: toast.POSITION.TOP_RIGHT,
        });
        getCategoriesContent()
        setIsLoading(false)
        setIsSubAdmin(false)
        setSubAdminData({ email:"",
                roll_access_id:"",
                _id:""})
        setSelectedOption([])
      } catch (error) {
        toast.error(`${error.response.data.message}`, {
          position: toast.POSITION.TOP_RIGHT,
        });
        setIsLoading(false)
        setIsSubAdmin(false)
        setSubAdminData({ email:"",
        roll_access_id:"",
        _id:""})
        setSelectedOption([])
      }
    }
  }
  const handleChange =(e, setFieldValue)=>{
    setSelectedOption(e)
console.log(e)
setFieldValue("roll_access_id",e.value)

  }
  const resendEmail=async(id)=>{
 try{
    const {data}=await axios.post(`/admin/resend_role_link_subadmin`,{
  subAdminId:id
})
toast.success(`${data.message}`, {
  position: toast.POSITION.TOP_RIGHT,
});
}catch(err){
  console.log(err)
}
  }


  return (
    <React.Fragment>
      <div className="page-content">
        <div className={classes.root}>
          <Paper>
            <div className={classes.paperPaddingRightLeft}>
              <div className="py-4">
                <Paper elevation={0} className={classNames(classes.paperHeading, classes.headingAlignment)}>
                  <h3 style={{}}>Sub-Admin Management</h3>
                  <SearchBar
                    // value={searched}
                    className="heightfix"
                    onChange={(searchVal) => requestSearch(searchVal)}
                    onCancelSearch={() => cancelSearch()}
                    placeholder="Search by Email"
                  />
                  <Button
                    variant="contained"
                    className="buttoncss"
                    style={{ backgroundColor: "#0294b3", color: "#fff" }}
                    onClick={() => {
                      // props.history.push({
                      //   pathname: "/AddEdit_SubAdmin",
                      // });
                      setIsSubAdmin(true)
                    }}
                  >
                    ADD Sub-Admin
                  </Button>
                </Paper>

                {/* //new design */}

                {/* <br /> */}

                {/* status end */}

                <Paper>
                  <TableContainer className={classes.container}>
                    <Table className={classes.table} stickyHeader>
                      <TableHead>
                        <TableRow>
                          <TableCell style={{ fontWeight: "bold",textAlign: "center" }}>Sr. No.</TableCell>
                          <TableCell style={{ fontWeight: "bold",textAlign: "center" }}> Email ID</TableCell>
                          <TableCell style={{ textAlign: "center", fontWeight: "bold" }}>Role</TableCell>
                          <TableCell style={{ textAlign: "center", fontWeight: "bold" }}>Status</TableCell>

                          <TableCell style={{ textAlign: "center", fontWeight: "bold" }}>Actions</TableCell>
                          {/* <TableCell>User Type</TableCell>
                              <TableCell>Status</TableCell> */}
                        </TableRow>
                      </TableHead>

                      <TableBody>
                        {isLoading ? (
                          <TableRow>
                            <Skeleton
                              style={{ width: "70vw", borderRadius: "20px" }}
                              highlightColor="#fff"
                              height="1rem"
                              count={2}
                              baseColor="#ebebeb"
                            />
                          </TableRow>
                        ) : (
                          false
                        )}
                        {tableData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((category, index) => (
                          <TableRow hover key={index}>
                            <TableCell component="th" scope="row" className={classes.textMiddle} style={{ textAlign: "center" }}>
                              {index + 1 + page * rowsPerPage}
                            </TableCell>
                            <TableCell className={classes.textMiddle} style={{ textAlign: "center" }}>{get(category, "email", "N/A")}</TableCell>

                            <TableCell style={{ textAlign: "center",textTransform:"capitalize" }}>{get(category, "roll_access_id.roll_name", "N/A")}</TableCell>
                            <TableCell style={{ textAlign: "center" }}>
                            {get(category,"status","N/A")==0?<div style={{display:"flex"}}><span style={{flex:1}}></span><span
                                      style={{
                                        backgroundColor: "#f29339",
                                        color: "white",
                                        padding: "7px 20px",
                                        borderRadius: "100px",
                                       
                                        // boxShadow: "0 0.5em 1.5em -0.5em #f7f765",
                                      }}
                                    >
                                      Pending
                                    </span> {get(category,"status","N/A")==0?
                              <span style={{fontSize:"0.7rem",textDecoration:"underline",color:"navy",cursor:"pointer", flex:1,alignSelf:"center"}} onClick={()=>resendEmail(category._id)}>Resend Email      </span>:false}</div>:<span
                                      style={{
                                        backgroundColor: "#0294b3",
                                        color: "white",
                                        padding: "7px 20px",
                                        borderRadius: "100px",
                                       
                                      //  alignItems:"end"
                                        // boxShadow: "0 0.5em 1.5em -0.5em #8febff",
                                      }}
                                    >
                                      Active
                                    </span>}
                            </TableCell>
                            <TableCell className={classes.textMiddle} style={{ textAlign: "center" }}>
                              <Button
                                onClick={() => {
                                  // props.history.push({
                                  //   pathname: "/AddEdit_SubAdmin",
                                  //   state: category,
                                  // });
                                  let selectedData=optionsData.filter((ele)=>ele.value ===category.roll_access_id._id)
                                 setSelectedOption(selectedData)
                                  setSubAdminData({ email:category.email,
                                  roll_access_id:category.roll_access_id._id,
                                  _id:category._id})
                                  setIsSubAdmin(true)
                                }}
                                className=""
                                style={{ border: "1.5px solid #F6F6F6", margin: "0.5rem", color: "#0294b3" }}
                              >
                                <Tooltip title="Edit" arrow>
                                  <EditIcon />
                                </Tooltip>
                              </Button>
                              <Tooltip title={"Block/Unblock"} arrow> 
                              <Android12Switch
                                onChange={(e) => {
                                  statusSwitch(e, category._id);
                                }}
                                checked={!category.is_blocked}
                                // disabled={get(category,"status","N/A")==0?true:false}
                              /></Tooltip>
                             
                              {/* <Button onClick={()=>BlockCategory} style={{backgroundColor:"#696969"}} >Manage</Button> */}

                              {/* <Button onClick={()=>BlockCategory} style={{backgroundColor:"#696969"}} >Manage</Button> */}

                              {/* <Button
                                className=""
                                style={{ border: "1.5px solid #F6F6F6", margin: "0.5rem", color: "#696969" }}
                                onClick={() => {
                                  deleteSubAdmin(category.email);
                                }}
                              >
                                <Tooltip title="Delete Category" arrow>
                                  <DeleteOutline />
                                </Tooltip>{" "}
                              </Button> */}
                              {/* <Button onClick={()=>BlockCategory} style={{backgroundColor:"#696969"}} >Manage</Button> */}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={tableData.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
                </Paper>
              </div>
            </div>
          </Paper>
        </div>
      </div>
      <Modal
        className="addRoleModal"
        isOpen={isSubAdmin}
        onClose={() => {
          setIsSubAdmin(false)
          setSubAdminData({ email:"",
          roll_access_id:"",
          _id:""})
          setSelectedOption([])
        }}
        // fullWidth
        maxWidth='400px'
        title={
          <div className="modalsign">
            <div
              className="closeicon"
              onClick={() => {
                setIsSubAdmin(false)
                setSubAdminData({ email:"",
                roll_access_id:"",
                _id:""})
                setSelectedOption([])
              }}
            >
              <i className="fas fa-times"></i>
            </div>
          </div>
        }
        content={
          <>

            <Formik
              enableReinitialize
              initialValues={subAdminData}
              // validateOnChange
              onSubmit={handleSubAdmin}
              validate={SubAdminManagementValidator}
            >
              {(formikBag) => {
                return (
                  <Form >
                    <div style={{height:"auto"}}>
                    <CategoryBox>
                      <CatTitle>{subAdminData._id ? "Edit" : "Add"} SubAdmin</CatTitle>
                      <CatRow>
                        <CatLabel>Email:</CatLabel>
                        <Field name="email">
                          {({ field }) => (
                            <div className="py-2">
                              <Input
                                {...field}
                                type="text"
                                value={formikBag.values.email}
                                onChange={(e) => {
                                  formikBag.setFieldValue("email", e.target.value);
                                }}
                                style={{ color: "black" }}
                                placeholder="Enter Email"
                                className="form-control"
                                error={
                                  formikBag.touched.email &&
                                    formikBag.errors.email
                                    ? formikBag.errors.email
                                    : null
                                }
                              />
                            </div>
                          )}
                        </Field>
                      </CatRow>
                      <CatRow>
                        <CatLabel>Role:</CatLabel>
                        <Select
            placeholder="Select Role"
            value={selectedOption}
            onChange={e => handleChange(e, formikBag.setFieldValue)}
            isSearchable={false}
            isMulti={false}
            options={optionsData}
            // getOptionLabel={(e) => (
            //   <div style={{ display: "flex", alignItems: "center" }}>
            //     {e.icon}
            //     <span style={{ marginLeft: 5 }}>{e.label}</span>
            //   </div>
            // )}
          />
                        {
                          formikBag.errors.role ? (
                          <p
                            style={{
                              paddingTop: 5,
                              fontSize: 13,
                              color: "red"
                            }}>
                            {formikBag.errors.role}
                          </p>
                        ) : null}
                      </CatRow>
                    </CategoryBox>
                    <ButtonBox>
                      <CatButton type="submit">Save</CatButton>
                    </ButtonBox>
                    </div>
                  </Form>
                );
              }}
            </Formik>
          </>
        }
      />
        {isLoading && <Overlay />}
    </React.Fragment>
  );
}
