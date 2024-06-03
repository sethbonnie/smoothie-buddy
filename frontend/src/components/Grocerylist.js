import { Column } from "primereact/column";
import "./grocerylist.css";
import { DataTable } from "primereact/datatable";
import React, { useState, useEffect } from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";

export default function Grocerylist(props) {
  const shoppingList = props.shoppingList;
  const [products, setProducts] = useState([]);
  const [checked, setChecked] = useState([]);

  var isChecked = (item) =>
    checked.includes(item) ? "checked-item" : "not-checked-item";

  const handleCheck = (event, item) => {
    var updatedList = [...checked];
    if (event.target.checked) {
      updatedList = [...checked, item];
    } else {
      updatedList.splice(checked.indexOf(item), 1);
    }
    setChecked(updatedList);
  };
  function handleAddIngredientsToKitchen() {
    props.onAddGroceryItems(checked);
    let result = shoppingList.filter(
      (shoppingItem) =>
        !checked.some((checkedItem) => checkedItem.name === shoppingItem.name)
    );
    console.log("shoppinglist", shoppingList);

    console.log("result", result);
  }

  const footer = (
    <>
      <Button
        onClick={handleAddIngredientsToKitchen}
        label="Add to My Kitchen"
        icon="pi pi-check"
      />
    </>
  );

  return (
    <div className="grocery-list-container">
      <Card
        title="..................Grocery List.................."
        footer={footer}
        className="md:w-25rem"
      >
        <div className="list-item">
          <div>Amount</div>
          <div>Item Name</div>
        </div>
        <ul>
          {shoppingList.map((item, index) => (
            <li className={isChecked(item)} type="checkbox">
              {item.quantity} {item.item} {item.name}{" "}
              <input
                onChange={(event) => handleCheck(event, item)}
                type="checkbox"
              ></input>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
