document.addEventListener("DOMContentLoaded", function () {
         const heading = document.querySelector(".heading-with-arrow");
         const timetableWrapper = document.querySelector(".relative-wrapper");
         const whiteBox = document.querySelector(".white-box");
         const pinkBackground = document.querySelector(".pink-background-shadow");

         // Add click event to the arrow/heading to toggle collapsed/expanded state
         heading.addEventListener("click", function () {
             // Toggle the classes for collapsing and expanding
             timetableWrapper.classList.toggle("collapsed");
             timetableWrapper.classList.toggle("expanded");
             whiteBox.classList.toggle("collapsed");
             whiteBox.classList.toggle("expanded");

             // Adjust the height of the white box and maintain the pink background
             const pinkBackground = document.querySelector(".pink-background-shadow");
             if (whiteBox.classList.contains("collapsed")) {
                 pinkBackground.style.height = "70px"; // Adjust pink background height when collapsed
             } else {
                 pinkBackground.style.height = "123%"; // Reset to full height when expanded
             }
         });

         // Action for "Book a Room" button
         const bookRoomButton = document.querySelector(".book-room");
         bookRoomButton.addEventListener("click", function () {
             window.location.href = "https://freerooms.devsoc.app/";
         });

         // Action for availability list items
         document.querySelectorAll('.availability-list li').forEach(item => {
             item.addEventListener('click', function () {
                 alert('You selected: ' + item.textContent);
                 
             });
         });
     });
 document.addEventListener("DOMContentLoaded", function () {
     let isMouseDown = false;
     const table = document.querySelector('.timetable');
     const availabilityList = document.querySelector('.availability-list'); // The list that shows availability
     const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']; // Day labels
     const times = ['9 AM', '10 AM', '11 AM', '12 PM', '1 PM', '2 PM', '3 PM', '4 PM', '5 PM']; // Time labels

     // Mouse down event
     table.addEventListener('mousedown', function (event) {
         if (event.target.tagName === 'TD') {
             isMouseDown = true;
             event.target.classList.add('selected'); // Add selected class
             event.preventDefault(); // Prevent text selection
             updateAvailability(); // Update availability when a cell is clicked
         }
     });

     // Mouse move event (for dragging)
     table.addEventListener('mousemove', function (event) {
         if (isMouseDown && event.target.tagName === 'TD') {
             event.target.classList.add('selected'); // Mark cell as selected when dragging over it
             updateAvailability(); // Update availability during dragging
         }
     });

     // Mouse up event
     document.addEventListener('mouseup', function () {
         isMouseDown = false; // Stop dragging
     });

     table.addEventListener('dblclick', function (event) {
     if (event.target.tagName === 'TD') {
         event.target.classList.toggle('selected'); // Toggle selected state on double-click
         removeAvailability(event.target); // Remove time slot from availability
     }
     });

     // Function to update the availability list
     function updateAvailability() {
         const selectedCells = table.querySelectorAll('.selected');
         let selectedTimes = [];

         selectedCells.forEach(cell => {
             // Get row and column index of the selected cell
             const rowIndex = cell.parentElement.rowIndex;
             const colIndex = cell.cellIndex;

             // Map the rowIndex to time and colIndex to day
             const time = times[rowIndex];
             const day = days[colIndex];

             // Push the formatted time slot (e.g., "Monday 9 AM")
             selectedTimes.push(`${day} - ${time}`);
         });

         // Update the availability list with the selected times
         availabilityList.innerHTML = ''; // Clear the current list
         selectedTimes.forEach(timeSlot => {
             const li = document.createElement('li');
             li.textContent = timeSlot;
             availabilityList.appendChild(li);
         });
     }
 });

 const tasks = {
     todo: [],
     doing: [],
     done: []
 };

 function addTask(status) {
     const taskName = prompt("Enter task name:");
     if (taskName) {
         tasks[status].push(taskName);
         renderTasks();
     }
 }

 function renderTasks() {
     document.getElementById('todo-list').innerHTML = tasks.todo.map(task => `<li>${task}</li>`).join('');
     document.getElementById('doing-list').innerHTML = tasks.doing.map(task => `<li>${task}</li>`).join('');
     document.getElementById('done-list').innerHTML = tasks.done.map(task => `<li>${task}</li>`).join('');
     updateProgress();
 }

 function updateProgress() {
     const totalTasks = tasks.todo.length + tasks.doing.length + tasks.done.length;
     const completedTasks = tasks.done.length;
     const progressPercentage = totalTasks ? (completedTasks / totalTasks) * 100 : 0;
     document.getElementById('progress').style.width = progressPercentage + '%';
 }

 document.addEventListener("DOMContentLoaded", function () {
     document.getElementById('add-todo-task').addEventListener('click', function() {
         addTask('todo');
     });

     document.getElementById('add-doing-task').addEventListener('click', function() {
         addTask('doing');
     });

     document.getElementById('add-done-task').addEventListener('click', function() {
         addTask('done');
     });

     const heading = document.querySelector(".heading-with-arrow");
     const timetableWrapper = document.querySelector(".relative-wrapper");
     // Add click event to the arrow/heading to toggle collapsed/expanded state
     heading.addEventListener("click", function () {
         timetableWrapper.classList.toggle("collapsed");
         timetableWrapper.classList.toggle("expanded");
     });
 });

 document.addEventListener("DOMContentLoaded", function () {
    const createProjectForm = document.getElementById("add-prj-form");
    const projectList = document.getElementById("project-list");
    const overlay = document.getElementById("set-project-overlay");
    const closeButton = document.querySelector(".close-button");
    const createProjectButton = document.getElementById("create-project-button");
    const mainContent = document.getElementById("main-content");
    const mainContentTitle = document.getElementById("main-content-title");
    const projectDescriptionContent = document.getElementById("project-description-content");
    const projectDueDateContent = document.getElementById("project-due-date-content");
    const mainContentContainer = document.getElementById("main-content-container"); // Added
    const timetableSection = document.querySelector(".white-box"); // Timetable Section
    const taskSection = document.querySelector(".task-white-box"); // Task Section

    // Open overlay when "Create Project" button is clicked
    createProjectButton.addEventListener("click", function () {
        overlay.classList.remove("hide");
    });

    // Close overlay when the close button is clicked
    closeButton.addEventListener("click", function () {
        overlay.classList.add("hide");
    });

    // Handle project creation
    if (createProjectForm) {
        createProjectForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const projectName = document.getElementById("project-name").value.trim();
            const projectDescription = document.getElementById("project-description").value.trim();
            const projectDueDate = document.getElementById("project-due-date").value;

            if (projectName && projectDescription && projectDueDate) {
                const project = {
                    name: projectName,
                    description: projectDescription,
                    dueDate: projectDueDate,
                };

                // Save project to localStorage
                localStorage.setItem(`project-${projectName}`, JSON.stringify(project));

                // Close the overlay
                overlay.classList.add("hide");

                // Clear the form
                createProjectForm.reset();

                // Add project to the sidebar
                addProjectToSidebar(project);

                // Automatically load the new project
                loadProjectToMainContent(projectName);
            } else {
                alert("Please fill in all fields!");
            }
        });
    }

    // Add project to sidebar
    function addProjectToSidebar(project) {
        const li = document.createElement("li");
        li.textContent = project.name;

        // Add click event to load the project
        li.addEventListener("click", function () {
            loadProjectToMainContent(project.name);
        });

        // Create a delete button
        const deleteBtn = document.createElement("span");
        deleteBtn.textContent = "✕";
        deleteBtn.classList.add("delete-btn");
        deleteBtn.addEventListener("click", function (event) {
            event.stopPropagation(); // Prevent triggering the project click event
            deleteProject(`project-${project.name}`);
        });

        li.appendChild(deleteBtn);
        projectList.appendChild(li);
    }

    // Delete project
    function deleteProject(projectKey) {
        localStorage.removeItem(projectKey);
        loadProjectsFromLocalStorage();

        // Reset main content if the deleted project was loaded
        if (mainContentTitle.textContent === projectKey.replace("project-", "")) {
            resetMainContent();
        }
    }

    // Load projects from localStorage
    function loadProjectsFromLocalStorage() {
        projectList.innerHTML = "";

        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key.startsWith("project-")) {
                const project = JSON.parse(localStorage.getItem(key));
                if (project && project.name) {
                    addProjectToSidebar(project);
                }
            }
        }
    }

    // Load project into main content
    function loadProjectToMainContent(projectName) {
        const projectKey = `project-${projectName}`;
        const project = JSON.parse(localStorage.getItem(projectKey));
    
        if (project) {
            // Show the main content area
            const mainContentContainer = document.getElementById("main-content-container");
            const mainContent = document.getElementById("main-content");
    
            mainContent.classList.remove("hidden");
            mainContentContainer.classList.remove("hidden");
    
            // Update project details
            const mainContentTitle = document.getElementById("main-content-title");
            const projectDescriptionContent = document.getElementById("project-description-content");
            const projectDueDateContent = document.getElementById("project-due-date-content");
    
            mainContentTitle.textContent = project.name;
            projectDescriptionContent.textContent = `Description: ${project.description}`;
            projectDueDateContent.textContent = `Due Date: ${project.dueDate}`;
    
            // Display the timetable and task sections
            const timetableSection = document.querySelector(".relative-wrapper");
            const taskSection = document.querySelector(".task-relative-wrapper");
    
            if (timetableSection) timetableSection.classList.remove("hidden");
            if (taskSection) taskSection.classList.remove("hidden");
        } else {
            console.error("Project not found in localStorage:", projectName);
        }
    }
    
    
    

    // Reset main content
    function resetMainContent() {
        // Hide project-specific sections
        const mainContentContainer = document.getElementById("main-content-container");
        const mainContent = document.getElementById("main-content");
    
        mainContent.classList.remove("hidden");
        mainContentContainer.classList.add("hidden");
    
        // Reset title and description
        const mainContentTitle = document.getElementById("main-content-title");
        const projectDescriptionContent = document.getElementById("project-description-content");
        const projectDueDateContent = document.getElementById("project-due-date-content");
    
        mainContentTitle.textContent = "Welcome to WorkWise";
        projectDescriptionContent.textContent = "";
        projectDueDateContent.textContent = "";
    
        // Hide timetable and task sections
        const timetableSection = document.querySelector(".relative-wrapper");
        const taskSection = document.querySelector(".task-relative-wrapper");
    
        if (timetableSection) timetableSection.classList.add("hidden");
        if (taskSection) taskSection.classList.add("hidden");
    }
    
    

    // Display timetable section
    function displayTimetable() {
        timetableSection.classList.remove("hidden");
        console.log("Timetable displayed.");
    }

    // Display tasks section
    function displayTasks() {
        taskSection.classList.remove("hidden");
        console.log("Tasks displayed.");
    }

    // Clear invalid localStorage keys
    function clearInvalidLocalStorage() {
        const validKeys = ["currentProject"];
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (!key.startsWith("project-") && !validKeys.includes(key)) {
                localStorage.removeItem(key);
            }
        }
    }

    // Initialize the app
    document.addEventListener("DOMContentLoaded", function () {
        // Ensure all sections are hidden initially
        resetMainContent();
    
        // Load projects into the sidebar
        loadProjectsFromLocalStorage();
    });
    
});

