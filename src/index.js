import "./reset.css";
import "./styles.css";
function createReferences() {
  return {
    input: document.querySelector("input"),
    sumbitBtn: document.querySelector("#submit"),
    content: document.querySelector(".content"),
    nodeDegrees: document.querySelectorAll("#celsius,#farenheit"),
    celcius: document.querySelector("#celcius"),
    farenheit: document.querySelector("#farenheit"),
    container: document.querySelector(".container"),
  };
}
let metrics = true;
let accessDOM = createReferences();
class WheatherData {
  constructor(info) {
    this.info = info;
  }
  showUI() {
    let block = document.createElement("div");
    let information = document.createElement("p");
    accessDOM.content.appendChild(block);
    block.appendChild(information);
    information.textContent = this.info;
  }
}
accessDOM.celcius.addEventListener("click", () => {
  metrics = true;
});
accessDOM.farenheit.addEventListener("click", () => {
  metrics = false;
});
function clear() {
  accessDOM.content.innerHTML = "";
}
accessDOM.sumbitBtn.addEventListener("click", () => {
  clear();
  getData()
    .then((result) => {
      clear();
      return result;
    })
    .then((result) => {
      new WheatherData(
        `Current Time: ${result.currentConditions.datetime}`,
      ).showUI();
      new WheatherData(
        `Current conditions:${result.currentConditions.conditions}`,
      ).showUI();
      new WheatherData(
        `Current temperature: ${result.currentConditions.temp}`,
      ).showUI();
      new WheatherData(
        `Current wind speed : ${result.currentConditions.windspeed}`,
      ).showUI();
      new WheatherData(result.description).showUI();
    })
    .catch(() => {
      throw new Error("No data");
    });
});
async function getData() {
  let url;
  if (metrics) {
    url = "metric";
  } else {
    url = "us";
  }
  try {
    const result = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${accessDOM.input.value}?unitGroup=${url}&key=DRT4FPTHB3J4QG5EQACVB7T4Z&contentType=json`,
      { mode: "cors" },
    );
    const data = await result.json();
    return data;
  } catch {
    throw new Error("couldnt get data");
  }
}
