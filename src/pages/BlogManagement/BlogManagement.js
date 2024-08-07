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
import moment from "moment";

// import { Delete } from '@material-ui/icons';
import VisibilityIcon from "@material-ui/icons/Visibility";
import BlockIcon from "@material-ui/icons/Block";
// import ArrowBackIcon from "@material-ui/icons/ArrowBack";

// For Table
import SearchBar from "material-ui-search-bar";
import { orderBy, get } from "lodash";
import FileInputNew from "../../components/FileInputNew";
// import LexicalEditor from "../../LexicalEditor/index";

//history
import { useHistory } from "react-router-dom";

import "./BlogManagement.css";
import EditIcon from "@material-ui/icons/Edit";
import { DeleteOutline, WidgetsOutlined } from "@material-ui/icons";
import { Modal } from "../../components/Modal/Modal";
import { CategoryBox, CatRow, CatLabel, ButtonBox, CatButton, CatTitle } from "./BlogElements";
import Input from "../../components/Input";
import { Formik, Field, Form } from "formik";
import { blogValidator } from "../../utils/validators";
import TextArea from "../../components/TextArea";
import Overlay from "../../components/Overlay";
import MoreLess from "./MoreLess";
import { uploadImage } from "../../utils/Functions";
import JoditEditor from "jodit-react";

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
    textAlign: "center",
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

export default function Category_Management(props) {
  const classes = useStyles();

  // const history=useHistory();

  const [tableData, setTableData] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [BlogOpen, setBlogOpen] = useState(false);
  const [LinkText, setLinkText] = useState(null);
  // status switch
  const [blogData, setBlogData] = useState({
    title: "",
    description: "",
    file: [],
    link: "",
    _id: "",
  });

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
    setIsLoading(true);
    try {
      const { data } = await axios.get("/admin/get_blog");
      console.log(data);
      setTableData(data.data);
      setSearchedData(data.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      toast.error(`${error?.response?.data?.message}`, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setIsLoading(false);
    }
  };

  //edit  categories attribute

  const EditAttributeContent = (category) => {
    console.log(tableData);
    props.history.push({
      pathname: "/EditCategoryAttributes",
      state: category,
    });

    // delete category
  };
  const DeleteCategory = async (id) => {
    try {
      if (window.confirm("Are you sure you want to delete this category?")) {
        const { data } = await axios.post("/admin/delete_category", { category_id: id });
        console.log(data);
        getCategoriesContent();
        toast.success(data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      } else {
        toast.error("You have cancelled the operation", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } catch (error) {
      console.log(error);
      toast.error(error, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  // status switch

  const statusSwitch = async (e, id) => {
    try {
      console.log(id);

      const { data } = await axios.post("/admin/block_unblock_blog", { blog_id: id, isBlocked: !e.target.checked });
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
  const [searched, setSearched] = useState("");
  const [searchedData, setSearchedData] = useState([]);

  const requestSearch = (searchedVal) => {
    console.log(searchedVal);

    const filteredRows = searchedData.filter((row) => {
      let title = row.title;
      return title.toLowerCase().includes(searchedVal.toLowerCase());
    });
    setTableData(filteredRows);
  };
  const cancelSearch = () => {
    getCategoriesContent();
    // setSearched("");
    //  console.log(searchedData);
    //  requestSearch()
  };
  const handleCat = async (values) => {
    console.log(values);
    setIsLoading(true);
    if (values._id) {
      try {
        const { data } = await axios.patch("/admin/update_blog", {
          blog_id: values._id,

          title: values.title,
          image: values.file[0],
          description: values.description,
          link: values.link,
        });
        toast.success(`${data.message}`, {
          position: toast.POSITION.TOP_RIGHT,
        });
        getCategoriesContent();
        setIsLoading(false);
        setBlogOpen(false);
        setBlogData({ title: "", description: "", file: [], link: "", _id: "" });
      } catch (error) {
        toast.error(`${error.response.data.message}`, {
          position: toast.POSITION.TOP_RIGHT,
        });
        setIsLoading(false);
        setBlogOpen(false);
      }
    } else {
      try {
        const { data } = await axios.post("/admin/create_blog", {
          title: values.title,
          image: values.file[0],
          description: values.description,
          link: values.link,
        });
        toast.success(`${data.message}`, {
          position: toast.POSITION.TOP_RIGHT,
        });
        getCategoriesContent();
        setIsLoading(false);
        setBlogOpen(false);
        setBlogData({ title: "", description: "", file: [], link: "", _id: "" });
      } catch (error) {
        toast.error(`${error.response.data.message}`, {
          position: toast.POSITION.TOP_RIGHT,
        });
        setIsLoading(false);
        setBlogOpen(false);
      }
    }
  };
  const userBlocked = async (e) => {
    // console.log(e);
    if (e.categoryBlocked === true) {
      if (window.confirm("Are you sure you want to unblock this user?")) {
        try {
          await axios.post("/admin/new_block_unblock_user", {
            _id: e.categoryId,
            isBlocked: false,
          });
          toast.success("User unblocked successfully", {
            position: toast.POSITION.TOP_RIGHT,
          });
        } catch (error) {
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
          toast.success("User blocked successfully", {
            position: toast.POSITION.TOP_RIGHT,
          });
        } catch (error) {
          console.log(error);
        }
      } else {
        // getCategory();
      }
    } else {
      return "error";
    }
  };
  const deleteBlog = async (id) => {
    setIsLoading(true);
    if (window.confirm("Are you sure you want to delete this Blog?")) {
      try {
        const { data } = await axios.delete(`/admin/delete_blog?blog_id=${id}`);
        toast.success(data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
        setIsLoading(false);
        getCategoriesContent();
        console.log(data);
      } catch (error) {
        setIsLoading(false);
        console.log(error);
        toast.error(`${error?.response?.data?.message}`, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } else {
      getCategoriesContent();
    }
  };

  const EditBlog = (category) => {
    props.history.push({
      pathname: "/AddEditBlog",
      state: category,
    });
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <div className={classes.root}>
          <Paper>
            <div className={classes.paperPaddingRightLeft}>
              <div className="py-4">
                <Paper elevation={0} className={classNames(classes.paperHeading, classes.headingAlignment)}>
                  <h3 style={{}}>Blog Management</h3>
                  <SearchBar
                    // value={searched}
                    className="heightfix"
                    onChange={(searchVal) => requestSearch(searchVal)}
                    onCancelSearch={() => cancelSearch()}
                    placeholder="Title"
                  />
                  <Button
                    variant="contained"
                    className="buttoncss"
                    style={{ backgroundColor: "#0294b3", color: "#fff" }}
                    onClick={() => {
                      // setBlogOpen(true);
                      // setBlogData({
                      //   title: "",
                      //   description: "",
                      //   file: [],
                      //   link: "",
                      //   _id: "",
                      // });
                      props.history.push({
                        pathname: `/AddEditBlog`,
                      });
                    }}
                  >
                    {" "}
                    ADD BLOG
                  </Button>
                </Paper>
                <Paper>
                  <TableContainer className={classes.container}>
                    <Table className={classes.table} stickyHeader>
                      <TableHead>
                        <TableRow>
                          <TableCell style={{ fontWeight: "bold", textAlign: "center" }}>Sr. No.</TableCell>
                          <TableCell style={{ fontWeight: "bold", textAlign: "center" }}>Created At</TableCell>
                          <TableCell style={{ fontWeight: "bold", textAlign: "center" }}>Image</TableCell>
                          <TableCell style={{ fontWeight: "bold", textAlign: "center" }}>Title</TableCell>
                          {/* <TableCell style={{ fontWeight: "bold", textAlign: "center" }}>Link</TableCell> */}

                          <TableCell style={{ fontWeight: "bold", textAlign: "center", width: "20%" }}>Description</TableCell>
                          <TableCell style={{ fontWeight: "bold", textAlign: "center" }}>Status</TableCell>
                          <TableCell style={{ fontWeight: "bold", textAlign: "center" }}>Actions</TableCell>
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
                            <TableCell component="th" scope="row" className={classes.textMiddle}>
                              {index + 1 + page * rowsPerPage}
                            </TableCell>
                            <TableCell className={classes.textMiddle}>
                              {" "}
                              {moment(category.createdAt).format("DD/MM/YYYY")}
                            </TableCell>

                            <TableCell className={classes.textMiddle}>
                              {!get(category, "image", "") ? (
                                "N/A"
                              ) : (
                                <img src={get(category, "image", "")} alt="image" style={{ width: "30px", height: "30px" }} />
                              )}
                            </TableCell>
                            <TableCell className={classes.textMiddle}>
                              <div>{get(category, "title", "N/A")}</div>
                            </TableCell>
                            {/* <Tooltip title={LinkText === category._id ? "Click to Hide" : "Click to View"} arrow>
                              <TableCell
                                // className={classes.textMiddle}
                                onClick={() => setLinkText(LinkText === category._id ? null : category._id)}
                                style={{
                                  textAlign: "center",
                                  whiteSpace: LinkText === category._id ? "" : "nowrap",
                                  maxWidth: "150px",
                                  overflow: LinkText === category._id ? "" : "hidden",
                                  textOverflow: LinkText === category._id ? "" : "ellipsis",
                                  cursor: "pointer",
                                  // textTransform: "capitalize",
                                  wordBreak: "break-all",
                                }}
                              >
                                <div>
                                  {!get(category, "link", "N/A") ? (
                                    "N/A"
                                  ) : (
                                    <a target="_blank" href={`${get(category, "link", "")}`}>
                                      {get(category, "link", "")}
                                    </a>
                                  )}
                                </div>
                              </TableCell>
                            </Tooltip> */}
                            <TableCell className={classes.textMiddle}>
                              {" "}
                              <MoreLess desc={category.short_description} />
                            </TableCell>
                            <TableCell style={{ textAlign: "center" }}>
                              <Android12Switch
                                onChange={(e) => {
                                  statusSwitch(e, category._id);
                                }}
                                checked={!category.isBlocked}
                              />
                            </TableCell>
                            <TableCell className={classes.textMiddle} style={{ textAlign: "center" }}>
                              <Button
                                onClick={() => {
                                  EditBlog(category);
                                  // setBlogOpen(true);
                                  // setBlogData({
                                  //   title: category.title,
                                  //   description: category.description,
                                  //   file: [category.image],
                                  //   link: category.link,
                                  //   _id: category._id,
                                  // });
                                }}
                                className=""
                                style={{ margin: "0.5rem 0.1rem", color: "#0294b3" }}
                              >
                                <Tooltip title="Edit Blog" arrow>
                                  <EditIcon style={{ fontSize: "1.3rem" }} />
                                </Tooltip>
                              </Button>
                              {/* <Button onClick={()=>BlockCategory} style={{backgroundColor:"#696969"}} >Manage</Button> */}
                              <Button
                                className=""
                                onClick={() => {
                                  deleteBlog(category._id);
                                }}
                                style={{
                                  margin: "0.5rem 0.1rem",
                                  color: "#696969",
                                }}
                              >
                                <Tooltip title="Delete Plan" arrow>
                                  <DeleteOutline style={{ fontSize: "1.3rem" }} />
                                </Tooltip>
                              </Button>
                              {/* <Button className="" onClick={() => DeleteCategory(category._id)} style={{ border: "1.5px solid #F6F6F6", margin: "0.5rem", color: "#696969" }} ><Tooltip title="Delete Category" arrow><DeleteOutline /></Tooltip> </Button> */}
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
        className="update_profile"
        isOpen={BlogOpen}
        onClose={() => {
          setBlogOpen(false);
          setBlogData({ title: "", description: "", file: [], link: "", _id: "" });
        }}
        // fullWidth
        maxWidth="500px"
        title={
          <div className="modalsign">
            <div
              className="closeicon"
              onClick={() => {
                setBlogOpen(false);
                setBlogData({ title: "", description: "", file: [], link: "", _id: "" });
              }}
            >
              <i className="fas fa-times"></i>
            </div>
          </div>
        }
        content={
          <>
            <Formik enableReinitialize initialValues={blogData} validateOnChange onSubmit={handleCat} validate={blogValidator}>
              {(formikBag) => {
                return (
                  <Form>
                    <CategoryBox>
                      <CatTitle>{blogData._id ? "Edit" : "Add"} Blog</CatTitle>
                      <CatRow>
                        <CatLabel>Title:</CatLabel>
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
                                className="form-control"
                                error={formikBag.touched.title && formikBag.errors.title ? formikBag.errors.title : null}
                              />
                            </div>
                          )}
                        </Field>
                      </CatRow>
                      <CatRow>
                        <CatLabel>Link:</CatLabel>
                        <Field name="link">
                          {({ field }) => (
                            <div className="py-2">
                              <Input
                                {...field}
                                type="text"
                                value={formikBag.values.link}
                                onChange={(e) => {
                                  formikBag.setFieldValue("link", e.target.value);
                                }}
                                style={{ color: "black" }}
                                placeholder="Link"
                                className="form-control"
                                error={formikBag.touched.link && formikBag.errors.link ? formikBag.errors.link : null}
                              />
                            </div>
                          )}
                        </Field>
                      </CatRow>
                      {/*<LexicalEditor
                        
                        />
                      <LexicalEditor
                        
                        />
                      <LexicalEditor
                        
                              />*/}
                      <CatRow>
                        <CatLabel>Description:</CatLabel>

                        <JoditEditor
                          value={formikBag.values.description}
                          name="description"
                          onChange={(newContent) => {
                            // SettingData(newContent);

                            formikBag.setFieldValue("description", newContent);
                          }}
                        />
                        {get(formikBag, "errors.description", null) && (
                          <p
                            style={{
                              paddingTop: 5,
                              fontSize: 13,
                              color: "red",
                              textAlign: "left",
                            }}
                          >
                            {get(formikBag, "errors.description", null)}
                          </p>
                        )}
                      </CatRow>
                      <CatRow>
                        <CatLabel>Image:</CatLabel>
                        <Field name="file">
                          {({ field }) => (
                            <div className="py-2">
                              <FileInputNew
                                id="facility_images"
                                limit="1"
                                dictionary="dictionary"
                                images={formikBag.values.file}
                                onDelete={(image) => {
                                  var images = [...formikBag.values.file];
                                  images.splice(images.indexOf(image), 1);
                                  formikBag.setFieldValue("file", images);
                                }}
                                type="text"
                                label="upload_products_facility_photos"
                                info="eg_img"
                                onChange={async (e) => {
                                  const fileSize = e.target.files[0].size / 1024 / 1024; // in MiB
                                  if (fileSize > 2) {
                                    alert("ex_2mb");
                                    // $(file).val(''); //for clearing with Jquery
                                  } else {
                                    // setIsLoading(true);
                                    var image = await uploadImage(e.target.files[0]);
                                    var images = [...formikBag.values.file];
                                    console.log("images..........", images.path);
                                    images.push(image);
                                    formikBag.setFieldValue("file", images);

                                    // setIsLoading(false);
                                  }
                                }}
                                error={formikBag.touched.file && formikBag.errors.file ? formikBag.errors.file : null}
                              />
                            </div>
                          )}
                        </Field>
                      </CatRow>
                    </CategoryBox>
                    <ButtonBox>
                      <CatButton type="submit">Save</CatButton>
                    </ButtonBox>
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
