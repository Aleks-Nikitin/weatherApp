import "./reset.css";
import "./styles.css";
function createReferences(){
    return {
        input:document.querySelector("input"),
        sumbitBtn: document.querySelector("#submit"),
        content:document.querySelector(".content")
    }
}
let accessDOM =createReferences();
class WheatherData{
    constructor(info){
        this.info =info;
    }
    showUI(){
        let block = document.createElement("div");
        let information = document.createElement("p");
        accessDOM.content.appendChild(block);
        block.appendChild(information);
        information.textContent = this.info;
    }
}
/*
function showWheatherData(){
    for (let i = 0; i < array.length; i++) {
        const element = array[i];
        
    }
} */
accessDOM.sumbitBtn.addEventListener("click",()=>{
    getData().then((result) => {
    new WheatherData(`Current Time: ${result.currentConditions.datetime}`).showUI();
    new WheatherData(`Current conditions:${result.currentConditions.conditions}`).showUI();
    new WheatherData(`Current temperature: ${result.currentConditions.temp}`).showUI();
    new WheatherData(`Current wind speed : ${result.currentConditions.windspeed}`).showUI();
    new WheatherData(result.description).showUI();
}
)

})
async function getData(){
    const result = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${accessDOM.input.value}?unitGroup=metric&key=DRT4FPTHB3J4QG5EQACVB7T4Z&contentType=json`,{mode:'cors'});
    const data = await result.json();
    return data
}
