import axios from "axios";
import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { fetchAllUser } from "../services/userServices";
import ReactPaginate from "react-paginate";

const TableUsers = (props) => {
  const [listUsers, setListUsers] = useState([]);
  const [total, setTotal] = useState(0);
  const [totalPage, setTotalpage] = useState(0);

  useEffect(() => {
    getUser(1);
  }, []);

  const getUser = async (page) => {
    let res = await fetchAllUser(page);
    if (res && res.data) {
      console.log(res);
      setTotal(res.total);
      setListUsers(res.data);
      setTotalpage(res.total_pages);
    }
  };
  console.log(listUsers);
  const handlePageClick = (event) => {
    console.log(event);
    getUser(+event.selected + 1);
  };

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>First Name</th>
            <th>Last Name</th>
          </tr>
        </thead>
        <tbody>
          {listUsers &&
            listUsers.length > 0 &&
            listUsers.map((item, index) => {
              return (
                <tr key={`users-${index}`}>
                  <td>{item.id}</td>
                  <td>{item.email}</td>
                  <td>{item.first_name}</td>
                  <td>{item.last_name}</td>
                  <td>{item.Table}</td>
                </tr>
              );
            })}
        </tbody>
      </Table>
      <ReactPaginate
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={totalPage}
        previousLabel="< previous"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
        renderOnZeroPageCount={null}
      />
    </>
  );
};

export default TableUsers;
