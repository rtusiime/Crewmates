
# Web Development Project 7 - *Crewmate Compiler*

Submitted by: **Kevin Tusiime**

This web app allows users to create, view, update, and delete custom crewmates, each with unique attributes and roles. Users can manage a crew by assigning roles and attributes, view details of each crewmate through unique links, and analyze their crew's characteristics and statistics.

Time spent: **36** hours spent in total

## Required Features

The following **required** functionality is completed:

- [x] **A create form allows users to add new crewmates**
- [x] **Users can name the crewmate and set the crewmate's attributes by clicking on one of several values**
- [x] **The site displays a summary page of all the user's added crewmates**
- [x] **A previously created crewmate can be updated from the crewmate list**
- [x] **A previously created crewmate can be deleted from the crewmate list**
- [x] **Each crewmate has a direct, unique link to an info page about them**

The following **optional** features are implemented:

- [ ] A crewmate can be given a category upon creation which restricts their attributes
- [x] The site displays summary statistics about a user's crew on their crew page 
- [ ] The site displays a custom "success" metric about a user's crew which changes the look of the crewmate list

The following **additional** features are implemented:

* [x] used Chart.js for data visualization

## Video Walkthrough

Here's a walkthrough of implemented user stories:

<img src='crewmates-walkthrough.gif' title='Video Walkthrough' width='' alt='Video Walkthrough' />

GIF created with [Kap](https://getkap.co/).

## Notes

Challenges encountered during the project included managing state between components, especially around the asynchronous fetching and updating of data using React hooks and Axios for API requests. Implementing the toggle state and delete functionality required careful state management and prop passing.

## Libraries Used

- **React**: A JavaScript library for building user interfaces.
- **Axios**: Promise based HTTP client for the browser and node.js.
- **React Router**: Declarative routing for React applications, used for managing navigation and rendering of components based on URL.

## License

    Copyright 2023 Kevin Tusiime

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.

---
