let myLeads = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEL = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const tabBtn = document.getElementById("tab-btn")


const leadsFromLocalStorage = JSON.parse( localStorage.getItem("lead") )

// to check if the local storage has any data saved in it
// if data exist, the data will be passed to the myLeads array and rendered to the DOM
if (leadsFromLocalStorage) {
	myLeads = leadsFromLocalStorage
	render(myLeads)
}


tabBtn.addEventListener("click", function() {
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		console.log(tabs)
		myLeads.push(tabs[0].url)
		localStorage.setItem("lead", JSON.stringify( myLeads ))
		render(myLeads)	
	})
})

//Note; manipulating the DOM with javascript has its drawbacks
// fucntion to render the saved pages to the DOM
function render (leads) {
	let listItems = ""
	// For loop to list each saved pages 
	for (i=0; i < leads.length; i++) {
//   we are looping through each list item here and and rapping it with the <a> tag so it can be a clickable link
//   Everything here is a string so we 
		// listItems += "<a href = 'https://" + myLeads[i] +"' target='_ blank'> <li>" + myLeads[i] + " </li> </a>"
		listItems += `<a href = 'https://${leads[i]}' target='_ blank'> 
						<li> 
							${leads[i]} 
						</li> 
					</a>`
		//console.log(listItems)
		//console.log(myLeads[i])
	}

	ulEL.innerHTML = listItems
}

//Function of button to delete all data/leads saved in the database(local storage)
//clears the local storage, myleads array and the DOM
deleteBtn.addEventListener("dblclick", function() {
	localStorage.clear()
	myLeads = []
	ulEL.innerHTML = ""
})

// function/button to push value in the input field into the myLeads array
inputBtn.addEventListener("click", function() {
	console.log("Button clicked by addEventListener")
	myLeads.push(inputEl.value)
	inputEl.value = "" // To clear the input space

	localStorage.setItem("lead", JSON.stringify(myLeads)) 
	render(myLeads)
	console.log(localStorage.getItem("lead"))

	//console.log(localStorage.getItem("lead"))
})

