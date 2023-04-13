import classes from "./UserRow.module.css";

function UserRow(props) {
  return (
    <li className={classes.listItem}>
      <p>{props.username}</p>
    </li>
  );
}

export default UserRow;
