import React, { Component } from "react";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";

class ChordForm extends Component {
  state = {
    selectedChord: "",
    selectedVariation: "",
    selectedChordQuality: "",
    chordSelectorOpen: false,
    variationSelectorOpen: false
  };
  handleChordSelectorOpen = () => {
    this.setState({ chordSelectorOpen: true });
  };
  handleChordSelectorClose = () => {
    this.setState({ chordSelectorOpen: false });
  };
  handleVariationSelectorOpen = () => {
    this.setState({ variationSelectorOpen: true });
  };
  handleVariationSelectorClose = () => {
    this.setState({ variationSelectorOpen: false });
  };
  handleChordChange = e => {
    this.setState({ selectedChord: e.target.value });
  };
  handleVariationChange = e => {
    this.setState({ selectedVariation: e.target.value });
  };
  render() {
    return (
      <div>
        <h3>Chord Picker</h3>
        <InputLabel htmlFor="chord-selector">Chord</InputLabel>
        <Select
          inputProps={{
            name: "chord",
            id: "chord-selector"
          }}
          open={this.state.chordSelectorOpen}
          value={this.state.selectedChord}
          onOpen={this.handleChordSelectorOpen}
          onClose={this.handleChordSelectorClose}
          onChange={this.handleChordChange}
        >
          <MenuItem value="">
            <em>Select a chord</em>
          </MenuItem>
          <MenuItem value={"C"}>C</MenuItem>
          <MenuItem value={"D"}>D</MenuItem>
          <MenuItem value={"E"}>E</MenuItem>
          <MenuItem value={"F"}>F</MenuItem>
          <MenuItem value={"G"}>G</MenuItem>
          <MenuItem value={"A"}>A</MenuItem>
          <MenuItem value={"B"}>B</MenuItem>
        </Select>
        <InputLabel htmlFor="variation-selector">Variation</InputLabel>
        <Select
          inputProps={{
            name: "chord",
            id: "chord-selector"
          }}
          open={this.state.variationSelectorOpen}
          value={this.state.selectedVariation}
          onOpen={this.handleVariationSelectorOpen}
          onClose={this.handleVariationSelectorClose}
          onChange={this.handleVariationChange}
        >
          <MenuItem value="">
            <em>Select a variation</em>
          </MenuItem>
          <MenuItem value={1}>1</MenuItem>
          <MenuItem value={2}>2</MenuItem>
        </Select>
        <h5>Quality</h5>
        <ul className="collection">
          <li
            name="MAJ"
            onClick={this.handleChordQualityClick}
            className="collection-item"
          >
            Major
          </li>
          <li
            name="MIN"
            onClick={this.handleChordQualityClick}
            className="collection-item"
          >
            Minor
          </li>
        </ul>
      </div>
    );
  }
}

export default ChordForm;
