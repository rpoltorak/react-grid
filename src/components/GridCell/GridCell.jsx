import React, { Component } from "react";
import PropTypes from "prop-types";

import "./GridCell.css";

export default class GridCell extends Component {
  static defaultProps = {
    x: undefined,
    children: undefined,
  }

  state = {
    isEdited: false,
  }

  input = React.createRef()

  shouldComponentUpdate = (nextProps, nextState) => (
    this.props.value !== nextProps.value || this.state.isEdited !== nextState.isEdited
  )

  toggleEdit = () => this.setState(state => ({ isEdited: !state.isEdited }))

  save = () => {
    this.toggleEdit();
    this.props.onCellChange(this.input.current.value, { x: this.props.x, y: this.props.y });
  }

  handleKeyPress = (event) => {
    if (event.key === "Enter") {
      this.save();
    } else if (event.keyCode === 27) {
      this.toggleEdit();
    }
  }

  render() {
    return this.state.isEdited
      ? (
        <div className="grid__cell">
          <input
            className="grid__cell__field"
            type="text"
            ref={this.input}
            defaultValue={this.props.value}
            onKeyPress={this.handleKeyPress}
            onBlur={this.save}
            autoFocus={this.state.isEdited}
          />
        </div>
      )
      : (
        <div className="grid__cell" onClick={this.toggleEdit}>
          {this.props.value}
          {this.props.children}
        </div>
      );
  }
}

GridCell.propTypes = {
  value: PropTypes.string.isRequired,
  x: PropTypes.number,
  y: PropTypes.number.isRequired,
  onCellChange: PropTypes.func.isRequired,
  children: PropTypes.element,
};
