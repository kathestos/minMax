import "./Styles.css";
// import IconsDataService from "../Services/icons";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Slider } from "@mui/material";
import ReactAudioPlayer from "react-audio-player";
import ExerciseDataService from "../Services/exercises";

function Training() {
  GetQuery();

  const [currentIndex, setCurrentIndex] = useState(0);
  const changeCurrentIndex = (i) => {
    setCurrentIndex(i);
  };

  const [currentTime, setCurrentTime] = useState("0.0");
  const changeCurrentTime = (i) => {
    setCurrentTime(i);
  };

  const [value, setValue] = useState(0);
  const changeSlider = (newValue, isSlider) => {
    setValue(newValue);
    if (isSlider) {
      const player = document.getElementById("player");
      player.currentTime = newValue;
      changeCurrentTime(newValue);
    }
  };

  const [trackDuration, setTrackDuration] = useState();
  const changeMaxSlider = (newValue) => {
    setTrackDuration(newValue);
  };

  const [currentSound, setCurrentSound] = useState("");
  const changeCurrentSound = (sound) => {
    setCurrentSound(sound);
  };

  const [[list, playlist], setList] = useState([], []);
  const [totalDuration, setTotalDuration] = useState(0);
  useEffect(() => {
    async function fetchList() {
      try {
        const [list, playlist] = await getList(
          pause,
          changeCurrentSound,
          changeMaxSlider
        );
        setList([list, playlist]);
        setTotalDuration(await getTotalDuration(playlist));
      } catch (err) {
        console.log(err);
      }
    }
    fetchList();
  }, []);

  const description = "description";
  const nextImg =
    "https://res.cloudinary.com/mihael314/image/upload/v1666293302/ikone/next_njns6i.png";
  const pauseImg =
    "https://res.cloudinary.com/mihael314/image/upload/v1666293302/ikone/pause_yuk8z4.png";
  const previousImg =
    "https://res.cloudinary.com/mihael314/image/upload/v1666293302/ikone/previous_p9m16b.png";
  const playImg =
    "https://res.cloudinary.com/mihael314/image/upload/v1666293302/ikone/play_o1r0ey.png";
  const pause =
    "https://res.cloudinary.com/mihael314/video/upload/v1666530568/zvukovi/5s_pauza_f4gb1u.mp3";

  return (
    <div className="train-container">
      <div className="train-title">TITLE</div>
      <img
        className="train-gif"
        src="https://res.cloudinary.com/mihael314/image/upload/v1657208958/ikone/sklek_i4kabp.jpg"
        alt=""
      ></img>
      <div className="slider-container">
        <div className="current-time" id="current-time">
          {currentTime}
        </div>
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
        <div className="duration" id="duration">
          {trackDuration}
        </div>
      </div>

      <ReactAudioPlayer
        id="player"
        src={currentSound}
        controls={false}
        onEnded={(e) =>
          playNext(e, playlist, currentIndex, changeCurrentIndex, playImg)
        }
        listenInterval={100}
        onListen={(e) =>
          listen(e, changeSlider, changeMaxSlider, changeCurrentTime)
        }
        volume={0.1}
      />

      <div className="player-buttons">
        <img className="player-button" src={previousImg} alt=""></img>
        <img
          className="player-button"
          onClick={(e) =>
            playPause(e, playImg, pauseImg, changeMaxSlider, totalDuration)
          }
          src={playImg}
          alt=""
          id="play-pause"
        ></img>
        <img className="player-button" src={nextImg} alt=""></img>
      </div>
      <div className="list-desc">
        <div className="list" id="list">
          {list}
        </div>
        <div className="desc">{description}</div>
      </div>
      <div className="progress-container">
        <div className="progress-time" id="duration">
          0:00
        </div>
        <div className="progress-bar" id="duration">
          <div className="progress" id="progress"></div>
        </div>
        <div className="progress-duration" id="duration">
          {totalDuration}
        </div>
      </div>
      <audio
        id="audio1"
        src="https://res.cloudinary.com/mihael314/video/upload/v1666530569/zvukovi/20s_pauza_zsjzok.mp3"
      ></audio>
    </div>
  );
}

async function playPause(e, playImg, pauseImg, changeMaxSlider, totalDuration) {
  if (e.target.src === playImg) {
    e.target.src = pauseImg;
    await play(changeMaxSlider, totalDuration);
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

async function play(changeMaxSlider, totalDuration) {
  const player = document.getElementById("player");
  player.play();
  const dur = parseFloat(player.duration).toFixed(2);
  changeMaxSlider(parseFloat(dur));

  const duration = document.getElementById("duration");
  duration.innerHTML = dur;
  const firstItem = document.getElementById("list").firstChild;
  firstItem.classList.add("current-item");
  progress(totalDuration);
}

async function pause() {
  const player = document.getElementById("player");
  player.pause();
}

function listen(e, changeSlider, changeMaxSlider, changeCurrentTime) {
  changeSlider(e, false);
  changeCurrentTime(e.toFixed(1));
  const player = document.getElementById("player");
  const dur = parseFloat(player.duration).toFixed(2);
  const durationLabel = document.getElementById("duration").innerHTML;
  if (!isNaN(dur) && durationLabel !== dur) {
    changeMaxSlider(parseFloat(dur));
  }
}

function progress(totalDuration) {
  let i = 0;
  const f = setInterval(fun, 1000);
  function fun() {
    const progress = document.getElementById("progress");
    if (i > parseInt(totalDuration) + 1) {
      clearInterval(f);
      return;
    }
    progress.style.width = (i / totalDuration) * 100 + "%";
    i++;
  }
}

async function getList(pause, changeCurrentSound, changeMaxSlider) {
  const query = `?type=noge&subtype=zagrijavanje`;
  const exercises = await ExerciseDataService.getFiltered(query);
  let list = [];
  let playlist = [];
  // exercises.data = exercises.data.slice(8); // TODO REMOVE
  for (const [i, item] of exercises.data.entries()) {
    list.push(
      <p className="train-list-item" key={i}>
        {item.name}
      </p>
    );
    playlist.push(item.sound);
    playlist.push(pause);
  }
  changeCurrentSound(playlist[1]);
  const dur = document.getElementById("player").duration;
  if (dur) {
    changeMaxSlider(dur);
  }
  const firstItem = document.getElementById("list").firstChild;
  if (firstItem) {
    firstItem.classList.add("current-item");
  }
  return [list, playlist];
}

async function playNext(
  e,
  playlist,
  currentIndex,
  changeCurrentIndex,
  playImg
) {
  if (currentIndex < playlist.length) {
    await changeCurrentIndex(currentIndex + 1);
    e.target.src = playlist[currentIndex];
    const nodeList = document.getElementById("list").childNodes;
    for (const child of nodeList) {
      child.classList.remove("current-item");
    }
    if (nodeList[currentIndex]) {
      nodeList[currentIndex].classList.add("current-item");
    }
    e.target.play();
  } else {
    changeCurrentIndex(0);
    document.getElementById("play-pause").src = playImg;
  }
}

async function getTotalDuration(urls) {
  return getAllDurations(urls)
    .then((x) => {
      return x.toFixed(2);
    })
    .catch(console.error);

  async function getAllDurations(urls) {
    const loader = generateMediaLoader();
    let total = 0;
    if (urls) {
      for (let i = 0; i < urls.length; i++) {
        total += await loader.getDuration(urls[i]);
      }
    }
    return total;
  }

  function generateMediaLoader() {
    const elem = new Audio();
    let active = false;
    return {
      getDuration,
      load,
    };

    function getDuration(url) {
      return load(url)
        .then((res) => (res && res.duration) || 0)
        .catch((_) => 0);
    }

    function load(url) {
      if (active) {
        return active.then((_) => load(url));
      }
      return (active = new Promise((res, rej) => {
        elem.onloadedmetadata = (e) => {
          active = false;
          res(elem);
        };
        elem.onerror = (e) => {
          active = false;
          rej();
        };
        elem.src = url;
      }));
    }
  }
}

export default Training;
