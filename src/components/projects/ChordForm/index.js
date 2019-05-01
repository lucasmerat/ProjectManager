import React, { Component } from "react";
import { connect } from "react-redux"
import { pushChord } from "../../../store/actions/projectActions"
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";

class ChordForm extends Component {
  state = {
    selectedChord: "",
    selectedVariation: "",
    selectedChordQuality: "",
    chordSelectorOpen: false,
    variationSelectorOpen: false,
    qualitySelectorOpen: false
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
  handleQualitySelectorOpen = () => {
    this.setState({ qualitySelectorOpen: true });
  };
  handleQualitySelectorClose = () => {
    this.setState({ qualitySelectorOpen: false });
  };
  handleChordChange = e => {
    this.setState({ selectedChord: e.target.value });
  };
  handleVariationChange = e => {
    this.setState({ selectedVariation: e.target.value });
  };
  handleQualityChange = e => {
    this.setState({ selectedChordQuality: e.target.value });
  };
  handleSubmitClick = () => {
    const { selectedChord, selectedVariation, selectedChordQuality } = this.state
    const { pushChord, id } = this.props;
    pushChord(id, selectedChord, selectedVariation, selectedChordQuality);
  }
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
            name: "variation",
            id: "variation-selector"
          }}
          open={this.state.variationSelectorOpen}
          value={this.state.selectedVariation}
          onOpen={this.handleVariationSelectorOpen}
          onClose={this.handleVariationSelectorClose}
          onChange={this.handleVariationChange}
        >
          <MenuItem value="">
            <em>Select a quality</em>
          </MenuItem>
          <MenuItem value={1}>1</MenuItem>
          <MenuItem value={2}>2</MenuItem>
        </Select>
        <InputLabel htmlFor="quality-selector">Quality</InputLabel>
        <Select
          inputProps={{
            name: "quality",
            id: "quality-selector"
          }}
          open={this.state.qualitySelectorOpen}
          value={this.state.selectedChordQuality}
          onOpen={this.handleQualitySelectorOpen}
          onClose={this.handleQualitySelectorClose}
          onChange={this.handleQualityChange}
        >
          <MenuItem value="">
            <em>Select a Quality</em>
          </MenuItem>
          <MenuItem value={"MAJ"}>Major</MenuItem>
          <MenuItem value={"MIN"}>Minor</MenuItem>
        </Select>
        <button onClick={this.handleSubmitClick}></button>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch =>{
  return {
    pushChord: (id, chord, variation, quality) => dispatch(pushChord(id, chord, variation, quality))
  }
}

export default connect(
  null,
  mapDispatchToProps
)(ChordForm);