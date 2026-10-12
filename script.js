function updateTimeDate() {
	var currentDate = new Date().toLocaleString();
	var timeDateElement = document.querySelector("#time-date");
	timeDateElement.innerHTML = currentDate;
}
setInterval(updateTimeDate, 1000);


// Make the DIV element draggable:
dragElement(document.getElementById("welcome"));

// Step 1: Define a function called `dragElement` that makes an HTML element draggable.
function dragElement(element) {
	// Step 2: Set up variables to keep track of the element's position.
	var initialX = 0;
	var initialY = 0;
	var currentX = 0;
	var currentY = 0;

	// Step 3: Check if there is a special header element associated with the draggable element.
	if (document.getElementById(element.id + "-header")) {
		// Step 4: If present, assign the `dragMouseDown` function to the header's `onmousedown` event.
		// This allows you to drag the window around by its header.
		document.getElementById(element.id + "-header").onmousedown = startDragging;
	} else {
		// Step 5: If not present, assign the function directly to the draggable element's `onmousedown` event.
		// This allows you to drag the window by holding down anywhere on the window.
		element.onmousedown = startDragging;
	}

	// Step 6: Define the `startDragging` function to capture the initial mouse position and set up event listeners.
	function startDragging(e) {
		e = e || window.event;
		e.preventDefault();
		// Step 7: Get the mouse cursor position at startup.
		initialX = e.clientX;
		initialY = e.clientY;
		// Step 8: Set up event listeners for mouse movement (`elementDrag`) and mouse button release (`closeDragElement`).
		document.onmouseup = stopDragging;
		document.onmousemove = dragElement;
	}

	// Step 9: Define the `elementDrag` function to calculate the new position of the element based on mouse movement.
	function dragElement(e) {
		e = e || window.event;
		e.preventDefault();
		// Step 10: Calculate the new cursor position.
		currentX = initialX - e.clientX;
		currentY = initialY - e.clientY;
		initialX = e.clientX;
		initialY = e.clientY;
		// Step 11: Update the element's new position by modifying its `top` and `left` CSS properties.
		element.style.top = (element.offsetTop - currentY) + "px";
		element.style.left = (element.offsetLeft - currentX) + "px";
	}

	// Step 12: Define the `stopDragging` function to stop tracking mouse movement by removing the event listeners.
	function stopDragging() {
		document.onmouseup = null;
		document.onmousemove = null;
	}
}

var welcomeScreen = document.querySelector("#welcome");

function closeWindow(element) {
	element.style.display = "none";
}

function openWindow(element) {
	element.style.display = "block";
}

var welcomeScreenClose = document.querySelector("#welcomeclose");

var welcomeScreenOpen = document.querySelector("#welcomeopen");

welcomeScreenClose.addEventListener("click", function () {
	closeWindow(welcomeScreen);
});

welcomeScreenOpen.addEventListener("click", function () {
	openWindow(welcomeScreen);
});

var selectedIcon = undefined

function selectIcon(element) {
	element.classList.add("selected");
	selectedIcon = element
}

function deselectIcon(element) {
	element.classList.remove("selected");
	selectedIcon = undefined
}

function handleIconTap(element) {
	if (element.classList.contains("selected")) {
		deselectIcon(element)
		openWindow(notesScreen)
	} else {
		selectIcon(element)
	}
}

var notesScreen = document.querySelector("#notes")

var notesScreenClose = document.querySelector("#notesclose")

dragElement(notesScreen, document.querySelector("#notes-header"));

notesScreenClose.addEventListener("click", () => closeWindow(notesScreen));

var biggestIndex = 1;

function addWindowTapHandling(element) {
	element.addEventListener("mousedown", () =>
		handleWindowTap(element)
	)
}

var topBar = document.querySelector("#top-bar")

function openWindow(element) {
	element.style.display = "block";
	biggestIndex++;  // Increment biggestIndex by 1
	element.style.zIndex = biggestIndex;
	topBar.style.zIndex = biggestIndex + 1;
}

function handleWindowTap(element) {
	biggestIndex++;  // Increment biggestIndex by 1
	element.style.zIndex = biggestIndex;
	topBar.style.zIndex = biggestIndex + 1;
	if (selectedIcon) {
		deselectIcon(selectedIcon);
	}
}

addWindowTapHandling(welcomeScreen)
addWindowTapHandling(notesScreen)

var content = [
	//Quotes
	{
		type: "quote",
		content: "The universe is under no obligation to make sense to you.",
		author: "Neil deGrasse Tyson"
	},
	{
		type: "quote",
		content: "The cosmos is within us. We are made of star-stuff. We are a way for the universe to know itself.",
		author: "Carl Sagan"
	},
	{
		type: "quote",
		content: "The nitrogen in our DNA, the calcium in our teeth, the iron in our blood, the carbon in our apple pies were made in the interiors of collapsing stars. We are not only figuratively, but literally stardust.",
		author: "Carl Sagan"
	},
	{
		type: "quote",
		content: "The universe is not only stranger than we imagine, it is stranger than we can imagine.",
		author: "Arthur Eddington"
	},
	//Mission Logs
	{
		type: "log",
		title: "Log #001: Orbit Insertion",
		date: "Sector 7, Day 4",
		status: "Successfully achieved stable orbit. Primary systems operational."
	},
	{
		type: "log",
		title: "Log #002: Nebula Detection",
		date: "Sector 7, Day 5",
		status: "Scanners picked up a dense gas formation emitting a faint pulse."
	}
];

function addToSidebar(index) {
	var item = content[index];
	var newDiv = document.createElement('div');

	if (item.type === 'quote') {
		newDiv.innerHTML = `
            <p class="quote-text">"${item.content}"</p>
            <span class="quote-author">- ${item.author}</span>
        `;
		document.getElementById('quotes').appendChild(newDiv);
	} else if (item.type === 'log') {
		newDiv.innerHTML = `
            <h3 class="log-title">${item.title}</h3>
            <div class="log-details">
                <p class="log-meta"><strong>Date:</strong> ${item.date}</p>
                <p class="log-meta"><strong>Status:</strong> ${item.status}</p>
            </div>
        `;
		document.getElementById('logs').appendChild(newDiv);
	}
}

for (let i = 0; i < content.length; i++) {
	addToSidebar(i);
}

document.querySelectorAll('.sidebar a').forEach(function (link) {
	link.addEventListener('click', function (event) {
		event.preventDefault();
		document.querySelectorAll('.content-section').forEach(function (section) {
			section.style.display = 'none';
		});
		document.querySelector(link.getAttribute('href')).style.display = 'block';
		document.querySelectorAll('.sidebar a').forEach(function (a) {
			a.classList.remove('nav-link');
		});
		link.className = 'nav-link-active';
	});
});