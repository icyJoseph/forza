import styled from "styled-components";

export const Place = styled.div.attrs({
  style: ({ place, matches }) => {
    const span = 4 - place;
    return {
      height: `${50 * span}px`,
      width: matches ? "180px" : `${100 * span}px`
    };
  }
})`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border: 1px solid;
  margin: 10px;
`;

export const PodiumWrapper = styled.div.attrs({
  style: ({ matches }) => ({
    margin: matches ? "auto" : "0 20px"
  })
})`
  align-items: flex-end;
  display: flex;
  justify-content: center;
`;
