import React, { Component } from "react";
import { connect } from "react-redux";
import { pushChord } from "../../../store/actions/projectActions";
import ChordFormInput from "../ChordFormInput";
import { notify } from "react-notify-toast";

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
    const {
      selectedChord,
      selectedVariation,
      selectedChordQuality
    } = this.state;
    const { pushChord, id } = this.props;
    pushChord(id, selectedChord, selectedVariation, selectedChordQuality);
    notify.show("Chord added!");
  };
  render() {
    return (
      <div>
        <h3>Chord Picker</h3>
        <ChordFormInput
          label={"chord"}
          key={"chord"}
          handleOpen={this.handleChordSelectorOpen}
          handleClose={this.handleChordSelectorClose}
          handleChange={this.handleChordChange}
          value={this.state.selectedChord}
          open={this.state.chordSelectorOpen}
          menuItems={["C","D","E","F","G","A","B"]}
        />
        <ChordFormInput
          label={"variation"}
          key={"variation"}
          handleOpen={this.handleVariationSelectorOpen}
          handleClose={this.handleVariationSelectorClose}
          handleChange={this.handleVariationChange}
          value={this.state.selectedVariation}
          open={this.state.variationSelectorOpen}
          menuItems={[0,1]}
        />
        <ChordFormInput
          label={"quality"}
          key={"quality"}
          handleOpen={this.handleQualitySelectorOpen}
          handleClose={this.handleQualitySelectorClose}
          handleChange={this.handleQualityChange}
          value={this.state.selectedChordQuality}
          open={this.state.qualitySelectorOpen}
          menuItems={["MAJ","MIN"]}
        />
        <button onClick={this.handleSubmitClick}>Add Chord</button>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    pushChord: (id, chord, variation, quality) =>
      dispatch(pushChord(id, chord, variation, quality))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(ChordForm);
