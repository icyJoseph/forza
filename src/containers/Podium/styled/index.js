import styled, { css } from "styled-components";
import Paper from "@material-ui/core/Paper";

const common = css`
  display: flex;
  flex: 1;
  justify-content: center;
`;

export const Name = styled.div`
  ${common};
  align-items: center;
`;

export const Position = styled.div`
  ${common};
  align-items: flex-end;
`;

export const Place = styled(Paper).attrs({
  style: ({ place }) => ({
    height: `${100 - place * 15}px`
  })
})`
  display: flex;
  flex-direction: column;
  align-content: stretch;
  border-radius: 15px 0px;
  text-align: center;
  padding: 5px;
  margin: 10px;
  width: 80px;
  width: 95px @media (min-width: 685px) {
    width: 180px;
  }
`;

export const PodiumWrapper = styled(Paper)`
  width: 80%;
  margin: 0 auto;
  height: 150px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
