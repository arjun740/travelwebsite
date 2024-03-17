document.addEventListener("DOMContentLoaded", () => {
  const retrieveTasksBtn = document.getElementById("retrieveTasksBtn");
  const taskListContainer = document.getElementById("taskListContainer");
  const createCourseBtn = document.getElementById("createCourseBtn");
  const courseFormContainer = document.getElementById("courseFormContainer");
  const createTaskBtn = document.getElementById("createTaskBtn");
  const taskFormContainer = document.getElementById("taskFormContainer");

  const toggleVisibility = (element, isVisible) => {
    element.style.display = isVisible ? "block" : "none";
  };

  createCourseBtn.addEventListener("click", (event) => {
    event.preventDefault();
    toggleVisibility(courseFormContainer, true);
    toggleVisibility(taskListContainer, false);
    toggleVisibility(taskFormContainer, false);
  });

  createTaskBtn.addEventListener("click", (event) => {
    event.preventDefault();
    toggleVisibility(courseFormContainer, false);
    toggleVisibility(taskFormContainer, true);
    toggleVisibility(taskListContainer, false);
  });

  retrieveTasksBtn.addEventListener("click", async () => {
    try {
      const response = await fetch("http://localhost:3000/course");
      const data = await response.json();
      const courses = data.data.courses;

      taskListContainer.innerHTML = "";

      courses.forEach((course) => {
        course.tasks.forEach((task) => {
          const taskCard = document.createElement("div");
          taskCard.classList.add("task-card");

          const courseId = document.createElement("h3");
          courseId.textContent = `Course ID: ${course.courseId}`;
          taskCard.appendChild(courseId);

          const courseName = document.createElement("p");
          courseName.textContent = `Course Name: ${course.courseName}`;
          taskCard.appendChild(courseName);

          const taskName = document.createElement("p");
          taskName.textContent = `Task Name: ${task.taskName}`;
          taskCard.appendChild(taskName);

          const dueDate = document.createElement("p");
          const formattedDueDate = new Date(task.dueDate).toLocaleDateString(
            "en-US",
            {
              year: "numeric",
              month: "short",
              day: "numeric",
            }
          );
          dueDate.textContent = `Due Date: ${formattedDueDate}`;
          taskCard.appendChild(dueDate);

          taskListContainer.appendChild(taskCard);
        });
      });

      toggleVisibility(courseFormContainer, false);
      toggleVisibility(taskFormContainer, false);
      toggleVisibility(taskListContainer, true);
    } catch (error) {
      console.error("Error retrieving tasks:", error);
    }
  });
  const showSuccessMessage = (text) => {
    const successMessage = document.createElement("div");
    successMessage.classList.add("success-message");
    successMessage.textContent = `${text}`;
    document.body.appendChild(successMessage);
    setTimeout(() => {
      document.body.removeChild(successMessage);
    }, 5000);
  };

  document
    .getElementById("courseForm")
    .addEventListener("submit", async (event) => {
      event.preventDefault();

      const formData = {
        courseId: document.getElementById("courseId").value,
        courseName: document.getElementById("courseName").value,
        instructor: document.getElementById("instructor").value,
        schedule: document.getElementById("schedule").value,
        credits: document.getElementById("credits").value,
        tasks: [],
      };

      try {
        const response = await fetch("http://localhost:3000/course", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          throw new Error("Failed to create course.");
        }

        showSuccessMessage("Course created successfully!");
      } catch (error) {
        console.error("Error creating course:", error);
      }

      courseFormContainer.style.display = "none";
      document.getElementById("courseForm").reset();
    });

  document
    .getElementById("taskForm")
    .addEventListener("submit", async function (event) {
      event.preventDefault();

      const formData = {
        courseId: document.getElementById("courseID").value,
        taskName: document.getElementById("taskName").value,
        dueDate: document.getElementById("dueDate").value,
        additionalDetails: document.getElementById("additionalDetails").value,
      };

      try {
        const response = await fetch("http://localhost:3000/task", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          throw new Error("Failed to create task.");
        }

        showSuccessMessage("Task created successfully!");
        // Reset the form after successful submission
        document.getElementById("taskForm").reset();
      } catch (error) {
        console.error("Error creating task:", error);
      }
      document.getElementById("taskFormContainer").style.display = "none";
    });
});
document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch("http://localhost:3000/course");
    const data = await response.json();
    const courses = data.data.courses;
    console.log(courses);
    const selectElement = document.getElementById("courseID");

    courses.forEach((course) => {
      const option = document.createElement("option");
      option.value = course.courseId;
      option.textContent = course.courseId;
      selectElement.appendChild(option);
    });
  } catch (error) {
    console.error("Error fetching course IDs:", error);
  }
});
