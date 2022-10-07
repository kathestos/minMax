import "./Styles.css";
import FoodDataService from "../Services/food";
import IconsDataService from "../Services/icons";
import React, { useState, useEffect } from "react";
import Collapsible from "react-collapsible";

function Foods() {
  const [image, setImage] = useState([]);

  const [fieldsElements, setFieldsElements] = useState([]);

  const [foodElements, setFoodElements] = useState([]);

  useEffect(() => {
    async function fetchIconData() {
      try {
        const [, subtype] = getQuery();
        setImage(await getIcon(subtype));
      } catch (err) {
        console.log(err);
      }
    }
    fetchIconData();
  }, []);

  useEffect(() => {
    async function fetchFieldsData() {
      try {
        const [type, subtype] = getQuery();
        setFieldsElements(createFieldsElements(await getFields(type, subtype)));
      } catch (err) {
        console.log(err);
      }
    }
    fetchFieldsData();
  }, []);

  useEffect(() => {
    async function fetchFoodData() {
      try {
        const [type, subtype] = getQuery();
        if (subtype === "svježe") {
          setFoodElements(await retrieveFreshElements(type));
        } else {
          setFoodElements(await retrieveFoodElements(type, subtype));
        }
      } catch (err) {
        console.log(err);
      }
    }
    fetchFoodData();
  }, []);

  return (
    <div>
      <div className="main-container">{foodElements}</div>
      <div className="dock">
        <div className="image-container">
          <img className="dock-image" id="dock-image" src={image} alt="" />
        </div>
        <div className="dock-description">{fieldsElements}</div>
      </div>
    </div>
  );
}

async function retrieveFoodElements(type, subtype) {
  const query = `?type=${type}&subtype=${subtype}`;
  let elements = [];
  const res = await FoodDataService.getFiltered(query);
  res.data.forEach((element, index) => {
    elements.push(
      <div
        className="food-item-container"
        onClick={() => showDescription(element.name, type, subtype)}
        key={index}
      >
        <p className="food-list-item">{element.name}</p>
        <img className="list-image" src={element.URL} alt="error" />
      </div>
    );
  });
  return elements;
}

function showDescription(name, type, subtype) {
  const query = `?name=${name}&subtype=${subtype}`;
  FoodDataService.getFiltered(query)
    .then(async (response) => {
      const fields = await getFields(type, subtype);
      fillFieldsElements(response.data[0], fields);
    })
    .catch((e) => {
      console.log(e);
    });
}

async function getFields(type, subtype) {
  if (subtype === "svježe") subtype = "sušeno";
  const query = `?type=${type}&subtype=${subtype}`;
  const res = await FoodDataService.getFiltered(query);
  let fields = Object.keys(res.data[0]);
  fields.splice(fields.indexOf("_id"), 1);
  fields.splice(fields.indexOf("order"), 1);
  fields.splice(fields.indexOf("URL"), 1);
  return fields;
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

function fillFieldsElements(response, fields) {
  document.getElementById("dock-image").src = response["URL"];
  fields.forEach((x) => {
    document.getElementById(x).innerHTML = response[x];
  });
}

function getQuery() {
  const url = window.location.search;
  const query = new URLSearchParams(url);
  const type = query.get("type");
  const subtype = query.get("subtype");
  return [type, subtype];
}

async function getIcon(name) {
  const image = await IconsDataService.get(`?name=${name}`);
  const url = image.data[0].URL;
  return url;
}

async function retrieveFreshElements(type) {
  let elements = [];
  const res = await FoodDataService.getDistinct(`?type=${type}`);
  res.data.forEach(async (item, index) => {
    const display = item.substring(item.indexOf("-") + 1);
    const query = `?subtype=svježe-${item}&type=${type}`;
    elements.push(
      <div key={index} className="fresh-item-container">
        <Collapsible trigger={display}>
          {await retrieveFood(query, type)}
        </Collapsible>
      </div>
    );
  });
  return elements;
}

async function retrieveFood(query, type) {
  let elements = [];
  FoodDataService.getFiltered(query)
    .then((response) => {
      response.data.forEach((element, index) => {
        elements.push(
          <div
            className="food-item-container"
            onClick={() => showDescription(element.name, type, element.subtype)}
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

export default Foods;
