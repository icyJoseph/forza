import styled, { css } from "styled-components";

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

export const Place = styled.div.attrs({
  style: ({ place, matches }) => ({
    height: `${80 - place * 15}%`,
    width: matches ? "180px" : "95px"
  })
})`
  display: flex;
  flex-direction: column;
  align-content: stretch;
  border-radius: 15px 0px;
  border: 1px solid;
  text-align: center;
  padding: 5px;
  margin: 10px;
`;

export const PodiumWrapper = styled.div.attrs({
  style: ({ matches }) => ({
    margin: matches ? "auto" : "0 20px"
  })
})`
  height: 200px;
  align-items: flex-end;
  display: flex;
  justify-content: center;
`;
