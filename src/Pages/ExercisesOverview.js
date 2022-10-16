import "./Styles.css";
import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import ExerciseDataService from "../Services/exercises";

function ExercisesOverview() {
  const [elements, setElements] = useState([]);

  useEffect(() => {
    async function fetchExercisesData() {
      try {
        setElements(await getEx());
      } catch (err) {
        console.log(err);
      }
    }
    fetchExercisesData();
  }, []);

  return (
    <div className="exercises-container">
      <Grid container spacing={1}>
        {Array.from(Array(elements.length)).map((_, index) => (
          <Grid item xs={4} key={index}>
            <div className="exercises-list" id={index}>
              {elements[indexes(index)]}
            </div>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

function itemClick(id) {
  const element = document.getElementById(id);
  const parentId = element.parentNode.id;
  var siblings = document.getElementById(parentId).childNodes;
  for (let i = 0; i < siblings.length; i++) {
    siblings[i].classList.add("unselected-items");
  }
  element.classList.remove("unselected-items");
  element.classList.add("selected-item");
}

async function getDistinctTypes() {
  return await ExerciseDataService.getDistinct("");
}

async function getTypesSubtypes() {
  let list = [];
  const types = await getDistinctTypes();
  const reorder = [types.data[1], types.data[0], types.data[2]]; // Reordering of types, maybe change?
  for (const type of reorder) {
    const subtypes = await ExerciseDataService.getDistinct(`?type=${type}`);
    list.push(subtypes.data);
  }
  return [list, reorder];
}

async function getEx() {
  let elements = [];
  const [list, reorder] = await getTypesSubtypes();
  for (const [i, x] of list.entries()) {
    for (const [j, y] of x.entries()) {
      const obj = await ExerciseDataService.getFiltered(
        `?type=${reorder[i]}&subtype=snaga-${y}`
      );
      const l = obj.data;
      let array = [];
      for (const [k, z] of l.entries()) {
        const id = `${z.name.replaceAll(" ", "")}-${j}-${k}`;
        const item = (
          <p
            key={id}
            id={id}
            className="exercises-items"
            onClick={() => itemClick(id)}
          >
            {z.name}
          </p>
        );
        array.push(item);
      }
      elements.push(array);
    }
  }
  return elements;
}

function indexes(i) {
  return (i % 3) * 6 + Math.floor(i / 3);
}

export default ExercisesOverview;
