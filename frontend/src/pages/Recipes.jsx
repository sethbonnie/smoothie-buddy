import "../App.css";
import { DndContext } from "@dnd-kit/core";
import { Draggable } from "../components/Draggable";
import { Droppable } from "../components/Droppable";
import { Splitter, SplitterPanel } from "primereact/splitter";
import { Card } from "primereact/card";
import NutritionFacts from "../components/NutritionFacts";
import { Tooltip } from "primereact/tooltip";
import "./Recipes.css";
import { useState } from "react";
import handleRecipeConversion from "../lib/helper";
import { Link } from "react-router-dom";

function Recipes({
  days,
  isDragging,
  handleRemove,
  handleDragStart,
  handleDragEnd,
  smoothies,
  weeklySmoothies,
}) {
  function Header(props) {
    return <img src={props.src} alt={props.text} />;
  }

  const draggableMarkup = smoothies.map((smoothie) => (
    <div>
      {!isDragging && (
        <Tooltip
          target={`.smoothie-${smoothie.id}`}
          mouseTrack
          mouseTrackTop={170}
        >
          <NutritionFacts recipe={smoothie.text}></NutritionFacts>
        </Tooltip>
      )}
      <div className="smoothieDiv">
        <Draggable id={smoothie.id} key={smoothie.id}>
          <Card
            title={smoothie.text}
            header={<Header src={smoothie.img} />}
            className={`smoothieCard drag smoothie-${smoothie.id}`}
          ></Card>
        </Draggable>
      </div>
      <br></br>
    </div>
  ));

  // function handleSubmitRecipes() {
  //   // console.log(weeklySmoothies)
  //   let test = handleRecipeConversion(weeklySmoothies);
  //   // console.log(weeklySmoothies)
  // }

  return (
    <div>
      <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <Splitter style={{ height: "300px" }}>
          <div className="recipesList">{draggableMarkup}</div>
          <div>
            {/* <Link to="/kitchen">
              <button>Submit Recipes</button>
            </Link> */}
            {Object.keys(days).map((day) => (
              <div>
                <h4>{day}</h4>
                <Droppable id={day}>
                  {days[day].map((smoothie, i) => (
                    <Card
                      title={smoothie.text}
                      header={<Header src={smoothie.img} />}
                      className={`smoothieCard drag smoothie-${smoothie.id}`}
                      onClick={() => handleRemove(day, i)}
                    ></Card>
                  ))}
                </Droppable>
              </div>
            ))}
          </div>
        </Splitter>
      </DndContext>
    </div>
  );
}

export default Recipes;
