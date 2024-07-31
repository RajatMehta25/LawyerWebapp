import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import axios from "../../axios";
import { toast } from "react-toastify";

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
  Tooltip,
} from "@material-ui/core";

// import { Delete } from '@material-ui/icons';
import VisibilityIcon from "@material-ui/icons/Visibility";
import BlockIcon from "@material-ui/icons/Block";
// import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import moment from "moment";
// For Table
import SearchBar from "material-ui-search-bar";
import { get, sortBy, orderBy } from "lodash";
import { change } from "redux-form";
import Container from "reactstrap/lib/Container";
import Overlay from "../../components/Overlay";

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
    margin: "0.4rem",
    color: "#fff",
    backgroundColor: "#696969",
  },
  iconcolor: {
    margin: "0.4rem",
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
    margin: "0.5rem 0.1rem",
  },
  container: {
    maxHeight: "58vh",
  },
  paperPaddingRightLeft: {
    padding: "0rem 1rem",
  },
}));

export default function TableData(props) {
  const classes = useStyles();

  const {
    location: { state7 },
  } = props;
  console.log(props.location.state7);

  const [tableData, setTableData] = useState([]);
  const [userType, setUserType] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  //setting usertype button color
  const [buttoncolor, setButtonColor] = useState("");
  //setting approved , pending , disapproved button color
  const [maindata, setMainData] = useState({
    approvedButton: "1",
    pendingButton: "",
    disapprovedButton: "",
  });
  //save main data for state7
  const [savemaindata, setSaveMainData] = useState(1);

  // setting button color based on id
  const [showApprove, setShowApprove] = useState(false);
  //state for individual user action buttons view
  const [isInidvidualuser, setIndividualUser] = useState(false);

  const [changeId, setChangeId] = useState();
  console.log("changeId", changeId);

  // const [logstate7,setLogState7]=useState([]);
  // setLogState7(state7);

  useEffect(() => {
    !state7 ? getCategory() : getReturnCategory(state7) && setChangeId(state7);
    getUserType();
    getNumbers();
  }, []);

  useEffect(() => {
    //setChangeId(state7);
    // getCategory(state7);

    setSaveMainData(window.localStorage.getItem("savemaindata"));
  }, [savemaindata]);
  console.log(props);

  console.log(
    Number(
      maindata.approvedButton ||
        maindata.pendingButton ||
        maindata.disapprovedButton
    )
  );

  useEffect(() => {
    // getCategory(changeId)
    // window.localStorage.setItem('maindata', JSON.stringify(disp));
  }, []);
  // alert(state7[0])

  // For Pagination
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [numbersData, setNumbersData] = React.useState([]);

  const handleChangePage = (event, newPage) => {
    // console.log(event);
    // console.log(newPage);
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // For Search
  const [searched, setSearched] = useState("");
  const [searchedData, setSearchedData] = useState([]);

  const requestSearch = (searchedVal) => {
    console.log(searchedVal);
    // let searchingData = searchedData.filter((ele) => ele.firstName !== "");
    // console.log(">>>>>>>>>", searchingData);
    const filteredRows = searchedData.filter((row) => {
      let name = get(row, "firstName", "") + " " + get(row, "lastName", "");
      let email = get(row, "email", "");
      let mobileNumber = JSON.stringify(row.mobileNumber);
      return (
        name.toLowerCase().includes(searchedVal?.toLowerCase()) ||
        email.toLowerCase().includes(searchedVal?.toLowerCase()) ||
        mobileNumber.toLowerCase().includes(searchedVal?.toLowerCase())
      );
      // return mobileNumber.toLowerCase().includes(searchedVal?.toLowerCase())
    });
    setTableData(filteredRows);
  };
  console.log(searchedData);
  console.log(tableData);
  const cancelSearch = () => {
    setSearched("");
    getCategory(changeId);
    if (
      // changeId === "61b0df509d05e9e75bdf4fc4" ||
      // changeId === "61b0df509d05e9e75bdf4fc5" ||
      changeId === "61b0df509d05e9e75bdf4fc6"
    ) {
      if (maindata.pendingButton === "0") {
        getCategoryPending(changeId);
      } else if (maindata.disapprovedButton === "2") {
        getCategoryDisapproved(changeId);
      } else if (maindata.approvedButton === "1") {
      }

      // requestSearch(searched);
      // console.log('cancwlled');
    }
  };

  // console.log(props);
  //put default id here
  const getCategory = async (id, defaultID = "61b0df509d05e9e75bdf4fc3") => {
    setIsLoading(true);
    try {
      if (id && id !== "undefined") {
        const { data } = await axios.post("/admin/new_get_users_list", {
          userType_id: id,
        });
        console.log(data);

        //Table data for Production and subscriber staff management
        if (
          id === "61b0df509d05e9e75bdf4fc3" ||
          id === "61b0df509d05e9e75bdf4fc7" ||
          id === "61b0df509d05e9e75bdf4fc4" ||
          id === "61b0df509d05e9e75bdf4fc5"
        ) {
          setIndividualUser(true);
          setTableData(data.users);
          setSearchedData(data.users);
          setButtonColor(id);
          setIsLoading(false);
        } else {
          console.log(data.users);
          console.log("hit");
          console.log(id);
          console.log(maindata);
          //  console.log(savemaindata);

          // setMainData({...maindata,approvedButton:"1",pendingButton:"",disapprovedButton:""})

          setTableData(
            data.users.filter((d) => {
              if (d.isapproved === 1) {
                return d;
              }
            })
          );
          console.log("approved");
          setShowApprove(true);
          //set user type button color
          setButtonColor(id);
          setIsLoading(false);
          // setTableData(data.users);
          setSearchedData(
            data.users.filter((d) => {
              if (d.isapproved === 1) {
                return d;
              }
            })
          );
        }
      } else {
        // for default loading page
        const { data } = await axios.post("/admin/new_get_users_list", {
          userType_id: defaultID,
        });
        setIndividualUser(true);
        setTableData(data.users);
        setSearchedData(data.users);
        setButtonColor(defaultID);
        setChangeId(defaultID);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      toast.error(`${error?.response?.data?.message}`, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setIsLoading(false);
    }
  };

  var saveddata = window.localStorage.getItem("savemaindata");
  console.log(saveddata);
  // console.log(tableData);
  // return category
  const getReturnCategory = async (id) => {
    setIsLoading(true);
    if (id === "61b0df509d05e9e75bdf4fc6") {
      try {
        const { data } = await axios.post("/admin/new_get_users_list", {
          userType_id: id,
        });
        console.log(savemaindata);
        if (saveddata && saveddata !== "") {
          setTableData(
            data.users.filter((d) => {
              if (d.isapproved === Number(saveddata)) {
                return d;
              }
            })
          );
          console.log("approved");
          setShowApprove(true);
          //set user type button color
          setButtonColor(id);
          setIsLoading(false);
          // setTableData(data.users);
          setSearchedData(
            data.users.filter((d) => {
              if (d.isapproved === Number(saveddata)) {
                return d;
              }
            })
          );
          showReverseButton(id);
        } else {
          setTableData(
            data.users.filter((d) => {
              if (d.isapproved === 1) {
                return d;
              }
            })
          );
          console.log("approved");
          setShowApprove(true);
          //set user type button color
          setButtonColor(id);
          setIsLoading(false);
          // setTableData(data.users);
          setSearchedData(
            data.users.filter((d) => {
              if (d.isapproved === 1) {
                return d;
              }
            })
          );
        }
      } catch (error) {
        console.log(error);
        toast.error(`${error?.response?.data?.message}`, {
          position: toast.POSITION.TOP_RIGHT,
        });
        setIsLoading(false);
      }
    } else {
      getCategory(id);
    }
  };

  // console.log(maindata);
  const getCategoryPending = async (id) => {
    setIsLoading(true);
    try {
      const { data } = await axios.post("/admin/new_get_users_list", {
        userType_id: id,
      });
      setIsLoading(false);
      console.log(data);
      setTableData(
        data.users.filter((d) => {
          if (d.isapproved === 0) {
            return d;
          }
        })
      );
      setSearchedData(
        data.users.filter((d) => {
          if (d.isapproved === 0) {
            return d;
          }
        })
      );
      // setIsloading(false);
    } catch (error) {
      console.log(error);
      toast.error(`${error?.response?.data?.message}`, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setIsLoading(false);
      // setIsloading(false);
    }
  };

  const getCategoryDisapproved = async (id) => {
    setIsLoading(true);
    try {
      const { data } = await axios.post("/admin/new_get_users_list", {
        userType_id: id,
      });
      console.log(data);
      setTableData(
        data.users.filter((d) => {
          if (d.isapproved === 2) {
            return d;
          }
        })
      );
      setSearchedData(
        data.users.filter((d) => {
          if (d.isapproved === 2) {
            return d;
          }
        })
      );
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const getUserType = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get("/admin/get_users_types");
      // console.log(data);
      setIsLoading(false);
      setUserType(data.userType);
      console.log(data.userType);
    } catch (error) {
      console.log(error);

      toast.error(`${error?.response?.data?.message}`, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setIsLoading(false);
      // setIsloading(false);
    }
  };

  // console.log(userType)

  // const deleteCategory = async (id) => {
  //   if(window.confirm('Are you sure you want to delete this User?')) {
  //     try {
  //       await axios.post("/admin/delete_user", {
  //         _id: id,
  //       });
  //       getCategory();
  //       toast.success("User deleted successfully", {
  //         position: toast.POSITION.TOP_RIGHT,
  //       });
  //     } catch (error) {
  //       console.log(error);
  //       toast.error("Something went wrong.", {
  //         position: toast.POSITION.TOP_RIGHT,
  //       });
  //     }
  //   } else {
  //     getCategory();
  //   }

  // };

  // const is_approved = (e) => {
  //   if(e === true) {
  //     return "Approved"
  //   } else if (e === false) {
  //     return ""
  //   } else {
  //     return ""
  //   }
  // }

  const userBlocked = async (e) => {
    setIsLoading(true);
    if (e.categoryBlocked === true) {
      if (window.confirm("Are you sure you want to unblock this user?")) {
        try {
          await axios.post("/admin/new_block_unblock_user", {
            _id: e.categoryId,
            isBlocked: false,
          });
          getCategory(changeId);
          setIsLoading(false);
          toast.success("User unblocked successfully", {
            position: toast.POSITION.TOP_RIGHT,
          });
        } catch (error) {
          setIsLoading(false);
          toast.error(`${error?.response?.data?.message}`, {
            position: toast.POSITION.TOP_RIGHT,
          });
          console.log(error);
        }
      } else {
        // getCategory();
      }
    } else if (e.categoryBlocked === false) {
      if (window.confirm("Are you sure you want to block this user?")) {
        try {
          await axios.post("/admin/new_block_unblock_user", {
            _id: e.categoryId,
            isBlocked: true,
          });
          getCategory(changeId);
          setIsLoading(false);
          toast.success("User blocked successfully", {
            position: toast.POSITION.TOP_RIGHT,
          });
        } catch (error) {
          console.log(error);
          toast.error(`${error?.response?.data?.message}`, {
            position: toast.POSITION.TOP_RIGHT,
          });
          setIsLoading(false);
        }
      } else {
        // getCategory();
      }
    } else {
      return "error";
    }
  };

  const blockColor = (e) => {
    // console.log(e)
    if (e === true) {
      return "secondary";
    } else if (e === false) {
      return "disabled";
    } else {
      return "";
    }
  };

  // 61b0df509d05e9e75bdf4fc4 => individual //agent
  // 61b0df509d05e9e75bdf4fc5 => management
  // 61b0df509d05e9e75bdf4fc6 => lawyer
  // console.log(userType)
  const showStatusButton = (id) => {
    if (id === "61b0df509d05e9e75bdf4fc4") {
      setShowApprove(false);
      setMainData({
        ...maindata,
        approvedButton: "1",
        pendingButton: "",
        disapprovedButton: "",
      });
    } else if (id === "61b0df509d05e9e75bdf4fc5") {
      setShowApprove(false);
      setMainData({
        ...maindata,
        approvedButton: "1",
        pendingButton: "",
        disapprovedButton: "",
      });
    } else if (id === "61b0df509d05e9e75bdf4fc6") {
      setShowApprove(true);
      setMainData({
        ...maindata,
        approvedButton: "1",
        pendingButton: "",
        disapprovedButton: "",
      });
    } else if (id === "61b0df509d05e9e75bdf4fc3") {
      setIndividualUser(true);
      setShowApprove(false);
    } else {
      setShowApprove(false);
    }
  };

  //reverse status
  const showReverseButton = (id) => {
    if (id === "61b0df509d05e9e75bdf4fc4") {
      setShowApprove(false);
      //  setMainData({...maindata,approvedButton:"1",pendingButton:"",disapprovedButton:""})
      if (Number(saveddata) === 0) {
        setMainData({
          ...maindata,
          approvedButton: "",
          pendingButton: "0",
          disapprovedButton: "",
        });
      } else if (Number(saveddata) === 2) {
        setMainData({
          ...maindata,
          approvedButton: "",
          pendingButton: "",
          disapprovedButton: "2",
        });
      } else {
        setMainData({
          ...maindata,
          approvedButton: "1",
          pendingButton: "",
          disapprovedButton: "",
        });
      }
    } else if (id === "61b0df509d05e9e75bdf4fc5") {
      setShowApprove(false);
      //  setMainData({...maindata,approvedButton:"1",pendingButton:"",disapprovedButton:""})
      if (Number(saveddata) === 0) {
        setMainData({
          ...maindata,
          approvedButton: "",
          pendingButton: "0",
          disapprovedButton: "",
        });
      } else if (Number(saveddata) === 2) {
        setMainData({
          ...maindata,
          approvedButton: "",
          pendingButton: "",
          disapprovedButton: "2",
        });
      } else {
        setMainData({
          ...maindata,
          approvedButton: "1",
          pendingButton: "",
          disapprovedButton: "",
        });
      }
    } else if (id === "61b0df509d05e9e75bdf4fc6") {
      setShowApprove(true);
      //setMainData({...maindata,approvedButton:"1",pendingButton:"",disapprovedButton:""})
      if (Number(saveddata) === 0) {
        setMainData({
          ...maindata,
          approvedButton: "",
          pendingButton: "0",
          disapprovedButton: "",
        });
      } else if (Number(saveddata) === 2) {
        setMainData({
          ...maindata,
          approvedButton: "",
          pendingButton: "",
          disapprovedButton: "2",
        });
      } else {
        setMainData({
          ...maindata,
          approvedButton: "1",
          pendingButton: "",
          disapprovedButton: "",
        });
      }
    } else if (id === "61b0df509d05e9e75bdf4fc3") {
      setIndividualUser(true);
      setShowApprove(false);
    } else {
      setShowApprove(false);
    }
  };

  // useEffect(() => {
  //  if (maindata.pendingButton === "0") {getCategoryPending()}else if (maindata.disapprovedButton === "2") {getCategoryDisapproved()}

  // },[changeId]);

  const getNumbers = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(`/admin/new_get_number_users`);
      console.log(data);
      setIsLoading(false);
      setNumbersData(data.data);
    } catch (err) {
      toast.error(err.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setIsLoading(false);
    }
  };

  const checkNumbers = (id) => {
    switch (id) {
      case "61b0df509d05e9e75bdf4fc3":
        let a = numbersData.filter((ele, i) => ele._id === id);

        return a[0];
      case "61b0df509d05e9e75bdf4fc4":
        let a1 = numbersData.filter((ele, i) => ele._id === id);

        return a1[0];
      case "61b0df509d05e9e75bdf4fc5":
        let a2 = numbersData.filter((ele, i) => ele._id === id);

        return a2[0];
      case "61b0df509d05e9e75bdf4fc6":
        let a3 = numbersData.filter((ele, i) => ele._id === id);

        return a3[0];
      case "61b0df509d05e9e75bdf4fc7":
        let a4 = numbersData.filter((ele, i) => ele._id === id);

        return a4[0];
      // case "61b0df509d05e9e75bdf4fc8":
      //   let a5 = numbersData.filter((ele, i) => ele._id === id);

      // return a5[0];

      default:
        break;
    }
  };
  const getSubScriptionData = (free, paid, createDate, planName) => {
    if (free || paid) {
      if (free) {
        return createDate == -1 ? "Waiting for approval" : "Free trial";
      } else if (paid) {
        return planName;
      } else {
        return "Not subscribe";
      }
    } else {
      return "";
    }
  };
  const getRemDate = (curDate) => {
    let date = new Date(moment(curDate).format("l"));
    // let updateDate = date.setDate(date.getDate()+ 15)
    let updateDate = new Date(moment(date).add(15, "days").calendar());
    var Difference_In_Time = updateDate.getTime() - date.getTime();
    var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
    return `Ended in ${Difference_In_Days} Days`;
    // return date.setDate(date.getDate()-15)
  };
  console.log(savemaindata);
  return (
    <React.Fragment>
      <div className="page-content">
        <div className={classes.root}>
          <Paper>
            <div className={classes.paperPaddingRightLeft}>
              <div className="py-4">
                <Paper
                  elevation={0}
                  className={classNames(
                    classes.paperHeading,
                    classes.headingAlignment
                  )}
                >
                  <h3>Account Management</h3>
                  <SearchBar
                    className="heightfix"
                    value={searched}
                    onChange={(searchVal) => requestSearch(searchVal)}
                    onCancelSearch={() => cancelSearch()}
                    placeholder="User Name/Mobile Number"
                  />
                  {/* <div>
                    <Button 
                      variant="contained"
                      color="primary" 
                      aria-label="add"
                      className={classes.iconMargin}
                      onClick={()=> {
                        props.history.push({
                          pathname: "/disapprovedList",
                        });
                      }}                                     
                      >
                       DisApproved
                     </Button>
                      <Button 
                      variant="contained"
                      color="primary" 
                      aria-label="add"
                      className={classes.iconMargin}
                      onClick={()=> {
                        props.history.push({
                          pathname: "/pendingList",
                        });
                      }}                                     
                      >
                        Pending
                     </Button>
                    </div> */}
                </Paper>

                {/* //new design */}

                <Paper
                  elevation={0}
                  className={classNames(
                    classes.paperHeading,
                    classes.headingButton
                  )}
                >
                  <div>
                    {userType.map((type, i) => (
                      <Button
                        variant="contained"
                        //color="primary"
                        aria-label="add"
                        className={
                          buttoncolor === type._id
                            ? classes.iconcolor
                            : classes.iconMargin
                        }
                        key={i + 1}
                        onClick={() => {
                          localStorage.removeItem("savemaindata");
                          showStatusButton(type._id);
                          getCategory(type._id);
                          setChangeId(type._id);

                          // localStorage.removeItem('maindata')
                        }}
                      >
                        {type.title}
                        {checkNumbers(type._id)?.total_User
                          ? `(${checkNumbers(type._id)?.total_User})`
                          : ""}
                      </Button>
                    ))}
                  </div>
                </Paper>

                {/* status start */}
                <Paper
                  elevation={0}
                  className={classNames(
                    classes.paperHeading,
                    classes.headingButton
                  )}
                >
                  {showApprove ? (
                    <div>
                      <Button
                        variant="contained"
                        // color="primary"
                        aria-label="add"
                        className={
                          maindata.approvedButton === "1"
                            ? classes.iconcolor
                            : classes.iconMargin
                        }
                        onClick={() => {
                          setMainData({
                            ...maindata,
                            approvedButton: "1",
                            pendingButton: "",
                            disapprovedButton: "",
                          });
                          setSaveMainData(1);
                          localStorage.setItem("savemaindata", 1);
                          getCategory(changeId);
                          //  setSaveMainData(1)
                        }}
                      >
                        Approved {` (${checkNumbers(changeId)?.isapproved_1})`}
                      </Button>
                      <Button
                        variant="contained"
                        // color="primary"
                        aria-label="add"
                        className={
                          maindata.pendingButton === "0"
                            ? classes.iconcolor
                            : classes.iconMargin
                        }
                        onClick={() => {
                          setMainData({
                            ...maindata,
                            pendingButton: "0",
                            approvedButton: "",
                            disapprovedButton: "",
                          });
                          setSaveMainData(0);
                          localStorage.setItem("savemaindata", 0);
                          getCategoryPending(changeId);
                        }}
                      >
                        Pending {` (${checkNumbers(changeId)?.isapproved_0})`}
                      </Button>
                      <Button
                        variant="contained"
                        //  color="primary"
                        aria-label="add"
                        className={
                          maindata.disapprovedButton === "2"
                            ? classes.iconcolor
                            : classes.iconMargin
                        }
                        onClick={() => {
                          setMainData({
                            ...maindata,
                            disapprovedButton: "2",
                            approvedButton: "",
                            pendingButton: "",
                          });
                          setSaveMainData(2);
                          localStorage.setItem("savemaindata", 2);
                          getCategoryDisapproved(changeId);
                        }}
                      >
                        DisApproved{" "}
                        {` (${checkNumbers(changeId)?.isapproved_2})`}
                      </Button>
                    </div>
                  ) : (
                    false
                  )}
                </Paper>

                {/* status end */}

                <Paper>
                  <TableContainer className={classes.container}>
                    <Table className={classes.table} stickyHeader>
                      <TableHead>
                        <TableRow>
                          <TableCell style={{ fontWeight: "bold" ,textAlign:"center"}}>
                            Sr. No.
                          </TableCell>
                          <TableCell style={{ fontWeight: "bold",textAlign:"center" }}>
                            Joining Date
                          </TableCell>
                          <TableCell style={{ fontWeight: "bold",textAlign:"center" }}>
                            User Name
                          </TableCell>
                          <TableCell style={{ fontWeight: "bold",textAlign:"center" }}>
                            Email Id
                          </TableCell>
                          <TableCell style={{ fontWeight: "bold",textAlign:"center" }}>
                            Mobile Number
                          </TableCell>
                          <TableCell style={{ fontWeight: "bold",textAlign:"center" }}>
                            User Type
                          </TableCell>
                          {changeId === "61b0df509d05e9e75bdf4fc6" ? (
                            Number(saveddata || 1) === 1 ? (
                              <TableCell style={{ fontWeight: "bold",textAlign:"center" }}>
                                Plan Name
                              </TableCell>
                            ) : (
                              ""
                            )
                          ) : (
                            <TableCell style={{ fontWeight: "bold",textAlign:"center" }}>
                              Plan Name
                            </TableCell>
                          )}

                          {changeId === "61b0df509d05e9e75bdf4fc6" ? (
                            Number(saveddata || 1) === 1 ? (
                              <TableCell style={{ fontWeight: "bold",textAlign:"center" }}>
                                Expiry
                              </TableCell>
                            ) : (
                              ""
                            )
                          ) : (
                            <TableCell style={{ fontWeight: "bold",textAlign:"center" }}>
                              Expiry
                            </TableCell>
                          )}
                          {/* <TableCell style={{ fontWeight: "bold" }}>
                            Expiry
                          </TableCell> */}
                          {changeId === "61b0df509d05e9e75bdf4fc6" ? (
                            <TableCell
                              style={{
                                textAlign: "center",
                                fontWeight: "bold",
                              }}
                            >
                              Status
                            </TableCell>
                          ) : (
                            ""
                          )}

                          {showApprove || isInidvidualuser ? (
                            <TableCell
                              style={{
                                textAlign: "center",
                                justifyContent: "center",
                                fontWeight: "bold",
                              }}
                            >
                              Actions
                            </TableCell>
                          ) : (
                            false
                          )}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {/* {isLoading ? (
                          <TableRow>
                            <Skeleton
                              style={{ width: "70vw", borderRadius: "20px" }}
                              height="1rem"
                              count={2}
                              baseColor="#ebebeb"
                              highlightColor="#fff"
                            />
                          </TableRow>
                        ) : (
                          false
                        )} */}
                        {orderBy(
                          tableData,
                          (e) => {
                            return e._id;
                          },
                          "desc"
                        )
                          .slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                          )
                          .map((category, index) => (
                            <TableRow key={category._id} hover>
                              <TableCell
                                component="th"
                                scope="row"
                                className={classes.textMiddle}
                                style={{textAlign:"center"}}
                              >
                                {index + 1 + page * rowsPerPage}
                              </TableCell>
                              <TableCell style={{textAlign:"center"}}>
                                {/* {category.createdAt
                                  ? new Date(category.createdAt)
                                      // .toUTCString()
                                      .getUTCDate() +
                                    "/" +
                                    (new Date(category.createdAt)
                                      // .toUTCString()
                                      .getUTCMonth() +
                                      1) +
                                    "/" +
                                    new Date(category.createdAt)
                                      // .toUTCString()
                                      .getUTCFullYear()
                                  : // moment.utc(category.createdAt).format("L")
                                    "N/A"} */}
                                {moment(category.createdAt).format(
                                  "DD/MM/YYYY"
                                )}
                              </TableCell>
                              <TableCell className={classes.textMiddle} style={{textAlign:"center"}}>
                                {category.firstName} {category.lastName}
                              </TableCell>
                              <TableCell className={classes.textMiddle} style={{textAlign:"center"}}>
                                {category.email}
                              </TableCell>
                              <TableCell className={classes.textMiddle} style={{textAlign:"center"}}>
                                {category.countryCode}&nbsp;
                                {category.mobileNumber}
                              </TableCell>
                              <TableCell className={classes.textMiddle} style={{textAlign:"center"}}>
                                {get(category, "userType.title", "")}
                              </TableCell>
                              {/* <TableCell className={classes.textMiddle}>{getSubScriptionData((category.is_free_subscribed), (category.is_paid_subscribed), (category.createdAt))}</TableCell> */}
                              {/* <TableCell className={classes.textMiddle}>{getSubScriptionData((category.is_free_subscribed), (category.is_paid_subscribed), (category.plan_days_left), (get(category, "planType.plans.planType")))}</TableCell> */}
                              {category?.userType?._id ===
                              "61b0df509d05e9e75bdf4fc6" ? (
                                <>
                                  {category?.isapproved === 1 ? (
                                    <TableCell className={classes.textMiddle} style={{textAlign:"center"}}>
                                      {/* {category.plan_days_left >= 1
                                  ? `Ends in ${category.plan_days_left} Days`
                                  : "Ended"}{" "} */}
                                      {category?.is_paid_subscribed === true ? (
                                        <>
                                          {get(
                                            category,
                                            "plan_id.planName",
                                            ""
                                          )}
                                        </>
                                      ) : (
                                        "Trial"
                                      )}
                                    </TableCell>
                                  ) : (
                                    ""
                                  )}
                                </>
                              ) : (
                                <TableCell className={classes.textMiddle} style={{textAlign:"center"}}>
                                  {/* {category.plan_days_left >= 1
                                  ? `Ends in ${category.plan_days_left} Days`
                                  : "Ended"}{" "} */}
                                  {category?.is_paid_subscribed === true ? (
                                    <>{get(category, "plan_id.planName", "")}</>
                                  ) : (
                                    "Trial"
                                  )}
                                </TableCell>
                              )}
                              {category?.userType?._id ===
                              "61b0df509d05e9e75bdf4fc6" ? (
                                <>
                                  {category?.isapproved === 1 ? (
                                    <TableCell className={classes.textMiddle} style={{textAlign:"center"}}>
                                      {/* {category.plan_days_left >= 1
                                  ? `Ends in ${category.plan_days_left} Days`
                                  : "Ended"}{" "} */}
                                      {category?.is_paid_subscribed === true ? (
                                        <>
                                          Ends in&nbsp;
                                          {category?.days_left_subscribed}
                                          &nbsp;days
                                        </>
                                      ) : (
                                        <>
                                          {category?.is_free_subscribed ===
                                          true ? (
                                            <>
                                            { category.is_reference ? category?.days_left_unsubscribed : category?.days_left_unsubscribed > 0
                                            ? `Ends in ${category?.days_left_unsubscribed} days`
                                            : "Ended" }
                                            </>
                                          ) : (
                                            "Ended"
                                          )}
                                        </>
                                      )}
                                    </TableCell>
                                  ) : (
                                    ""
                                  )}
                                </>
                              ) : (
                                <TableCell className={classes.textMiddle} style={{textAlign:"center"}}>
                                  {/* {category.plan_days_left >= 1
                                  ? `Ends in ${category.plan_days_left} Days`
                                  : "Ended"}{" "} */}
                                  {category?.is_paid_subscribed === true ? (
                                    <>
                                      Ends in&nbsp;
                                      {category?.days_left_subscribed}&nbsp;days
                                    </>
                                  ) : (
                                    <>
                                      {category?.is_free_subscribed === true ? (
                                        <>
                                          { category.is_reference ? category?.days_left_unsubscribed : category?.days_left_unsubscribed > 0
                                            ? `Ends in ${category?.days_left_unsubscribed} days`
                                            : "Ended" }
                                        </>
                                      ) : (
                                        "Ended"
                                      )}
                                    </>
                                  )}
                                </TableCell>
                              )}
                              {changeId === "61b0df509d05e9e75bdf4fc6" ? (
                                !showApprove ? (
                                  <TableCell>
                                    {category.isapproved === 1 ? (
                                      <div
                                        style={{
                                          backgroundColor: "green",
                                          color: "white",
                                          padding: "0.25rem 0.55rem",
                                          borderRadius: "0.4rem",
                                          textAlign: "center",
                                        }}
                                      >
                                        Approved
                                      </div>
                                    ) : (
                                      false
                                    )}

                                    {category.isapproved === 0 ? (
                                      <div
                                        style={{
                                          backgroundColor: "green",
                                          color: "white",
                                          padding: "0.25rem 0.55rem",
                                          borderRadius: "0.4rem",
                                          textAlign: "center",
                                        }}
                                      >
                                        Approved
                                      </div>
                                    ) : (
                                      false
                                    )}

                                    {category.isapproved === 2 ? (
                                      <div
                                        style={{
                                          backgroundColor: "green",
                                          color: "white",
                                          padding: "0.25rem 0.55rem",
                                          borderRadius: "0.4rem",
                                          textAlign: "center",
                                        }}
                                      >
                                        Approved
                                      </div>
                                    ) : (
                                      false
                                    )}
                                  </TableCell>
                                ) : (
                                  <TableCell className={classes.textMiddle} style={{textAlign:"center"}}>
                                    {/* {(get(category, "userType.type", "") === "NEEDAPPROVEL") && (category.isapproved === false) &&
                                    <div style={{backgroundColor:"yellow",color:"black", padding: "0.25rem 0.55rem", borderRadius:"0.4rem", textAlign:"center"}}>
                                      Pending
                                    </div>
                                    }  */}

                                    {/* for individual , production and subscriber */}

                                    {category.isapproved === 1 ? (
                                      <div
                                        style={{
                                          backgroundColor: "green",
                                          color: "white",
                                          padding: "0.25rem 0.55rem",
                                          borderRadius: "0.4rem",
                                          textAlign: "center",
                                        }}
                                      >
                                        Approved
                                      </div>
                                    ) : (
                                      false
                                    )}

                                    {category.isapproved === 0 ? (
                                      <div
                                        style={{
                                          backgroundColor: "yellow",
                                          color: "black",
                                          padding: "0.25rem 0.55rem",
                                          borderRadius: "0.4rem",
                                          textAlign: "center",
                                        }}
                                      >
                                        Pending
                                      </div>
                                    ) : (
                                      false
                                    )}

                                    {category.isapproved === 2 ? (
                                      <div
                                        style={{
                                          backgroundColor: "red",
                                          color: "white",
                                          padding: "0.25rem 0.55rem",
                                          borderRadius: "0.4rem",
                                          textAlign: "center",
                                        }}
                                      >
                                        Disapproved
                                      </div>
                                    ) : (
                                      false
                                    )}

                                    {/* {category.isapproved === 1 ? ( <div style={{backgroundColor:"green",color:"white", padding: "0.25rem 0.55rem", borderRadius:"0.4rem", textAlign:"center"}}>
                                    Approved
                                    </div>): false}

                                      {category.isapproved === 0 ? ( <div style={{backgroundColor:"yellow",color:"black", padding: "0.25rem 0.55rem", borderRadius:"0.4rem", textAlign:"center"}}>
                                    Pending
                                    </div>) :false }

                                      {category.isapproved === 2 ? ( <div style={{backgroundColor:"red",color:"white", padding: "0.25rem 0.55rem", borderRadius:"0.4rem", textAlign:"center"}}>
                                    Disapproved
                                    </div>) : false} */}

                                    {
                                      // (get(category, "userType.type", "") === "NEEDAPPROVEL") &&
                                      // // (category.isapproved === true) &&
                                      // <div style={{backgroundColor:"green",color:"white", padding: "0.25rem 0.55rem", borderRadius:"0.4rem", textAlign:"center"}}>
                                      //  {/* {is_approved(category.isapproved)} */}
                                      //  Approved
                                      // </div>
                                    }
                                  </TableCell>
                                )
                              ) : (
                                ""
                              )}

                              {showApprove || isInidvidualuser ? (
                                <TableCell
                                  style={{
                                    textAlign: "center",
                                    justifyContent: "center",
                                  }}
                                >
                                  <div className={classes.tableFlex}>
                                    <Tooltip title="View Details" arrow>
                                      <Button
                                        variant="outlined"
                                        // color="primary"
                                        aria-label="add"
                                        className={classes.Marginbutton}
                                        onClick={() => {
                                          props.history.push({
                                            pathname: "/account-details-new",
                                            state: category,
                                          });
                                        }}
                                      >
                                        <VisibilityIcon
                                          // color="primary"
                                          style={{
                                            color: "#0294b3",
                                            fontSize: "1.3rem",
                                          }}
                                        />
                                      </Button>
                                    </Tooltip>
                                    <Tooltip
                                      title={
                                        category?.isBlocked
                                          ? "Unblock"
                                          : "Block"
                                      }
                                      arrow
                                    >
                                      <Button
                                        variant="outlined"
                                        // color="primary"

                                        aria-label="add"
                                        className={classes.Marginbutton}
                                        onClick={() => {
                                          userBlocked({
                                            categoryId: category._id,
                                            categoryBlocked: category.isBlocked,
                                          });
                                        }}
                                      >
                                        <BlockIcon
                                          style={{
                                            color:
                                              category.isBlocked === true
                                                ? "red"
                                                : "green",
                                            fontSize: "1.1rem",
                                          }}
                                        />
                                      </Button>
                                    </Tooltip>
                                    {/* <Button 
                                      variant="outlined"
                                      aria-label="add"
                                      onClick={() => deleteCategory(category._id)}                                
                                      >
                                        <Delete
                                          className={classes.deleteColor}
                                        /> 
                                      </Button> */}
                                  </div>
                                </TableCell>
                              ) : (
                                false
                              )}
                              {/* <TabelCell> </TabelCell> */}
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
      {isLoading && <Overlay />}
    </React.Fragment>
  );
}
