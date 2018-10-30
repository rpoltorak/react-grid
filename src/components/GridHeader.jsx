import React from "react";
import PropTypes from "prop-types";

import GridCell from "./GridCell";

const GridHeader = ({
  headers, onHeaderChange, onColumnDelete, onColumnInsert,
}) => (
  <div className="grid__row grid__row--header">
    <div className="grid__cell grid__cell--small grid__cell--empty" />
    {headers.map((header, headerIndex) => (
      <GridCell
        key={`header_${headerIndex}`}
        value={header}
        onCellChange={onHeaderChange}
        y={headerIndex}
      >
        <span id="remove-column" className="removal" onClick={onColumnDelete(headerIndex)}>&times;</span>
      </GridCell>
    ))}
    <div
      id="add-column"
      className="grid__cell grid__cell--small grid__cell--add"
      onClick={onColumnInsert}
    >
        &#43;
    </div>
  </div>
);

GridHeader.propTypes = {
  headers: PropTypes.arrayOf(PropTypes.string).isRequired,
  onHeaderChange: PropTypes.func.isRequired,
  onColumnDelete: PropTypes.func.isRequired,
  onColumnInsert: PropTypes.func.isRequired,
};

export default GridHeader;
