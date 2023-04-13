import classes from "./ProductItem.module.css";

function ProductItem(props) {
  return (
    <li className={classes.listItem}>
      <p>{props.username}</p>
    </li>
  );
}

export default ProductItem;
