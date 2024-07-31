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
  Switch,
  styled,
  Tooltip,
} from "@material-ui/core";

// For Table
import SearchBar from "material-ui-search-bar";

//history
import { useHistory } from "react-router-dom";
import EditIcon from "@material-ui/icons/Edit";
import { DeleteOutline, WidgetsOutlined } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    flexWrap: "wrap",
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

export default function Service_Category_Management(props) {
  const classes = useStyles();

  const [tableData, setTableData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // For Pagination
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
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
      const { data } = await axios.get("/admin/paymentGetway");
      setTableData(data.data);
      setSearchedData(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const EditCategory = (category) => {
    props.history.push({
      pathname: "/AddEdit_PaymentGateway",
      state: category,
    });
  };

  // For Search
  const [searched, setSearched] = useState("");
  const [searchedData, setSearchedData] = useState([]);

  const requestSearch = (searchedVal) => {
    const filteredRows = searchedData.filter((row) => {
      let name = row.title;
      return name.toLowerCase().includes(searchedVal.toLowerCase());
    });
    setTableData(filteredRows);
  };

  const cancelSearch = () => {
    getCategoriesContent();
  };
  const statusSwitch = async (e, category) => {
    try {
      // console.log(e);
      console.log(category);

      const { data } = await axios.put(`/admin/paymentGetway/${category._id}`, {
        title: category.title,
        icon: category.icon,
        user_guide: category.user_guide,
        fields: category.fields,
        isActive: e.target.checked,
      });
      // props.history.push({
      //     pathname: "/Category_Management",
      //   });
      getCategoriesContent();
      toast.success(data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      // console.log(data);
    } catch (error) {
      console.log(error);
    }

    // console.log(e.target.checked);
    // console.log(checked);
    // console.log(id);
  };

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
                  <h3>Payment Gateway Management</h3>
                  <SearchBar
                    className="heightfix"
                    onChange={(searchVal) => requestSearch(searchVal)}
                    onCancelSearch={() => cancelSearch()}
                    placeholder="Gateway Name"
                  />
                  <Button
                    variant="contained"
                    className="buttoncss"
                    style={{ backgroundColor: "#0294b3", color: "#fff" }}
                    onClick={() => {
                      props.history.push({
                        pathname: "/AddEdit_PaymentGateway",
                      });
                    }}
                  >
                    Add Payment Gateway
                  </Button>
                </Paper>
                <Paper>
                  <TableContainer className={classes.container}>
                    <Table className={classes.table} stickyHeader>
                      <TableHead>
                        <TableRow>
                          <TableCell style={{ fontWeight: "bold" }}>
                            Sr. No.
                          </TableCell>
                          <TableCell style={{ fontWeight: "bold" }}>
                            Gateway Name
                          </TableCell>
                          <TableCell style={{ fontWeight: "bold" }}>
                            Gateway Image
                          </TableCell>
                          <TableCell style={{ fontWeight: "bold" }}>
                            Gateway Fields
                          </TableCell>
                          <TableCell style={{ fontWeight: "bold" }}>
                            Is Active
                          </TableCell>
                          <TableCell
                            style={{ textAlign: "center", fontWeight: "bold" }}
                          >
                            Actions
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {tableData
                          .slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                          )
                          .map((category, index) => (
                            <TableRow hover key={index}>
                              <TableCell
                                component="th"
                                scope="row"
                                className={classes.textMiddle}
                              >
                                {index + 1 + page * rowsPerPage}
                              </TableCell>
                              <TableCell className={classes.textMiddle}>
                                {category.title}
                              </TableCell>
                              <TableCell className={classes.textMiddle}>
                                <img
                                  style={{ height: "50px", width: "100px", objectFit: "cover", borderRadius: "5px" }}
                                  src={category.icon}
                                />
                              </TableCell>
                              <TableCell className={classes.textMiddle}>
                                {category.fields.map((item) => (
                                  <>{item.key}&nbsp;</>
                                ))}
                              </TableCell>
                              <TableCell className={classes.textMiddle}>
                                {/* {category.isActive ? "true" : "false"} */}
                                <Android12Switch
                                  onChange={(e) => {
                                    statusSwitch(e, category);
                                  }}
                                  checked={category.isActive}
                                />
                              </TableCell>
                              <TableCell
                                className={classes.textMiddle}
                                style={{ textAlign: "center" }}
                              >
                                <Button
                                  onClick={() => EditCategory(category)}
                                  style={{
                                    border: "1.5px solid #c4c4c4",
                                    margin: "0.5rem",
                                    color: "#0294b3",
                                  }}
                                >
                                  <Tooltip title="Edit" arrow>
                                    <EditIcon />
                                  </Tooltip>
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
      </div>
    </React.Fragment>
  );
}
