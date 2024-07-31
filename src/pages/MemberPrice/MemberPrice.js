import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  MemberCon,
  MemberInner,
  MemberRow,
  MemberButtonCon,
  MemberInnerButtonCon,
  CommonBox,
  CommonButton,
  LabelText,
  InputBox,
} from "./MemberElements";
import Input from "../../components/Input";
import classNames from "classnames";
import { Paper } from "@material-ui/core";
import axios from "../../axios";
import { get } from "lodash";
import { toast } from "react-toastify";
import Overlay from "../../components/Overlay";

const useStyles = makeStyles((theme) => ({
  root: {
    flexWrap: "wrap",
    backgroundColor: "white",
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

const MemberPrice = () => {
  const classes = useStyles();
  const [price, setPrice] = useState();
  const [__id, set__Id] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const getPrice = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get("/admin/get_memberPrice");
      setPrice(data.data?.price);
      set__Id(data.data?._id);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      toast.error(`${error?.response?.data?.message}`, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getPrice();
  }, []);

  const sendPrice = async () => {
    setIsLoading(true);
    console.log(price);
    if (price) {
      if (price < 1) {
        alert("Invalid Amount");
      } else {
        try {
          const { data } = await axios.post("/admin/update_memberPrice", {
            price: +price,
            _id: __id,
          });
          setIsLoading(false);
          console.log(data);
          toast.success(`${data.message}`, {
            position: toast.POSITION.TOP_RIGHT,
          });
          getPrice();
        } catch (error) {
          setIsLoading(false);
          toast.error(`${error.response.data.message}`, {
            position: toast.POSITION.TOP_RIGHT,
          });
          getPrice();
        }
      }
    } else {
      return "";
    }
  };
  return (
    <React.Fragment>
      {/* <div className="page-content">
                <div className={classes.root}>
                    <Paper elevation={0} className={classNames(classes.paperHeading, classes.headingAlignment)}>
                        <h3 style={{}}>Question Category Management</h3>
                    </Paper>

                </div>
            </div> */}
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
                  <h3 style={{}}>Member Price Management</h3>
                </Paper>
                <MemberCon>
                  <MemberInner>
                    <MemberRow>
                      <CommonBox>
                        <LabelText>Member Price ($):- </LabelText>
                      </CommonBox>
                      <InputBox>
                        <Input
                          type="number"
                          min="1"
                          placeholder="Member Price"
                          value={price}
                          onChange={(e) => setPrice(e.target.value)}
                        />
                      </InputBox>
                    </MemberRow>
                    <MemberButtonCon>
                      {/* <MemberInnerButtonCon> */}
                      <CommonBox>
                        <CommonButton type="button" onClick={sendPrice}>
                          Update
                        </CommonButton>
                      </CommonBox>
                      {/* <CommonBox>
                                                    <CommonButton>Delete</CommonButton>
                                                </CommonBox> */}
                      {/* </MemberInnerButtonCon> */}
                    </MemberButtonCon>
                  </MemberInner>
                </MemberCon>
              </div>
            </div>
          </Paper>
        </div>
      </div>
      {isLoading && <Overlay />}
    </React.Fragment>
  );
};

export default MemberPrice;
