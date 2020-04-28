import React from "react";

function Table({ rows }) {
  const rowsArray = Object.entries(rows);

  return (
    <div className="table">
      {rowsArray.map((data, index) => {
        const tokensArray = new Array(data[1].tokens).fill(null);

        return (
          <div
            key={index}
            className="row"
            style={{ width: `${50 + 25 * index}px` }}
          >
            {tokensArray.map((data, index) => {
              return (
                <div
                  key={index}
                  className="token"
                  style={{
                    transform: `translateX(${-25 * index}px)`,
                  }}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

export default Table;
