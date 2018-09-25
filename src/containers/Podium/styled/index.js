import styled, { css } from "styled-components";
import Paper from "@material-ui/core/Paper";

const common = css`
  display: flex;
  flex: 1;
  justify-content: center;
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
    height: open ? `${100 - place * 15}px` : "30px"
  })
})`
  transition: height 0.5s ease;
  display: flex;
  flex-direction: column;
  align-content: stretch;
  border-radius: 15px 0px;
  text-align: center;
  margin: 0 5px;
  min-width: 150px;
  max-width: 150px;
  word-wrap: break-word;
  @media (min-width: 685px) {
    width: 180px;
  }
`;

export const PodiumWrapper = styled(Paper).attrs({
  style: ({ open }) => ({
    height: open ? "180px" : "100px"
  })
})`
  transition: height 0.5s ease;
  width: 80%;
  margin: 0 auto;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
