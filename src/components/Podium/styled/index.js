import styled from "styled-components";

export const Place = styled.div.attrs({
  style: ({ place }) => ({
    height: `${50 * (4 - place)}px`
  })
})`
  width: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border: 1px solid;
`;
