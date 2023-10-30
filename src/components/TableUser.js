import axios from "axios";
import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { fetchAllUser } from "../services/userServices";
import ReactPaginate from "react-paginate";
import ModalsAdd from "./modalAddNew";
import "react-toastify/dist/ReactToastify.css";
import ModalEditUser from "./ModalEdit";
import _, { debounce, result, set } from "lodash";
import ModalConfirm from "./ModaConfirm";
import "./Tableuser.scss";
import { debounce as _debounce } from "lodash/debounce";
import { CSVLink, CSVDownload } from "react-csv";
import {parse, Papa } from "papaparse";
import { toast } from "react-toastify";

// import ModalsEdit from "./ModalEditUser";
const TableUsers = (props) => {
  const [listUsers, setListUsers] = useState([]);
  const [total, setTotal] = useState(0);
  const [totalPage, setTotalpage] = useState(0);
  const [isShowModalAddNew, setIsShowModalAddNew] = useState(false);
  const [isShowModalsEdit, setIsShowModalsEdit] = useState(false);
  const [dataEdit, setDataEdit] = useState({});
  const [isShowModalDelete, setIsShowModalDelete] = useState(false);
  const [dataDelete, setDataDelete] = useState({});
  const [sortBy, setSortBy] = useState("asc");
  const [sortField, setSortField] = useState("id");
  const [keyWord, setKeyWord] = useState("");

  const handleClose1 = () => {
    setIsShowModalAddNew(false);
    setIsShowModalsEdit(false);
    setIsShowModalDelete(false);
  };
  const handleUpdateUser = (user) => {
    setListUsers([user, ...listUsers]);
  };

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
  // console.log(listUsers);
  const handlePageClick = (event) => {
    // console.log(event);
    getUser(+event.selected + 1);
  };
  const handelEditUser = (user) => {
    setIsShowModalsEdit(true);
    setDataEdit(user);
  };
  const handleEditUserFromModal = (user) => {
    let cloneUser = _.cloneDeep(listUsers);
    let index = listUsers.findIndex((item) => user.id === item.id);
    cloneUser[index].first_name = user.first_name;
    setListUsers(cloneUser);
    console.log(listUsers, cloneUser);
  };

  const handelDelete = (user) => {
    setIsShowModalDelete(true);
    console.log(user);
    setDataDelete(user);
  };
  const handeDeleteFromModal = (user) => {
    let cloneUser = _.cloneDeep(listUsers);
    cloneUser = cloneUser.filter((item) => item.id !== user.id);

    setListUsers(cloneUser);
    // console.log( listUsers , cloneUser)
  };
  const handleSort = (sortBy, sortField) => {
    setSortBy(sortBy);
    setSortField(sortField);
    let cloneUser = _.cloneDeep(listUsers);
    cloneUser = _.orderBy(cloneUser, [sortField], [sortBy]);
    // console.log
    setListUsers(cloneUser);
  };
  const handelSearch = debounce((event) => {
    console.log(event.target.value);
    let term = event.target.value;
    if (term) {
      let cloneUser = _.cloneDeep(listUsers);
      cloneUser = cloneUser.filter((item) => item.email.includes(term));
      // cloneUser = _.includes(cloneUser, (item) => item.email);
      // console.log
      setListUsers(cloneUser);
    } else {
      getUser(1);
    }
  }, 500);

  const [dataExport, setDataExport] = useState(" ");
  const getUsersExport = (event, done) => {
    let result = [];
    if (listUsers && listUsers.length > 0) {
      result.push(["ID", "Email", "First Name", "Last Name"]);
      listUsers.map((item, index) => {
        let arr = [];
        arr[0] = item.id;
        arr[1] = item.email;
        arr[2] = item.first_name;
        arr[3] = item.last_name;
        result.push(arr);
      });
      setDataExport(result);
      done();
    }
    // <td>{item.id}</td>
    //               <td>{item.email}</td>
    //               <td>{item.first_name}</td>
    //               <td>{item.last_name}</td>
    //               <td></td>
  };
  const handelImport = (event) => {
    if (event.target && event.target.files && event.target.files[0]) {
      let file = event.target.files[0];
      if (file.type !== "text/csv") {
        toast.error("Not type file can upload");
        return;
      }

      console.log("Zoe Nguyen", file);
    }

    // eslint-disable-next-line no-undef
    Papa.parse(file, {
      // header: true,
      complete: function (results) {  
        let rawCSV = results.data;

        if (rawCSV.length > 0) {
          if (rawCSV[0] && rawCSV[0].length === 3) {
            if ( rawCSV[0][0] !== "email" || rawCSV[0][1] !== "first_name" || rawCSV[0][2] !== "last_name") {
              toast.error("wrong fomat header");
            } else {
              rawCSV.map((item, index) => {
                let result = [];
                if ( index > 0 && item.length === 3) {
                  let obj = {}
                  obj.email = item[0];
                  obj.first_name = item[1];
                  obj.la = item[2];
                  result.push(obj)
                }
              })
              setListUsers(result);
            }
          } else {
            toast.error("wrong fomat");
          }
        } else {
          toast.error("Not Found data");
        }
        console.log("Finished:", results.data);
      },
    });
  };

  return (
    <>
      <div className="my-3 add-new d-sm-flex">
        <span>
          {" "}
          <b style={{ color : "rgb(30, 48, 80)"}}>List Staff:</b>
        </span>
        <div className="group-btns mp-sm-0 mt-2">
          <label htmlFor="Import" className="btn btn-warning">
            <i className="fa-solid fa-file-import" />
            &nbsp;Import
          </label>
          <input
            id="Import"
            type="file"
            hidden
            onChange={(event) => handelImport(event)}
          />

          <CSVLink
            data={dataExport}
            filename={"Users.csv"}
            className="btn btn-primary"
            asyncOnClick={true}
            onClick={getUsersExport}
          >
            <i className="fa-solid fa-file-arrow-down"></i>&nbsp;
            Export
          </CSVLink>

          <button
            class="btn btn-success"
            onClick={() => setIsShowModalAddNew(true)}
          >
            <i className="fa-solid fa-circle-plus fa-beat"></i>

            &nbsp;Add new
          </button>
        </div>
      </div>
      <div className="col-10 col-sm-4 my-3">
        <input
          className="form-control"
          placeholder="Search"
          onChange={(e) => handelSearch(e)}
        />
      </div>
      <div className="customize">
      <Table striped bordered hover className="">
        <thead>
          <tr>
            <div className="sort-header">
              <span>ID</span>
              <span>
                <i
                  class="fa-solid fa-arrow-down"
                  onClick={() => handleSort("desc", "id")}
                ></i>
                <i
                  class="fa-solid fa-arrow-up"
                  onClick={() => handleSort("asc", "id")}
                ></i>
              </span>
            </div>
            <th>Email</th>
            <div className="sort-header">
              <span>First Name</span>
              <span>
                <i
                  class="fa-solid fa-arrow-down"
                  onClick={() => handleSort("desc", "first_name")}
                ></i>
                <i
                  class="fa-solid fa-arrow-up"
                  onClick={() => handleSort("asc", "first_name")}
                ></i>
              </span>
            </div>
            <th>Last Name</th>
            <th>Actions</th>
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
                  <td>
                    <button
                      className="btn btn-warning mx-3"
                      onClick={() => handelEditUser(item)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handelDelete(item)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
      </div>

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
      <ModalsAdd
        show={isShowModalAddNew}
        handleClose={handleClose1}
        handleUpdateUser={handleUpdateUser}
      />
      <ModalEditUser
        show={isShowModalsEdit}
        dataEdit={dataEdit}
        handleClose={handleClose1}
        handleUpdateUser={handleUpdateUser}
        handleEditUserFromModal={handleEditUserFromModal}
      />
      <ModalConfirm
        show={isShowModalDelete}
        handleClose={handleClose1}
        dataDelete={dataDelete}
        handeDeleteFromModal={handeDeleteFromModal}
      />

      {/* <ModalsEdit
        show={isShowModalsEdit}
        dataEdit = { dataEdit}
      /> */}
    </>
  );
};

export default TableUsers;
