# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
# rummy-point-tracker
# 🃏 Rummy Point Tracker

Welcome to **Rummy Point Tracker** – a modern, mobile-friendly web app built with **React + Bootstrap** to manage and track your group Rummy games like a pro! No more paper scribbles or calculator juggling. 📱📝

[![Deploy](https://img.shields.io/badge/Live-Demo-green?style=for-the-badge&logo=react)](https://ajaydasm.github.io/rummy-point-tracker/)
[![React](https://img.shields.io/badge/React-18+-blue.svg?style=flat-square&logo=react)](https://reactjs.org/)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

---

## 🚀 Features

🔹 **Add Players** — Create your list of players before starting a game.\
🔹 **Start Game** — Lock in the roster and begin score tracking.\
🔹 **Score Updates** — Add points to each player after every round.\
🔹 **Score History** — Track every score added per player.\
🔹 **Elimination** — Players exceeding **320 points** are automatically eliminated.\
🔹 **Winner Announcement** — App declares the winner when only one player remains.\
🔹 **Delete Player** — Remove any player with confirmation before game starts.\
🔹 **Dark / Light Mode Toggle** — Your eyes deserve a break too! 🌙☀️\
🔹 **Mobile-Responsive Design** — Perfectly usable on phones, tablets, and desktops.\
🔹 **Duplicate Check** — Prevents adding same-named players twice.

---

## 📷 Screenshots

> 🧩 _Add Players & Start Game_

![Add Players](https://your-screenshot-url.com/add-players.png)

> 🧮 _Score Entry & Elimination_

![Gameplay](https://your-screenshot-url.com/score-entry.png)

> 🏆 _Winner Announcement_

![Winner](https://your-screenshot-url.com/winner.png)

---

## 🧠 Game Logic

- ✅ Player is **active** as long as total points `<= 320`
- ❌ Player is **eliminated** if total points `> 320`
- ✳️ Scores can be updated per round
- 🕹️ Winner is declared when only **one active player remains**

---

## 🧰 Tech Stack

| Technology | Usage |
|------------|--------|
| ⚛️ React    | UI & component logic |
| 🎨 Bootstrap | Responsive styling |
| 🌗 Lucide Icons | Intuitive UI icons |
| 🎛️ React Hooks | `useState`, `useEffect` for state management |
| 🛠️ Create React App | Boilerplate setup |

---

## 🧭 App Flow

1. **Enter Player Names**  
   ➤ Start by typing player names and clicking `Add Player`  
   ➤ Duplicates (case-insensitive) are prevented

2. **Start Game**  
   ➤ Once you have at least 2 players, click `Start Game`

3. **Score Updates**  
   ➤ Use `+ Score` button to add points after each round  
   ➤ The score is appended to history for tracking

4. **Elimination**  
   ➤ Player is **eliminated** when total points exceed 320

5. **Winning**  
   ➤ The app declares the last remaining **active** player as the **Winner**

---

## 💻 Run Locally

```bash
git clone https://github.com/ajaydasm/rummy-point-tracker.git
cd rummy-point-tracker
npm install
npm start
