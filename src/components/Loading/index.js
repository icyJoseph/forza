import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

export const Loading = ({ pastDelay }) =>
  pastDelay ? (
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
  ) : null;

export default Loading;
