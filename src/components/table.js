import React from "react";

function Table({ rows }) {
  const rowsArray = Object.entries(rows);

  return (
    <div>
      {rowsArray.map((data, index) => {
        const tokensArray = new Array(data[1].tokens).fill(null);

        return (
          <div
            key={index}
            className="row"
            style={{ width: `${10 * (index + 1)}px` }}
          >
            {tokensArray.map((data, index) => {
              return <div key={index} className="token" />;
            })}
          </div>
        );
      })}
    </div>
  );
}

export default Table;
