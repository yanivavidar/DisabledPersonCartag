// DataTable.js
import React, { useState, useMemo } from "react";

const DataTable = React.memo(({ data }) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  const sortedData = useMemo(() => {
    let sortableData = [...data];
    if (sortConfig.key !== null) {
      sortableData.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableData;
  }, [data, sortConfig]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    return sortedData.slice(startIndex, startIndex + rowsPerPage);
  }, [sortedData, currentPage]);

  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            {data[0] &&
              Object.keys(data[0]).map((key) => (
                <th key={key} onClick={() => requestSort(key)}>
                  {key}{" "}
                  {sortConfig.key === key
                    ? sortConfig.direction === "asc"
                      ? "🔼"
                      : "🔽"
                    : ""}
                </th>
              ))}
          </tr>
        </thead>
        <tbody>
          {paginatedData.length > 0 ? (
            paginatedData.map((item, index) => (
              <tr key={index}>
                {Object.keys(item).map((key) => (
                  <td key={key}>{item[key]}</td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={data[0] ? Object.keys(data[0]).length : 1}>
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div>
        {Array.from(
          { length: Math.ceil(data.length / rowsPerPage) },
          (_, i) => (
            <button key={i} onClick={() => handlePageChange(i + 1)}>
              {i + 1}
            </button>
          )
        )}
      </div>
    </div>
  );
});

export default DataTable;
