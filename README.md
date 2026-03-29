Project: Phone Hunter Pro

How I accomplished the task:
I built a responsive, mobile-first web application that interfaces with a RESTful API to retrieve real-time mobile device specifications. I focused on a "Mobile-First" design philosophy using Tailwind CSS to ensure the UI is accessible across all devices.

JavaScript Functionality Used:

    ES6+ Async/Await: Used for handling asynchronous API calls to ensure a smooth user experience without page reloads.

    Fetch API: To retrieve JSON data from the Programming Hero Phone API.

    DOM Manipulation: Dynamically creating and injecting HTML elements into the grid using document.createElement and innerHTML.

    Array Methods: Used .forEach() for rendering lists and .filter()/.includes() for managing the phone comparison logic.

    State Management: Maintained a global state for selectedPhones to allow users to compare devices across different search queries.

    Event Handling: Integrated onclick listeners to trigger search, detail views, and comparison modals.