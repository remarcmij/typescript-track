# Technical Specification - To-Do List Application

## Overview

This document outlines the technical specifications for a simple To-Do List application. The application will allow users to create, read, update, and delete (CRUD) tasks. Each task will have a title, description, and a completion status.

The application will be built using TypeScript and will run in a web browser. It will utilize local storage for data persistence, ensuring that users' tasks are saved across sessions without the need for a backend server.

The application is intended as an exercise for trainees learning TypeScript, focusing on core language features such as types, interfaces, and basic DOM manipulation. The design will be kept simple to emphasize TypeScript concepts without introducing unnecessary complexity.

There should be two versions of the TypeScript files:

- One version with fully functional code.
- Another version with stub functions and type annotations, serving as a starting point for trainees to fill in the implementation. This approach allows trainees to practice writing TypeScript code while also providing a reference implementation for guidance.

The application should be placed in the assignment directory, with the TypeScript files organized in a way that clearly distinguishes between the reference implementation and the exercise version. For example, you could have `todo.ts` for the reference implementation and `todo-starter.ts` for the exercise version.

Use vite to set up the project, ensuring that trainees can easily run the application in their browsers. The project should include a simple HTML file that serves as the entry point for the application, with a single div element where the TypeScript code will dynamically create and manage the UI components for the To-Do List.

## Core Features

1. **Task Creation**: Users can create new tasks by providing a title and an optional description.
2. **Task Listing**: Users can view a list of all tasks, with the ability to filter by completion status (e.g., all, completed, pending).
3. **Task Updating**: Users can update the title, description, and completion status of existing tasks.
4. **Task Deletion**: Users can delete tasks they no longer need.
5. **Persistence**: Tasks will be persisted in local storage to ensure data is retained across sessions.

## Implementation Details

### Data Model

Each task will be represented as an object with the following properties:

- `id`: A unique identifier for the task.
- `title`: The title of the task.
- `description`: An optional description of the task.
- `completed`: A boolean indicating whether the task is completed.

### User Interface

The user interface will be built using HTML and CSS, with TypeScript providing the logic for handling user interactions and managing the application state.

All HTML elements will be created and manipulated using TypeScript, without relying on any external libraries or frameworks. This will allow trainees to practice DOM manipulation and event handling in TypeScript.

The HTML file should include a single div only to which the TypeScript code will append the necessary elements for the application. This approach keeps the HTML minimal and focuses on the TypeScript implementation.

The styling of the UI should be simple and functional, using basic CSS to ensure that the application is visually organized and user-friendly. The design should prioritize clarity and ease of use, allowing users to easily navigate and interact with their tasks.

### Local Storage

Tasks will be stored in the browser's local storage, ensuring that data persists across sessions. The application will initialize with any existing tasks from local storage and update the storage whenever a task is created, updated, or deleted.

### Architecture

There should be a clear separation of concerns in the code structure. The application logic (e.g., task management, local storage handling) should be separated from the DOM manipulation and event handling logic. This will help trainees understand how to organize their code effectively.

All HTML creation and manipulation should be handled in "View" file. All business logic related to task management and local storage should be handled in a separate "Page" file. The main application file will coordinate between the Page and View, handling user interactions and updating the UI accordingly. The Page file will pass event handlers to the View, which will call them when the user interacts with the UI. This structure promotes modularity and makes it easier for trainees to understand the flow of data and control in the application.

### References

Please inspect my Notion account for the TypeScript section in the Frontend learning track to see examples of how to structure the code and explanations for each feature. The Notion pages will provide detailed guidance on how to implement each part of the application, along with code snippets and exercises for trainees to practice their TypeScript skills.

Also inspect the HTML and CSS topics in the same learning track for examples of how to create and style the user interface for the To-Do List application. These topics will provide insights into how to structure the HTML and apply CSS styles effectively while keeping the focus on TypeScript implementation.
