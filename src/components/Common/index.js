import styled, { css } from "styled-components";
import Paper from "@material-ui/core/Paper";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";

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
  border-radius: 15px 0px;
  text-align: center;
  margin: 0 5px;
  min-width: 120px;
  max-width: 120px;
  word-wrap: break-word;
  @media (min-width: 685px) {
    min-width: 160px;
    max-width: 160px;
  }
  @media (min-width: 400px) {
    min-width: 110px;
    max-width: 110px;
  }
`;

export const PodiumWrapper = styled(Paper).attrs({
  style: ({ open }) => ({
    height: open ? "200px" : "115px"
  })
})`
  transition: height 0.5s ease;
  width: 90%;
  margin: 0 auto;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
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