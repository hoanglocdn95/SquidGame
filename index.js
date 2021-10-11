let numberRow = 5;
let point = 0;
let arrPairGlass = [];
let currentStep = 0;
let areaData = [];

const getEl = (element) => document.querySelector(element);
const getListEl = (element) => document.querySelectorAll(element);

const setPoint = (point) => {
  getEl('#pointValue').innerHTML = point;
};

const againGame = () => {
  getEl('#modalStart').classList.remove('hide');
  getEl('#modalFail').classList.add('hide');
  getEl('#modalSuccess').classList.add('hide');
  resetGame();
  getEl('#successSound').pause();
  getEl('#failSound').pause();
};

const handleClickGlass = (el) => {
  const { target } = el;
  const idGlass = parseInt(target.getAttribute('id-glass'));
  if (areaData[idGlass]) {
    getEl('#failSound').play();
    return getEl('#modalFail').classList.remove('hide');
  } else {
    point = point + 1;
    setPoint(point);

    target.classList.add('glass-blur');
    target.classList.remove('animation-blink');

    getListEl('.glass').forEach((e) => (e.innerHTML = ''));
    target.innerHTML = '<img src="./img/character.png">';

    arrPairGlass[currentStep].forEach((el) => {
      el.onclick = () => {};
    });
    if (currentStep === numberRow - 1) {
      getEl('#successSound').play();
      getEl('#percentSuccess').innerHTML = Math.pow(0.5, numberRow).toFixed(6) * 100 + '%';
      return getEl('#modalSuccess').classList.remove('hide');
    }
    currentStep += 1;
    setupNextGlass();
    getEl('#nextStepSound').play();
  }
};

const resetGame = () => {
  getListEl('.glass').forEach((el) => {
    el.classList.remove('animation-blink', 'glass-blur');
    el.innerHTML = '';
  });
  point = 0;
  arrPairGlass = [];
  currentStep = 0;
  setPoint(point);
};

const renderGlass = () => {
  const sizeGlass = `calc(100vh / ${numberRow} - 1px);`;
  const glass = (id) =>
    `<div id-glass="${id}" class="glass"` +
    `style="width: ${sizeGlass} height: ${sizeGlass}"` +
    '></div>';
  let listGlass;
  for (let i = 0; i < numberRow * 2; i++) {
    if (!listGlass) {
      listGlass = glass(i);
    } else {
      listGlass = listGlass + glass(i);
    }
  }
  getEl('#road').innerHTML = listGlass;
  getEl('#road').style.width = `calc(100vh / ${numberRow} * 2 - 2px)`;
};

const setupNextGlass = () => {
  arrPairGlass[currentStep].forEach((el) => {
    el.classList.add('animation-blink');
    el.onclick = handleClickGlass;
  });
};

const startGame = () => {
  areaData = [];
  numberRow = 3 + parseInt(getEl('#type__level').value);
  for (let i = 0; i < numberRow; i++) {
    const value = Math.random() <= 0.5;
    const pairValue = [value, !value];
    areaData = areaData.concat(pairValue);
  }
  renderGlass();
  getEl('#modalStart').classList.add('hide');

  const arrGLass = getListEl('.glass');

  for (let i = 0; i < arrGLass.length - 1; i = i + 2) {
    arrPairGlass.push([arrGLass[i], arrGLass[i + 1]]);
  }
  setupNextGlass();
};

window.onload = () => {
  getEl('#start').onclick = startGame;
  getEl('#channel > img').onclick = () =>
    (window.location.href = 'https://www.youtube.com/channel/UC-fCShSZGmkXRw_pyxrrfcQ');
  getListEl('.again').forEach((el) => (el.onclick = againGame));
};
