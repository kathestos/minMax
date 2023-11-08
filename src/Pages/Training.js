import "./Styles.css";
// import IconsDataService from "../Services/icons";
import React, { useState, useEffect, useRef } from "react";
import { Slider } from "@mui/material";
import ReactAudioPlayer from "react-audio-player";
import ExerciseDataService from "../Services/exercises";
import TrainingDataService from "../Services/training";

function Training() {
  const isPlaying = useRef(false);
  const durationStarted = useRef(false);
  const currentSoundIndex = useRef(0);
  const currentExerciseIndex = useRef(1);

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
          changeMaxSlider,
          pause10,
          currentSoundIndex
        );
        setList([list, playlist]);
        setTotalDuration(await getTotalDuration(playlist));
      } catch (err) {
        console.log(err);
      }
    }
    fetchList();
  }, []);

  const [currentTotalDuration, setCurrentTotalDuration] = useState(0);
  const changeCurrentTotalDuration = (x) => {
    setCurrentTotalDuration(x);
  };

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
  const pause10 =
    "https://res.cloudinary.com/mihael314/video/upload/v1666530568/zvukovi/10s_pauza_zrnsmk.mp3";

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
        onEnded={() =>
          playNext(
            playlist,
            playImg,
            currentSoundIndex,
            currentExerciseIndex,
            false
          )
        }
        listenInterval={100}
        onListen={(e) =>
          listen(
            e,
            changeSlider,
            changeMaxSlider,
            changeCurrentTime,
            currentExerciseIndex
          )
        }
        volume={0.1}
      />

      <div className="player-buttons">
        <img
          className="player-button"
          src={previousImg}
          alt=""
          onClick={() =>
            playPrevious(
              playlist,
              playImg,
              currentSoundIndex,
              currentExerciseIndex
            )
          }
        ></img>
        <img
          className="player-button"
          onClick={(e) =>
            playPause(
              e,
              playImg,
              pauseImg,
              changeMaxSlider,
              totalDuration,
              isPlaying,
              durationStarted,
              changeCurrentTotalDuration,
              currentSoundIndex,
              currentExerciseIndex
            )
          }
          src={playImg}
          alt=""
          id="play-pause"
        ></img>
        <img
          className="player-button"
          src={nextImg}
          alt=""
          onClick={() =>
            playNext(
              playlist,
              playImg,
              currentSoundIndex,
              currentExerciseIndex,
              true
            )
          }
        ></img>
      </div>
      <div className="list-desc">
        <div className="list" id="list">
          {list}
        </div>
        <div className="desc">{description}</div>
      </div>
      <div className="progress-container">
        <div className="progress-time" id="duration">
          {currentTotalDuration}
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

async function playPause(
  e,
  playImg,
  pauseImg,
  changeMaxSlider,
  totalDuration,
  isPlaying,
  durationStarted,
  changeCurrentTotalDuration,
  currentSoundIndex,
  currentExerciseIndex
) {
  if (e.target.src === playImg) {
    e.target.src = pauseImg;
    isPlaying.current = true;
    await play(
      totalDuration,
      isPlaying,
      durationStarted,
      changeCurrentTotalDuration,
      currentSoundIndex,
      currentExerciseIndex
    );
  } else {
    e.target.src = playImg;
    isPlaying.current = false;
    pause();
  }
}

function getQuery() {
  const url = window.location.search;
  const query = new URLSearchParams(url);
  const id = query.get("id");
  return id;
}

async function play(
  totalDuration,
  isPlaying,
  durationStarted,
  changeCurrentTotalDuration,
  currentSoundIndex,
  currentExerciseIndex
) {
  const player = document.getElementById("player");

  // setCurentExercise(currentExerciseIndex);
  player.play();

  if (!durationStarted.current) {
    progress(totalDuration, isPlaying, changeCurrentTotalDuration);
  }
  durationStarted.current = true;
}

function setCurentExercise(currentExerciseIndex) {
  const nodeList = document.getElementById("list").childNodes;
  for (const child of nodeList) {
    child.classList.remove("current-item");
  }
  currentExerciseIndex.current++;
  if (nodeList[currentExerciseIndex.current]) {
    const classList = nodeList[currentExerciseIndex.current].classList;
    if (classList.contains("train-list-subtype")) {
      currentExerciseIndex.current++;
    }
    nodeList[currentExerciseIndex.current].classList.add("current-item");
  } else {
    console.log("gotovo");
  }
}

function setListScroll() {
  const list = document.getElementById("list");
  const count = list.childNodes.length;
  list.scrollTop += list.scrollHeight / count;
}

async function pause() {
  const player = document.getElementById("player");
  player.pause();
}

function listen(
  e,
  changeSlider,
  changeMaxSlider,
  changeCurrentTime,
  currentExerciseIndex
) {
  // console.log(currentExerciseIndex);
  changeSlider(e, false);
  changeCurrentTime(e.toFixed(1));
  const player = document.getElementById("player");
  const dur = parseFloat(player.duration).toFixed(2);
  const durationLabel = document.getElementById("duration").innerHTML;
  if (!isNaN(dur) && durationLabel !== dur) {
    changeMaxSlider(parseFloat(dur));
  }
}

function progress(totalDuration, isPlaying, changeCurrentTotalDuration) {
  let i = 1;
  const f = setInterval(fun, 1000);
  function fun() {
    const progress = document.getElementById("progress");
    if (i > parseInt(totalDuration) + 1) {
      clearInterval(f);
      return;
    }
    if (isPlaying.current) {
      progress.style.width = (i / totalDuration) * 100 + "%";
      changeCurrentTotalDuration(i);
      i++;
    }
  }
}

async function getList(
  pause,
  changeCurrentSound,
  changeMaxSlider,
  pause10,
  currentSoundIndex
) {
  const type = getQuery();

  // const subtypes = ["zagrijavanje", "razgibavanje", "rastezanje"];
  const nonStrengthSubtypes = await ExerciseDataService.getDistinctNonStrength(
    `?type=${type}`
  );
  const subtypes = nonStrengthSubtypes.data;
  subtypes.push("snaga"); // TODO replace

  const warmUpQuery = `?type=${type}&subtype=${subtypes[0]}`;
  const limberUpQuery = `?type=${type}&subtype=${subtypes[1]}`;
  const stretchUpQuery = `?type=${type}&subtype=${subtypes[2]}`;

  const strengthSubtypes = await ExerciseDataService.getDistinct(
    `?type=${type}`
  );
  const strengthArray = await TrainingDataService.getArray();
  const types = await ExerciseDataService.getDistinct("");
  const reorder = [types.data[1], types.data[0], types.data[2]]; // Reordering of types, maybe change?
  const exIndex = reorder.indexOf(type);

  const exLength = parseInt(strengthSubtypes.data.length);

  let list = [];
  let playlist = [];

  const warmUpExercises = await ExerciseDataService.getFiltered(warmUpQuery);
  const limberUpExercises = await ExerciseDataService.getFiltered(
    limberUpQuery
  );
  const stretchUpExercises = await ExerciseDataService.getFiltered(
    stretchUpQuery
  );

  list.push(
    <p className="train-list-subtype" key={`wu`}>
      {subtypes[0]}
    </p>
  );
  for (const [i, item] of warmUpExercises.data.entries()) {
    list.push(
      <p className="train-list-item" key={`wu${i}`}>
        {item.name}
      </p>
    );
    playlist.push(item.sound);
    playlist.push(pause);
  }
  list.push(
    <p className="train-list-subtype" key={`lu`}>
      {subtypes[1]}
    </p>
  );
  for (const [i, item] of limberUpExercises.data.entries()) {
    list.push(
      <p className="train-list-item" key={`lu${i}`}>
        {item.name}
      </p>
    );
    playlist.push(item.sound);
    playlist.push(pause);
  }

  list.push(
    <p className="train-list-subtype" key={`str`}>
      {subtypes[3]}
    </p>
  );

  for (const [i, item] of strengthSubtypes.data.entries()) {
    const q = `?type=${type}&subtype=${subtypes[3]}-${item}`;
    const strEx = await ExerciseDataService.getFiltered(q);
    const trainIndex = strengthArray.data[exLength * exIndex + i];

    list.push(
      <p className="train-list-item" key={`str${i}`}>
        {strEx.data[trainIndex].name}
      </p>
    );
    playlist.push(strEx.data[trainIndex].sound);
    playlist.push(pause);
  }

  list.push(
    <p className="train-list-subtype" key={`su`}>
      {subtypes[2]}
    </p>
  );
  for (const [i, item] of stretchUpExercises.data.entries()) {
    list.push(
      <p className="train-list-item" key={`su${i}`}>
        {item.name}
      </p>
    );
    playlist.push(item.sound);
    playlist.push(pause); // COULD BE OPTIMIZED?
  }

  changeCurrentSound(playlist[0]);
  const player = document.getElementById("player");
  const dur = parseFloat(player.duration).toFixed(2);
  if (!isNaN(dur)) {
    changeMaxSlider(parseFloat(dur));
  }
  currentSoundIndex.current = 0;
  const firstItem = document.getElementById("list").childNodes[1];
  if (firstItem) {
    firstItem.classList.add("current-item");
  }
  return [list, playlist];
}

async function playNext(
  playlist,
  playImg,
  currentSoundIndex,
  currentExerciseIndex,
  isClicked
) {
  if (currentSoundIndex.current < playlist.length - 1) {
    currentSoundIndex.current++;

    const player = document.getElementById("player");
    player.src = playlist[currentSoundIndex.current];

    if (!player.src.includes("pauza")) {
      setCurentExercise(currentExerciseIndex);
      setListScroll();
    }
    player.play();
    // if (!isClicked) {
    //   player.play();
    // } else {

    // }
  } else {
    currentSoundIndex.current = 0;
    currentExerciseIndex.current = 1;
    document.getElementById("play-pause").src = playImg;
  }
}

async function playPrevious(
  playlist,
  playImg,
  currentSoundIndex,
  currentExerciseIndex
) {
  if (currentExerciseIndex.current > 0) {
    currentSoundIndex.current--;

    const player = document.getElementById("player");
    player.src = playlist[currentSoundIndex.current];

    if (!player.src.includes("pauza")) {
      const nodeList = document.getElementById("list").childNodes;
      for (const child of nodeList) {
        child.classList.remove("current-item");
      }
      currentExerciseIndex.current--;
      if (nodeList[currentExerciseIndex.current]) {
        const classList = nodeList[currentExerciseIndex.current].classList;
        if (classList.contains("train-list-subtype")) {
          currentExerciseIndex.current--;
        }
        nodeList[currentExerciseIndex.current].classList.add("current-item");
      } else {
        console.log("gotovo");
      }
      const list = document.getElementById("list");
      const count = list.childNodes.length;
      list.scrollTop -= list.scrollHeight / count;
    }
    player.play();
  } else {
    currentSoundIndex.current = 0;
    currentExerciseIndex.current = 1;
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
