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
import { Formik, Field, Form } from "formik";

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
import { DeleteOutline, WidgetsOutlined } from "@material-ui/icons";
import { Modal } from '../../components/Modal/Modal';
import { CategoryBox, CatRow, CatLabel, ButtonBox, CatButton, CatTitle } from "../CategoryManagement/CategoryElements"
import Input from "../../components/Input"
import Select from "react-select"
import Overlay from "../../components/Overlay";
import { roleManagementValidator } from "../../utils/validators"
import "./Role.css"

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
  }, []);

  //get content
  const getCategoriesContent = async () => {
    try {
      const { data } = await axios.get("/admin/get_roll_management");
      console.log(data);
      setTableData(data.data);
      setSearchedData(data.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  // edit category itself

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
  const [isRole,setIsRole]=useState(false)
  const [roleData,setRoleData]=useState({
    roll_name:"",
    roll_access:[],
    _id:""
  })
  const [selectedOption,setSelectedOption]=useState([])

  const requestSearch = (searchedVal) => {
    console.log(searchedVal);

    const filteredRows = searchedData.filter((row) => {
      let roll_name = row.roll_name;
      return roll_name.toLowerCase().includes(searchedVal.toLowerCase());
    });
    setTableData(filteredRows);
  };

  const cancelSearch = () => {
    getCategoriesContent();
    // setSearched("");
    //  console.log(searchedData);
    //  requestSearch()
  };
  const deleteRole = async (id) => {
    if (window.confirm("Are you sure you want to delete this Role?")) {
      try {
        const { data } = await axios.post(`/admin/delete_roll_management`, {
          role_id: id,
        });
        getCategoriesContent();
        toast.success(data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      } catch (err) {
        console.log(err);
        toast.error(err.response.data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } else {
      getCategoriesContent();
    }
  };
  const handleChange =(e, setFieldValue)=>{
    setSelectedOption(e)
console.log(e)
let result = !e?[]:e.map(a => a.value);
// setRoleData({...roleData,access:result})
setFieldValue("roll_access",result)
console.log(result)

// setRoleData(...roleData,{access:result})
  }
  const optionsArray=[ 
    { label: "Dashboard",value: "Dashboard" },
    { label: "Subscribed User Listing",value: "Subscribed User Listing" },

  { label: "Account Management",value: "Account Management" },
  { label: "Question Category Management",value: "Question Category Management" },
  { label: "Subscription Management",value:"Subscription Management" },
  // { label: "SubAdmin Management" },
  { label: "Blog Management",value: "Blog Management" },
  { label: "Notification Management",value: "Notification Management" },
  { label: "Member Price Management",value: "Member Price Management" },
  { label: "Press Management",value: "Press Management" },
  { label: "Testimonial Management",value: "Testimonial Management" },
  { label: "FAQ Management",value: "FAQ Management" },
  { label: "Content Management",value: "Content Management" },
  { label: "Accounting",value: "Accounting" },
  { label: "Support",value:"Support" },]


  const handleRole = async (values) => {
    console.log(values)
    setIsLoading(true)
    if (values._id) {
      try {
        const { data } = await axios.post("/admin/update_roll_management", {
          roll_name: values.roll_name,
          role_id: values._id,
          roll_access: values.roll_access
        })
        toast.success(`${data.message}`, {
          position: toast.POSITION.TOP_RIGHT,
        });
        getCategoriesContent()
        setIsLoading(false)
        setIsRole(false)
        setRoleData({roll_name:"",
        roll_access:[],
        _id:""})
        setSelectedOption([])
      } catch (error) {
        toast.error(`${error.response.data.message}`, {
          position: toast.POSITION.TOP_RIGHT,
        });
        setIsLoading(false)
        setIsRole(false)
        setRoleData({roll_name:"",
        roll_access:[],
        _id:""})
        setSelectedOption([])
      }
    }
    else {
      try {
        const { data } = await axios.post("/admin/create_roll_management", {
          roll_name: values.roll_name,
          roll_access: values.roll_access
        })
        toast.success(`${data.message}`, {
          position: toast.POSITION.TOP_RIGHT,
        });
        getCategoriesContent()
        setIsLoading(false)
        setIsRole(false)
        setRoleData({roll_name:"",
        roll_access:[],
        _id:""})
        setSelectedOption([])
      } catch (error) {
        toast.error(`${error.response.data.message}`, {
          position: toast.POSITION.TOP_RIGHT,
        });
        setIsLoading(false)
        setIsRole(false)
        setRoleData({roll_name:"",
        roll_access:[],
        _id:""})
        setSelectedOption([])
      }
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
                  <h3 style={{}}>Role Management</h3>
                  <SearchBar
                    // value={searched}
                    className="heightfix"
                    onChange={(searchVal) => requestSearch(searchVal)}
                    onCancelSearch={() => cancelSearch()}
                    placeholder="Search by Role"
                  />
                  <Button
                    variant="contained"
                    className="buttoncss"
                    style={{ backgroundColor: "#0294b3", color: "#fff" }}
                    onClick={() => {
                      // props.history.push({
                      //   pathname: "/AddEdit_SubAdmin",
                      // });
                      setIsRole(true)
                    }}
                  >
                    ADD ROLE
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
                          <TableCell style={{ fontWeight: "bold",textAlign: "center" }}> Role</TableCell>
                          <TableCell style={{ textAlign: "center", fontWeight: "bold" }}>Access</TableCell>
                          {/* <TableCell style={{ textAlign: "center", fontWeight: "bold" }}>Status</TableCell> */}

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
                            <TableCell className={classes.textMiddle} style={{ textAlign: "center",textTransform:"capitalize" }}>{get(category, "roll_name", "N/A")}</TableCell>

                            <TableCell style={{ textAlign: "center" }}>{get(category, "roll_access", []).toString()}</TableCell>
                            {/* <TableCell style={{ textAlign: "center" }}>
                              <Android12Switch
                                onChange={(e) => {
                                  statusSwitch(e, category._id);
                                }}
                                checked={!category.is_blocked}
                              />
                            </TableCell> */}
                            <TableCell className={classes.textMiddle} style={{ textAlign: "center" }}>
                              <Button
                                onClick={() => {
                                  let data=category.roll_access.map((ele)=>({label:ele,value:ele}))
                                  setSelectedOption(data)
                                 setRoleData({
                                  roll_name:category.roll_name,
                                  roll_access:category.roll_access,
                                  _id:category._id
                                 })
                                 setIsRole(true)
                                }}
                                className=""
                                style={{ border: "1.5px solid #F6F6F6", margin: "0.5rem", color: "#0294b3" }}
                              >
                                <Tooltip title="Edit" arrow>
                                  <EditIcon />
                                </Tooltip>
                              </Button>
                              {/* <Button onClick={()=>BlockCategory} style={{backgroundColor:"#696969"}} >Manage</Button> */}

                              {/* <Button onClick={()=>BlockCategory} style={{backgroundColor:"#696969"}} >Manage</Button> */}

                              <Button
                                className=""
                                style={{ border: "1.5px solid #F6F6F6", margin: "0.5rem", color: "#696969" }}
                                onClick={() => {
                                  deleteRole(category._id);
                                }}
                              >
                                <Tooltip title="Delete" arrow>
                                  <DeleteOutline />
                                </Tooltip>{" "}
                              </Button>
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
        isOpen={isRole}
        onClose={() => {
          setIsRole(false)
          setRoleData({roll_name:"",
          roll_access:[],
          _id:""})
        }}
        // fullWidth
        maxWidth='400px'
        title={
          <div className="modalsign">
            <div
              className="closeicon"
              onClick={() => {
                setIsRole(false)
                setRoleData({roll_name:"",
                roll_access:[],
                _id:""})
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
              initialValues={roleData}
              // validateOnChange
              onSubmit={handleRole}
              validate={roleManagementValidator}
            >
              {(formikBag) => {
                return (
                  <Form >
                    <div style={{height:"auto"}}>
                    <CategoryBox>
                      <CatTitle>{roleData._id ? "Edit" : "Add"} Role</CatTitle>
                      <CatRow>
                        <CatLabel>Name:</CatLabel>
                        <Field name="roll_name">
                          {({ field }) => (
                            <div className="py-2">
                              <Input
                                {...field}
                                type="text"
                                value={formikBag.values.roll_name}
                                onChange={(e) => {
                                  formikBag.setFieldValue("roll_name", e.target.value);
                                }}
                                style={{ color: "black" }}
                                placeholder="Enter Name"
                                className="form-control"
                                error={
                                  formikBag.touched.roll_name &&
                                    formikBag.errors.roll_name
                                    ? formikBag.errors.roll_name
                                    : null
                                }
                              />
                            </div>
                          )}
                        </Field>
                      </CatRow>
                      <CatRow>
                        <CatLabel>Panels:</CatLabel>
                        <Select
            placeholder="Select Panels"
            value={selectedOption}
            onChange={e => handleChange(e, formikBag.setFieldValue)}
            isSearchable={false}
            isMulti={true}
            options={optionsArray}
            // getOptionLabel={(e) => (
            //   <div style={{ display: "flex", alignItems: "center" }}>
            //     {e.icon}
            //     <span style={{ marginLeft: 5 }}>{e.label}</span>
            //   </div>
            // )}
          />
                        {
                          formikBag.errors.panel ? (
                          <p
                            style={{
                              paddingTop: 5,
                              fontSize: 13,
                              color: "red"
                            }}>
                            {formikBag.errors.panel}
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
