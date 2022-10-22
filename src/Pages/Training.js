import "./Styles.css";
// import IconsDataService from "../Services/icons";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Slider } from "@mui/material";
import ReactAudioPlayer from "react-audio-player";

function Training() {
  GetQuery();

  const [value, setValue] = useState(30);

  const changeSlider = (newValue, isSlider) => {
    setValue(newValue);
    if (isSlider) {
      const player = document.getElementById("player");
      player.currentTime = newValue;
    }
  };

  const [trackDuration, setTrackDuration] = useState(100);

  const changeMaxSlider = (newValue) => {
    setTrackDuration(newValue);
  };

  const nextImg =
    "https://res.cloudinary.com/mihael314/image/upload/v1666293302/ikone/next_njns6i.png";
  const pauseImg =
    "https://res.cloudinary.com/mihael314/image/upload/v1666293302/ikone/pause_yuk8z4.png";
  const previousImg =
    "https://res.cloudinary.com/mihael314/image/upload/v1666293302/ikone/previous_p9m16b.png";
  const playImg =
    "https://res.cloudinary.com/mihael314/image/upload/v1666293302/ikone/play_o1r0ey.png";

  return (
    <div className="train-container">
      <div className="train-title">TITLE</div>
      <img
        className="train-gif"
        src="https://res.cloudinary.com/mihael314/image/upload/v1657208958/ikone/sklek_i4kabp.jpg"
        alt=""
      ></img>
      <div className="slider-container">
        <Slider
          id="slider"
          className="train-slider"
          min={0}
          max={trackDuration}
          defaultValue={50}
          aria-label="time"
          value={value}
          onChange={(e) => changeSlider(e.target.value, true)}
        />
      </div>

      <ReactAudioPlayer
        id="player"
        src="https://res.cloudinary.com/mihael314/video/upload/v1666283110/zvukovi/Stanga_biwfhx.mp3"
        controls={false}
        // onEnded={play}
        // onSeeked={seek}
        listenInterval={100}
        onListen={(e) => listen(e, changeSlider)}
      />

      <div className="player-buttons">
        <img className="player-button" src={previousImg} alt=""></img>
        <img
          className="player-button"
          onClick={(e) => playPause(e, playImg, pauseImg, changeMaxSlider)}
          src={playImg}
          alt=""
        ></img>
        <img className="player-button" src={nextImg} alt=""></img>
      </div>
    </div>
  );
}

function playPause(e, playImg, pauseImg, changeMaxSlider) {
  if (e.target.src === playImg) {
    e.target.src = pauseImg;
    play(e, changeMaxSlider);
  } else {
    e.target.src = playImg;
    pause();
  }
}

function GetQuery() {
  const url = useLocation().search;
  const query = new URLSearchParams(url);
  const id = query.get("id");
  return parseInt(id);
}

async function play(e, changeMaxSlider) {
  const player = document.getElementById("player");
  const dur = player.duration;
  player.play();
  changeMaxSlider(dur);
}

async function pause() {
  const player = document.getElementById("player");
  player.pause();
}

function listen(e, changeSlider) {
  changeSlider(e, false);
}

export default Training;
