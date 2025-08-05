
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
