import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import axios from "../../axios";
import { toast } from "react-toastify";

import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Tooltip  } from '@material-ui/core';

// import { Delete } from '@material-ui/icons';
import VisibilityIcon from '@material-ui/icons/Visibility';
import BlockIcon from '@material-ui/icons/Block';
// import ArrowBackIcon from "@material-ui/icons/ArrowBack";

// import Skeleton from 'react-loading-skeleton'
// import 'react-loading-skeleton/dist/skeleton.css'
// For Table
import SearchBar from "material-ui-search-bar";
import { orderBy,reverse } from "lodash";

//history
import {useHistory} from 'react-router-dom'
import AddCategory from "../AccountManagement/Account_Details";
// import './EditCategoryAttributes.css' ;
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
// import AddEditAttributes from "./AddEditAttributes";
import { indexOf } from "lodash-es";
import EditIcon from '@material-ui/icons/Edit';
import { DeleteOutline } from "@material-ui/icons";
import { Switch,styled  } from '@material-ui/core';





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
    color:"#696969",
    backgroundColor: "#fff" 
    
  },
  iconcolor:{
    margin: '0.5rem',
    color:"#fff",
    backgroundColor: "#0294b3 !important"
  },
  headingButton: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: "10px",
   
  },
  headingAlignment:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    // padding: "0 2rem 0 2rem"
    alignItems: 'center',
    ['@media (max-width:780px)']: { // eslint-disable-line no-useless-computed-key
      flexDirection:'column',
      width: '100%',
      gap: '1rem',
      justifyContent: 'center',
      textAlign: 'center',
    }
  },
  Marginbutton:{
    margin: "0.5rem"
  },
  container: {
    maxHeight: '58vh',
  },
  paperPaddingRightLeft: {
    padding: '0rem 1rem',
  },
}));

const Android12Switch = styled(Switch)(({ theme }) => ({
  padding: 8,
  '& .MuiSwitch-track': {
    borderRadius: 22 / 2,
    '&:before, &:after': {
      content: '""',
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      width: 16,
      height: 16,
    },
    '&:before': {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main),
      )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
      left: 12,
    },
    '&:after': {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main),
      )}" d="M19,13H5V11H19V13Z" /></svg>')`,
      right: 12,
    },
  },
  '& .MuiSwitch-thumb': {
    boxShadow: 'none',
    width: 16,
    height: 16,
    margin: 2,
  },
}));


export default function Service_Details(props) {
  const classes = useStyles();

  const {
    location: { state },
  } = props;
  // const history=useHistory(); 
 console.log(state);

  const [tableData, setTableData] = useState([]);
  const[isLoading,setIsLoading]=useState(true);
  // const [tablelength,setTableLength] = useState(null);
  const [mainobject1,setMainObject1] = useState([]);

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


useEffect(() => {getCategoriesContent() } , []);
  
 //get content
 const getCategoriesContent = async()=>{
 try {                                       
      
      
  
  const { data } = await axios.get("/admin/get_service_details_list");
  console.log(data);
setTableData(data.response)
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
if(typeof(state)==="string"){
   currentstate=state
}else if(typeof(state)==="object"){
   currentstate=state.serviceNameId
   
}else{

}

const DeleteService=async(internalid)=>{
//  var mainobject=  tableData.filter(function (id) {return id._id===currentstate})
// mainobject[0].fields.splice(internalid,1)
// var changedObject={
//   category_id:mainobject[0]._id,
//   fields:mainobject[0].fields,
//   name:mainobject[0].name,
//   desc:mainobject[0].desc,

// }
console.log(internalid);
// delete mainobject[0].fields[internalid]

// setMainObject1()
// console.log(abc);
try {
  const { data } = await axios.post("/admin/remove_service_details",{serviceDetailId:internalid});
// console.log(changedObject);

toast.success(`${data.message}`, {
position: toast.POSITION.TOP_RIGHT,
});
getCategoriesContent()

}catch (error) {
console.log(error);}

}

const statusSwitch=async(e,id)=>{

  try {
    console.log(id);

    const { data } = await axios.post("/admin/block_unblock_service_details", {serviceDetailId:id,is_blocked:e.target.checked});
    // props.history.push({
    //     pathname: "/Category_Management",
    //   });
    getCategoriesContent();
    toast.success(data.message, {
      position: toast.POSITION.TOP_RIGHT,
    });
  console.log(data);
 
} catch (error) {
    console.log(error)
}


// console.log(e.target.checked);
// console.log(checked);
// console.log(id);

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
                                pathname: "/Service_Category_Management",
                                
                              });

                       
                     
                      }}
                    >
                      <ArrowBackIcon />
                    </Button>
                    <h3 style={{marginBottom:"-0.5rem"}}>Edit Services </h3>
                    <Button variant="contained" className="buttoncss" style={{backgroundColor:"#0294b3",color:"#fff",margin:"0.5rem"}} onClick={()=>{
                                       props.history.push({
                                        pathname: "/AddEditServiceDetails",
                                      state:currentstate
                                        
                                    })}}  > ADD SERVICE</Button>
                  
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
                              <TableCell style={{fontWeight:"bold"}} >Sr. No.</TableCell>
                              <TableCell style={{fontWeight:"bold"}}> Name</TableCell>
                              <TableCell style={{fontWeight:"bold"}}>Description</TableCell>
                              <TableCell style={{fontWeight:"bold"}}>Price</TableCell>
                              {/* <TableCell style={{fontWeight:"bold"}}>Template</TableCell> */}
                              <TableCell style={{fontWeight:"bold",textAlign:"center"}}>Status</TableCell>
                              <TableCell style={{textAlign:"center",fontWeight:"bold"}}>Actions</TableCell>
                               </TableRow>
                          {/* </TableRow> */}
                      </TableHead>
                      <TableBody >
                      {/* {isLoading?<TableRow ><Skeleton style={{width:"70vw",borderRadius:"20px"}} highlightColor="#fff" height="1rem" count={2} baseColor="#ebebeb"/></TableRow>:false} */}

                      {       
                             tableData.filter(function (id) {
                              //  return id.serviceNameId?._id===currentstate
                              return id?._id===currentstate
                              // console.log();
                              
                              }
                               ).map((category, index) =>(
                        // console.log(category)
                        
                                                      //  <TableRow  key={index}>
                category.data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((ele, i) => (
                  
              <TableRow style={{}} hover key={index}>
                  {/* <TableRow key={i} style={{display:"flex",width:"100%",justifyContent:"space-around",alignItems:"center",borderBottom:"2px solid #FAFAFA"}}> */}
  <TableCell component="th" scope="row" className={classes.textMiddle} >
  {/* {index + 1+ (page)*rowsPerPage}  */}
  {i + 1+ (page)*rowsPerPage} 

</TableCell>
<TableCell className={classes.textMiddle} style={{}}>
  {console.log(category)}
  {/* {category.name} */}
{ele.name}
  </TableCell>
<TableCell className={classes.textMiddle} style={{}}>
  {/* {category.description} */}
  {ele.description}

  </TableCell>
<TableCell className={classes.textMiddle} style={{}}>
  {/* {`$`+category.price} */}
  {`$`+ele.price}

  </TableCell>
{/* <TableCell className={classes.textMiddle} style={{}}> */}
  {/* {category.templateId?.name} */}
  {/* {ele.templateId?.name}

  </TableCell> */}
<TableCell className={classes.textMiddle} style={{textAlign:"center"}}><Tooltip title="Active/Inactive" arrow><Android12Switch onChange={(e)=>{
  // statusSwitch(e,category._id)
  statusSwitch(e,ele._id)

  }} 
  // checked={category.is_blocked} 
  checked={ele.is_blocked}
  
  /></Tooltip></TableCell>
<TableCell className={classes.textMiddle} style={{textAlign:"center"}} >
 <Tooltip title="Edit Service" arrow><Button onClick={()=>{
   props.history.push({
     pathname: "/AddEditServiceDetails",
    //  state:category
      state:ele
     
   });
 }} className="" style={{color:"#0294b3",border:"1.5px solid #c4c4c4", margin:"0.5rem"}} > <EditIcon/> </Button></Tooltip>
 <Tooltip title="Delete Service" arrow><Button onClick={()=>{
  //  DeleteService(category._id)
  DeleteService(ele._id)
  //  functionname(ele._id,i,category._id)
  // console.log(i);
   }}
   className="" style={{color:"#696969",margin:"0.5rem",border:"1.5px solid #c4c4c4"}}><DeleteOutline/> </Button></Tooltip>
</TableCell>
  
{/* <TableCell style={{display:"none"}}>{totallength=fields.length}</TableCell> */}

      </TableRow> 
   
                ))
                                
                            
                              // </TableRow>
                               )) }
                                
                        </TableBody>
                    </Table>
                  </TableContainer>
                  <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={ totallength??0}
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
