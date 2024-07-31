import React, { Component } from "react";

// MetisMenu
import MetisMenu from "metismenujs";
import { withRouter } from "react-router-dom";
import { NavLink } from "react-router-dom";
import Cookies from "js-cookie";
//i18n
import { withNamespaces } from "react-i18next";
import { FaMoneyCheckAlt } from "react-icons/fa";
import { MdAttachMoney } from "react-icons/md";

import { connect } from "react-redux";
import { changeLayout, changeLayoutWidth, changeSidebarTheme, changeSidebarType, changePreloader } from "../../store/actions";

class SidebarContent extends Component {
  constructor(props) {
    let cookies = Cookies.get("access");

    var rolesAccess = [];
    if (cookies !== undefined) {
      rolesAccess = JSON.parse(cookies);
    } else {
      rolesAccess = [];
    }

    super(props);
    this.state = { rolesAccess: rolesAccess, backgroundColorSideBar: `rgba(50, 122, 50, 0.5)`,bgColor:"#075869" };
  }

  componentDidMount() {
    this.initMenu();
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      if (this.props.type !== prevProps.type) {
        this.initMenu();
      }
    }
  }

  initMenu() {
    new MetisMenu("#side-menu");

    var matchingMenuItem = null;
    var ul = document.getElementById("side-menu");
    var items = ul.getElementsByTagName("a");
    for (var i = 0; i < items.length; ++i) {
      if (this.props.location.pathname === items[i].pathname) {
        matchingMenuItem = items[i];
        break;
      }
    }
    if (matchingMenuItem) {
      this.activateParentDropdown(matchingMenuItem);
    }
  }

  activateParentDropdown = (item) => {
    item.classList.add("active");
    const parent = item.parentElement;

    if (parent) {
      parent.classList.add("mm-active");
      const parent2 = parent.parentElement;

      if (parent2) {
        parent2.classList.add("mm-show");

        const parent3 = parent2.parentElement;

        if (parent3) {
          parent3.classList.add("mm-active"); // li
          parent3.childNodes[0].classList.add("mm-active"); //a
          const parent4 = parent3.parentElement;
          if (parent4) {
            parent4.classList.add("mm-active");
          }
        }
      }
      return false;
    }
    return false;
  };

  render() {
    return (
      <React.Fragment>
        <div id="sidebar-menu">
          <ul className="metismenu list-unstyled" id="side-menu">
            <li className="menu-title">{this.props.t("Menu")}</li>
            {(this.state.rolesAccess.includes("all") || this.state.rolesAccess.includes("Dashboard")) && (
              <li>
                <NavLink to="/dashboard" className="waves-effect" style={{
                      backgroundColor:
                        this.props.history.location.pathname == "/dashboard" ? this.state.bgColor : "",
                        
                    }}>
                  <i className="ri-dashboard-line"></i>
                  {/*<span className="badge badge-pill badge-success float-right">3</span>*/}
                  <span   className="ml-1">{this.props.t("Dashboard")}</span>
                </NavLink>
              </li>
            )}
            {/* <li>
                                <NavLink to="/account" className="waves-effect">
                                    <i className="ri-admin-fill"></i>
                                    <span className="ml-1">{this.props.t('Account Management')}</span>
                                </NavLink>
                            </li> */}
            {/*<li>
                                <NavLink to="/account-managment" className="waves-effect">
                                    <i className="ri-briefcase-2-line"></i>
                                    <span className="ml-1">{this.props.t('Account Management')}</span>
                                </NavLink>
                        </li>*/}
            {(this.state.rolesAccess.includes("all") || this.state.rolesAccess.includes("Subscribed User Listing")) && (
              <li>
                <NavLink to="/SubscriptionList" className="waves-effect" style={{ display: "flex", backgroundColor:
                        this.props.history.location.pathname == "/SubscriptionList" ? this.state.bgColor : "", }}>
                  <i class="ri-file-list-line"></i>{" "}
                  <span  className="ml-1">
                    {this.props.t("Subscribed User Listing")}
                  </span>
                </NavLink>
              </li>
            )}
            {(this.state.rolesAccess.includes("all") || this.state.rolesAccess.includes("Account Management")) && (
              <li>
                <NavLink to="/account-managment-new" className="waves-effect"  style={{
                      backgroundColor:
                        this.props.history.location.pathname == "/account-managment-new" ? this.state.bgColor : "",
                    }}>
                  <i className="ri-user-settings-line"></i>
                  <span  className="ml-1">{this.props.t("Account Management")}</span>
                </NavLink>
              </li>
            )}
            {/* <li>
                                <NavLink to="/subscription" className="waves-effect">
                                    <i className="ri-account-circle-line"></i>
                                    <span className="ml-1">{this.props.t('Subscription Management')}</span>
                                </NavLink>
                            </li> */}
            {/* <li>
                                <NavLink to="/template-management" className="waves-effect">
                                    <i className="ri-file-edit-line"></i>
                                    <span className="ml-1">{this.props.t('Template Management')}</span>
                                </NavLink>
                            </li> */}
            {(this.state.rolesAccess.includes("all") || this.state.rolesAccess.includes("Question Category Management")) && (
              <li>
                <NavLink to="/Category_Management" className="waves-effect" style={{ display: "flex" , backgroundColor:
                        this.props.history.location.pathname == "/Category_Management" ? this.state.bgColor: "",}}>
                  <i className="ri-question-answer-line"></i>
                  <span   className="ml-1">
                    {this.props.t("Question Category Management")}
                  </span>
                </NavLink>
              </li>
            )}
            {/* <li>
                                <NavLink to="/Service_Category_Management" className="waves-effect" style={{display:"flex"}}>
                                <i className="ri-user-settings-line"></i>
                                    <span style={{}} className="ml-1">{this.props.t('Services Management')}</span>
                                </NavLink>
                            </li> */}
            {(this.state.rolesAccess.includes("all") || this.state.rolesAccess.includes("Subscription Management")) && (
              <li>
                <NavLink to="/Subscription_Management" className="waves-effect" style={{ display: "flex", backgroundColor:
                        this.props.history.location.pathname == "/Subscription_Management"|| this.props.history.location.pathname == "/AddEditSubscription" ? this.state.bgColor : "", }}>
                  <i className="ri-slideshow-4-line"></i>
                  <span className="ml-1">
                    {this.props.t("Subscription Management")}
                  </span>
                </NavLink>
              </li>
            )}
              {(this.state.rolesAccess.includes("all") || this.state.rolesAccess.includes("Role Management")) && (
              <li>
                <NavLink to="/RoleManagement" className="waves-effect" style={{ display: "flex", backgroundColor:
                        this.props.history.location.pathname == "/RoleManagement" ? this.state.bgColor: "", }}>
                <i class="ri-user-add-line"></i>                 <span  className="ml-1">
                    {this.props.t("Role Management ")}
                  </span>
                </NavLink>
              </li>
            )}
            {(this.state.rolesAccess.includes("all") || this.state.rolesAccess.includes("SubAdmin Management")) && (
              <li>
                <NavLink to="/SubAdmin_Management" className="waves-effect" style={{ display: "flex", backgroundColor:
                        this.props.history.location.pathname == "/SubAdmin_Management" ? this.state.bgColor : "", }}>
                <i class="ri-admin-line"></i>                  <span className="ml-1">
                    {this.props.t("SubAdmin Management")}
                  </span>
                </NavLink>
              </li>
            )}
           
            {(this.state.rolesAccess.includes("all") || this.state.rolesAccess.includes("Blog Management")) && (
              <li>
                <NavLink to="/Blog" className="waves-effect" style={{ display: "flex", backgroundColor:
                        this.props.history.location.pathname == "/Blog"|| this.props.history.location.pathname == "/AddEditBlog" ? this.state.bgColor : "", }}>
                  <i class="ri-pages-line"></i>{" "}
                  <span  className="ml-1">
                    {this.props.t("Blog Management")}
                  </span>
                </NavLink>
              </li>
            )}
            {(this.state.rolesAccess.includes("all") || this.state.rolesAccess.includes("Notification Management")) && (
              <li>
                <NavLink to="/Notification_Management" className="waves-effect" style={{ display: "flex", backgroundColor:
                        this.props.history.location.pathname == "/Notification_Management" ? this.state.bgColor : "", }}>
                  <i className="ri-notification-line"></i>
                  <span  className="ml-1">
                    {this.props.t("Notification Management")}
                  </span>
                </NavLink>
              </li>
            )}
            {(this.state.rolesAccess.includes("all") || this.state.rolesAccess.includes("Member Price Management")) && (
              <li>
                <NavLink to="/member-price" className="waves-effect" style={{ display: "flex", backgroundColor:
                        this.props.history.location.pathname == "/member-price" ? this.state.bgColor : "", }}>
                  <i className="ri-coins-line"></i>
                  <span className="ml-1">
                    {this.props.t("Member Price Management")}
                  </span>
                </NavLink>
              </li>
            )}
            {/* <li>
                            <NavLink to="/SubAdmin_Management" className="waves-effect" style={{ display: "flex" }}>
                                <i className="ri-user-settings-line"></i>
                                <span style={{}} className="ml-1">{this.props.t('Sub-Admin Management')}</span>
                            </NavLink>
                        </li> */}
            {/* <li>
                            <NavLink to="/payment-gateway" className="waves-effect" style={{ display: "flex" }}>
                                <i className="ri-user-settings-line"></i>
                                <span style={{}} className="ml-1">{this.props.t('Payment Gateway Management')}</span>
                            </NavLink>
                        </li> */}
            {(this.state.rolesAccess.includes("all") || this.state.rolesAccess.includes("Press Management")) && (
              <li>
                <NavLink to="/press-management" className="waves-effect" style={{ display: "flex", backgroundColor:
                        this.props.history.location.pathname == "/press-management"||this.props.history.location.pathname == "/AddEdit_Press" ? this.state.bgColor : "", }}>
                  <i className="ri-newspaper-line"></i>
                  <span  className="ml-1">
                    {this.props.t("Press Management")}
                  </span>
                </NavLink>
              </li>
            )}
            {(this.state.rolesAccess.includes("all") || this.state.rolesAccess.includes("Testimonial Management")) && (
              <li>
                <NavLink to="/testimonial-management" className="waves-effect" style={{ display: "flex", backgroundColor:
                        this.props.history.location.pathname == "/testimonial-management"||this.props.history.location.pathname == "/AddEdit_Test" ? this.state.bgColor : "", }}>
                <i class="ri-account-pin-box-line"></i>                  <span  className="ml-1">
                    {this.props.t("Testimonial Management")}
                  </span>
                </NavLink>
              </li>
            )}
            {(this.state.rolesAccess.includes("all") || this.state.rolesAccess.includes("FAQ Management")) && (
              <li>
                <NavLink to="/FAQ_Management" className="waves-effect" style={{ display: "flex", backgroundColor:
                        this.props.history.location.pathname == "/FAQ_Management" ? this.state.bgColor : "", }}>
                  <i className="ri-question-answer-line"></i>
                  <span className="ml-1">
                    {this.props.t("FAQ Management")}
                  </span>
                </NavLink>
              </li>
            )}
            {(this.state.rolesAccess.includes("all") || this.state.rolesAccess.includes("Content Management")) && (
              <li>
                <NavLink to="/content" className="waves-effect" style={{ display: "flex", backgroundColor:
                        this.props.history.location.pathname == "/content" ? this.state.bgColor : "", }}>
                  <i className="ri-article-line"></i>
                  <span  className="ml-1">
                    {this.props.t("Content Management")}
                  </span>
                </NavLink>
              </li>
            )}
            {(this.state.rolesAccess.includes("all") || this.state.rolesAccess.includes("Accounting")) && (
              <li>
                <NavLink to="/accounting" className="waves-effect" style={{ display: "flex" , backgroundColor:
                        this.props.history.location.pathname == "/accounting" ? this.state.bgColor : "",}}>
                  <i className="ri-file-list-3-line"></i>
                  <span  className="ml-1">
                    {this.props.t("Accounting")}
                  </span>
                </NavLink>
              </li>
            )}
            {(this.state.rolesAccess.includes("all") || this.state.rolesAccess.includes("Support")) && (
              <li>
                <NavLink to="/support" className="waves-effect" style={{ display: "flex",backgroundColor:
                        this.props.history.location.pathname == "/support" ? this.state.bgColor : "", }}>
                  <i className="ri-message-2-line"></i>
                  <span  className="ml-1">
                    {this.props.t("Support")}
                  </span>
                </NavLink>
              </li>
            )}
          </ul>
        </div>
      </React.Fragment>
    );
  }
}

const mapStatetoProps = (state) => {
  return { ...state.Layout };
};

export default withRouter(
  connect(mapStatetoProps, {
    changeLayout,
    changeSidebarTheme,
    changeSidebarType,
    changeLayoutWidth,
    changePreloader,
  })(withNamespaces()(SidebarContent))
);
