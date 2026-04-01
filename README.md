# Hot Gadgets - Phone Hunting Pro

A sleek, responsive, and high-performance web application that allows users to search, discover, and compare the latest mobile devices using the Programming Hero Phone API.

## 🚀 Live Demo
https://phone-hunting-website.vercel.app/

## 🛠️ How I Accomplished the Task

I approached this project with a focus on **UI/UX and Asynchronous Data Handling**. 

1.  **UI/UX Design:** I used **Tailwind CSS** to replicate the "Hot Gadgets" aesthetic—a clean, Apple-style layout with a prominent Hero section and centered product cards.
2.  **Modular Logic:** I separated the code into logical functions (`loadPhones`, `displayPhones`, `handleSearch`) to ensure the code is maintainable and scalable.
3.  **Vercel Optimization:** I implemented a "Sticky Footer" logic for the Details Modal to ensure the "Close" button remains visible on all screen sizes during deployment.
4.  **Feature Extension:** Beyond the basic requirements, I added a **Side-by-Side Comparison** tool using global state management to allow users to compare technical specs between two devices.

## 💻 JavaScript Functionality Used

To complete the project requirements, I utilized the following JS concepts:

* **Fetch API & Async/Await:** Used for non-blocking communication with the Phone API to retrieve data dynamically.
* **DOM Manipulation:** I used `document.getElementById` and `innerHTML` injection to render phone cards and modal content based on API responses.
* **Template Literals:** Used heavily to create dynamic HTML structures (Cards and Modals) with embedded data variables.
* **State Management:** I maintained a `selectedPhones` array to track items for the comparison feature.
* **Event Listeners:** Integrated `onclick` attributes to handle user interactions like searching, viewing details, and clearing results.
* **Conditional Rendering:** Implemented logic to show/hide the "Show All" button and the "Hero Section" based on the search result count.
* **Array Methods:** Utilized `.forEach()` for list rendering, `.slice()` for pagination logic, and `.filter()` for the comparison management.

## ✨ Key Features

- **Dynamic Search:** Instant results from a live API.
- **Detailed Modals:** In-depth technical specs for every phone.
- **Show All Results:** View more than 12 results with a single click.
- **Head-to-Head Comparison:** Compare two phones side-by-side.
- **Responsive Design:** Optimized for mobile, tablet, and desktop viewing.

---
*Created as part of the Phone Hunting API Project.*