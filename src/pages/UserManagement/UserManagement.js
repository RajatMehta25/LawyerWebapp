import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import axios from "../../axios";
import { toast } from "react-toastify";

import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination,     } from '@material-ui/core';

// import Button from '@material-ui/core/Button';
// import Paper from '@material-ui/core/Paper';

import { Delete } from '@material-ui/icons';

// import DeleteIcon from '@material-ui/icons/Delete';
// import EditIcon from '@material-ui/icons/Edit';
// import SubdirectoryArrowRightIcon from '@material-ui/icons/SubdirectoryArrowRight';


// For Table
import SearchBar from "material-ui-search-bar";



const useStyles = makeStyles((theme) => ({
  root: {
    flexWrap: 'wrap',
    marginTop: '5rem',
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
    marginRight: '0.5rem',
  },
  headingButton: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  container: {
    maxHeight: '58vh',
  },
  paperPaddingRightLeft: {
    padding: '0rem 1rem',
  },
}));





export default function UserManagement(props) {
  const classes = useStyles();

  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    getCategory();
  }, []);


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

  // For Search 
  const [searched, setSearched] = useState("");
  const [searchedData, setSearchedData] = useState([]);
  

  

  const cancelSearch = () => {
    setSearched('')
    // requestSearch(searched);
    // console.log('cancwlled');
  };

  

  // console.log(props);

  const getCategory = async () => {
    // setIsloading(true);
    try {
      const { data } = await axios.get("/admin-business/get_user_list");
      console.log(data);
      setTableData(data.data);
      //setSearchedData(data.response);
      // setIsloading(false);
    } catch (error) {
      console.log(error);
      // setIsloading(false);
    }
  };

  const deleteUser = async (id) => {
    if(window.confirm('Are you sure you want to delete this Account?')) {
      try {
        await axios.post("/admin-business/delete_user", {
          _id: id,
        });
        getCategory();
        toast.success("Account deleted successfully", {
          position: toast.POSITION.TOP_RIGHT,
        });
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong.", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } else {
      getCategory();
    }
    
  };

  const blockUnblockUser = async (id,status) => {
      
      try {
      const {data}  = await axios.post("/admin-business/block_user", {
          _id: id,
          is_blocked:!status?1:0
        });
        
        getCategory();
        toast.success(data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong.", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
   
    
  };

console.log(tableData);
// console.log(tableData.length);
  const roleValue = (key) => {
    // console.log(key);
    if(key === `1`) {
      return `Enterpreneur/Owner`;
    } 
    else if(key === `2`) {
      return `CEO/General Manager`;
    }
    else if(key === `3`) {
      return `Sales/Marketing Manager`;
    }
    else if(key === `4`) {
      return `Procurement Manager`;
    }
    else if(key === `5`) {
      return `Other`;
    }
     else if (key === undefined) {
      return ``;
    } else {
      return ``;
    }
  }

  const is_subscribed = (e) => {
    if(e === true) {
      return "Yes"
    } else if (e === false) {
      return "No"
    } else {
      return ""
    }
  }

  return (
    <React.Fragment>
      <div className={classes.root}>
        <Paper>
          <div className={classes.paperPaddingRightLeft}>
            <div className="py-4">
                <Paper elevation={0} className={classNames(classes.paperHeading, classes.headingButton)}>
                    <h1>User Management</h1>
                    <SearchBar
                      value={searched}
                      onChange={(searchVal) => setSearched(searchVal)}
                      onCancelSearch={() => cancelSearch()}
                    />
                    <div>
                      {/*<Button 
                      variant="outlined"
                      // color="primary" 
                      aria-label="add"
                      className={classes.iconMargin}
                      onClick={() => {
                        props.history.goBack();
                      }}                                      
                      >
                        <ArrowBackIcon/>
                      </Button>*/}
                      {/*<Button 
                      variant="contained"
                      color="primary" 
                      aria-label="add"
                      className={classes.iconMargin}
                      onClick={()=> {
                        props.history.push({
                          pathname: "//addCategory",
                        });
                      }}                                     
                      >
                        Add Category
                    </Button>*/}
                    </div>
                </Paper>
                <Paper>
                  <TableContainer className={classes.container}>
                    <Table className={classes.table} stickyHeader>
                      <TableHead>
                          <TableRow>
                              <TableCell>Sr. No.</TableCell>
                              <TableCell>User Name</TableCell>
                              <TableCell>Email Id</TableCell>
                              <TableCell>Mobile Number</TableCell>
                              <TableCell>Qr Code</TableCell>
                              
                              <TableCell>Verified</TableCell>
                              <TableCell>Wallet</TableCell>
                              <TableCell>Block Status</TableCell>
                              
                              <TableCell>Actions</TableCell>
                          </TableRow>
                      </TableHead>
                      <TableBody>
                            {tableData.filter(row=>{
                              let name = row.first_name+" "+ row.last_name;
                              // console.log(name);
                              return name.toLowerCase().includes(searched.toLowerCase()) || row.mobile_number.toLowerCase().includes(searched.toLowerCase()) || row.email.toLowerCase().includes(searched.toLowerCase())
                            }).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user, index) => (
                                <TableRow key={user._id}>
                                    <TableCell component="th" scope="row" className={classes.textMiddle}>
                                        {index + 1+ (page)*rowsPerPage}
                                    </TableCell>
                                    <TableCell className={classes.textMiddle}>{user.first_name} {user.last_name}</TableCell>
                                    <TableCell className={classes.textMiddle}>
                                      {user.email}
                                    </TableCell>
                                    <TableCell className={classes.textMiddle}>
                                    {user.country_code} {user.mobile_number}
                                    </TableCell>
                                    <TableCell className={classes.textMiddle}>
                                    <img src={user.qr_code}/>
                                    </TableCell>
                                    <TableCell className={classes.textMiddle}>
                                    {user.is_verified?"Verified":"Not Verified"}
                                    </TableCell>
                                    <TableCell className={classes.textMiddle}>
                                    {user.wallet_amount}
                                    </TableCell>
                                   
                                   
                                    <TableCell className={classes.textMiddle}>
                                     
                                      <input onChange={()=> blockUnblockUser(user._id,user.is_blocked)}  checked={!user.is_blocked} className="switchbox" type="checkbox" id={"item"+user._id}/>
                                      <label  htmlFor={"item"+user._id}></label>
                                    </TableCell>
                                    {/*<TableCell>
                                      <Button 
                                      variant="outlined"
                                      // color="primary" 
                                      aria-label="add"
                                      onClick={()=> {
                                        props.history.push({
                                          pathname: "/subCategory",
                                          state: user._id,
                                        });
                                      }}                                      
                                      >
                                        <SubdirectoryArrowRightIcon
                                          color="primary" 
                                        />
                                      </Button>
                                    </TableCell>*/}
                                    <TableCell>
                                        {/*<Button 
                                        variant="outlined"
                                        // color="primary" 
                                        aria-label="add"
                                        className={classes.iconMargin}
                                        onClick={() => {
                                          props.history.push({
                                            pathname: "//editCategory",
                                            state: category,
                                          });
                                        }}                                      
                                        >
                                          <EditIcon
                                            color="primary" 
                                          />
                                      </Button>*/}
                                        <Button 
                                        variant="outlined"
                                        // color="primary" 
                                        aria-label="add"
                                        onClick={() => deleteUser(user._id)}                                
                                        >
                                          <Delete
                                            color="secondary" 
                                          /> 
                                        </Button>
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
    </React.Fragment>
  );
}
