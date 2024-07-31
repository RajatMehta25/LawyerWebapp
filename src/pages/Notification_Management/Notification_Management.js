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
import { MainBox, RowBox, RowLabel, RowInput, RowDesc, RowButton, SubmitButton, RadioLabel, OverLayBox, BoxOne, BoxTwo, CommonRow, SelectBox, MainNote } from "./NotificaitonElements"
import { notificationValidator } from "../../utils/validators"
import Input from '../../components/Input';
import TextArea from '../../components/TextArea';
import Select from "../../components/Select"
import Overlay from "../../components/Overlay";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "90vh",
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
    position: "relative",
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
    maxHeight: '37vh',
  },
  paperPaddingRightLeft: {
    padding: '0rem 1rem',

  },
}));


const NotificationManagement = (props) => {

  const [tableData, setTableData] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  // const [speedDialOpen, setSpeedDialOpen] = useState(false);
  const [userType, setUserType] = useState([]);
  const [buttoncolor, setButtoncolor] = useState();
  const [viewSelected, setViewSelected] = useState([]);
  const [selected, setSelected] = useState([]);
  const [notiValues, setNotiValues] = useState({
    title: "",
    description: ""
  })
  // const [arraydata,setArrayData]=useState();
  const [isSelect, setIsSelect] = useState({ isAll: true, isSelectUser: false });
  const [viewButton, setViewButton] = useState(false)
  const [selectValue, setSelectValue] = useState()
  const [selectOptions, setSelectOptions] = useState([])
  const [indiData, setIndiData] = useState([])
  const [agentData, setAgentData] = useState([])
  const [manageData, setManageData] = useState([])
  const [lawData, setLawData] = useState([])
  const [proData, setProData] = useState([])
  // const [subsData, setSubsData] = useState([])
  const [indiDataSelect, setIndiDataSelect] = useState([])
  const [agentDataSelect, setAgentDataSelect] = useState([])
  const [manageDataSelect, setManageDataSelect] = useState([])
  const [lawDataSelect, setLawDataSelect] = useState([])
  const [proDataSelect, setProDataSelect] = useState([])
  const [subsDataSelect, setSubsDataSelect] = useState([])
  // For Pagination
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [searchedData, setSearchedData] = useState([]);
  const [searched, setSearched] = useState("");
  const [selectAllText, setSelectAllText] = useState("")
  const classes = useStyles();
  //  data from previous page
  // const {
  //   location: { state },
  // } = props;


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
    getCategory()
    getUserType()
  }, [])
  //search logic 


  const requestSearch = (searchedVal) => {
    // console.log(searchedVal);
    if (userType == "61b0df509d05e9e75bdf4fc3") {
      const filteredRows = searchedData.filter((row) => {
        // console.log(row)
        let name = get(row, "firstName", "") + " " + get(row, "lastName", "");
        let email = get(row, "email", "");
        return name.toLowerCase().includes(searchedVal?.toLowerCase()) || email.toLowerCase().includes(searchedVal?.toLowerCase());
      });
      setIndiData(filteredRows);
    }
    else if (userType == "61b0df509d05e9e75bdf4fc4") {
      const filteredRows = searchedData.filter((row) => {
        // console.log(row)
        let name = get(row, "firstName", "") + " " + get(row, "lastName", "");
        let email = get(row, "email", "");
        return name.toLowerCase().includes(searchedVal?.toLowerCase()) || email.toLowerCase().includes(searchedVal?.toLowerCase());
      });
      setAgentData(filteredRows);
    }
    else if (userType == "61b0df509d05e9e75bdf4fc5") {
      const filteredRows = searchedData.filter((row) => {
        // console.log(row)
        let name = get(row, "firstName", "") + " " + get(row, "lastName", "");
        let email = get(row, "email", "");
        return name.toLowerCase().includes(searchedVal?.toLowerCase()) || email.toLowerCase().includes(searchedVal?.toLowerCase());
      });
      setManageData(filteredRows);
    }
    else if (userType == "61b0df509d05e9e75bdf4fc6") {
      const filteredRows = searchedData.filter((row) => {
        // console.log(row)
        let name = get(row, "firstName", "") + " " + get(row, "lastName", "");
        let email = get(row, "email", "");
        return name.toLowerCase().includes(searchedVal?.toLowerCase()) || email.toLowerCase().includes(searchedVal?.toLowerCase());
      });
      setLawData(filteredRows);
    }
    else if (userType == "61b0df509d05e9e75bdf4fc7") {
      const filteredRows = searchedData.filter((row) => {
        // console.log(row)
        let name = get(row, "firstName", "") + " " + get(row, "lastName", "");
        let email = get(row, "email", "");
        return name.toLowerCase().includes(searchedVal?.toLowerCase()) || email.toLowerCase().includes(searchedVal?.toLowerCase());
      });
      setProData(filteredRows);
    }
  }
  const cancelSearch = () => {
    getCategory();
    requestSearch();
    setSearched("");
  }

  const getUserType = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get("/admin/get_users_types");
      // console.log(data);
      setUserType(data.userType[0]?._id);
      // getCategory()
      setIsLoading(false);
      setSelectOptions(data.userType.map((val, ind) => {
        return {
          label: val.title,
          value: val._id
        }
      }))
      // console.log(data.userType)
    } catch (error) {
      console.log(error);
      toast.error(`${error?.response?.data?.message}`, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setIsLoading(false);
      // setIsloading(false);
    }
  };
  const getCategory = async () => {
    setIsLoading(true)
    try {
      const { data } = await axios.post("/admin/new_get_users_list");
      // console.log(data);
      setIndiData(data?.users?.filter(val => val.userType?._id === "61b0df509d05e9e75bdf4fc3"))
      setAgentData(data?.users?.filter(val => val.userType?._id === "61b0df509d05e9e75bdf4fc4"))
      setManageData(data?.users?.filter(val => val.userType?._id === "61b0df509d05e9e75bdf4fc5"))
      setLawData(data?.users?.filter(val => val.userType?._id === "61b0df509d05e9e75bdf4fc6"))
      setProData(data?.users?.filter(val => val.userType?._id === "61b0df509d05e9e75bdf4fc7"))
      // setSubsData(data?.users?.filter(val => val.userType?._id === "61b0df509d05e9e75bdf4fc8"))
      setTableData(data.users);
      setSearchedData(data.users);
      setIsLoading(false);
    }
    catch (error) {
      console.log(error);
      toast.error(`${error?.response?.data?.message}`, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setIsLoading(false);
      // getCategory(defaultID)
    }
  }
  const handleCheckboxClick = (e) => {
    // console.log(e.target);
    const { name, checked } = e.target;
    // console.log(id);

    // console.log(name);

    if (userType == "61b0df509d05e9e75bdf4fc3") {
      if (name === "selectAll") {
        let tempuser = indiData.map(user => {
          return { ...user, isChecked: checked };
        });
        setIndiData(tempuser);
        let NotificationUserData = tempuser.filter(user => user?.isChecked === true);

        // console.log(NotificationUserData)
        var NotificationUserDataID = NotificationUserData.map(user => user._id);
        setIndiDataSelect(NotificationUserDataID)
      }
      else {
        let tempuser = indiData.map((user) =>
          user.firstName + user.email === name ? { ...user, isChecked: checked } : user
        );

        setIndiData(tempuser);
        let NotificationUserData = tempuser.filter(user => user?.isChecked === true);
        // console.log(NotificationUserData)
        var NotificationUserDataID = NotificationUserData.map(user => user._id);
        // console.log(NotificationUserDataID);
        setIndiDataSelect(NotificationUserDataID)
        // setViewSelected(...viewSelected, NotificationUserDataID)
      }
    }
    else if (userType == "61b0df509d05e9e75bdf4fc4") {
      if (name === "selectAll") {
        let tempuser = agentData.map(user => {
          return { ...user, isChecked: checked };
        });
        setAgentData(tempuser);
        let NotificationUserData = tempuser.filter(user => user?.isChecked === true);

        // console.log(NotificationUserData)
        var NotificationUserDataID = NotificationUserData.map(user => user._id);
        setAgentDataSelect(NotificationUserDataID)
      }
      else {
        let tempuser = agentData.map((user) =>
          user.firstName + user.email === name ? { ...user, isChecked: checked } : user
        );

        setAgentData(tempuser);
        let NotificationUserData = tempuser.filter(user => user?.isChecked === true);
        // console.log(NotificationUserData)
        var NotificationUserDataID = NotificationUserData.map(user => user._id);
        // console.log(NotificationUserDataID);
        setAgentDataSelect(NotificationUserDataID);
        setViewSelected(...viewSelected, NotificationUserDataID)
      }
    }
    else if (userType == "61b0df509d05e9e75bdf4fc5") {
      if (name === "selectAll") {
        let tempuser = manageData.map(user => {
          return { ...user, isChecked: checked };
        });
        setManageData(tempuser);
        let NotificationUserData = tempuser.filter(user => user?.isChecked === true);

        // console.log(NotificationUserData)
        var NotificationUserDataID = NotificationUserData.map(user => user._id);
        setManageDataSelect(NotificationUserDataID)
      }
      else {
        let tempuser = manageData.map((user) =>
          user.firstName + user.email === name ? { ...user, isChecked: checked } : user
        );

        setManageData(tempuser);
        let NotificationUserData = tempuser.filter(user => user?.isChecked === true);
        // console.log(NotificationUserData)
        var NotificationUserDataID = NotificationUserData.map(user => user._id);
        // console.log(NotificationUserDataID);
        setManageDataSelect(NotificationUserDataID);

        setViewSelected([...viewSelected, NotificationUserDataID])
      }
    }
    else if (userType == "61b0df509d05e9e75bdf4fc6") {
      if (name === "selectAll") {
        let tempuser = lawData.map(user => {
          return { ...user, isChecked: checked };
        });
        setLawData(tempuser);
        let NotificationUserData = tempuser.filter(user => user?.isChecked === true);

        // console.log(NotificationUserData)
        var NotificationUserDataID = NotificationUserData.map(user => user._id);
        setLawDataSelect(NotificationUserDataID)
      }
      else {
        let tempuser = lawData.map((user) =>
          user.firstName + user.email === name ? { ...user, isChecked: checked } : user
        );

        setLawData(tempuser);
        let NotificationUserData = tempuser.filter(user => user?.isChecked === true);
        // console.log(NotificationUserData)
        var NotificationUserDataID = NotificationUserData.map(user => user._id);
        // console.log(NotificationUserDataID);
        setLawDataSelect(NotificationUserDataID);

        setViewSelected([...viewSelected, NotificationUserDataID])
      }
    }
    else if (userType == "61b0df509d05e9e75bdf4fc7") {
      if (name === "selectAll") {
        let tempuser = proData.map(user => {
          return { ...user, isChecked: checked };
        });
        setProData(tempuser);
        let NotificationUserData = tempuser.filter(user => user?.isChecked === true);

        // console.log(NotificationUserData)
        var NotificationUserDataID = NotificationUserData.map(user => user._id);
        setProDataSelect(NotificationUserDataID)
      }
      else {
        let tempuser = proData.map((user) =>
          user.firstName + user.email === name ? { ...user, isChecked: checked } : user
        );

        setProData(tempuser);
        let NotificationUserData = tempuser.filter(user => user?.isChecked === true);
        // console.log(NotificationUserData)
        var NotificationUserDataID = NotificationUserData.map(user => user._id);
        // console.log(NotificationUserDataID);
        setProDataSelect(NotificationUserDataID);

        setViewSelected([...viewSelected, NotificationUserDataID]);
      }
    }
    else {
      return ""
    }
  }
  const handleNotification = async (values, resetForm) => {
    console.log(values)
    let selectData = [...indiDataSelect, ...agentDataSelect, ...manageDataSelect, ...lawDataSelect, ...proDataSelect]
    if (isSelect.isAll) {
      console.log("All")
      try {
        const { data } = await axios.post("/admin/new_customNotification", {
          title: values.title,
          message: values.description,
          notification_all: true
        })
        // window.location.reload();
        setIsSelect({ isAll: true, isSelectUser: false });
        setNotiValues({
          title: "",
          description: ""
        })
        setViewSelected([]);
        getCategory();
        resetForm();
        toast.success(data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      } catch (error) {
        toast.error(`${error.response.data.message}`, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    }
    else {
      // console.log("Single")
      if (selectData.length === 0) {
        // alert("Select at least one account");
        toast.error(`Select at least one account`, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
      else {
        try {
          const { data } = await axios.post("/admin/new_customNotification", {
            title: values.title,
            message: values.description,
            user_ids: selectData
          })
          setIsSelect({ isAll: true, isSelectUser: false });
          // setViewSelected([]);
          setIndiDataSelect([])
          setAgentDataSelect([])
          setManageDataSelect([])
          setLawDataSelect([])
          setProDataSelect([])
          getCategory();
          setNotiValues({
            title: "",
            description: ""
          })
          setViewButton(false);
          // window.location.reload();
          resetForm();
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
  }
  // console.log(viewSelected)
  // console.log(userType)
  // console.log(indiData)
  return (
    <React.Fragment>
      <div className="page-content">
        {/* <div className={classes.root}> */}
        <Paper className={classes.root}>
          <div className={classes.paperPaddingRightLeft}>
            <div className="py-4">
              <Paper elevation={0} className={classNames(classes.paperHeading, classes.headingAlignment)}>
                <h3>Notification Management</h3>
              </Paper>
              <Formik
                enableReinitialize
                initialValues={notiValues}
                validateOnChange
                onSubmit={(val, { resetForm }) => handleNotification(val, resetForm)}
                validate={notificationValidator}
              >
                {(formikBag) => {
                  return (
                    <Form style={{ width: "100%" }}>
                      <MainNote>
                        <MainBox widSize={isSelect.isSelectUser}>
                          <RowBox>
                            <RowLabel>
                              Title
                            </RowLabel>
                            <Field name="title">
                              {({ field }) => (
                                <div className="py-2">
                                  <Input
                                    {...field}
                                    type="text"
                                    value={formikBag.values.title}
                                    onChange={(e) => {
                                      formikBag.setFieldValue("title", e.target.value);
                                    }}
                                    style={{ color: "black" }}
                                    placeholder="Title"
                                    error={
                                      formikBag.touched.title &&
                                        formikBag.errors.title
                                        ? formikBag.errors.title
                                        : null
                                    }
                                  />
                                </div>
                              )}
                            </Field>
                          </RowBox>
                          <RowBox>
                            <RowLabel>
                              Description
                            </RowLabel>
                            <Field name="description">
                              {({ field }) => (
                                <div className="py-2">
                                  <TextArea
                                    {...field}
                                    type="text"
                                    value={formikBag.values.description}
                                    onChange={(e) => {
                                      formikBag.setFieldValue("description", e.target.value);
                                    }}
                                    style={{ color: "black", height: isSelect.isSelectUser ? "130px" : "100px" }}
                                    row="15"
                                    placeholder="Description (Max 500 characters)"
                                    className="form-control"
                                    error={
                                      formikBag.touched.description &&
                                        formikBag.errors.description
                                        ? formikBag.errors.description
                                        : null
                                    }
                                  />
                                </div>
                              )}
                            </Field>
                          </RowBox>
                          <SelectBox>
                            <h5>Select</h5>
                            <form>
                              <div style={{ display: 'flex' }}>
                                <div>
                                  <input type="radio" style={{ marginRight: '10px', marginLeft: '10px' }} checked={isSelect.isAll} name="user" onClick={() => {
                                    setIsSelect({
                                      isAll: true,
                                      isSelectUser: false
                                    })
                                    // setSelectAllText("All")
                                    setViewButton(false)
                                    setViewSelected([]);
                                    getCategory();
                                  }} />
                                  <RadioLabel>All</RadioLabel>
                                </div>
                                <div>
                                    <input type="radio" style={{ marginRight: '10px', marginLeft: '10px' }} checked={isSelect.isSelectUser} name="user" onClick={() => {
                                      setIsSelect({
                                        isAll: false,
                                        isSelectUser: true
                                      })
                                      setViewButton(true)
                                    }} />
                                    <RadioLabel>Select User</RadioLabel>
                                  </div>
                                
                              </div>
                            </form>
                          </SelectBox>
                          <RowButton>
                            {
                              viewButton ? "" : <SubmitButton type='submit' style={{ cursor: isSelect.isSelectUser ? viewSelected.length === 0 ? "not-allowed" : "pointer" : "" }} disabled={isSelect.isSelectUser ? viewSelected.length === 0 ? true : false : ""}>Send</SubmitButton>
                            }

                            {/* {
                              viewSelected.length > 0 ? isSelect.isSelectUser ? "" : <SubmitButton style={{ marginLeft: "1rem" }} type='button' onClick={() => {
                                setIsSelect({
                                  isAll: false,
                                  isSelectUser: true
                                })
                              }
                              }>View</SubmitButton> : ""
                            } */}
                          </RowButton>
                        </MainBox>
                        {
                          isSelect.isSelectUser ? <OverLayBox>
                            {/* <BoxOne>
                        </BoxOne> */}
                            <BoxTwo>
                              <CommonRow>
                                <div style={{ width: "100%", zIndex: "10" }}>
                                  <Select
                                    className="cm-select"
                                    value={selectValue || selectOptions[0]}
                                    options={selectOptions}
                                    onChange={(option) => {
                                      setSelectValue(option);
                                      setUserType(option.value);
                                    }}
                                    // className="form-control"
                                    placeholder="Select"
                                  />
                                </div>
                              </CommonRow>
                              <div style={{ paddingBottom: "5px", marginBottom: "0.5rem" }}>
                                <SearchBar
                                  className="heightfix"
                                  value={searched}
                                  onChange={(searchVal) => requestSearch(searchVal)}
                                  onCancelSearch={() => cancelSearch()}
                                  placeholder="Search by Name and Email"
                                />
                              </div>
                              {/* Individual */}
                              {
                                userType === "61b0df509d05e9e75bdf4fc3" ? <Paper>
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
                                              checked={indiData.filter((user) => user?.isChecked !== true).length < 1}
                                              onChange={(e) => {
                                                handleCheckboxClick(e);
                                                // formikBag.setFieldValue("selectVal", e.target.checked);
                                              }}
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
                                          indiData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((category, index) => (
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
                                                  onChange={(e) => {
                                                    handleCheckboxClick(e);
                                                    // formikBag.setFieldValue("selectVal", e.target.checked);
                                                  }}
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
                                    count={indiData.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    onPageChange={handleChangePage}
                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                  />
                                </Paper> : ""
                              }
                              {/* Agent */}
                              {
                                userType === "61b0df509d05e9e75bdf4fc4" ? <Paper>
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
                                              checked={agentData.filter((user) => user?.isChecked !== true).length < 1}
                                              onChange={(e) => {
                                                handleCheckboxClick(e);
                                                // formikBag.setFieldValue("selectVal", e.target.checked);
                                              }}
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
                                          agentData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((category, index) => (
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
                                                  onChange={(e) => {
                                                    handleCheckboxClick(e);
                                                    // formikBag.setFieldValue("selectVal", e.target.checked);
                                                  }}
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
                                    count={agentData.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    onPageChange={handleChangePage}
                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                  />
                                </Paper> : ""
                              }
                              {/* Management */}
                              {
                                userType === "61b0df509d05e9e75bdf4fc5" ? <Paper>
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
                                              checked={manageData.filter((user) => user?.isChecked !== true).length < 1}
                                              onChange={(e) => {
                                                handleCheckboxClick(e);
                                                // formikBag.setFieldValue("selectVal", e.target.checked);
                                              }}
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
                                          manageData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((category, index) => (
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
                                                  onChange={(e) => {
                                                    handleCheckboxClick(e);
                                                    // formikBag.setFieldValue("selectVal", e.target.checked);
                                                  }}
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
                                    count={manageData.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    onPageChange={handleChangePage}
                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                  />
                                </Paper> : ""
                              }
                              {/* Lawyer */}
                              {
                                userType === "61b0df509d05e9e75bdf4fc6" ? <Paper>
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
                                              checked={lawData.filter((user) => user?.isChecked !== true).length < 1}
                                              onChange={(e) => {
                                                handleCheckboxClick(e);
                                                // formikBag.setFieldValue("selectVal", e.target.checked);
                                              }}
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
                                          lawData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((category, index) => (
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
                                                  onChange={(e) => {
                                                    handleCheckboxClick(e);
                                                    // formikBag.setFieldValue("selectVal", e.target.checked);
                                                  }}
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
                                    count={lawData.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    onPageChange={handleChangePage}
                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                  />
                                </Paper> : ""
                              }
                              {/* Production */}
                              {
                                userType === "61b0df509d05e9e75bdf4fc7" ? <Paper>
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
                                              checked={proData.filter((user) => user?.isChecked !== true).length < 1}
                                              onChange={(e) => {
                                                handleCheckboxClick(e);
                                                // formikBag.setFieldValue("selectVal", e.target.checked);
                                              }}
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
                                          proData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((category, index) => (
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
                                                  onChange={(e) => {
                                                    handleCheckboxClick(e);
                                                    // formikBag.setFieldValue("selectVal", e.target.checked);
                                                  }}
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
                                    count={proData.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    onPageChange={handleChangePage}
                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                  />
                                </Paper> : ""
                              }
                              {/* {
                                isSelect.isButtonSubmit ? <RowButton>
                                  <SubmitButton type='button' style={{ marginTop: "1rem" }} onClick={() => {
                                    setViewSelected([...indiDataSelect, ...agentDataSelect, ...manageDataSelect, ...lawDataSelect, ...proDataSelect,]);
                                    setIsSelect({
                                      isAll: false,
                                      isSelectUser: false
                                    })

                                  }
                                  }>Save</SubmitButton>
                                </RowButton> : ""
                              } */}
                              {/* {
                                viewButton ? <RowButton style={{ marginTop: "1.5rem" }}><SubmitButton type='submit' style={{ cursor: isSelect.isSelectUser ? viewSelected.length === 0 ? "not-allowed" : "pointer" : "" }} disabled={isSelect.isSelectUser ? viewSelected.length === 0 ? true : false : ""}>Send</SubmitButton></RowButton> : ""
                              } */}
                              {
                                viewButton ? <RowButton style={{ marginTop: "1.5rem" }}><SubmitButton type='submit'>Send</SubmitButton></RowButton> : ""
                              }
                            </BoxTwo>
                          </OverLayBox> : ""
                        }
                      </MainNote>
                    </Form>
                  );
                }}
              </Formik>
            </div>
          </div>
        </Paper>
        {/* </div> */}
      </div>
		  {isLoading && <Overlay />}
    </React.Fragment>

  );
}

export default NotificationManagement;


