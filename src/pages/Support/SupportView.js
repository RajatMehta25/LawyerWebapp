import React, { useEffect, useState, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import { IconContext } from "react-icons";

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Checkbox,
} from "@material-ui/core";
import axios from "../../axios";
import { toast } from "react-toastify";
import { get } from "lodash";
import * as SE from "./SupportElements";
import Overlay from "../../components/Overlay";
import {
  ConversationCard,
  WhoDidSection,
  WhoProfileImage,
  ProfileImageButton,
  WhoSectionRight,
  RepliedRow,
  TimeAgoRow,
  ToSection,
  AllText,
  CrossIcon
} from "./SupportElements";
import Select from "../../components/Select";
import moment from "moment";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Button from "@material-ui/core/Button";
import { BsInfoLg } from "react-icons/bs";
import * as AiIcons from "react-icons/ai";
import { MdKeyboardArrowDown } from "react-icons/md";
import JoditEditor from "jodit-react";
import pdfIcon from "../../assets/images/pdf.png";
import docIcon from "../../assets/images/google-docs.png";
import xlsIcon from "../../assets/images/xlsx-file-format-extension.png";
import csvIcon from "../../assets/images/csv-file-format-extension.png";
import jsonIcon from "../../assets/images/json-file.png";
import rtfIcon from "../../assets/images/rtf-file-symbol.png";
import ProfileDoc from "../../components/ProfileDoc";
import { uploadImage } from "../../utils/Functions";
const useStyles = makeStyles((theme) => ({
  root: {
    // height: "90vh",
    flexWrap: "wrap",
    // overflowY: "scroll"
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
    "&:hover": {
      // backgroundColor: "yellow",
      color: "black",
    },
  },

  iconcolor: {
    margin: "0.4rem",
    color: "#fff !important",
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
  addNewCategory: {
    display: "flex",
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
  addNewCategoryHeading: {
    textAlign: "center",
    position: "relative",
    flex: 1,
    paddingBottom: "0 !important",
    ["@media (max-width:780px)"]: {
      // eslint-disable-line no-useless-computed-key
      flexDirection: "column",
      width: "100%",
      gap: "1rem",
      justifyContent: "center",
      textAlign: "center",
    },
  },
  MarginControl: {
    ["@media (max-width:780px)"]: {
      // eslint-disable-line no-useless-computed-key
      margin: "0 !important",
    },
  },
  Marginbutton: {
    margin: "0.5rem",
  },
  container: {
    maxHeight: "37vh",
  },
  paperPaddingRightLeft: {
    padding: "0rem 1rem",
  },
}));
const SupportView = (props) => {
  const [tableData, setTableData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const classes = useStyles();
  const [viewId, setViewId] = useState(props?.match?.params.id);
  const [conversationData, setConversationData] = useState([]);
  const [attachData, setAttachData] = useState([]);
  const [objectData, setObjectData] = useState([]);

  useEffect(() => {
    getView();
    getConversation();
  }, [viewId]);

  //   //search logic
  const getView = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(`admin/view_ticket?ticket_id=${viewId}`);
      // console.log(data);
      setTableData(data.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const getConversation = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(
        `admin/view_ticket_conversation?ticket_id=${viewId}`
      );
      setConversationData(data.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const handleReplyTicket = async (values) => {
    setIsLoading(true);
    try {
      const { data } = await axios.post(`admin/create_ticket_reply`, values);
      setContent("");
      getConversation();
      toast.success(data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      toast.error(`${error?.response?.data?.message}`, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const handleReplyTicketAttach = async (values) => {
    setIsLoading(true);

    let data = new FormData();
    for (let i = 0; i < values.attachments.length; i++) {
      data.append("attachments[]", values.attachments[i]);
    }
    data.append("body", values.body);

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `https://thoolietechnologycorp.freshdesk.com/api/v2/tickets/${
        props?.match?.params.id * 1
      }/reply`,
      headers: {
        Authorization: "Basic ekxhb0dIa1VvbFVIVE5DN1daQU46WA==",
      },
      data: data,
    };
    // ...data.getHeaders()
    axios
      .request(config)
      .then((response) => {
        setContent("");
        getConversation();
        setAttachData([]);
        toast.success(response.data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
        toast.error(`${error?.response?.data?.message}`, {
          position: toast.POSITION.TOP_RIGHT,
        });
      });

    // try {
    //   const { data } = await axios.post(`https://thooliecompany.freshdesk.com/api/v2/tickets/14/reply`, values);

    // } catch (error) {
    //   console.log(error);

    // }
  };

  const handleUpdateTicket = async (values) => {
    setIsLoading(true);
    try {
      const { data } = await axios.put(`admin/update_ticket`, values);
      getView();
      toast.success(data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      toast.error(`${error?.response?.data?.message}`, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const getResponsiveTime = (e) => {
    if (e) {
      const today = new Date();
      const endDate = new Date(e);
      const daysPassed = -parseInt((endDate - today) / (1000 * 60 * 60 * 24));
      const hoursPassed = parseInt(
        (Math.abs(endDate - today) / (1000 * 60 * 60)) % 24
      );
      const minutesPassed = parseInt(
        (Math.abs(endDate.getTime() - today.getTime()) / (1000 * 60)) % 60
      );
      const secondsPassed = parseInt(
        (Math.abs(endDate.getTime() - today.getTime()) / 1000) % 60
      );
      if (daysPassed > 365) {
        return `${Math.round(daysPassed / 365)} yr`;
      } else if (daysPassed < 365 && daysPassed > 28) {
        return `${Math.round(daysPassed / 28)} mon`;
      } else if (daysPassed < 28 && daysPassed > 10) {
        return `${daysPassed} day ago`;
      } else if (daysPassed < 10 && daysPassed > 1) {
        return `${daysPassed} day ago`;
      } else if (hoursPassed < 24 && hoursPassed > 1) {
        return `said about ${hoursPassed} hours ago`;
      } else if (minutesPassed < 60 && minutesPassed > 1) {
        return `said about ${minutesPassed} minutes ago`;
      } else {
        return `said less than a ${secondsPassed} sec`;
      }
    } else {
      return "";
    }
  };

  // Email Editor
  const editor = useRef(null);
  const [content, setContent] = useState("");

  const config = {
    readonly: false,
    // placeholder: "Start typings...",
    useSearch: false,
    // toolbarButtonSize: "small",
    defaultMode: 1,
    toolbarSticky: false,
    showCharsCounter: false,
    inline: true,
    toolbarInlineForSelection: true,
    showPlaceholder: false,
    buttons: "bold,italic,underline,ul,ol,font,paragraph,table,link,source",
    minHeight: "300",
  };

  const ticketOptions = [
    {
      label: "Open",
      value: "2",
    },
    {
      label: "Pending",
      value: "3",
    },
    {
      label: "Resolved",
      value: "4",
    },
    {
      label: "Closed",
      value: "5",
    },
  ];

  const returnStatusValue = (e) => {
    if (e === 2) {
      return {
        label: "Open",
        value: "2",
      };
    } else if (e === 3) {
      return {
        label: "Pending",
        value: "3",
      };
    } else if (e === 4) {
      return {
        label: "Resolved",
        value: "4",
      };
    } else if (e === 5) {
      return {
        label: "Closed",
        value: "5",
      };
    }
  };
  // console.log(content);
  // Size Funtion
  function formatBytes(bytes, decimals = 2) {
    if (!+bytes) return "0 Bytes";

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
  }
  // Image Function
  const ImageFun = (e) => {
    // console.log("Hi");
    if (e.includes("pdf")) {
      return pdfIcon;
    } else if (e.includes("doc")) {
      return docIcon;
    } else if (e.includes("xlsx")) {
      return xlsIcon;
    } else if (e.includes("json")) {
      return jsonIcon;
    } else if (e.includes("csv")) {
      return csvIcon;
    } else if (e.includes("rtf")) {
      return rtfIcon;
    } else {
      return e;
    }
  };
  // Image Function
  const ImageFuns = (e) => {
    // console.log(e);
    if (e.name.includes("pdf")) {
      return pdfIcon;
    } else if (e.name.includes("doc")) {
      return docIcon;
    } else if (e.name.includes("xlsx")) {
      return xlsIcon;
    } else if (e.name.includes("json")) {
      return jsonIcon;
    } else if (e.name.includes("csv")) {
      return csvIcon;
    } else if (e.name.includes("rtf")) {
      return rtfIcon;
    } else {
      return URL.createObjectURL(e);
    }
  };
  const removeEL = (index) => {
    // console.log(attachData)
    setAttachData(attachData.filter((val, ind) => ind !== index));
  };
  console.log(objectData);
  console.log(attachData);
  return (
    <>
      <IconContext.Provider value={{ color: "#00FFB9", size: "25px" }}>
        <div className="page-content">
          {/* <div className={classes.root}> */}
          <Paper className={classes.root}>
            <div className={classes.paperPaddingRightLeft}>
              <div className="py-4">
                <Paper
                  elevation={0}
                  className={classNames(
                    classes.paperHeading,
                    classes.headingAlignment
                  )}
                >
                  {/* <h3 style={{ marginLeft: "1rem" }}>Support View</h3> */}
                  <Button
                    variant="outlined"
                    aria-label="add"
                    className={classes.iconMargin}
                    onClick={() => {
                      // if (window.confirm("Leave without saving changes?")) {
                      props.history.push({
                        pathname: "/support",
                      });
                      // }
                    }}
                  >
                    <ArrowBackIcon />
                  </Button>
                  <Select
                    className="cm-select"
                    isSearchable={false}
                    value={returnStatusValue(tableData.status)}
                    options={ticketOptions}
                    placeholder={"Ticket Actions"}
                    onChange={(option) => {
                      console.log(option);
                      handleUpdateTicket({
                        ticket_id: props?.match?.params.id * 1,
                        priority: 3,
                        status: option.value * 1,
                      });
                      // formikBag.setFieldValue("published_to", option);
                    }}
                  />
                  <SE.ViewBox>
                    <SE.ViewOne>
                      <SE.TitleRow>
                        <SE.TitleOne style={{ marginRight: "0" }}>
                          <i className="ph ph-globe"></i>
                        </SE.TitleOne>
                        <SE.TitleTwo>
                          {get(tableData, "subject", "")}
                        </SE.TitleTwo>
                      </SE.TitleRow>
                      <SE.InfoCard>
                        <SE.BoxOne style={{ marginRight: "0", width: "8%" }}>
                          <SE.OneInners>
                            {get(tableData, "requester.name", "").slice(0, 1)}
                          </SE.OneInners>
                        </SE.BoxOne>
                        <SE.BoxTwos>
                          <SE.NameRow>
                            <SE.NameB>
                              {get(tableData, "requester.name", "")}
                            </SE.NameB>
                            <SE.ComText>reported via the portal</SE.ComText>
                          </SE.NameRow>
                          <SE.NameRow style={{ marginTop: "0.35rem" }}>
                            <i style={{ color: "#6a7194", fontSize: "0.8rem" }}>
                              {getResponsiveTime(
                                get(tableData, "created_at", "")
                              )}{" "}
                              (
                              {moment(get(tableData, "created_at", "")).format(
                                "ddd, MMM Do YYYY, h:mm A"
                              )}
                              )
                            </i>
                          </SE.NameRow>
                        </SE.BoxTwos>
                      </SE.InfoCard>
                      <SE.MsgRow>
                        <SE.IconBox>
                          <i
                            className="ph ph-globe"
                            style={{ color: "#6a7194" }}
                          ></i>
                        </SE.IconBox>
                        <SE.MsgBox>
                          {get(tableData, "description_text", "")}
                        </SE.MsgBox>
                      </SE.MsgRow>
                      {tableData?.attachments?.length > 0 ? (
                        <SE.AttachBox>
                          <SE.AttachTextRow>
                            Attachments ({tableData?.attachments?.length})
                          </SE.AttachTextRow>
                          <SE.AttachImageBox>
                            {tableData?.attachments?.length > 0
                              ? tableData.attachments?.map((val, ind) => {
                                  return (
                                    <SE.AttachSingle
                                      key={ind}
                                      href={val.attachment_url}
                                      target="_blank"
                                    >
                                      <SE.AttachOne>
                                        <SE.DocImage
                                          src={ImageFun(val.attachment_url)}
                                        />
                                      </SE.AttachOne>
                                      <SE.AttachTwo>
                                        <SE.CommonText>
                                          {val.name}
                                        </SE.CommonText>
                                        <SE.CommonText>
                                          {formatBytes(val.size)}
                                        </SE.CommonText>
                                      </SE.AttachTwo>
                                    </SE.AttachSingle>
                                  );
                                })
                              : ""}
                          </SE.AttachImageBox>
                        </SE.AttachBox>
                      ) : (
                        ""
                      )}
                      {conversationData && conversationData.length > 0 ? (
                        <>
                          {/* {console.log(conversationData)} */}
                          {conversationData.map((item, index) => (
                            <>
                              <ConversationCard key={index}>
                                <WhoDidSection>
                                  <WhoProfileImage>
                                    <SE.OneInners>
                                      {item.source === 2
                                        ? get(
                                            tableData,
                                            "requester.name",
                                            ""
                                          ).slice(0, 1)
                                        : get(item, "support_email", "").slice(
                                            0,
                                            1
                                          )}
                                    </SE.OneInners>
                                  </WhoProfileImage>
                                  <WhoSectionRight>
                                    <RepliedRow>
                                      {item.source === 2
                                        ? `${get(
                                            tableData,
                                            "requester.name",
                                            ""
                                          )} <${get(
                                            tableData,
                                            "requester.email",
                                            ""
                                          )}>`
                                        : get(item, "support_email", "")}{" "}
                                      {getResponsiveTime(
                                        get(item, "created_at", "")
                                      )}{" "}
                                    </RepliedRow>
                                    <RepliedRow>{item.body_text}</RepliedRow>
                                    {item.attachments.length > 0 ? (
                                      <SE.AttachBox
                                        style={{ paddingLeft: "0" }}
                                      >
                                        <SE.AttachTextRow>
                                          Attachments ({item.attachments.length}
                                          )
                                        </SE.AttachTextRow>
                                        <SE.AttachImageBox>
                                          {item.attachments.length > 0
                                            ? item.attachments?.map(
                                                (val, ind) => {
                                                  return (
                                                    <SE.AttachSingle
                                                      key={ind}
                                                      href={val.attachment_url}
                                                      target="_blank"
                                                    >
                                                      <SE.AttachOne>
                                                        <SE.DocImage
                                                          src={ImageFun(
                                                            val.attachment_url
                                                          )}
                                                        />
                                                      </SE.AttachOne>
                                                      <SE.AttachTwo>
                                                        <SE.CommonText>
                                                          {val.name}
                                                        </SE.CommonText>
                                                        <SE.CommonText>
                                                          {formatBytes(
                                                            val.size
                                                          )}
                                                        </SE.CommonText>
                                                      </SE.AttachTwo>
                                                    </SE.AttachSingle>
                                                  );
                                                }
                                              )
                                            : ""}
                                          {/* <SE.AttachSingle>
                                      <SE.AttachOne>
                                        <SE.DocImage src={docIcon} />
                                      </SE.AttachOne>
                                      <SE.AttachTwo>
                                        <SE.CommonText>jenny.jpg</SE.CommonText>
                                        <SE.CommonText>195 KB</SE.CommonText>
                                      </SE.AttachTwo>
                                    </SE.AttachSingle> */}
                                        </SE.AttachImageBox>
                                      </SE.AttachBox>
                                    ) : (
                                      ""
                                    )}
                                    {/* <TimeAgoRow>
                                      {getResponsiveTime(
                                        get(item, "updated_at", "")
                                      )}{" "}
                                      (
                                      {moment(
                                        get(tableData, "updated_at", "")
                                      ).format("ddd, MMM Do YYYY, h:mm A")}
                                    </TimeAgoRow> */}
                                  </WhoSectionRight>
                                </WhoDidSection>
                                {/* <ToSection>
                                  <WhoProfileImage>
                                    <SE.TitleOne
                                      style={{
                                        marginRight: "0",
                                        width: "100%",
                                      }}
                                    >
                                      <AiIcons.AiOutlineMail />
                                    </SE.TitleOne>
                                  </WhoProfileImage>
                                  <WhoSectionRight>
                                    <RepliedRow>
                                      To :{" "}
                                      {item.to_emails.map((toEmail) => (
                                        <>{toEmail}&nbsp;&nbsp;&nbsp;</>
                                      ))}
                                    </RepliedRow>
                                    <AllText>{item.body_text}</AllText>
                                  </WhoSectionRight>
                                </ToSection> */}
                              </ConversationCard>
                            </>
                          ))}
                        </>
                      ) : (
                        ""
                      )}
                      <SE.EmailBox>
                        <SE.InnerEmailBox>
                          <SE.EmailFirstRow>
                            <SE.EmailFirstBox>
                              <SE.OneChar>
                                {get(tableData, "requester.name", "").slice(
                                  0,
                                  1
                                )}
                              </SE.OneChar>
                            </SE.EmailFirstBox>
                            <SE.EmailSecondBox>
                              From: LawyerFirm support@lawyerfirm.freshdesk.com
                            </SE.EmailSecondBox>
                          </SE.EmailFirstRow>
                          <SE.EmailSecondRow>
                            To: {get(tableData, "requester.email", "")}
                          </SE.EmailSecondRow>
                          <SE.EmailEditor>
                            <JoditEditor
                              ref={editor}
                              value={content}
                              config={config}
                              // tabIndex={1} // tabIndex of textarea
                              onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                            />
                          </SE.EmailEditor>
                          <SE.AtBox>
                            <ProfileDoc
                              type="file"
                              id="pic"
                              multiple={true}
                              accept="image/jpeg,image/gif,image/png,application/pdf,image/x-eps,.doc,.docx"
                              name="commercial_image"
                              placeholder="Password"
                              style={{ padding: "13px 0" }}
                              onChange={async (e) => {
                                const maxAllowedSize = 20 * 1024 * 1024;
                                console.log(maxAllowedSize);
                                let object = e.target.files;
                                let array = Object.values(object);
                                // setObjectData([...objectData, ...array])
                                // console.log(array)
                                let fil = array.find(
                                  (val) => val.size > maxAllowedSize
                                )
                                  ? true
                                  : false;
                                if (fil) {
                                  alert("size less than to 20 MB");
                                } else {
                                  // setAttachData(array, [...attachData]);
                                  setAttachData([...attachData, ...array]);
                                }
                              }}
                              hidden
                            />
                          </SE.AtBox>
                          <SE.ImageCon>
                            {/* {console.log(attachData)} */}
                            {attachData.length > 0
                              ? attachData?.map((val, ind) => {
                                  return (
                                    <>
                                      {console.log(val)}
                                      <SE.AttachSingle
                                        key={ind}
                                        href={val.attachment_url}
                                        target="_blank"
                                      >
                                        <SE.AttachOne>
                                          <SE.DocImage src={ImageFuns(val)} />
                                        </SE.AttachOne>
                                        <SE.AttachTwo>
                                          <SE.CommonText>
                                            {val.name}
                                          </SE.CommonText>
                                          <SE.CommonText>
                                            {formatBytes(val.size)}
                                          </SE.CommonText>
                                        </SE.AttachTwo>
                                        <CrossIcon onClick={() => removeEL(ind)}>
                                        <i className="ph-fill ph-x-circle"></i>
                                        </CrossIcon>
                                      </SE.AttachSingle>
                                    </>
                                  );
                                })
                              : ""}
                          </SE.ImageCon>
                          <SE.SendRow>
                            <SE.SendBoxs>
                              <SE.SendBox>
                                <SE.SendButton
                                  onClick={() => {
                                    if (content) {
                                      if (attachData.length > 0) {
                                        let datatoSendAttach = {
                                          ticket_id: props?.match?.params.id,
                                          body: content,
                                          attachments: attachData,
                                        };
                                        handleReplyTicketAttach(
                                          datatoSendAttach
                                        );
                                      } else {
                                        let datatoSend = {
                                          ticket_id: props?.match?.params.id,
                                          body: content,
                                        };
                                        handleReplyTicket(datatoSend);
                                      }
                                    } else {
                                      toast.error(
                                        `Please enter something in reply`,
                                        {
                                          position: toast.POSITION.TOP_RIGHT,
                                        }
                                      );
                                    }
                                  }}
                                >
                                  Send
                                </SE.SendButton>
                                <SE.SendButtons>
                                  <MdKeyboardArrowDown />
                                </SE.SendButtons>
                              </SE.SendBox>
                            </SE.SendBoxs>
                          </SE.SendRow>
                        </SE.InnerEmailBox>
                      </SE.EmailBox>
                    </SE.ViewOne>
                    <SE.ViewTwo>
                      <SE.IndenCard>
                        <SE.IdenRowOne>
                          <BsInfoLg /> <SE.ConText>Contact Details</SE.ConText>
                        </SE.IdenRowOne>
                        <SE.InfoBox>
                          <SE.InfoRow>
                            <SE.OneInners
                              style={{ marginRight: "0.7rem", fontSize: "700" }}
                            >
                              {get(tableData, "requester.name", "").slice(0, 1)}
                            </SE.OneInners>
                            <SE.NameB>
                              {get(tableData, "requester.name", "")}
                            </SE.NameB>
                          </SE.InfoRow>
                          <SE.LabelText>Email</SE.LabelText>
                          <SE.TextFi>
                            {get(tableData, "requester.email", "")}
                          </SE.TextFi>
                          <SE.LabelText>Work phone</SE.LabelText>
                          <SE.TextFi>
                            {get(tableData, "requester.phone", "")}
                          </SE.TextFi>
                        </SE.InfoBox>
                      </SE.IndenCard>
                    </SE.ViewTwo>
                  </SE.ViewBox>
                </Paper>
              </div>
            </div>
          </Paper>
          {/* </div> */}
        </div>
        {isLoading && <Overlay />}
      </IconContext.Provider>
    </>
  );
};

export default SupportView;
