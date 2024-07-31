import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Checkbox } from '@material-ui/core';
import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import KErrorMessage from "./KErrorMessage";
import Button from "@material-ui/core/Button";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import axios from "../../axios";
import { toast } from "react-toastify";
import { get } from "lodash";
import Skeleton from 'react-loading-skeleton'
import './Notification_Management.css';
import { ArrowForwardIos, Send, SpeedOutlined } from '@material-ui/icons';
// import { SpeedDial, BubbleList, BubbleListItem } from 'react-speed-dial';
// import SpeedDial from '@mui/material/SpeedDial';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
// import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import { change } from 'redux-form';
// import './AddEditCategory.css'
// import {ArrowForwardIosIcon} from '@material-ui/icons-material/ArrowForwardIos';
import SearchBar from "material-ui-search-bar";
import { MainBox, InnerBox, InnerRow, CommonBox } from "./NotificaitonElements"

const useStyles = makeStyles((theme) => ({
  root: {
    flexWrap: 'wrap',
    // marginTop: '5rem',
  },
  margin: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  paperHeading: {
    padding: '1rem 0rem',
  },
  table: {
    minWidth: 650,
  },
  textMiddle: {
    verticalAlign: 'middle !important',
  },
  iconMargin: {
    margin: '0.4rem',
    color: "#fff",
    backgroundColor: "#696969",
    '&:hover': {
      // backgroundColor: "yellow",
      color: "black"
    }
  },

  iconcolor: {
    margin: '0.4rem',
    color: "#fff !important",
    backgroundColor: "#0294b3 !important"
  },
  headingButton: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: "10px"
  },
  headingAlignment: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    // padding: "0 2rem 0 2rem"
    alignItems: 'center',
    flexWrap: 'wrap',
    ['@media (max-width:780px)']: { // eslint-disable-line no-useless-computed-key
      flexDirection: 'column',
      width: '100%',
      gap: '1rem',
      justifyContent: 'center',
      textAlign: 'center',
    }
  },
  addNewCategory: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    ['@media (max-width:780px)']: { // eslint-disable-line no-useless-computed-key
      flexDirection: 'column',
      width: '100%',
      gap: '1rem',
      justifyContent: 'center',
      textAlign: 'center',
    }
  },
  addNewCategoryHeading: {
    textAlign: "center",
    flex: 1,
    paddingBottom: "0 !important",
    ['@media (max-width:780px)']: { // eslint-disable-line no-useless-computed-key
      flexDirection: 'column',
      width: '100%',
      gap: '1rem',
      justifyContent: 'center',
      textAlign: 'center',

    }

  },
  MarginControl: {
    ['@media (max-width:780px)']: { // eslint-disable-line no-useless-computed-key
      margin: "0 !important"
    }
  },
  Marginbutton: {
    margin: "0.5rem"
  },
  container: {
    maxHeight: '58vh',
  },
  paperPaddingRightLeft: {
    padding: '0rem 1rem',

  },
}));


const NotificationManagement = (props) => {

  const [tableData, setTableData] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  // const [speedDialOpen, setSpeedDialOpen] = useState(false);
  const [userType, setUserType] = useState([]);
  const [buttoncolor, setButtoncolor] = useState();
  const [selected, setSelected] = useState([]);
  const [notiValues, setNotiValues] = useState({
    NotificationTitle: "",
    NotificationDesc: "",
  })
  // const [arraydata,setArrayData]=useState();
  const classes = useStyles();
  //  data from previous page
  const {
    location: { state },
  } = props;

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
  //Validation Schema
  const validationSchema = yup.object({

    NotificationTitle: yup.string().required("Title is Required!"),
    NotificationDesc: yup
      .string()
      .min(5, "too small!")
      .max(500, "Too Long String!")
      .required("Description is Required!"),
  });
  useEffect(() => {
    // getCategory("61b0df509d05e9e75bdf4fc3")
    getUserType()
  }, [])
  //search logic 

  const [searchedData, setSearchedData] = useState([]);
  const [searched, setSearched] = useState("");

  const requestSearch = (searchedVal) => {
    // console.log(searchedVal);
    const filteredRows = searchedData.filter((row) => {
      // console.log(row)
      let name = get(row, "firstName", "") + " " + get(row, "lastName", "");
      return name.toLowerCase().includes(searchedVal?.toLowerCase());
    });
    setTableData(filteredRows);
  }
  const cancelSearch = () => {
    getUserType();
    setSearched("");
  }

  const getUserType = async () => {
    // setIsloading(true);
    try {
      const { data } = await axios.get("/admin/get_users_types");
      // console.log(data);
      setUserType(data.userType);
      getCategory(data.userType[0]._id)
      setButtonColor(data.userType[0]._id)

      console.log(data.userType)
    } catch (error) {
      console.log(error);
      // setIsloading(false);
    }
  };
  const getCategory = async (id, defaultID = "61b0df509d05e9e75bdf4fc3") => {
    try {
      if (id && id !== "undefined") {
        // const { data } = await axios.post("/admin/new_get_users_list", { userType_id: id });
        const { data } = await axios.post("/admin/new_get_users_list", { userType_id: id });
        // console.log(data);
        setTableData(data.users);
        setSearchedData(data.users);
        setIsLoading(false);
      }
      else {
      }
    }
    catch (error) {
      console.log(error);
      // getCategory(defaultID)
    }
  }
  const handleCheckboxClick = (e) => {
    // console.log(e.target);
    const { name, checked } = e.target;
    // console.log(id);

    // console.log(name);

    if (name === "selectAll") {
      let tempuser = tableData.map(user => {
        return { ...user, isChecked: checked };
      });
      setTableData(tempuser);
      let NotificationUserData = tempuser.filter(user => user?.isChecked === true);

      // console.log(NotificationUserData)
      var NotificationUserDataID = NotificationUserData.map(user => user._id);
      setSelected(NotificationUserDataID)
    }
    else {
      let tempuser = tableData.map((user) =>
        user.firstName + user.email === name ? { ...user, isChecked: checked } : user
      );

      setTableData(tempuser);
      let NotificationUserData = tempuser.filter(user => user?.isChecked === true);
      // console.log(NotificationUserData)
      var NotificationUserDataID = NotificationUserData.map(user => user._id);
      // console.log(NotificationUserDataID);
      setSelected(NotificationUserDataID)
    }
  }
  const setButtonColor = (id) => {
    if (id === "61b0df509d05e9e75bdf4fc3") {
      setButtoncolor("61b0df509d05e9e75bdf4fc3")
    }
    else if (id === "61b0df509d05e9e75bdf4fc4") {
      setButtoncolor("61b0df509d05e9e75bdf4fc4")
    }
    else if (id === "61b0df509d05e9e75bdf4fc5") {
      setButtoncolor("61b0df509d05e9e75bdf4fc5")
    }
    else if (id === "61b0df509d05e9e75bdf4fc6") {
      setButtoncolor("61b0df509d05e9e75bdf4fc6")
    }
    else if (id === "61b0df509d05e9e75bdf4fc7") {
      setButtoncolor("61b0df509d05e9e75bdf4fc7")
    }
    else if (id === "61b0df509d05e9e75bdf4fc8") {
      setButtoncolor("61b0df509d05e9e75bdf4fc8")
    }
    else {

    }
  }
  const handleNotification = async (values) => {
    console.log(values)
    if (selected.length === 0) {
      alert("Please select at least one user")
    }
    else {
      console.log("Momo")
      try {
        const { data } = await axios.post("/admin/new_customNotification", {
          title: values.NotificationTitle,
          message: values.NotificationDesc,
          user_ids: selected
        })
        window.location.reload();
        toast.success(data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      } catch (error) {
        toast.error(`${error.response.data.message}`, {
          position: toast.POSITION.TOP_RIGHT,
        });
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
                <Paper elevation={0} className={classNames(classes.paperHeading, classes.addNewCategory)}>
                  <div className={classNames(classes.addNewCategoryHeading)} > <h3 className={classNames(classes.MarginControl)} style={{ marginBottom: "-0.5rem", marginLeft: "-50px" }}>Notification Management</h3></div>
                </Paper>
                <Formik
                  validationSchema={validationSchema}
                  initialValues={notiValues}
                  onSubmit={handleNotification}
                >
                  {({ values }) => (
                    <Form>
                      <MainBox>
                        <InnerBox>
                          <InnerRow>
                            <CommonBox>
                              <label className="labelAddCategory" style={{ fontSize: "20px" }}>Title</label>
                            </CommonBox>
                            <CommonBox>
                              <Field className="fieldAddCategory" name="NotificationTitle" type="text" style={{ width: "100%", borderRadius: "5px", outline: "none", padding: "10px 10px", border: "1px solid" }} />
                              <KErrorMessage name="NotificationTitle" />
                            </CommonBox>
                          </InnerRow>
                          <InnerRow>
                            <CommonBox>
                              <label className="labelAddCategory" style={{ fontSize: "20px", display: "flex", alignItems: "center" }}>Description <span style={{ color: "grey", fontSize: "12px", marginTop: "2px", marginLeft: "3px" }}> (Max 500 characters)</span></label>
                            </CommonBox>
                            <CommonBox>
                              <Field style={{ width: "100%", borderRadius: "5px", outline: "none", padding: "10px 10px", border: "1px solid" }} className="fieldAddCategory custom_height" name="NotificationDesc" as="textarea" />
                              <KErrorMessage name="NotificationDesc" />
                            </CommonBox>
                          </InnerRow>
                          <div style={{ display: "flex", justifyContent: "center" }}><button type="submit" className="buttoncss" style={{ borderRadius: "1.5rem", border: "none", fontSize: "1rem", width: "12vw", height: "5vh", backgroundColor: "#0294b3", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}>SEND&emsp;<Send /> </button></div>
                        </InnerBox>
                      </MainBox>
                    </Form>
                  )}
                </Formik>
                <div style={{ padding: "20px 10px 20px 10px" }}>
                  {userType.map((user, index) =>
                    <Button key={index} variant="outlined" onClick={() => { getCategory(user._id); setButtonColor(user._id) }} className={buttoncolor === user._id ? classes.iconcolor : classes.iconMargin}  >{user.title}</Button>
                  )}
                </div>
                <div style={{ paddingBottom: "5px" }}>
                  <SearchBar
                    className="heightfix"
                    value={searched}
                    onChange={(searchVal) => requestSearch(searchVal)}
                    onCancelSearch={() => cancelSearch()}
                    placeholder="Name"
                  />
                </div>
                <Paper>
                  <TableContainer className={classes.container}>
                    <Table className={classes.table} stickyHeader>
                      <TableHead>
                        <TableRow >
                          <TableCell padding="checkbox">
                            <Checkbox
                              // className="checkedcolor"
                              color="primary"
                              name="selectAll"
                              // indeterminate={numSelected > 0 && numSelected < rowCount}
                              checked={tableData.filter((user) => user?.isChecked !== true).length < 1}
                              onChange={handleCheckboxClick}
                              inputProps={{
                                'aria-label': 'select all',
                              }} />
                          </TableCell>
                          <TableCell style={{ fontWeight: "bold" }}>Sr. No.</TableCell>
                          <TableCell style={{ fontWeight: "bold" }}> Name</TableCell>
                          <TableCell style={{ fontWeight: "bold" }}>Email</TableCell>

                        </TableRow>

                      </TableHead>

                      <TableBody>
                        {isLoading ? <TableRow ><Skeleton style={{ width: "70vw", borderRadius: "20px" }} highlightColor="#fff" height="1rem" count={2} baseColor="#ebebeb" /></TableRow> : false}
                        {
                          tableData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((category, index) => (

                            <TableRow
                              hover
                              //  onClick={(event) => handleClick(event, category.name)}
                              role="checkbox"
                              //  aria-checked={isItemSelected}
                              tabIndex={-1}
                              //  selected={isItemSelected}
                              key={index}>
                              <TableCell padding="checkbox">
                                <Checkbox
                                  // className="checkedcolor"
                                  color="primary"
                                  name={category.firstName + category.email}
                                  checked={category?.isChecked || false}
                                  onChange={handleCheckboxClick}
                                  inputProps={{
                                    // 'aria-labelledby': labelId,
                                  }}

                                />

                              </TableCell>
                              <TableCell component="th" scope="row" className={classes.textMiddle}>
                                {index + 1 + (page) * rowsPerPage}
                              </TableCell>
                              <TableCell className={classes.textMiddle}>{category.firstName} {category.lastName}</TableCell>

                              <TableCell className={classes.textMiddle}>{category.email}</TableCell>


                            </TableRow>))}

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
    </React.Fragment>

  );
}

export default NotificationManagement;


