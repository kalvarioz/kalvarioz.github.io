
let today = new Date();
console.log(today);
console.dir(today);

let year = today.getFullYear();
console.log(year);
console.log(year);

let x = getMonthName(today.getMonth());


function getMonthName(monthIndex) {
    let month = today.getMonth() + 1;
    if (month === "2") { // or compare month to 1
        // console.log("February");
        return "February";
    } else {
        // console.log("Not February.")
        return "Not February"
    }

}
function displayTime(selector){
    let element = document.querySelector("#currentTime");
    element.textContext.today.toLocaleTimeString();
}
let h1Element = document.querySelector("h1");
h1Element.textContent = today.toDateString();

let element = document.querySelector("#output");
element.textContent = today.toDateString();
displayTime("#currentTime")
function displayDate(){
    let h1Element= document.querySelector("h1");
    
}