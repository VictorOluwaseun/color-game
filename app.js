//jshint esversion: 8

const ColorCtrl = (() => {
 let squaresNum = 6;
 let colors = generateRandomColors(squaresNum);
 let selectedColor = colorPicker(colors);

 function colorPicker(colors) {
  const randomIndex = Math.floor(Math.random() * colors.length);

  return colors[randomIndex];
 }

 function generateRandomColors(n) {
  const colors = [];
  for (let i = 0; i < n; i++) {
   colors.push(generateColors());
  }
  return colors;
 }

 function generateColors() {
  const r = Math.floor(Math.random() * 255 + 1);
  const g = Math.floor(Math.random() * 255 + 1);
  const b = Math.floor(Math.random() * 255 + 1);
  const rgbColors = `rgb(${r}, ${g}, ${b})`;

  return rgbColors;
 }

 return {
  getColors: function(squaresNum) {
   colors = generateRandomColors(squaresNum);
   return colors;
  },
  getSelectedColor: function() {
   selectedColor = colorPicker(colors);
   return colorPicker(colors);
  },
  getSquareNums: function() {
   return squaresNum;
  },
  setSquareNums: function(no) {
   squaresNum = no;
  }
 };
})();

const UICtrl = (() => {
 const selectors = {
  squares: document.getElementsByClassName("square"),
  colorDisplay: document.getElementById("colorDisplay"),
  messageDisplay: document.getElementById("message"),
  mode: document.querySelector(".mode"),
  easyBtn: document.querySelector("#easyBtn"),
  hardBtn: document.querySelector("#hardBtn"),
  h1: document.querySelector("h1"),
  resetButton: document.querySelector("#reset"),
  gameBackgroundColor: "#232323"
 };

 const {
  squares,
  colorDisplay,
  messageDisplay,
  h1,
  resetButton,
  gameBackgroundColor
 } = selectors;

 return {
  getAllSelectors: function() {
   return selectors;
  },
  populateColors: function(colors) {
   for (let i = 0; i < squares.length; i++) {
    if (colors[i]) {
     squares[i].style.backgroundColor = colors[i];
     squares[i].style.display = "block";
    } else {
     squares[i].style.display = "none";
    }
   }
  },
  changeH1Color: function(color) {
   h1.style.backgroundColor = color;
  },
  changeSquareColors: function(color) {
   for (let i = 0; i < squares.length; i++) {
    squares[i].style.backgroundColor = color;
   }
  },
  colorDisplay: function(color) {
   colorDisplay.textContent = color;
  },
  showMessage: function(message) {
   messageDisplay.textContent = message;
  },
  resetButtonText: function(message) {
   resetButton.textContent = message;
  }
 };
})();

//App Controller
const App = ((ColorCtrl, UICtrl) => {
 //Get the number of colors
 const noOfColors = ColorCtrl.getSquareNums();
 //Fetch colors
 let colors = ColorCtrl.getColors(noOfColors);

 //Get the pickedColor
 let pickedColor = ColorCtrl.getSelectedColor();

 //All squares and other variables
 const {
  squares,
  gameBackgroundColor,
  resetButton,
  mode,
  easyBtn,
  hardBtn
 } = UICtrl.getAllSelectors();

 const loadEventListners = () => {
  //Select one of the squares
  for (let i = 0; i < squares.length; i++) {
   squares[i].addEventListener("click", handleSquareClick);
  }

  //Reset colors
  resetButton.addEventListener("click", handleResetButton);
  mode.addEventListener("click", handleEasyAndHardButton);
 };

 const handleSquareClick = ({ target }) => {
  const clickedColor = target.style.backgroundColor;
  if (clickedColor === pickedColor) {
   UICtrl.showMessage("Correct!");
   UICtrl.resetButtonText("Play again?");
   UICtrl.changeH1Color(clickedColor);
   UICtrl.changeSquareColors(clickedColor);
   //  return;
  } else {
   UICtrl.showMessage("Try again!");
   target.style.backgroundColor = gameBackgroundColor;
  }
 };

 const handleResetButton = () => {
  //Reset Display Message
  UICtrl.showMessage("");

  //Change ResetButtonText
  UICtrl.resetButtonText("New Colors");

  //Reset h1
  UICtrl.changeH1Color("steelblue");

  //Get no of colors
  const noOfColors = ColorCtrl.getSquareNums();

  //Get Another set of colors
  colors = ColorCtrl.getColors(noOfColors);

  //Reset the pickedColor
  pickedColor = ColorCtrl.getSelectedColor();

  UICtrl.populateColors(colors);
  UICtrl.colorDisplay(pickedColor);
 };

 const handleEasyAndHardButton = ({ target }) => {
  if (target.id === "easyBtn") {
   hardBtn.classList.remove("selected");
   easyBtn.classList.add("selected");

   //Reset Display Message
   UICtrl.showMessage("");

   //Change ResetButtonText
   UICtrl.resetButtonText("New Colors");

   //Reset h1
   UICtrl.changeH1Color("steelblue");

   ColorCtrl.setSquareNums(3);
   const noOfColors = ColorCtrl.getSquareNums();
   const colors = ColorCtrl.getColors(noOfColors);
   console.log(colors);

   //Reset the pickedColor
   pickedColor = ColorCtrl.getSelectedColor();

   UICtrl.populateColors(colors);
   console.log(pickedColor);

   UICtrl.colorDisplay(pickedColor);
  }

  if (target.id === "hardBtn") {
   easyBtn.classList.remove("selected");
   hardBtn.classList.add("selected");

   //Reset Display Message
   UICtrl.showMessage("");

   //Change ResetButtonText
   UICtrl.resetButtonText("New Colors");

   //Reset h1
   UICtrl.changeH1Color("steelblue");

   ColorCtrl.setSquareNums(6);

   const noOfColors = ColorCtrl.getSquareNums();
   console.log(noOfColors);

   const colors = ColorCtrl.getColors(noOfColors);
   console.log(colors);

   //Reset the pickedColor
   pickedColor = ColorCtrl.getSelectedColor();

   UICtrl.populateColors(colors);

   console.log(pickedColor);

   UICtrl.colorDisplay(pickedColor);
  }
 };

 UICtrl.populateColors(colors);
 UICtrl.colorDisplay(pickedColor);

 return {
  init: function() {
   loadEventListners();
  }
 };
})(ColorCtrl, UICtrl);

//Start App
App.init();
