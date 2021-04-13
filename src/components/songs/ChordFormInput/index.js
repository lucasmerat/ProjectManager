import React from "react";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";

function ChordFormInput(props) {
  return (
    <div>
      <InputLabel htmlFor="chord-selector">{props.label}</InputLabel>
      <Select
        inputProps={{
          name: "chord",
          id: "chord-selector"
        }}
        open={props.open}
        value={props.value}
        onOpen={props.handleOpen}
        onClose={props.handleClose}
        onChange={props.handleChange}
      >
        <MenuItem value="">
          <em>Select a {props.label}</em>
        </MenuItem>
        {props.menuItems &&
          props.menuItems.map(item => <MenuItem key={Math.random()} value={item}>{item}</MenuItem>)}
      </Select>
    </div>
  );
}

export default ChordFormInput;
