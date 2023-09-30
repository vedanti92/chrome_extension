let myLeads = []

const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))

if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    render(myLeads)
}

document.getElementById("tab-btn").addEventListener("click", function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        render(myLeads)
    })
})

function render(leads) {
    let listItems = ""
    for (let i=0; i<myLeads.length; i++) {
        listItems += `
        <li>
            <a target='_blank' href='${myLeads[i]}'>
                ${myLeads[i]}
            </a>
        </li>
    `
    }
    document.getElementById("ul-el").innerHTML = listItems
}


document.getElementById("delete-btn").addEventListener("click", function() {
    localStorage.clear()
    myLeads = []
    render()
})

document.getElementById("input-btn").addEventListener("click", function() {
    myLeads.push(document.getElementById("input-el").value)
    document.getElementById("input-el").value = ""
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    render()
})
