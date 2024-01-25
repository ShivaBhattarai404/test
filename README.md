# Expenses Tracker

Expenses Tracker is a web application built with React.js, Node.js, and MongoDB. It allows users to efficiently store and manage their expenses by creating labels for months, setting budgets, and adding expense items.

## Features

- **Create Labels:** Users can create labels for different months, setting names and budgets at the start.
- **Edit Labels:** Labels can be edited later to update names and budgets.
- **View Labels:** Upon logging in, users can see a list of their labels.
- **Label Details:** Clicking on a label shows all the expenses items, the amount left, and the total amount of expenses for that label/month.
- **Add Expense:** Users can add expenses to a label using the "Add Expense" button.

## Technologies Used

- **Frontend:** React.js
- **Backend:** Node.js
- **Database:** MongoDB

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js installed
- MongoDB installed and running

### Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/expenses-tracker.git
cd expenses-tracker
```

2. Install frontend dependencies
```bash
cd frontend
npm install
```

3. Install backend dependencies

```bash
cd backend
npm install
```

Make sure to replace `<your-mongodb-uri>` with the actual MongoDB connection URI for your database.


```bash
# Start backend (from the backend directory)
npm start

# Start frontend (from the frontend directory)
npm start
