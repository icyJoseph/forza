import styled, { css } from "styled-components";
import Paper from "@material-ui/core/Paper";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import BottomNavigation from "@material-ui/core/BottomNavigation";

const common = css`
  display: flex;
  flex: 1;
  justify-content: center;
`;

const baseStyle = css`
  flex-grow: 1;
`;

export const MainTitle = styled(Typography)`
  ${baseStyle};
  cursor: pointer;
`;

export const Bar = styled(AppBar)`
  ${baseStyle};
`;

export const Name = styled.div`
  text-align: center;
  align-items: center;

  @media (max-width: 315px) {
    font-size: 9pt;
    height: 50px;
  }
  @media (min-width: 315px) and (max-width: 400px) {
    font-size: 10pt;
    height: 50px;
  }
`;

export const Position = styled.div`
  ${common};
  align-items: flex-end;
`;

export const Place = styled(Paper).attrs({
  style: ({ place, open }) => ({
    height: open ? `${100 - place * 15}px` : "40px"
  })
})`
  transition: height 0.5s ease;
  display: flex;
  flex-direction: column;
  align-content: stretch;
  text-align: center;
  margin: 0 5px;
  min-width: 120px;
  max-width: 120px;
  word-wrap: break-word;
  @media (max-width: 315px) {
    min-width: 70px;
    max-width: 70px;
  }
  @media (min-width: 315px) and (max-width: 402px) {
    min-width: 85px;
    max-width: 85px;
  }
  @media (min-width: 403px) and (max-width: 590px) {
    min-width: 110px;
    max-width: 110px;
  }
  @media (min-width: 590px) {
    min-width: 160px;
    max-width: 160px;
  }
`;

export const PodiumWrapper = styled(Paper)`
  height: ${props => (props.open ? "200px" : "115px")};
  transition: height 0.5s ease;
  width: 90%;
  margin: 0 auto;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  @media (max-width: 400px) {
    height: ${props => (props.open ? "200px" : "150px")};
  }
`;

export const PlaceHolderContainer = styled.div`
display: flex
flex-direction: column
height: 150px
justify-content: center
align-items: center
`;

export const CenteredDiv = styled.div`
  margin: 0 auto;
`;

export const CommonContainer = styled.div`
  margin: 5px auto 0;
  height: 30px;
  @media (max-width: 400px) {
    font-size: 9pt;
    height: 50px;
    display: flex;
    justify-content: space-around;
    text-align: center;
  }
  @media (min-width: 300px) and (max-width: 400px) {
    font-size: 10pt;
    height: 50px;
    display: flex;
    justify-content: space-around;
    text-align: center;
  }
`;

export const BlueSpan = styled.span`
  color: dodgerblue;
`;

export const FlexCenterContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: center;
`;

export const PredictionContainer = styled.div`
  position: sticky;
  top: ${props => props.top}
  display: flex;
  flex-direction: column;
  padding-top:10px;
  margin-bottom: 20px;
  z-index: 20;
`;

export const StyledBottomNavigation = styled(BottomNavigation)`
  position: fixed;
  bottom: 0;
  z-index: 10;
  width: 100%;
`;
