const box = document.querySelector(".boxs");
const startButton = document.querySelector("[data-text*='START']");
const optionsButton = document.querySelector("[data-text*='OPTIONS']");
const score = document.querySelector(".score");
const inputSpeed = document.querySelector("#speed");
const labelSpeed = document.querySelector("#labelSpeed");
const inputSize = document.querySelector("#size");
const labelSize = document.querySelector("#labelSize");
const optionsBox = document.querySelector(".options");
const container = document.querySelector(".container");
const defaultOptions = {
  speed:4,
  size:3
}
let boxs;
let size = defaultOptions.size;
let speed = (10 * 75) - (defaultOptions.speed * 75) + 50;
let isOptions = false;
let order = [];
let orderPlayer = [];
let pause = true;

const RandomNumber = (min, max) =>
Math.floor(Math.random() * (max - min)) + min;

const showBox = ({ classList }) => {
  classList.add("box--active");
  setTimeout(() => classList.remove("box--active"), speed);
};
const changeScore = () => {
  score.classList.add("score--active");
  score.innerHTML = "Score:" + order.length;
  setTimeout(() => score.classList.remove("score--active"), 300);
};
const lose = (animation = false) => {
  pause = true;
  score.innerHTML = "Score:0";
  const allElements = document.querySelectorAll("*");

  chageName(startButton, "START");
  if (animation) {
    allElements.forEach((element, index) => {
      element.classList.add("lose");
    });
    setTimeout(
      () =>
      allElements.forEach((element, index) => {
        element.classList.remove("lose");
      }),
      1000
    );
  }
};
const checkClick = () => {
  if (order.length === orderPlayer.length) {
    changeScore();
    nextRound();
  }
};
const boxClick = (e, index) => {
  const box = e.path[0];
  if (!pause) {
    showBox(box);
    orderPlayer.push(index);
    if (order[orderPlayer.length - 1] === index) {
      checkClick();
    } else {
      lose(true);
    }
  }
};

const showOrder = () => {
  order.forEach((number, index) => {
    setTimeout(() => {
      const box = boxs[number];
      showBox(box);
      if (index === order.length - 1) pause = false;
    }, speed * 2 * index);
  });
};

const nextRound = () => {
  pause = true;
  orderPlayer = [];
  order.push(RandomNumber(0, size * size - 1));
  setTimeout(() => {
    showOrder();
  }, 1000);
};

const startRound = () => {
  if(!isOptions){
    order = [];
    orderPlayer = [];
    nextRound();
    score.innerHTML = "Score:0";
    chageName(startButton, "RESET");
  }else{
    options(true)
  }


};
const chageName = (element, text) => {
  element.innerHTML = text;
  element.setAttribute("data-text", text);
};
const options = (close = false) => {
  if(close ==  true || isOptions == false){
    isOptions = !isOptions;
    boxs.forEach((box) => box.classList.toggle("box--hide"));
    score.classList.toggle("score--active");

    startButton.classList.toggle("button--active");
    optionsButton.classList.toggle("button--active");
    optionsBox.classList.toggle("options--hide");
    if (isOptions) {
      lose();
      score.innerHTML = "Options";
      chageName(optionsButton, "DEFAULT");
      chageName(startButton, "CLOSE");
    } else {
      chageName(optionsButton, "OPTIONS");
      chageName(startButton, "START");
      score.innerHTML = "Score:0";
      generateBox();
    }
    setTimeout(() => {
      startButton.classList.toggle("button--active");
      optionsButton.classList.toggle("button--active");
      score.classList.toggle("score--active");
    }, 500);}else{
      speed = (10 * 75) - (defaultOptions.speed * 75) + 50;
      size = defaultOptions.size;
      labelSpeed.innerHTML = "Speed:" + defaultOptions.speed;
      labelSize.innerHTML = "Size:" + size;
      inputSpeed.value = defaultOptions.speed
      inputSize.value = size
    }
};

const changeSpeed = ({ target: { value } }) => {
  labelSpeed.innerHTML = "Speed:" + value;
  speed = (10 * 75) - (value * 75) + 50;
};
const changeSize = ({ target: { value } }) => {
  labelSize.innerHTML = "Size:" + value;
  size = value;
};

const generateBox = () => {
  box.innerHTML = "";
  container.style.width = 150 * size * (4 / size) + "px";
  optionsBox.style.width = 150 * size * (4 / size) + "px";
  for (i = 0; i < size * size; i++) {
    box.innerHTML += '<div class="box"></div>';
  }
  boxs = document.querySelectorAll(".box");
  boxs.forEach((box, index) => {
    box.style.width = 150 * (4 / size) - 20 + "px";
    box.style.height = 150 * (4 / size) - 20 + "px";
    box.addEventListener("click", (e) => boxClick(e, index));
  });
};
generateBox();

startButton.addEventListener("click", startRound);
optionsButton.addEventListener("click", options);
inputSpeed.addEventListener("change", (e) => changeSpeed(e));
inputSize.addEventListener("change", (e) => changeSize(e));