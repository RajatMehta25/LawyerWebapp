import React from "react";
import * as RiIcons from "react-icons/ri";
import * as AiIcons from "react-icons/ai";
import * as BiIcons from "react-icons/bi";
import * as BsIcons from "react-icons/bs";
import * as SE from "../pages/Support/SupportElements";

export default function ProfileImageInput(props) {
  const { error } = props;

  return (
    <>
      <SE.AtTitle>
        <SE.IconBoxs>
          <i className="ph ph-paperclip" style={{ color: "#6a7194" }}></i>
        </SE.IconBoxs>
        <input {...props} />
        <SE.NameB htmlFor="pic">Attachment</SE.NameB>
      </SE.AtTitle>
    </>
  );
}
