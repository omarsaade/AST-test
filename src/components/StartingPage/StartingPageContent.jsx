import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ProductItem from "./ProductItem";
import { fetchUsers } from "../../store/Actions/fetchuser-actions";
import { uiActions } from "../../store/Slice/userSlice";
import "primereact/resources/themes/lara-light-indigo/theme.css";

//core
import "primereact/resources/primereact.min.css";

//icons
import "primeicons/primeicons.css";

import { Paginator } from "primereact/paginator";
import classes from "./StartingPageContent.module.css";

const StartingPageContent = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users);

  const usernames = users.map((x) => x.username);

  const show = useSelector((state) => state.user.show);
  const search = useSelector((state) => state.user.search);
  const status = useSelector((state) => state.user.notifications.status);
  const message = useSelector((state) => state.user.notifications.message);
  // const [data, setData] = useState(usernames);
  // const [first, setFirst] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  // useEffect(() => {
  //   setData(usernames.slice(first, first + rows));
  //   setFirst(first);
  // }, []);

  // const onPageChange = (event) => {
  //   const { first, rows } = event;
  //   setData(usernames.slice(first, first + rows));
  //   setFirst(first);
  // };

  const onPageChange = (event) => {
    setCurrentPage(event.page);
  };

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const inputSearchHandler = (event) => {
    dispatch(uiActions.setSearch(event.target.value));
  };

  // let filteredUsername = users.filter((val) => {
  //   return val.username.toLowerCase().includes(search.toLowerCase());
  // });
  let filteredUsername = usernames.filter((val) => {
    return val.toLowerCase().includes(search.toLowerCase());
  });

  console.log(filteredUsername);
  console.log(usernames);

  const listItem = filteredUsername
    .slice(currentPage * 3, currentPage * 3 + 3)
    .map((product) => (
      <ProductItem key={Math.random() * 10000} username={product} />
    ));
  console.log(listItem);
  // console.log(data);

  if (status === "error") {
    return (
      <section className={classes.error}>
        <h1>{message}</h1>
      </section>
    );
  }

  if (status === "pending") {
    return (
      <section className={classes.loading}>
        <h1>{message}</h1>
      </section>
    );
  }

  return (
    <>
      <div className={classes.search}>
        <input
          className={classes.searchBox}
          type="text"
          placeholder="Search User"
          onChange={inputSearchHandler}
        />
      </div>
      <ul className={classes.productList}>{!show && listItem}</ul>;
      {/* <div className="card">
        <Paginator
          first={first}
          rows={3}
          totalRecords={10}
          onPageChange={onPageChange}
          template={{ layout: "PrevPageLink CurrentPageReport NextPageLink" }}
        />
      </div> */}
      <div>
        {/* {usernames
          .slice(currentPage * 3, currentPage * 3 + 3)
          .map((username) => (
            <div key={username}>{username}</div>
          ))} */}
        <Paginator
          first={currentPage * 3}
          rows={3}
          totalRecords={10}
          onPageChange={onPageChange}
          template={{ layout: "PrevPageLink CurrentPageReport NextPageLink" }}
        />
      </div>
    </>
  );
};

export default StartingPageContent;
