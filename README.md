# Personal Finance Tracker

## Table of Contents
- [Project Overview](#project-overview)
- [Key Features](#key-features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [API Endpoints](#api-endpoints)
- [Contact](#contact)

---

## Project Overview

The **Personal Finance Tracker** is a full-stack web application designed to help users manage their personal finances effectively. 
The backend is built with **Java** and **Spring Boot**, providing a robust RESTful API to handle data. The frontend is a single-page application built using **HTML**, **CSS**,
and **vanilla JavaScript** to provide a clean and interactive user interface for tracking income and expenses.

---

## Key Features

- **User Interface:** A simple and intuitive web interface for managing financial transactions.
- **Add Expense:** Easily create and save new expense entries.
- **View Transactions:** See a complete list of all recorded expenses.
- **Filter by Date:** Filter transactions by a specific date range.
- **Update and Delete:** Modify or remove existing expense entries.
- **Responsive Design:** The frontend is designed to be accessible on different screen sizes.

---

## Technologies Used

### Backend
- **Language:** Java 17+
- **Framework:** Spring Boot 3.x
- **Database:** pgAdmin (in-memory, for development)
- **Build Tool:** Maven

### Frontend
- **Structure:** HTML5
- **Styling:** CSS3
- **Functionality:** Vanilla JavaScript (ES6) for fetching data from the backend API.

---

## Getting Started

### Prerequisites
- Java Development Kit (JDK) 17 or later.
- Maven.
- A modern web browser.

### Running the Application

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/SadamHarshitha/Personal-Finance-Tracker.git](https://github.com/SadamHarshitha/Personal-Finance-Tracker.git)
    cd Personal-Finance-Tracker
    ```

2.  **Start the Backend:**
    - Navigate to the project root.
    - Run the Spring Boot application using Maven:
    ```bash
    mvn spring-boot:run
    ```
    The backend will be available at `http://localhost:8081`.

3.  **Open the Frontend:**
    - The frontend files (HTML, CSS, JS) are located in the `src/main/resources/static` directory.
    - Simply open `index.html` in your web browser. You do not need a separate server for the frontend as it directly communicates with the backend API.

---

## API Endpoints

The backend exposes a RESTful API at the base URL `http://localhost:8080/api/expenses`. The frontend application uses these endpoints to manage data.

- `POST /api/expenses`
- `GET /api/expenses`
- `GET /api/expenses/filter?startDate=...&endDate=...`
- `PUT /api/expenses/{id}`
- `DELETE /api/expenses/{id}`

For more details on the request and response formats, please refer to the source code.

---

## Contact

- **Name:** Sadam Harshitha
- **Email:** sadamharshitha@gmail.com
- **GitHub:** [https://github.com/SadamHarshitha](https://github.com/SadamHarshitha)

---
