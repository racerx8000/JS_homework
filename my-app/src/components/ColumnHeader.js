import React from "react";

function ColumnHeader(props) {
  return (
    <h1 className="column-header">
      {props.columnName}
    </h1>
  )
}

export default ColumnHeader;
