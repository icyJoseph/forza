import styled from "styled-components";

export const Flag = styled.div.attrs({
  style: ({ color }) => ({
    backgroundColor: `${color}`,
    border: color === "#FFFFFF" ? "1px dashed gray" : ""
  })
})`
  width: 30px;
  height: 5px;
  margin: 3px auto;
`;
