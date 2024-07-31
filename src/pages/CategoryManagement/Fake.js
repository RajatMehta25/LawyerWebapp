import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import axios from "../../axios";
import { toast } from "react-toastify";

import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Tooltip } from '@material-ui/core';

// import { Delete } from '@material-ui/icons';
import VisibilityIcon from '@material-ui/icons/Visibility';
import BlockIcon from '@material-ui/icons/Block';
// import ArrowBackIcon from "@material-ui/icons/ArrowBack";

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
// For Table
import SearchBar from "material-ui-search-bar";
import { orderBy, reverse } from "lodash";

//history
import { useHistory } from 'react-router-dom'
import AddCategory from "../AccountManagement/Account_Details";
import './EditCategoryAttributes.css';
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import AddEditAttributes from "./AddEditAttributes";
import { indexOf } from "lodash-es";
import EditIcon from '@material-ui/icons/Edit';
import { DeleteOutline } from "@material-ui/icons";





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
        margin: '0.5rem',
        color: "#696969",
        backgroundColor: "#fff"

    },
    iconcolor: {
        margin: '0.5rem',
        color: "#fff",
        backgroundColor: "#0294b3 !important"
    },
    headingButton: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: "10px",

    },
    headingAlignment: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        // padding: "0 2rem 0 2rem"
        alignItems: 'center',
        ['@media (max-width:780px)']: { // eslint-disable-line no-useless-computed-key
            flexDirection: 'column',
            width: '100%',
            gap: '1rem',
            justifyContent: 'center',
            textAlign: 'center',
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



export default function EditCategoryAttributes(props) {
    const classes = useStyles();

    const {
        location: { state },
    } = props;
    // const history=useHistory(); 


    const [tableData, setTableData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    // const [tablelength,setTableLength] = useState(null);
    const [mainobject1, setMainObject1] = useState([]);

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

    console.log(state);


    useEffect(() => { getCategoriesContent() }, []);

    //get content
    const getCategoriesContent = async () => {
        try {



            const { data } = await axios.get("/admin/get_categories");
            console.log(data);
            setTableData(data.user)
            setIsLoading(false)

        }
        catch (error) {
            console.log(error);
        }

    }



    console.log(tableData);
    var currentstate;
    var totallength;

    // console.log(total);
    if (typeof (state) === "string") {
        currentstate = state
    } else if (typeof (state) === "object") {
        currentstate = state[2]

    } else {

    }

    const DeleteAttribute = async (internalid) => {
        var mainobject = tableData.filter(function (id) { return id._id === currentstate })
        mainobject[0].fields.splice(internalid, 1)
        var changedObject = {
            category_id: mainobject[0]._id,
            fields: mainobject[0].fields,
            name: mainobject[0].name,
            desc: mainobject[0].desc,

        }
        console.log(internalid);
        // delete mainobject[0].fields[internalid]

        // setMainObject1()
        // console.log(abc);
        try {
            const { data } = await axios.post("/admin/update_category", changedObject);
            console.log(changedObject);

            toast.success(`${data.message}`, {
                position: toast.POSITION.TOP_RIGHT,
            });
            getCategoriesContent()

        } catch (error) {
            console.log(error);
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

                                    <Button
                                        variant="outlined"
                                        aria-label="add"
                                        className={classes.iconMargin}
                                        onClick={() => {

                                            props.history.push({
                                                pathname: "/Category_Management",

                                            });



                                        }}
                                    >
                                        <ArrowBackIcon />
                                    </Button>
                                    <h3 style={{ marginBottom: "-0.5rem" }}>Edit Category Attributes </h3>
                                    <Button variant="contained" className="buttoncss" style={{ backgroundColor: "#0294b3", color: "#fff", margin: "0.5rem" }} onClick={() => {
                                        props.history.push({
                                            pathname: "/AddEditAttributes",
                                            state: currentstate

                                        })
                                    }}  > ADD Attribute</Button>

                                </Paper>

                                {/* //new design */}

                                {/* <br /><br/> */}


                                {/* status end */}


                                <Paper>
                                    <TableContainer className={classes.container}>
                                        <Table className={classes.table} stickyHeader>
                                            <TableHead>
                                                <TableRow>
                                                    {/* <TableRow  style={{display:"flex",width:"100%",justifyContent:"space-around",alignItems:"center",backgroundColor:"#FAFAFA"}}> */}
                                                    <TableCell style={{ fontWeight: "bold" }} >Sr. No.</TableCell>
                                                    <TableCell style={{ fontWeight: "bold" }}> Name</TableCell>
                                                    <TableCell style={{ textAlign: "center", fontWeight: "bold" }}>Actions</TableCell>
                                                </TableRow>
                                                {/* </TableRow> */}
                                            </TableHead>
                                            <TableBody >
                                                {isLoading ? <TableRow ><Skeleton style={{ width: "70vw", borderRadius: "20px" }} highlightColor="#fff" height="1rem" count={2} baseColor="#ebebeb" /></TableRow> : false}

                                                {
                                                    tableData.filter(function (id) { return id._id === currentstate }).map((category, index) => (

                                                        //  <TableRow  key={index}>
                                                        category.fields.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((ele, i, fields) => (

                                                            <TableRow style={{}} hover key={i}>
                                                                {/* <TableRow key={i} style={{display:"flex",width:"100%",justifyContent:"space-around",alignItems:"center",borderBottom:"2px solid #FAFAFA"}}> */}
                                                                <TableCell component="th" scope="row" className={classes.textMiddle} >
                                                                    {i + 1 + (page) * rowsPerPage}
                                                                </TableCell>
                                                                <TableCell className={classes.textMiddle} style={{}}>{ele.title}</TableCell>
                                                                <TableCell className={classes.textMiddle} style={{ textAlign: "center" }} >
                                                                    <Tooltip title="Edit Attribute" arrow><Button onClick={() => {
                                                                        props.history.push({
                                                                            pathname: "/AddEditAttributes",
                                                                            state: [ele, i, category._id]

                                                                        });
                                                                    }} className="" style={{ color: "#0294b3", border: "1.5px solid #F6F6F6", margin: "0.5rem" }} > <EditIcon /> </Button></Tooltip>
                                                                    <Tooltip title="Delete Attribute" arrow><Button onClick={() => {
                                                                        DeleteAttribute(i)
                                                                        //  functionname(ele._id,i,category._id)
                                                                        console.log(i);
                                                                    }}
                                                                        className="" style={{ color: "#696969", margin: "0.5rem", border: "1.5px solid #F6F6F6" }}><DeleteOutline /> </Button></Tooltip>
                                                                </TableCell>

                                                                <TableCell style={{ display: "none" }}>{totallength = fields.length}</TableCell>

                                                            </TableRow>

                                                        ))


                                                        // </TableRow>
                                                    ))}

                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                    <TablePagination
                                        rowsPerPageOptions={[10, 25, 100]}
                                        component="div"
                                        count={totallength ?? 0}
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
