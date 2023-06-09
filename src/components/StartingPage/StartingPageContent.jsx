import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import UserRow from "./UserRow";
import { fetchUsers } from "../../store/Actions/fetchuser-actions";
import { uiActions } from "../../store/Slice/userSlice";
import "primereact/resources/themes/lara-light-indigo/theme.css";

import "primereact/resources/primereact.min.css";

import "primeicons/primeicons.css";

import { Paginator } from "primereact/paginator";

import classes from "./StartingPageContent.module.css";

const StartingPageContent = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users);

  const usernames = users.map((x) => x.username);
  const searchInputRef = useRef();

  const show = useSelector((state) => state.user.show);
  const search = useSelector((state) => state.user.search);
  const status = useSelector((state) => state.user.notifications.status);
  const message = useSelector((state) => state.user.notifications.message);
  const [currentPage, setCurrentPage] = useState(0);

  const onPageChange = (event) => {
    setCurrentPage(event.page);
  };

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const inputSearchHandler = () => {
    dispatch(uiActions.setSearch(searchInputRef.current.value));
    setCurrentPage(0);
  };

  let filteredUsername = usernames.filter((val) => {
    return val.toLowerCase().includes(search.toLowerCase());
  });

  const listItem = filteredUsername
    .slice(currentPage * 3, currentPage * 3 + 3)
    .map((username) => (
      <UserRow key={Math.random() * 10000} username={username} />
    ));

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
          ref={searchInputRef}
        />
      </div>
      <ul className={classes.usersList}>{!show && listItem}</ul>;
      <div>
        {!search && (
          <Paginator
            first={currentPage * 3}
            rows={3}
            totalRecords={9}
            onPageChange={onPageChange}
            template={{ layout: "PrevPageLink CurrentPageReport NextPageLink" }}
          />
        )}
      </div>
    </>
  );
};

export default StartingPageContent;
