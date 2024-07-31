import React, {useState} from 'react'
import { ContentDiv } from "./PressElement"

const MoreLess = ({desc}) => {
    const [showMore, setShowMore] = useState(false);
    function removeTags(str) {
        if (!str)
          return false;
        else
          str = str.toString();

        return str.replace(/(<([^>]+)>)/ig, '');
      }
  return (
    <ContentDiv>{showMore ? removeTags(desc) : `${removeTags(desc).substring(0, 200)}...`} <span style={{color: "blue", cursor: "pointer", fontSize: "0.8rem"}} onClick={() => setShowMore(!showMore)}>{showMore ? "show less" : "show more"}</span></ContentDiv>
  )
}

export default MoreLess
