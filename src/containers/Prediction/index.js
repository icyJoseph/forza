import React from "react";
import Button from "@material-ui/core/Button";
import Portal from "../../components/Portal";

const ButtonPad = ({ hook, callback }) =>
  [1, 2, 3].map(place => (
    <Button
      key={place}
      variant="fab"
      mini
      onClick={() => console.log(hook, place)}
      style={{
        background: "gray",
        bottom: "20px",
        margin: "auto",
        color: "white"
      }}
    >
      {place}
    </Button>
  ));

const Prediction = ({ ...props }) => (
  <Portal {...props}>
    <ButtonPad {...props} />
  </Portal>
);

export default Prediction;
