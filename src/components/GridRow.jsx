import React from "react";
import PropTypes from "prop-types";

import GridCell from "./GridCell";

const GridRow = ({
  index, row, onRowDelete, onCellChange,
}) => (
  <div className="grid__row">
    <div className="grid__cell grid__cell--small grid__cell--remove" onClick={onRowDelete(index)}>&times;</div>
    {row.map((value, cellIndex) => (
      <GridCell
        key={`cell_${index}_${cellIndex}`}
        value={value}
        onCellChange={onCellChange}
        x={index}
        y={cellIndex}
      />
    ))}
  </div>
);

GridRow.propTypes = {
  index: PropTypes.number.isRequired,
  row: PropTypes.array.isRequired,
  onRowDelete: PropTypes.func.isRequired,
  onCellChange: PropTypes.func.isRequired,
};

export default GridRow;
