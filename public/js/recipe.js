// status
let foodList = [];
// DOMs
const backBtn = document.querySelector('.back-btn');
const foodName = document.querySelector('.food-name');
const lastSpan = document.querySelector('.food-title span:nth-child(3)');
const superStuffList = document.querySelector('.super-stuff > ul');
const subStuffList = document.querySelector('.sub-stuff > ul');
const recipe = document.querySelector('.recipe');

// function
// const render = () => {
//   foodList 
// };

const fetchFoodList = async () => {
  const data = await fetch('/cuisine');
  foodList = await data.json();
};
// Event Binding
window.onload = fetchFoodList;
