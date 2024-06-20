import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";

const columns = [
  {
    name: "Id",
    selector: (row) => row.id,
    width: "100px",
  },
  {
    name: "Title",
    selector: (row) => row.title,
    width: "100px",
  },
  {
    name: "Description",
    selector: (row) => row.description,
    width: "300px",
  },
  {
    name: "Price",
    selector: (row) => row.price,
  },

  {
    name: "Category",
    selector: (row) => row.category,
    width: "100px",
  },
  {
    name: "Sold",
    selector: (row) => (row.sold ? "true" : "false"),
    width: "100px",
  },
  {
    name: "image",
    // cell: (row) => <img src={row.image} width={50} alt={row.name}></img>,
    // selector: (row) => row.image,
    width: "100px",
  },
  // {
  //   name: "DateOfSale",
  //   selector: (row) => row.dateOfSale,
  //   width: "100px",
  // },
];

function App() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  // const [page, setPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [search, setSearch] = useState("");
  useEffect(() => {
    console.log("yyyyyy");
    fetchData(1, pageSize, search);
  }, []);

  const fetchData = async (page, pageSize, search) => {
    console.log(page, pageSize, search);
    await fetch(`http://localhost:3000/get-data`, {
      page,
      pageSize,
      search,
    })
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result.data);
          setIsLoaded(true);
          setItems(result.data);
          setCurrentPage(result.currentPage);
          setTotalRows(result.totalItems);
          setTotalPage(result.totalPages);
        },
        (error) => {
          console.log("error");
          setIsLoaded(true);
          setError(error);
        }
      );
  };

  const handlePageChange = async (funct) => {
    if (funct == "prev") {
      if (currentPage == 1) {
      } else if (currentPage > 1) {
        setCurrentPage(currentPage - 1);
        fetchData(currentPage - 1, pageSize, search);
      }
    } else {
      if (currentPage == totalPage) {
      } else {
        console.log("I am hererere");
        const x = currentPage + 1;
        // setCurrentPage(x);
        console.log(currentPage);
        setIsLoaded(false);
        await fetchData(x, pageSize, search);
      }
    }
  };

  const handlePerRowsChange = async (newPerPage, page) => {
    setPageSize(newPerPage);
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className="App">
        <h1 style={{ color: "red", width: "100%", textAlign: "center" }}>
          Transaction DashBoard
        </h1>
        <Table responsive back>
          <thead>
            <tr>
              {columns.map((column) => {
                return (
                  <th width={column.width} key={column.name}>
                    {column.name}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {items.map((item) => {
              return (
                <tr>
                  <td>{item.id}</td>
                  <td>{item.title}</td>
                  <td tooltip={item.description}>
                    <p tooltip={item.description}>
                      {item.description.slice(0, 50)}...
                    </p>
                  </td>
                  <td>{item.price}</td>

                  <td>{item.category}</td>
                  <td>{item.sold ? "True" : "False"}</td>
                  <td>
                    <img src={item.image} width={30} alt="image-src" />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
        <p>Page NO: {currentPage} </p>
        <button onClick={() => handlePageChange("prev")}>Previous</button>
        <button onClick={() => handlePageChange("next")}>Next</button>
        <p>Per Page: 10</p>
      </div>
    );
  }
}

export default App;
