import React, { Component } from "react";
import PropTypes from "prop-types";

import GridHeader from "../GridHeader/GridHeader";
import GridRow from "../GridRow/GridRow";
import { generateCSV, removeByIndex, updateByIndex } from "../../services/utils";

import "./Grid.css";

export default class Grid extends Component {
  static defaultProps = {
    data: [],
    headers: [],
  }

  state = {
    data: this.props.data,
    headers: this.props.headers,
  }

  handleCellChange = (value, position) => {
    const { x, y } = position;

    this.setState(state => ({
      data: updateByIndex(state.data, x, updateByIndex(state.data[x], y, value)),
    }));
  }

  handleHeaderChange = (value, position) => {
    const { y } = position;

    this.setState(state => ({
      headers: updateByIndex(state.headers, y, value),
    }));
  }

  handleRowDelete = index => () => {
    this.setState(state => ({
      data: removeByIndex(state.data, index),
    }));
  }

  handleColumnDelete = index => () => {
    this.setState(state => ({
      headers: removeByIndex(state.headers, index),
      data: state.data.map(row => removeByIndex(row, index)),
    }));
  }

  handleRowInsert = () => {
    this.setState((state) => {
      const { length } = state.data;

      return {
        data: [
          ...state.data,
          length ? state.data[length - 1].map(() => "") : [""],
        ],
      };
    });
  }

  handleColumnInsert = () => {
    this.setState(state => ({
      headers: [...state.headers, ""],
      data: state.data.map(row => ([...row, ""])),
    }));
  }

  exportToCSV = () => {
    window.location.href = generateCSV(this.state.headers, this.state.data);
  }

  render() {
    return (
      <div className="grid">
        <div className="grid__container">
          <GridHeader
            headers={this.state.headers}
            onColumnInsert={this.handleColumnInsert}
            onColumnDelete={this.handleColumnDelete}
            onHeaderChange={this.handleHeaderChange}
          />
          {this.state.data.map((row, rowIndex) => (
            <GridRow
              key={`row_${rowIndex}`}
              index={rowIndex}
              row={row}
              onRowDelete={this.handleRowDelete}
              onCellChange={this.handleCellChange}
            />
          ))}
          <div className="grid__row">
            <div
              id="add-row"
              className="grid__cell grid__cell--small grid__cell--add"
              onClick={this.handleRowInsert}
            >
                &#43;
            </div>
          </div>
        </div>
        <div className="grid__side">
          <button type="button" onClick={this.exportToCSV}>Export to CSV</button>
        </div>
      </div>
    );
  }
}

Grid.propTypes = {
  data: PropTypes.arrayOf(PropTypes.array),
  headers: PropTypes.arrayOf(PropTypes.string),
};
