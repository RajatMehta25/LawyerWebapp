import React, { Component } from "react";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import Cookies from "js-cookie";
import { withRouter } from "react-router";
//i18n
import { withNamespaces } from "react-i18next";
import MoreVertIcon from '@material-ui/icons/MoreVert';
// users
import avatar2 from "../../../assets/images/users/avatar-2.jpg";
import Select from "react-select";
import Button from '@material-ui/core/Button';
import "./Profile.css"
class ProfileMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: false,
      selectedOption: "",
      DisplayMenu:false,
    };
    this.toggle = this.toggle.bind(this);
    this.showDisplaymenu=this.showDisplaymenu.bind(this)
    // this.handleChange = this.handleChange.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.logout = this.logout.bind(this);
    this.optionsArray = [
      { label: "Change Password", value: "Change Password", icon: <i className="ri-lock-unlock-line align-middle mr-1"></i> },
      { label: "Logout", value: "Logout", icon: <i className="ri-shut-down-line align-middle mr-1 text-danger"></i> },
    ];
    // this.optionsArray = [{ label: "cjcck", value: "didk" }];
  }

  toggle() {
    this.setState((prevState) => ({
      menu: !prevState.menu,
    }));
  }
  showDisplaymenu(){
    this.setState((prevState) => ({
      DisplayMenu: !prevState.DisplayMenu,
    }));
  }
  // handleChange(selectedOption) {
  //   // this.setState((prevState) => ({
  //   //   selectedOption: selectedOption.value,
  //   // }));
  //   if (selectedOption.value === "Change Password") {
  //     this.props.history.push({ pathname: "/changePassword" });
  //   } else if (selectedOption.value === "Logout") {
  //     Cookies.remove("admin_access_token");
  //     Cookies.remove("access");
  //     Cookies.remove("rolename");
  //     this.props.history.push("/login");
  //   }
  // }
  handleChangePassword() {
    
      this.props.history.push({ pathname: "/changePassword" });
   
    }
    logout() {
     
      
      Cookies.remove("admin_access_token");
          Cookies.remove("access");
          Cookies.remove("rolename");
          this.props.history.push("/login");
     
      }
  

  render() {
    let username = JSON.parse(Cookies.get("isSuperAdmin"));
    let rolename=Cookies.get("rolename")?JSON.parse(Cookies.get("rolename")):"";
    console.log("nameeee", username);
    if (localStorage.getItem("authUser")) {
      const obj = JSON.parse(localStorage.getItem("authUser"));
      const uNm = obj.email.split("@")[0];
      username = uNm.charAt(0).toUpperCase() + uNm.slice(1);
    }

    return (
      <React.Fragment>
        <div>
        <div style={{  display: "flex", justifyContent: "center", alignItems: "center" }}>
          {/* <Select
            placeholder={`${username ? "Admin" : rolename.charAt(0).toUpperCase() + rolename.slice(1)}`}
            // value={this.selectedOption}
            onChange={this.handleChange}
            isSearchable={false}
            isMulti={false}
            options={this.optionsArray}
            getOptionLabel={(e) => (
              <div style={{ display: "flex", alignItems: "center" }}>
                {e.icon}
                <span style={{ marginLeft: 5 }}>{e.label}</span>
              </div>
            )}
          /> */}
<div style={{fontWeight:"bold",fontSize:"1.2rem"}}>{`${username ? "Admin" : rolename.charAt(0).toUpperCase() + rolename.slice(1)}`}</div><Button onClick={()=>this.showDisplaymenu()}><MoreVertIcon/></Button>
        </div>
        {this.state.DisplayMenu?
        <div style={{position:"absolute",right: "0px", top: "60px",borderRadius:"1rem",backgroundColor:"white",padding:"1rem",boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px"}}>
          <div style={{display:"flex",flexDirection:"column",gap:"0.5rem"}}>
            <div className="customButton" onClick={()=>this.handleChangePassword()}> <i className="ri-lock-unlock-line align-middle mr-1"></i>Change Password</div>
            <div className="customButton"  onClick={()=>this.logout()}><i className="ri-shut-down-line align-middle mr-1 text-danger"></i>Logout</div>
            </div>
            </div>
            :false}
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(withNamespaces()(ProfileMenu));
