import "./Styles.css";
import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import ExerciseDataService from "../Services/exercises";
import TrainingDataService from "../Services/training";
import { Link } from "react-router-dom";

function ExercisesOverview() {
  const [elements, setElements] = useState([]);
  const [[labels, types, buttons], setLabels] = useState([[], [], []]);

  useEffect(() => {
    async function fetchExercisesData() {
      try {
        setElements(await getEx());
        setTraining();
      } catch (err) {
        console.log(err);
      }
    }
    fetchExercisesData();
  }, []);

  useEffect(() => {
    async function fetchLabelsData() {
      try {
        setLabels(await fetchLabels());
      } catch (err) {
        console.log(err);
      }
    }
    fetchLabelsData();
  }, []);

  return (
    <div className="exercises-container">
      <div className="type-labels">
        {types.map((x, i) => (
          <p className="type-label" key={i}>
            {x}
          </p>
        ))}
      </div>
      <Grid container spacing={1}>
        {Array.from(Array(elements.length)).map((_, index) => (
          <Grid item xs={4} key={index}>
            <p className="item-label">{labels[indexes(index)]}</p>
            <div className="exercises-list" id={index}>
              {elements[indexes(index)]}
            </div>
          </Grid>
        ))}
      </Grid>
      <div className="button-dock">{buttons}</div>
      <div className="button-dock">{startButtons()}</div>
    </div>
  );
}

function itemClick(id) {
  const element = document.getElementById(id);
  const parentId = element.parentNode.id;
  var siblings = document.getElementById(parentId).childNodes;
  for (let i = 0; i < siblings.length; i++) {
    siblings[i].classList.add("unselected-items");
    siblings[i].classList.remove("selected-item");
  }
  element.classList.remove("unselected-items");
  element.classList.add("selected-item");
  setItem(id);
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
  let c = 0;
  const [list, reorder] = await getTypesSubtypes();
  for (const [i, x] of list.entries()) {
    for (const [j, y] of x.entries()) {
      const obj = await ExerciseDataService.getFiltered(
        `?type=${reorder[i]}&subtype=snaga-${y}`
      );
      const l = obj.data;
      let array = [];
      for (const [k, z] of l.entries()) {
        const key = `${z.name.replaceAll(" ", "")}-${j}-${k}`;
        const id = `ex-${c}-${k}`;
        const item = (
          <p
            key={key}
            id={id}
            className="exercises-items"
            onClick={() => itemClick(id)}
          >
            {z.name}
          </p>
        );
        array.push(item);
      }
      c++;
      elements.push(array);
    }
  }
  return elements;
}

function indexes(i) {
  return (i % 3) * 6 + Math.floor(i / 3); // Maybe set dynamically
}

async function setTraining() {
  const res = await TrainingDataService.getArray();
  const array = res.data;
  array.forEach((e, i) => {
    const id = `ex-${i}-${e}`;
    const ex = document.getElementById(id);
    ex.classList.remove("unselected-items");
    ex.classList.add("selected-item");
  });
}

async function setItem(id) {
  const x = parseInt(id.substring(id.indexOf("-") + 1, id.lastIndexOf("-")));
  const y = parseInt(id.substring(id.lastIndexOf("-") + 1));
  const arr = await TrainingDataService.getArray();
  const train = arr.data;
  train[x] = y;
  await TrainingDataService.setArray(train);
}

async function fetchLabels() {
  const [list, reorder] = await getTypesSubtypes();
  const flat = list.flat();
  const ret = flat.map((x) => {
    return x.substring(x.indexOf("-") + 1);
  });
  const buttons = createButtons(reorder.length, ret.length);
  return [ret, reorder, buttons];
}

function createButtons(types, subtypes) {
  let buttons = [];
  for (let i = 0; i < types; i++) {
    buttons.push(
      <button
        className="train-button"
        key={`+1${i}`}
        id={`+1${i}`}
        onClick={() => plusOne(i, subtypes / types)}
      >
        +1
      </button>
    );
    buttons.push(
      <Link to={`/train?id=${i}`} key={`G${i}`} className="train-button">
        <button id={`G${i}`} className="generate-button">
          G
        </button>
      </Link>
    );
  }
  return buttons;
}

function startButtons() {
  let buttons = [];
  buttons.push(
    <button className="train-button" key={"A"}>
      A
    </button>
  );
  buttons.push(
    <button className="train-button" key={"S"}>
      START
    </button>
  );
  buttons.push(
    <button className="train-button" key={"R"}>
      R
    </button>
  );
  return buttons;
}

async function plusOne(i, j) {
  let itemArray = [];
  for (let x = 0; x < j; x++) {
    const id = j * i + x;
    itemArray.push(id);
  }

  var elements = document.getElementsByClassName("selected-item");
  let idsToChange = [];
  for (const el of elements) {
    const id = el.id;
    const subtype = parseInt(
      id.substring(id.indexOf("-") + 1, id.lastIndexOf("-"))
    );
    const index = parseInt(id.substring(id.lastIndexOf("-") + 1));
    if (itemArray.includes(subtype)) {
      const idx = `ex-${subtype}-${index + 1}`;
      idsToChange.push(idx);
    }
  }

  idsToChange.forEach((ele) => {
    const x = parseInt(
      ele.substring(ele.indexOf("-") + 1, ele.lastIndexOf("-"))
    );
    const y = parseInt(ele.substring(ele.lastIndexOf("-") + 1));
    const oldId = `ex-${x}-${y - 1}`;
    const ex = document.getElementById(ele);
    const old = document.getElementById(oldId);
    if (ex !== null) {
      ex.classList.remove("unselected-items");
      ex.classList.add("selected-item");
      old.classList.remove("selected-item");
      old.classList.add("unselected-items");
    } else {
      const newId = `ex-${x}-${0}`;
      const newEL = document.getElementById(newId);
      newEL.classList.remove("unselected-items");
      newEL.classList.add("selected-item");
      old.classList.remove("selected-item");
      old.classList.add("unselected-items");
    }
  });

  var newElements = document.getElementsByClassName("selected-item");
  let newArray = [];
  for (const ne of newElements) {
    newArray.push(ne.id);
  }
  var customSort = function (a, b) {
    return Number(a.match(/(\d+)/g)[0]) - Number(b.match(/(\d+)/g)[0]);
  };
  console.log(newArray.sort(customSort));

  let result = [];
  for (const nx of newArray) {
    const end = parseInt(nx.substring(nx.lastIndexOf("-") + 1));
    result.push(end);
  }

  await TrainingDataService.setArray(result);
}

export default ExercisesOverview;
