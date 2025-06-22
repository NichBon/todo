# Todos API

## Overview

Create an API to be integrated with your [todos-ui](../todos-ui/) project, that allows you to store and retrieve tasks from a database.

## MVP

-   Deleting a task should set an `isArchived` flag in the database instead of deleting the task from the database
-   Add a filter to the frontend application that allows you to filter tasks by category
-   Categories and Todos should be stored in separate tables

## Endpoints

-   `GET /categories`
-   `POST /categories`
-   `PUT /categories/:id`
-   `DELETE /categories/:id`

-   `GET /todos`
-   `GET /todos?category={}` query parameters
-   `POST /todos`
-   `PUT /todos/:id`
-   `DELETE /todos/:id`

```json
todo
{
    "name": "Create a Spring project",
    "dueDate": "2025-06-01",
    "isCompleted": true,
    "categories": ["coding", "backend"]
}
```

```json
category
{
    "name": "coding",
}
```
