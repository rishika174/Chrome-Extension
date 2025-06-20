// function cli() {
//     console.log("Button Clicked!")
// }
// let myLeads = ["www.awesomelead.com", "www.epiclead.com", "www.greatlead.com"]

// myLeads = ["www.google.com"]; //  make sure it's an actual array, not a string
// // 1. Turn the myLeads string into an array
// myLeads=JSON.parse(myLeads);
// // 2. Push a new value to the array
// myLeads.push("www.google.com");
// // 3. Turn the array into a string again
// myLeads=JSON.stringify(myLeads);
// console.log(typeof myLeads); // should print "object" (arrays are objects)


// 4. Console.log the string using typeof to verify that it's a string

// function getval() {
//     // inval=document.getElementById("input-el").value;
//     let inval=inputEl.value;
//     myLeads.push(inval);
// }

// 1. Save a key-value pair in localStorage
// 2. Refresh the page. Get the value and log it to the console
// 3. Clear localStorage
// HINTS:
// localStorage.setItem(key, value)
// localStorage.getItem(key)
// localStorage.clear()
// PS: both key and value need to be strings
// localStorage.setItem("google", "www.google.com");
// let n = localStorage.getItem("google");
// console.log(n);
// localStorage.clear();

let myLeads = []; // ✅ initialize as an array
const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const tabBtn = document.getElementById("tab-btn");
const dltBtn = document.getElementById("dlt-btn");
const ulEl = document.getElementById("ul-el");

let leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads")); // ✅ fixed: key should be string
if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage;
    renderlead(myLeads);
}

// const tabs=[
//     {url:"https://www.linkedin.com/in/rishika174/"}
// ]
tabBtn.addEventListener("click", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        myLeads.push(tabs[0].url);
        localStorage.setItem("myLeads", JSON.stringify(myLeads));
        renderlead(myLeads);
    });
});

function renderlead(lead) {
    let listItems = "";
    for (let i = 0; i < lead.length; i++) {
        //Method1 ulEl.textContent+="<li>"+myLeads[i]+" </li>";
        //Method2 const li=document.createElement("li");
        // li.textContent=(myLeads[i]);
        // ulEl.append(li);
        //Method 3 ulEl.innerHTML+="<li>"+myLeads[i]+" </li>";//ignores tags ie li but 
        //but DOM Manupulation has a cost so cant change it 3 times thats why we are using list
        // listItems += "<li><a target='_blank' href='" + myLeads[i] + "'>" + myLeads[i] + "</a></li>" //change "+hey+" to ${hey}
        listItems += `<li>
            <a target='_blank' href='${lead[i]}'>
                ${lead[i]}
            </a>
        </li>`;
    }
    ulEl.innerHTML = listItems; //Render the listItems inside the unordered list using ulEl.innerHTML
}

dltBtn.addEventListener("dblclick", function () {
    localStorage.clear();
    myLeads = [];
    renderlead(myLeads); //clears DOM
});

console.log(leadsFromLocalStorage);
inputBtn.addEventListener("click", function () {
    // console.log("Button clicked from addEventListener");
    myLeads.push(inputEl.value);
    inputEl.value = "";
    localStorage.setItem("myLeads", JSON.stringify(myLeads)); //saving leads to local storage
    renderlead(myLeads);
    console.log(localStorage.getItem("myLeads"));
});
