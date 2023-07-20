myLeads = [];
const inputEl = document.getElementById("input_el");
const inputBtn = document.getElementById("input_btn");
const ulEl = document.getElementById("ul_el");
const deleteBtn = document.getElementById("delete_btn");
const tabBtn = document.getElementById("tab_btn");

tabBtn.addEventListener("click", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    myLeads.push(tabs[0].url);
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    render(myLeads);
  });
});

deleteBtn.addEventListener("dblclick", function () {
  localStorage.clear();
  myLeads = [];
  render(myLeads);
});

const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));

if (leadsFromLocalStorage) {
  myLeads = leadsFromLocalStorage;
  render(myLeads);
}

function render(leads) {
  let listItems = "";

  for (let i = 0; i < leads.length; i++) {
    listItems += `<li>
                          <a target='_blank' href='${leads[i]}'> ${leads[i]}  
                          <a/>
                    </li>`;
  }
  ulEl.innerHTML = listItems;
}

inputBtn.addEventListener("click", function () {
  myLeads.push(inputEl.value);
  inputEl.value = "";

  localStorage.setItem("myLeads", JSON.stringify(myLeads));

  render(myLeads);
});

function getFirst(arr) {
  return arr[0];
}
