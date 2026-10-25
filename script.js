function updateTimeDate() {
	var currentDate = new Date().toLocaleString();
	var timeDateElement = document.querySelector("#time-date");
	timeDateElement.innerHTML = currentDate;
}
setInterval(updateTimeDate, 1000);


function dragElement(element) {

	var initialX = 0;
	var initialY = 0;
	var currentX = 0;
	var currentY = 0;

	if (document.getElementById(element.id + "-header")) {

		document.getElementById(element.id + "-header").onmousedown = startDragging;
	} else {

		element.onmousedown = startDragging;
	}

	function startDragging(e) {
		e = e || window.event;
		e.preventDefault();

		initialX = e.clientX;
		initialY = e.clientY;

		document.onmouseup = stopDragging;
		document.onmousemove = dragElement;
	}

	function dragElement(e) {
		e = e || window.event;
		e.preventDefault();

		currentX = initialX - e.clientX;
		currentY = initialY - e.clientY;
		initialX = e.clientX;
		initialY = e.clientY;

		element.style.top = (element.offsetTop - currentY) + "px";
		element.style.left = (element.offsetLeft - currentX) + "px";
	}

	function stopDragging() {
		document.onmouseup = null;
		document.onmousemove = null;
	}
}

var welcomeScreen = document.querySelector("#welcome");

function closeWindow(element) {
	element.style.display = "none";
}

var welcomeScreenOpen = document.querySelector("#welcomeopen");

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

var biggestIndex = 1;

function addWindowTapHandling(element) {
	element.addEventListener("mousedown", () =>
		handleWindowTap(element)
	)
}

var topBar = document.querySelector("#top-bar")

function openWindow(element) {
	element.style.display = "block";
	biggestIndex++;
	element.style.zIndex = biggestIndex;
	topBar.style.zIndex = biggestIndex + 1;
}

function handleWindowTap(element) {
	biggestIndex++;
	element.style.zIndex = biggestIndex;
	topBar.style.zIndex = biggestIndex + 1;
	if (selectedIcon) {
		deselectIcon(selectedIcon);
	}
}

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

function makeClosable(name) {
	var screen = document.querySelector("#" + name)
	var btn = screen.querySelector("#" + name + "close")
	btn.addEventListener("click", () => closeWindow(screen))
}

function initializeIcon(name) {
	var icon = document.querySelector("#" + name + "-icon")
	var screen = document.querySelector("#" + name)
	icon.addEventListener("click", () => {
		if (icon.classList.contains("selected")) {
			deselectIcon(icon)
			openWindow(screen)
		} else {
			selectIcon(icon)
		}
	});
}

function initializeWindow(elementName) {
	var screen = document.querySelector("#" + elementName)
	addWindowTapHandling(screen)
	makeClosable(elementName)
	dragElement(screen)
	if (elementName != "welcome") {
		initializeIcon(elementName)
	}
}
initializeWindow("welcome")
initializeWindow("notes")
initializeWindow("contacts")
initializeWindow("aboutme")
initializeWindow("weather")

var contactForm = document.querySelector("#my-form");
var formStatus = document.querySelector("#form-status");

contactForm.addEventListener("submit", async function (event) {
	event.preventDefault();
	try {
		var response = await fetch(contactForm.action, {
			method: "POST",
			body: new FormData(contactForm),
			headers: { Accept: "application/json" }
		});
		if (response.ok) {
			formStatus.textContent = "Thanks! Message sent.";
			contactForm.reset();
		} else {
			formStatus.textContent = "Oops! Something went wrong.";
		}
	} catch (error) {
		formStatus.textContent = "No connection.";
	}
	setTimeout(function () {
		formStatus.textContent = "";
	}, 3000);
});