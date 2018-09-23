import React, { Component } from "react";
import Collapse from "@material-ui/core/Collapse";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const ListContainer = ({ teams, callback }) => (
  <div
    style={{
      display: "flex",
      flexWrap: "wrap"
    }}
  >
    {teams.map(team => (
      <ListElement key={team.teamId} {...team} callback={callback} />
    ))}
  </div>
);

class ListElement extends Component {
  state = {
    open: false,
    selection: false
  };

  toggle = () => this.setState(prev => ({ open: !prev.open }));

  render() {
    const { open, selection } = this.state;
    const { teamName, callback } = this.props;
    return (
      <div
        style={{
          width: "200px",
          margin: "10px auto 10px",
          border: "1px solid gray",
          borderRadius: "20px"
        }}
      >
        <div
          style={{ textAlign: "center" }}
          onClick={() => callback({ name: teamName })}
        >
          {teamName}
        </div>
        <IconButton aria-label="Show more" onClick={this.toggle}>
          <ExpandMoreIcon />
        </IconButton>
        <Collapse in={open}>{teamName}</Collapse>
        {selection &&
          [1, 2, 3].map(place => (
            <div style={{ display: "flex", flexDirection: "column" }}>
              <Button
                variant="fab"
                mini
                style={{
                  position: "relative",
                  background: "gray",
                  left: "180px",
                  bottom: "20px",
                  color: "white"
                }}
              >
                {place}
              </Button>
            </div>
          ))}
      </div>
    );
  }
}

export default ListContainer;
