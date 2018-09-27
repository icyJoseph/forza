import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

export const Loading = () => (
  <div
    style={{
      width: "100%",
      display: "flex",
      justifyContent: "center",
      top: "50%",
      position: "sticky"
    }}
  >
    <CircularProgress />
  </div>
);

export default Loading;
