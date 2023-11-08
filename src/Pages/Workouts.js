import "./Styles.css";
import Collapsible from "react-collapsible";
import ExerciseDataService from "../Services/exercises";
import IconsDataService from "../Services/icons";
import React, { useState, useEffect } from "react";

function Workouts() {
  const cat = ["zagrijavanje", "razgibavanje", "snaga", "rastezanje"]; // TODO replace
  const type = getQuery();
  const warmUpElements = retrieveExercises(`?subtype=${cat[0]}&type=`, type);
  const limberUpElements = retrieveExercises(`?subtype=${cat[1]}&type=`, type);
  const strength = retrieveDistinctSubTypes(type, cat[2]);
  const stretchUpElements = retrieveExercises(`?subtype=${cat[3]}&type=`, type);

  const [image, setImage] = useState([]);

  useEffect(() => {
    async function fetchIconData() {
      try {
        const type = getQuery();
        setImage(await getIcon(type));
      } catch (err) {
        console.log(err);
      }
    }
    fetchIconData();
  }, []);

  const [fieldsElements, setFieldsElements] = useState([]);

  useEffect(() => {
    async function fetchFieldsData() {
      try {
        const type = getQuery();
        setFieldsElements(createFieldsElements(await getFields(type)));
      } catch (err) {
        console.log(err);
      }
    }
    fetchFieldsData();
  }, []);

  return (
    <div>
      <div className="main-container">
        <div className="fresh-item-container">
          <Collapsible trigger={cat[0]}>{warmUpElements}</Collapsible>
        </div>
        <div className="fresh-item-container">
          <Collapsible trigger={cat[1]}>{limberUpElements}</Collapsible>
        </div>
        <div className="fresh-item-container">
          <Collapsible trigger={cat[2]}>{strength}</Collapsible>
        </div>
        <div className="fresh-item-container">
          <Collapsible trigger={cat[3]}>{stretchUpElements}</Collapsible>
        </div>
      </div>
      <div className="dock">
        <div className="image-container">
          <img className="dock-image" id="dock-image" src={image} alt="" />
        </div>
        <div className="dock-description">{fieldsElements}</div>
      </div>
    </div>
  );
}

function retrieveExercises(query, type) {
  query = query + type;
  let elements = [];
  ExerciseDataService.getFiltered(query)
    .then((response) => {
      response.data.forEach((element, index) => {
        elements.push(
          <div
            className="food-item-container" // TODO zamijenit naziv stila
            onClick={() => showDescription(element.name, type)}
            key={index}
          >
            <p className="food-list-item">{element.name}</p>
            <img className="list-image" src={element.URL} alt="error" />
          </div>
        );
      });
    })
    .catch((e) => {
      console.log(e);
    });
  return elements;
}

function retrieveDistinctSubTypes(type, cat2) {
  const query = `?type=${type}`;
  let elements = [];
  ExerciseDataService.getDistinct(query)
    .then((response) => {
      response.data.forEach((item, index) => {
        elements.push(
          <div key={index} className="fresh-item-container">
            <Collapsible trigger={item.slice(2)}>
              {retrieveExercises(`?subtype=${cat2}-${item}&type=`, type)}
            </Collapsible>
          </div>
        );
      });
    })
    .catch((e) => {
      console.log(e);
    });
  return elements;
}

function getQuery() {
  const url = window.location.search;
  const query = new URLSearchParams(url);
  const type = query.get("type");
  return type;
}

async function getIcon(name) {
  const image = await IconsDataService.get(`?name=${name}`);
  const url = image.data[0].URL;
  return url;
}

function createFieldsElements(fields) {
  let elements = [];
  const len = fields.length;
  fields.forEach((x, index) => {
    elements.push(
      <p className="field" key={index}>
        {x}:{" "}
      </p>
    );
    elements.push(<p className="value" key={len + index} id={x}></p>);
    elements.push(<br key={len * 2 + index} />);
  });
  return elements;
}

async function getFields(type) {
  const query = `?type=${type}&level=4`;
  const res = await ExerciseDataService.getFiltered(query);
  let fields = Object.keys(res.data[0]);
  fields.splice(fields.indexOf("_id"), 1);
  fields.splice(fields.indexOf("order"), 1);
  fields.splice(fields.indexOf("URL"), 1);
  fields.splice(fields.indexOf("sound"), 1);
  return fields;
}

function showDescription(name, type) {
  const query = `?name=${name}`;
  ExerciseDataService.getFiltered(query)
    .then(async (response) => {
      const fields = await getFields(type);
      fillFieldsElements(response.data[0], fields);
    })
    .catch((e) => {
      console.log(e);
    });
}

function fillFieldsElements(response, fields) {
  document.getElementById("dock-image").src = response["URL"];
  fields.forEach((x) => {
    document.getElementById(x).innerHTML = response[x];
  });
}

export default Workouts;
