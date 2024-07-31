import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import axios from "../../axios"
import { toast } from "react-toastify";
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, TableSortLabel,Tooltip    } from '@material-ui/core';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { Delete } from '@material-ui/icons';
import EditIcon from '@material-ui/icons/Edit';
// import Skeleton from 'react-loading-skeleton'
// import 'react-loading-skeleton/dist/skeleton.css'

// For Table
import SearchBar from "material-ui-search-bar";
import './Template_Management.css';

// const useStyles = makeStyles((theme) => ({
//   root: {
//     flexWrap: 'wrap',
//     marginTop: '3rem',
//   },
//   margin: {
//     margin: theme.spacing(1),
//   },
//   extendedIcon: {
//     marginRight: theme.spacing(1),
//   },
//   paperHeading: {
//       padding: '1rem 0rem',
//   },
//   table: {
//       minWidth: 650,
//   },
//   textMiddle: {
//       verticalAlign: 'middle !important',
//   },
//   iconMargin: {
//     marginRight: '0.5rem',
//   },
//   headingButton: {
//     display: 'flex',
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   // container: {
//   //   maxHeight: '62vh',
//   // },
//   paperPaddingRightLeft: {
//     padding: '0rem 1rem',
//   },
//   tableFlex: {
//     display: "flex",
//   },
//   searchHeight: {
//     height: "2.3rem",
//     marginRight: "0.7rem",
//     // width: "50%"
//   },
//   addButtonColor: {
//     backgroundColor: "#0294B3",
//     color: "#ffffff",
//   },
//   tablePadding: {
//       padding: "0.5rem",
//       // textAlign: "center",
//       fontSize: "0.8rem"
//   },
//   statusFlex :{
//     display: "flex",
//   },
//   dotPadding :{
//     paddingLeft: "0.2rem"
//   },
//   paperHeight: {
//     height: "90vh",
//   },
//   paperTableHeight: {
//     height: "100%",
//   },
//   tableContainerHeight: {
//     height: "79%",
//   },
//   tablePaginationStyle: {
//     border: "1px solid #0000001a",
//     borderRadius: "0rem 0rem 0.4rem 0.4rem",
//   },
//   searchPending :{
//     display:"flex",
//     justifyContent: "flex-end"
//   },
//   searchWidth: {
//     // width: "30%"
//   }
// }));

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
    marginRight: '0.5rem',
  },
  headingButton: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: "10px"
  },
  headingAlignment:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    // padding: "0 2rem 0 2rem"
    alignItems: 'center',
    flexWrap: 'wrap',
    ['@media (max-width:780px)']: { // eslint-disable-line no-useless-computed-key
      flexDirection:'column',
      width: '100%',
      gap: '1rem',
      justifyContent: 'center',
      textAlign: 'center',
    }
  },
  container: {
    maxHeight: '58vh',
  },
  paperPaddingRightLeft: {
    padding: '0rem 1rem',
  },
  addButtonColor: {
  backgroundColor: "#0294B3",
  color: "#ffffff",
  },
}));




export default function TableData(props) {
  const classes = useStyles();

  const [tableData, setTableData] = useState([]);
  const[isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getCategory();
  }, []);


  // For Pagination
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [order, setOrder] = useState();
  const [orderBy,setOrderBy] = useState();

  const handleChangePage = (event, newPage) => {
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
    // console.log(searchedVal);
    const filteredRows = searchedData.filter((row) => {
      return row.name.toLowerCase().includes(searchedVal.toLowerCase());
    });
    // console.log(filteredRows);
    setTableData(filteredRows);
  };

  const cancelSearch = () => {
    setSearched("");
    getCategory();
  };


  const getCategory = async () => {
    // setIsLoading(true);
    try {
      const { data } = await axios.get("/admin/get_template");
      console.log(data);
      setTableData(data.user);
      setIsLoading(false);
      setSearchedData(data.user);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong.", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const deleteCategory = async (id) => {
    if(window.confirm('Are you sure you want to delete this template?')) {
      try {
        await axios.post("/admin/delete_template", {
          _id: id,
        });
        getCategory();
        toast.success("Template Removed Successfully",{
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


const recordsAfterPagingAndSorting = () => {
  // return tableData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
  return stableSort(tableData, getComparator(order,orderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
}


const handleSortRequest = cellId => {
  const isAsc = orderBy === cellId && order === "asc";
  setOrder(isAsc? "desc":"asc");
  setOrderBy(cellId)
}
const stableSort = (array,comparator) => {
  const stabilizedThis = array.map((el,index) => [el, index]);
  stabilizedThis.sort((a,b) => {
    const order = comparator(a[0], b[0]);
    if(order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

function getComparator(order,orderBy) {
  return order === "desc"
    ? (a,b) => descendingComparator(a,b, orderBy)
    : (a,b) => -descendingComparator(a,b, orderBy);
}

function descendingComparator(a,b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

  return (
    <React.Fragment>
      <div className="page-content">
      <div className={classes.root}>
        <Paper>
          <div className={classes.paperPaddingRightLeft}>
            <div className={classNames("py-4",classes.paperHeight)}>
                <Paper elevation={0} className={classNames(classes.paperHeading, classes.headingAlignment)}>
                    <h3>Template Management</h3>
                    <div className={classes.searchWidth}>
                      <SearchBar
                        className="heightfix"
                        value={searched}
                        onChange={(searchVal) => requestSearch(searchVal)}
                        onCancelSearch={() => cancelSearch()}
                        placeholder="Search by Template Name"
                      />
                      </div>
                    <div className={classes.searchPending}>
                      <Button 
                      variant="contained"
                      aria-label="add"
                      className={classNames(classes.iconMargin,classes.addButtonColor)}
                      onClick={()=> {
                        props.history.push({
                          pathname: "/template-add",
                        });
                      }}                                     
                      >
                        Add Template
                      </Button>
                    </div>
                </Paper>
                <Paper className={classes.paperTableHeight}>
                  <TableContainer className={classes.tableContainerHeight}>
                    <Table className={classes.table} stickyHeader>
                      <TableHead>
                      
                          <TableRow>
                              <TableCell className={classes.tablePadding} style={{fontWeight:"bold"}}>Sr. No.</TableCell>
                              <TableCell className={classes.tablePadding} style={{fontWeight:"bold"}}>
                                {/* <TableSortLabel 
                                  active={true}
                                  direction= {orderBy === "name" ? order : "asc"}
                                  onClick={() => {
                                    handleSortRequest("name");
                                  }}>
                                    Template Name
                                </TableSortLabel> */}Template Name
                              </TableCell>
                              <TableCell className={classes.tablePadding} style={{fontWeight:"bold"}}>Service Details</TableCell>
                              <TableCell className={classes.tablePadding} style={{fontWeight:"bold"}}>Price</TableCell>
                              <TableCell className={classes.tablePadding} style={{fontWeight:"bold"}}>Description</TableCell>
                              <TableCell className={classes.tablePadding} style={{fontWeight:"bold"}}>Actions</TableCell>
                          </TableRow>
                         
                      </TableHead>
                    
                      <TableBody>
                      {isLoading?<TableRow ><Skeleton style={{width:"70vw",borderRadius:"20px"}} highlightColor="#fff" height="1rem" count={2} baseColor="#ebebeb"/></TableRow>:false}

                            {recordsAfterPagingAndSorting().map((category, index) => (
                                <TableRow hover key={category._id}>
                                  
                                    <TableCell component="th" scope="row" className={classes.textMiddle}>
                                        {index + 1+ (page)*rowsPerPage}
                                    </TableCell>
                                    <TableCell className={classes.textMiddle}>{category.name}</TableCell>
                                    <TableCell className={classes.textMiddle}>{category.service_details}</TableCell>
                                    <TableCell className={classes.textMiddle}>&#36;{category.price}</TableCell>
                                    <TableCell className={classes.textMiddle}>{category.description}</TableCell>
                                    <TableCell>
                                      <div  className={classes.tableFlex}>
                                        <Button 
                                        variant="outlined"
                                        // color="primary" 
                                        aria-label="add"
                                        className={classes.iconMargin}
                                        onClick={() => {
                                          props.history.push({
                                            pathname: "/template-edit",
                                            state: category,
                                          });
                                          // console.log(category);
                                        }}                                      
                                        >
                                         <Tooltip title="Edit Template" arrow > 
                                         <EditIcon
                                          style={{color:"#0294b3"}}
                                          /></Tooltip>
                                        </Button>
                                          {/* <Button 
                                          variant="outlined"
                                          // color="primary" 
                                          aria-label="add"
                                          onClick={() => deleteCategory(category._id)}                                
                                          >
                                            <Delete
                                              color="secondary" 
                                            /> 
                                          </Button> */}
                                      </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                  </TableContainer>
                  <TablePagination
                    className={classes.tablePaginationStyle}
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
