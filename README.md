# Dev-Detective 🔍 (GitHub User Search + Battle Mode)

Live Server Link:  https://devdetectiveproject.vercel.app/

Dev-Detective is a modern GitHub User Search App built using **HTML, CSS, and JavaScript**.  
It uses the **GitHub Public API** to fetch real developer data and display it in a clean UI.

It supports:
- GitHub user search
- Latest repositories display
- Loading + error handling
- Battle Mode (compare 2 users)

---

##  Features

###  Level 1 (Beginner)
- Search GitHub user by username
- Fetch user profile from GitHub API
- Display:
  - Avatar
  - Name
  - Bio
  - Join Date (formatted)
  - Portfolio URL
- Error Handling:
  - Shows **User Not Found (404)** message
- Loading State:
  - Shows a **spinner / loading text** while fetching

---

###  Level 2 (Intermediate)
- Fetch repositories using `repos_url`
- Display **Top 5 Latest Repositories**
- Repo items include:
  - Repo name (clickable)
  - Stars ⭐
  - Updated date (formatted)

---

###  Level 3 (Advanced)
- Battle Mode toggle
- Enter 2 GitHub usernames
- Fetch both users simultaneously using `Promise.all()`
- Compare based on:
  - Followers count
- Winner card highlighted **Green**
- Loser card highlighted **Red**

---

##  Tech Stack
- HTML
- CSS
- JavaScript (Fetch API, Async/Await)
- GitHub Public API

---


---

##  How to Run the Project

1. Download / Clone the project folder
2. Open the folder in VS Code
3. Run `index.html` using:
   - Live Server extension OR
   - Directly open in browser

---


##  Example Usernames to Test

- `an7708`

---

##  Notes
- GitHub API has a rate limit for unauthenticated requests.
- If you refresh too many times quickly, you may get API limit errors.

---

##  Screens / UI States

### Search Mode
- Search bar + profile card
- Repo list (latest 5)

### Battle Mode
- Two profile cards side-by-side
- Winner highlighted green
- Loser highlighted red

---

##  Future Improvements
- Compare by **Total Stars** instead of followers
- Add skeleton loaders
- Add pagination for repositories
- Add search history
- Deploy on Vercel / Netlify

---

##  Author
Built by **Anisha Madhukar** 

