import "./Styles.css";
import React from "react";
import Collapsible from "react-collapsible";
import ExerciseDataService from "../Services/exercises";

function Chest() {
  let warmUpElements = retrieveExercises("?subtype=zagrijavanje&type=prsa");
  let limberUpElements = retrieveExercises("?subtype=razgibavanje&type=prsa");
  let strength = retrieveDistinctSubTypes("?type=prsa");
  let stretchUpElements = retrieveExercises("?subtype=rastezanje&type=prsa");
  const img =
    "https://res.cloudinary.com/mihael314/image/upload/v1662367330/ikone/jpg_ph_agjuav.jpg";

  return (
    <div>
      <div className="main-container">
        <Collapsible trigger="Zagrijavanje">{warmUpElements}</Collapsible>
        <Collapsible trigger="Razgibavanje">{limberUpElements}</Collapsible>
        <Collapsible trigger="Snaga">{strength}</Collapsible>
        <Collapsible trigger="Rastezanje">{stretchUpElements}</Collapsible>
      </div>
      <div className="dock">
        <div className="image-container">
          <img
            className="dock-image"
            id="dock-image"
            src={img}
            alt="error"
          />
        </div>
        <div className="dock-description">
          <p className="field">name: </p>
          <p className="value" id="name"></p> <br />
          <p className="field">type: </p>
          <p className="value" id="type"></p> <br />
          <p className="field">subtype: </p>
          <p className="value" id="subtype"></p> <br />
          <p className="field">calories: </p>
          <p className="value" id="calories"></p> <br />
          <p className="field">area: </p>
          <p className="value" id="area"></p> <br />
          <p className="field">level: </p>
          <p className="value" id="level"></p> <br />
          <p className="field">eng: </p>
          <p className="value" id="eng"></p> <br />
          <p className="field">description: </p>
          <p className="value" id="description"></p>
        </div>
      </div>
    </div>
  );
}

function retrieveExercises(str) {
  let list = [];
  let elements = [];
  ExerciseDataService.getFiltered(str)
    .then((response) => {
      response.data.forEach((element) => {
        list.push(element.name);
      });
      list.forEach((item, index) => {
        elements.push(
          <p
            className="list-item"
            key={index}
            onClick={(e) => showDescription(e)}
          >
            {item}
          </p>
        );
      });
    })
    .catch((e) => {
      console.log(e);
    });
  return elements;
}

function retrieveDistinctSubTypes(str) {
  let elements = [];
  ExerciseDataService.getDistinct(str)
    .then((response) => {
      response.data.forEach((item, index) => {
        elements.push(
          <Collapsible trigger={item} key={index}>
            {retrieveExercises(`?subtype=snaga-${item}&type=prsa`)}
          </Collapsible>
        );
      });
    })
    .catch((e) => {
      console.log(e);
    });
  return elements;
}

function showDescription(e) {
  let name = e.target.innerHTML;
  let query = `?name=${name}`;
  ExerciseDataService.getFiltered(query)
    .then((response) => {
      document.getElementById("dock-image").src = response.data[0].URL;
      document.getElementById("name").innerHTML = response.data[0].name;
      document.getElementById("type").innerHTML = response.data[0].type;
      document.getElementById("subtype").innerHTML = response.data[0].subtype;
      document.getElementById("calories").innerHTML = response.data[0].calories;
      document.getElementById("area").innerHTML = response.data[0].area;
      document.getElementById("level").innerHTML = response.data[0].level;
      document.getElementById("eng").innerHTML = response.data[0].eng;
      document.getElementById("description").innerHTML = response.data[0].description;
    })
    .catch((e) => {
      console.log(e);
    });
}

export default Chest;
