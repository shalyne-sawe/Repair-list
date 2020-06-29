//individualrepair
class Repair {
	constructor(description) {
		this.description = description;
		this.completed = false;
	}

	markAsComplete() {
		this.completed = true;
	}

	unmarkAsComplete() {
		this.completed = false;
	}

	checkNotComplete() {
		return this.completed == false;
	}

	generateHtml(id) {
	
		const li = document.createElement("li");
		
		li.dataset.id = id;
		
		li.className = this.completed ? "completed" : null;
		
		const div = document.createElement("div");
		div.className = "view";
		
		const checkbox = document.createElement("input");
		checkbox.className = "toggle";
		checkbox.type = "checkbox";
		checkbox.checked = this.completed ? true : false;

		const label = document.createElement("label");
		label.textContent = this.description;
		
		const button = document.createElement("button");
		button.className = "destroy";

		div.append(checkbox);
		div.append(label);
		div.append(button);
		li.append(div);

		return li;
	}
}


class RepairList {
	constructor() {
	  this.repairs = [];
	}
	addRepair(description) {
		this.repairs.unshift(new Repair(description));
	}
	deleteRepair(id) {
		this.repairs.splice(id, 1);
	}
	markAsComplete(id) {
		this.repairs[id].markAsComplete();
	}
	unmarkAsComplete(id) {
		this.repairs[id].unmarkAsComplete();
	}
	clearCompleted() {
		this.repairs = this.repairs.filter((repair) => repair.checkNotComplete());
	}
	generateRepairsHtml() {
		const htmlList = [];
			
		for (let i = 0; i < this.repairs.length; i++) {
			const li = globalRepairList.repairs[i].generateHtml(i);
			htmlList.push(li);
		}
		return htmlList;
	}
}

let globalRepairList;

function formSubmit(event) {
	const input = document.querySelector(".new-repair");
	globalRepairList.addRepair(input.value);
	input.value = "";
	renderHtml();
	event.preventDefault();
}

function toggleCompleted(event) {
	const id = event.target.parentElement.parentElement.dataset.id;
	if (this.checked) {
			globalRepairList.markAsComplete(id);
	} else {
			globalRepairList.unmarkAsComplete(id);
	}
	renderHtml();
}

function deleteRepair(event) {
	const id = event.target.parentElement.parentElement.dataset.id;
	globalRepairList.deleteRepair(id);
	renderHtml();
}

function clearCompleted() {
	globalRepairList.clearCompleted();
	renderHtml();
}

function setEventListeners() {
	const form = document.querySelector("form");
	form.addEventListener("submit", formSubmit);

	const checkboxes = document.querySelectorAll(".toggle");
	checkboxes.forEach((checkbox) =>
		checkbox.addEventListener("change", toggleCompleted)
	);

	const buttons = document.querySelectorAll(".destroy");
	buttons.forEach((button) => button.addEventListener("click", deleteRepair));

	document
		.querySelector(".clear-completed")
		.addEventListener("click", clearCompleted);
}

function renderHtml() {
    
	const container = document.querySelector(".repair-list");
	
	container.innerHTML = "";
	
	const htmlList = globalRepairList.generateRepairsHtml();
    
  for (let i = 0; i < htmlList.length; i++) {
    container.append(htmlList[i]);
  }

    
	setEventListeners();
}

function reset() {
  globalRepairList = new RepairList();
  renderHtml();
}

window.addEventListener("DOMContentLoaded", (event) => {
	reset();
});














