import { useState, useMemo } from "react";
import { sortRows, filterRows, paginateRows } from "../utils/helpers";
import { Pagination } from "./Pagination";

export const Table = ({
  columns,
  rows,
  pagination,
  editHandle,
  deleteHandle,
}: any) => {
  const [activePage, setActivePage] = useState(1);
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState({ order: "asc", orderBy: "id" });
  const rowsPerPage = 10;

  const filteredRows = useMemo(
    () => filterRows(rows, filters),
    [rows, filters]
  );
  const sortedRows = useMemo(
    () => sortRows(filteredRows, sort),
    [filteredRows, sort]
  );
  const calculatedRows = paginateRows(sortedRows, activePage, rowsPerPage);

  const count = filteredRows.length;
  const totalPages = Math.ceil(count / rowsPerPage);

  const handleSearch = (search: string, value: string | number) => {
    setActivePage(1);

    if (search) {
      setFilters((prevFilters) => ({
        ...prevFilters,
        [value]: search,
      }));
    } else {
      setFilters((prevFilters: any) => {
        const updatedFilters = { ...prevFilters };
        delete updatedFilters[value];

        return updatedFilters;
      });
    }
  };

  const handleSort = (value: string) => {
    setActivePage(1);
    setSort((prevSort) => ({
      order:
        prevSort.order === "asc" && prevSort.orderBy === value ? "desc" : "asc",
      orderBy: value,
    }));
  };

  const clearAll = () => {
    setSort({ order: "asc", orderBy: "id" });
    setActivePage(1);
    setFilters({});
  };
  const editRow = (value: any) => {
    editHandle(value);
  };
  const deleteRow = (value: number) => {
    deleteHandle(value);
    console.log(value, "value");
  };

  return (
    <>
      <table className=" table table-striped">
        <thead>
          <tr>
            {columns.map(
              (column: { name: string; value: string; action: boolean }) => {
                const sortIcon = () => {
                  if (column.value === sort.orderBy) {
                    if (sort.order === "asc") {
                      return "⬆️";
                    }
                    return "⬇️";
                  } else {
                    return "️↕️";
                  }
                };
                return (
                  <th key={column.value}>
                    <span>{column.name}</span>
                    {column.action === true ? (
                      ""
                    ) : (
                      <button onClick={() => handleSort(column.value)}>
                        {sortIcon()}
                      </button>
                    )}
                  </th>
                );
              }
            )}
          </tr>
          <tr>
            {columns.map(
              (
                column: { value: any; name: any; action: boolean },
                key: any
              ) => {
                return (
                  // value={filters[column.value]}

                  <th key={key}>
                    {column.action === true ? (
                      ""
                    ) : (
                      <input
                        key={`${column.value}-search`}
                        type="search"
                        className="form-control"
                        placeholder={`Search ${column.name}`}
                        onChange={(event) =>
                          handleSearch(event.target.value, column.value)
                        }
                      />
                    )}
                  </th>
                );
              }
            )}
          </tr>
        </thead>
        <tbody>
          {calculatedRows.map((row, key) => {
            return (
              <tr key={key + "_row"}>
                {columns.map((column: any, key: number) => {
                  if (column.format) {
                    return (
                      <td key={column.value}>
                        {column.format(row[column.value])}
                      </td>
                    );
                  } else if (column.action === true) {
                    return (
                      <td key={column.value}>
                        <button
                          className="btn btn-sm theme-btn mr-2"
                          onClick={() => editRow(row)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => deleteRow(row.id)}
                        >
                          Delete
                        </button>
                      </td>
                    );
                  }
                  return <td key={column.value}>{row[column.value]}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>

      {pagination && (
        <div className="col-md-8 mx-auto text-center">
          {count > 0 ? (
            <Pagination
              activePage={activePage}
              count={count}
              rowsPerPage={rowsPerPage}
              totalPages={totalPages}
              setActivePage={setActivePage}
            />
          ) : (
            <p>No data found</p>
          )}

          <p>
            <button onClick={clearAll}>Clear all</button>
          </p>
        </div>
      )}
    </>
  );
};
