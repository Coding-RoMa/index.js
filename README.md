# Prompt Library CMS
A simple yet functional Content Management System (CMS) for maintaining a library of prompts. Built using Express for the backend, MongoDB for data persistence, and React for the frontend. The application allows users to add, view, and manage prompts, as well as categorize and tag them for better organization. There's also a Diary feature that lets users keep track of their entries.

# Features:
CRUD Prompts: Ability to add, view, and delete prompts.

Categories & Tags: Assign categories and tags to prompts for better organization.

Diary: Maintain personal entries related to prompts.

# Backend (index.js):
Built using Express.js
Data stored in MongoDB with Mongoose ODM
RESTful API endpoints for managing prompts, categories, and tags
CORS enabled
Frontend (App.js):
Built using React
Uses React Router for navigating between Library, Categories, Tags, and Diary views
Intuitive UI for adding and managing prompts, categories, and tags

# Installation:
Prerequisites:
Ensure you have Node.js and npm installed
MongoDB instance (locally or cloud)

# Steps:
#Clone the repository:
git clone <repository-url>

#Change directory to the project folder:
cd <project-folder-name>

#Install the necessary npm packages:
npm install

#Modify index.js to update the MongoDB connection string to your database.

#Run the backend server:
node index.js

#Navigate to the frontend directory and install the necessary npm packages:
cd frontend
npm install

#Run the React frontend:
npm start

# Usage:
Navigate to the app's frontend and select from the available options:
Library: View, add, or delete prompts.
Categories: View or manage categories.
Tags: View or manage tags.
Diary: View, add, or delete diary entries.

