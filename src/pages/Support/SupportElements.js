import { Link } from "react-router-dom";
import styled from "styled-components/macro";

export const CardBox = styled.div`
  /* height: 100%; */
  width: 100%;
  display: flex;
  flex-direction: column;
  /* background-color: aqua; */
  /* overflow-y: scroll; */
  padding: 1rem;
`;
export const TicketCard = styled(Link)`
  width: 100%;
  display: flex;
  /* background-color: yellow; */
  align-items: center;
  /* border: 1px solid; */
  text-decoration: none;
  color: black;
  margin-bottom: 0.8rem;
  /* border-radius: 5px; */
  padding: 1.4rem;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  /* box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px; */
  /* box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px; */
`;
export const BoxOne = styled.div`
  width: 10%;
  display: flex;
  justify-content: center;
  align-content: center;
  margin-right: 1rem;
`;
export const OneInner = styled.div`
  height: 50px;
  width: 50px;
  background-color: #eed8f7;
  color: #b49fb5;
  border-radius: 5px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  /* border: 0.5px solid #b49fb5; */
  box-shadow: #b49fb5 0px 0px 0px 1px;
  /* box-shadow: #b49fb5 0px 1px 4px; */
  font-size: 1.2rem;
`;
export const OneInners = styled.div`
  height: 43px;
  width: 43px;
  background-color: #cfd7df;
  color: #2c5170;
  border-radius: 50%;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  /* border: 0.5px solid #b49fb5; */
  /* box-shadow: #b49fb5 0px 0px 0px 1px; */
  /* box-shadow: #b49fb5 0px 1px 4px; */
  font-size: 1rem;
`;
export const BoxTwo = styled.div`
  width: auto;
  display: flex;
  justify-content: space-between;
  align-content: center;
  flex-direction: column;
  font-size: 1rem;
`;
export const TwoRow1 = styled.div`
  width: 100%;
  display: flex;
  font-weight: 600;
`;
export const TwoRow2 = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin-top: 0.2rem;
`;
export const DotCom = styled.div`
  font-size: 10px;
  width: 15px;
  display: flex;
  align-items: center;
  color: #888e9f;
  justify-content: center;
`;
// View Ticket
export const ViewBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;
export const ViewOne = styled.div`
  width: 75%;
  display: flex;
  flex-direction: column;
  height: 100%;
  /* overflow-y: scroll; */
  /* background-color: lightpink; */
`;
export const ViewTwo = styled.div`
  width: 25%;
  display: flex;
  flex-direction: column;
  /* background-color: lightblue; */
  padding: 0.8rem;
`;
export const TitleRow = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;
export const TitleOne = styled.div`
  width: 8%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.7rem;
  color: #8697a7;
  margin-right: 1rem;
`;
export const TitleTwo = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: #183247;
`;
// Info Card
export const InfoCard = styled.div`
  width: 100%;
  display: flex;
  margin-top: 1.5rem;
  /* flex-direction: column; */
`;
export const NameRow = styled.div`
  display: flex;
  align-items: center;
`;
export const NameB = styled.label`
  font-size: 1rem;
  color: #2d62c8;
  font-weight: 600;
  margin-right: 0.5rem;
`;
export const ComText = styled.div`
  font-size: 1rem;
`;
export const BoxTwos = styled.div`
  width: auto;
  display: flex;
  align-content: center;
  flex-direction: column;
  font-size: 1rem;
`;
export const MsgRow = styled.div`
  width: 100%;
  display: flex;
  /* justify-content: center; */
  align-items: center;
  margin-top: 1rem;
`;
export const IconBox = styled.div`
  width: 8%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 1.2rem;
`;
export const IconBoxs = styled.div`
  font-size: 1.2rem;
  display: flex;
  justify-content: flex-start;
  margin-bottom: 0.4rem;
`;
export const MsgBox = styled.div`
  font-size: 0.9rem;
`;
// Identity Info Card
export const IndenCard = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,
    rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
  border-radius: 5px;
`;
export const IdenRowOne = styled.div`
  width: 100%;
  border-radius: 5px 5px 0 0;
  background-color: #f5f7f9;
  display: flex;
  align-items: center;
  padding: 0.7rem;
`;
export const IdenIcon = styled.div``;
export const ConText = styled.div`
  font-size: 1rem;
  text-transform: uppercase;
  font-weight: bold;
  margin-top: 4px;
  margin-left: 0.4rem;
`;
export const InfoBox = styled.div`
  width: 100%;
  background-color: white;
  display: flex;
  flex-direction: column;
  padding: 1rem 0.8rem;
`;
export const InfoRow = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  margin-bottom: 1.5rem;
`;
export const LabelText = styled.div`
  width: 100%;
  color: #878c92;
  margin-bottom: 0.6rem;
`;
export const TextFi = styled.div`
  width: 100%;
  color: #183247;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;
// Email Container
export const EmailBox = styled.div`
  width: 100%;
  padding: 1rem 0;
`;
export const InnerEmailBox = styled.div`
  width: 100%;
  background-color: #f5f7f9;
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  border: 1px solid #ebeff3;
  box-shadow: 0 2px 4px 0 rgb(18 52 77 / 6%);
`;
export const EmailFirstRow = styled.div`
  width: 100%;
  display: flex;
  border-radius: 5px 5px 0 0;
  align-items: center;
  padding: 0.88rem 0;
`;
export const EmailFirstBox = styled.div`
  width: 8%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const EmailSecondBox = styled.div`
  width: 90%;
  display: flex;
  border-left: 1px solid yellow;
  font-size: 0.89rem;
`;
export const EmailSecondRow = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0.3rem 1.7rem 0.88rem 1.7rem;
  font-size: 0.89rem;
`;
export const OneChar = styled.div`
  height: 25px;
  width: 25px;
  background-color: #eed8f7;
  color: #b49fb5;
  border-radius: 5px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  /* border: 0.5px solid #b49fb5; */
  box-shadow: #b49fb5 0px 0px 0px 1px;
  /* box-shadow: #b49fb5 0px 1px 4px; */
  font-size: 0.7rem;
`;
export const EmailEditor = styled.div`
  width: 100%;
  background-color: white;
`;
export const SendRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: right;
  padding: 0.7rem 1rem;
`;
export const SendBox = styled.div`
  width: auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const SendBoxs = styled.div`
  width: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  background-color: #264966;
  background-image: linear-gradient(to bottom, #264966, #12344d);
  border-radius: 4px;
  border: 1px solid #12344d;
`;
export const SendButton = styled.div`
  width: auto;
  padding: 9px 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-weight: 700;
  border: 1px solid #12344d;
  cursor: pointer;
`;
export const SendButtons = styled.div`
  width: auto;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  border: 1px solid #12344d;
  padding: 8px 10px;
  font-weight: 700;
  cursor: pointer;
  color: white;
  /* border-right: ; */
`;
export const ParentConversation = styled.div`
  width: 100%;
  height: 600px;
  overflow-y: scroll;
`

export const ConversationCard = styled.div`
  border-radius: 8px;
  margin-bottom: 16px;
  /* background-image: linear-gradient(#f5f7f9,#f5f7f9); */
  position: relative;
  border: 1px solid #fff;
  width: 100%;
  /* height: auto; */
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  margin: 1rem 0rem;
`;

export const WhoDidSection = styled.div`
  position: relative;
  min-height: 65px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
`;

export const WhoProfileImage = styled.div`
  margin: 0 1rem;
  width: 35px;
`;

export const ProfileImageButton = styled.div`
  white-space: nowrap;
    outline: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    transition: all 0.2s ease-in-out;
    text-decoration: none;
    justify-content: center;
    width: 35px;
    height: 35px;
    border-radius: 6px;
    border: none;
    background: #0294B3;
    text-align: center;
    font-size: 0.9rem;
    font-weight: bold;
    letter-spacing: 0px;
    color: #FFFFFF;
    font-family: "Nunito";
    text-transform: uppercase;
    opacity: 1;
    padding: 0.5rem;
`;
export const WhoSectionRight = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  padding: 0.5rem;
  background: linear-gradient(#f5f7f9,#f5f7f9);
  border-radius: 5px;
`;
export const RepliedRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  width: 100;
  padding: 0.5rem;
  color: #405c72;

  font-weight: 600;
  /* color: #2c5cc5; */
  font-size: 1rem;
  font-family: "Nunito";

`;
export const TimeAgoRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  width: 100;
  padding: 0.5rem;
  font-weight: 400;
  color: #475867;
  font-size: 0.8rem;
  font-family: "Nunito";
`;

export const ToSection = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
`;
export const AllText = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  word-break: break-word;
  font-size: 0.95rem;
  font-family: "Nunito";
  font-weight: 500;
`;

export const AttachBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-top: 1.3rem;
  padding-left: 4.3rem;
`
export const AttachTextRow = styled.div`
  width: 100%;
  font-size: 0.95rem;
  font-family: "Nunito";
  font-weight: 500;
`
export const AttachImageBox = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: auto auto auto;
  grid-gap: 10px;
  margin-top: 1rem;
`
export const AttachSingle = styled.a`
  text-decoration: none;
  color: black;
  width: 100%;
  display: flex;
  padding: 0.5rem 1rem;
  border: 1px solid lightgray;
  border-radius: 5px;
  position: relative;
  /* margin: 0 0.2rem; */
`
export const CrossIcon = styled.div`
  position: absolute;
  right: -5px;
  top: -8px;
  i{
    font-size: 1.15rem;
  }
`
export const AttachOne = styled.div`
  /* width: 20%; */
  display: flex;
  justify-content: center;
  align-content: center;
`
export const DocImage = styled.img`
  height: 80px;
  width: 80px;
`
export const AttachTwo = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  padding-left: 0.6rem;
`
export const CommonText = styled.div`
  width: 100%;
  word-break: break-word;
  font-size: 0.8rem;
  font-family: "Nunito";
  font-weight: 500;
`
export const AtBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`
export const AtTitle = styled.div`
  width: 100%;
  display: flex;
  padding: 1.2rem 0 0 1rem;
  align-items: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap; 
`
// export const AttahIcon
export const AtComBox = styled.div`

`
export const ImageCon = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: auto auto auto;
  grid-gap: 10px;
`
export const ImageAtt = styled.img`
  height: 100px;
  width: 100px;
  margin-right: 0.5rem;
`
