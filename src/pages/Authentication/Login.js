import React, { Component } from "react";
import axios from "../../axios";
import { Row, Col, Input, Button, Alert, Container, Label, FormGroup } from "reactstrap";

import Cookies from "js-cookie";
import { toast } from "react-toastify";

// Redux
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";

// availity-reactstrap-validation
import { AvForm, AvField } from "availity-reactstrap-validation";

// actions
import { checkLogin, apiError } from "../../store/actions";

// import images
import logo from "../../assets/images/logo.png";
import { Visibility, VisibilityOff } from "@material-ui/icons";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { username: "", password: "", showpass: true };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.decodeParam = this.decodeParam.bind(this);
  }
  handleShow() {
    this.setState({ showpass: !this.state.showpass });
  }
  decodeParam() {
    if (this.props.location.search) {
      const params = new URLSearchParams(this.props.location.search);
      this.setState({ username: atob(params.get("subAdmin")) });
    }
  }

  async handleSubmit(event, values) {
    // console.log(this.props.checkLogin);
    let requestData = {
      inputUserName: this.props.checkLogin(values, this.props.history).payload.user.username,
      inputUserPassword: this.props.checkLogin(values, this.props.history).payload.user.password,
    };
    // let inputUserName = this.props.checkLogin(values).payload.user.username;
    // let inputUserPassword = this.props.checkLogin(values).payload.user.password;
    // console.log(inputUserName);
    // console.log(this.props.checkLogin(values).payload.user.username);
    // console.log(this.props.checkLogin(values).payload.user.password);
    try {
      // const params = new URLSearchParams(this.props.location.search)
      // let { data } = await axios.post("/admin/login", {
      //   email: requestData.inputUserName,
      //   password: requestData.inputUserPassword,
      //   is_subadmin : !!params.get('subAdmin')
      // });
      // console.log(data);
      // console.log(data.data);

      // Cookies.set("admin_access_token", data.access_token, {
      //   expires: 365,
      // });
      Cookies.set("admin_access_token", "kbc", {
        expires: 365,
      });
      // Cookies.set("access", JSON.stringify(data.data.access), {
      //   expires: 365,
      // });

      // Cookies.set("isSuperAdmin", JSON.stringify(data.data.isSuperAdmin), {
      //   expires: 365,
      // });
      Cookies.set("isSuperAdmin", "true", {
        expires: 365,
      });

      // if (data.data.isSuperAdmin) {
      if (true) {
        // Cookies.set("access", JSON.stringify(data.data.access), {
        //   expires: 365,
        // });
        Cookies.set("access", JSON.stringify(["ALL"]), {
          expires: 365,
        });
        console.log("iffffffff");
      } else {
        // console.log(data.data.roll_access_id.roll_acess);
        // Cookies.set("access", JSON.stringify(data.data.roll_access_id.roll_access), {
        //   expires: 365,
        // });
        // Cookies.set("rolename", JSON.stringify(data.data.roll_access_id.roll_name), {
        //   expires: 365,
        // });

        console.log("elseeeeeeee");
      }
      // Cookies.set("email", JSON.stringify(data.data.email), {
      //   expires: 365,
      // });
      Cookies.set("email", "rajat@gmail.com", {
        expires: 365,
      });
      // this.props.history.push("/dashboard");
      // if (data.data.is_blocked) {
      if (false) {
        alert("It looks like your account has been blocked. Please contact your admin to unblock it");
        Cookies.remove("admin_access_token");
        this.props.history.push("/login");
      } else {
        // if (!data.data.isSuperAdmin) {
        if (false) {
          // switch (data.data.roll_access_id.roll_access[0]) {
          switch ("Dashboard") {
            case "Dashboard":
              this.props.history.push(`/dashboard`);
              break;
            case "Account Management":
              this.props.history.push(`/account-managment-new`);
              break;
            case "Question Category Management":
              this.props.history.push(`/Category_Management`);
              break;
            case "Subscription Management":
              this.props.history.push(`/Subscription_Management`);
              break;
            case "Subscribed User Listing":
              this.props.history.push(`/SubscriptionList`);
              break;
            case "Blog Management":
              this.props.history.push(`/Blog`);
              break;
            case "Press Management":
              this.props.history.push(`/press-management`);
              break;
            case "Notification Management":
              this.props.history.push(`/Notification_Management`);
              break;
            case "Member Price Management":
              this.props.history.push(`/member-price`);
              break;
            case "Testimonial Management":
              this.props.history.push(`/testimonial-management`);
              break;
            case "FAQ Management":
              this.props.history.push(`/FAQ_Management`);
              break;
            case "Content Management":
              this.props.history.push(`/content`);
              break;
            case "Accounting":
              this.props.history.push(`/accounting`);
              break;
            case "Support":
              this.props.history.push(`/support`);
              break;

            default:
              break;
          }
        } else {
          this.props.history.push(`/dashboard`);
        }
      }
      // window.location.reload()
    } catch (error) {
      // alert("some error");
      toast.error(error.response.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });

      console.log(error);
    }
  }

  componentDidMount() {
    this.props.apiError("");
    document.body.classList.add("auth-body-bg");
    this.decodeParam();
  }

  componentWillUnmount() {
    document.body.classList.remove("auth-body-bg");
  }

  render() {
    return (
      <React.Fragment>
        <div className="home-btn d-none d-sm-block">
          <Link to="/adminPanel/">
            <i className="mdi mdi-home-variant h2 text-white"></i>
          </Link>
        </div>

        <div>
          <Container fluid className="p-0">
            <Row className="no-gutters">
              <Col lg={4}>
                <div className="authentication-page-content p-4 d-flex align-items-center min-vh-100">
                  <div className="w-100">
                    <Row className="justify-content-center">
                      <Col lg={9}>
                        <div>
                          <div className="text-center">
                            <div>
                              <Link to="/adminPanel/" className="logo">
                                {/* <img src={logo} height="150" alt="logo" /> */}
                                <img
                                  src={`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqokEHn4Ei01MHH6LTHqfsbV64jvUCjG5RqQ&s`}
                                  height="150"
                                  alt="logo"
                                />

                                {/*<div height="100">
                                  Grovtek
                                </div>*/}
                              </Link>
                            </div>

                            <h4 className="font-size-18 mt-4">Welcome Back !</h4>
                            <p className="text-muted">Sign in to continue to Webapp.</p>
                          </div>

                          {/*{this.props.loginError && this.props.loginError ? (
                            <Alert color="danger">
                              {this.props.loginError}
                            </Alert>
                          ) : null}*/}

                          <div className="p-2 mt-5">
                            <AvForm className="form-horizontal" onValidSubmit={this.handleSubmit}>
                              <FormGroup className="auth-form-group-custom mb-4">
                                <i className="ri-user-2-line auti-custom-input-icon"></i>
                                <Label htmlFor="username">Email</Label>
                                <AvField
                                  name="username"
                                  value={this.state.username}
                                  type="text"
                                  className="form-control"
                                  id="username"
                                  validate={{ email: true, required: true }}
                                  placeholder="Enter Email"
                                />
                              </FormGroup>

                              {/* <FormGroup className="auth-form-group-custom mb-4">
                                <i className="ri-lock-2-line auti-custom-input-icon"></i>
                                <Label htmlFor="userpassword">Password</Label>
                                <AvField
                                  name="password"
                                  value={this.state.password}
                                  type="password"
                                  className="form-control"
                                  // validate={{ required: true, pattern: { value: /^(?=.*\d)(?=.*[a-zA-Z]).{8,}$/, errorMessage:'Invalid password' } }}
                                  validate={{ required: true }}
                                  id="userpassword"
                                  placeholder="Enter password"
                                />
                              </FormGroup> */}
                              <FormGroup className="auth-form-group-custom mb-4">
                                <i className="ri-lock-2-line auti-custom-input-icon"></i>
                                <Label htmlFor="userpassword">Password</Label>
                                <div className="d-flex align-items-center">
                                  {" "}
                                  <div className="flex-fill">
                                    <AvField
                                      name="password"
                                      value={this.state.password}
                                      type={this.state.showpass ? "password" : "text"}
                                      className="form-control "
                                      validate={{
                                        required: true,
                                      }}
                                      id="userpassword"
                                      placeholder="Enter password"
                                      //visible={this.state.showPassword}
                                    />
                                    {/* <i className="ri-lock-2-line auti-custom-input-icon"></i> */}
                                  </div>
                                  {/* <div className="flex-shrink-1 px-1"> */}
                                  <div
                                    style={{
                                      position: "absolute",
                                      right: 10,
                                      top: 20,
                                    }}
                                  >
                                    {this.state.showpass ? (
                                      <VisibilityOff onClick={this.handleShow} style={{ cursor: "pointer" }} />
                                    ) : (
                                      <Visibility onClick={this.handleShow} style={{ cursor: "pointer" }} />
                                    )}
                                  </div>
                                </div>
                              </FormGroup>

                              {/* <div className="custom-control custom-checkbox">
                                <Input type="checkbox" className="custom-control-input" id="customControlInline" />
                                <Label className="custom-control-label" htmlFor="customControlInline">
                                  Remember me
                                </Label>
                              </div> */}

                              <div className="mt-4 text-center">
                                <Button color="primary" className="w-md waves-effect waves-light" type="submit">
                                  Log In
                                </Button>
                              </div>

                              {/* <div className="mt-4 text-center">
                                <Link
                                  to="/forgot-password"
                                  className="text-muted"
                                >
                                  <i className="mdi mdi-lock mr-1"></i> Forgot
                                  your password?
                                </Link>
                              </div> */}
                            </AvForm>
                          </div>

                          <div className="mt-5 text-center">
                            {/* <p>Don't have an account ? <Link to="/register" className="font-weight-medium text-primary"> Register </Link> </p> */}
                            <p>© 2022-{new Date().getFullYear()} Rajat Mehta.</p>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </div>
              </Col>
              <Col lg={8}>
                <div className="authentication-bg">
                  <div className="bg-overlay"></div>
                </div>
                {/* <div className="authentication-bg">
                  <div className="bg-overlay"></div>
                </div> */}
              </Col>
            </Row>
          </Container>
        </div>
      </React.Fragment>
    );
  }
}

const mapStatetoProps = (state) => {
  const { loginError } = state.Login;
  return { loginError };
};

export default withRouter(connect(mapStatetoProps, { checkLogin, apiError })(Login));
