    const BASE_URL = "https://api.github.com/users/";

    // SEARCH MODE ELEMENTS
    const searchInput = document.getElementById("searchInput");
    const searchBtn = document.getElementById("searchBtn");
    const profileSingle = document.getElementById("profileSingle");
    const reposSingle = document.getElementById("reposSingle");
    const loadingSingle = document.getElementById("loadingSingle");
    const errorSingle = document.getElementById("errorSingle");

    // BATTLE MODE ELEMENTS
    const battleInput1 = document.getElementById("battleInput1");
    const battleInput2 = document.getElementById("battleInput2");
    const battleBtn = document.getElementById("battleBtn");
    const loadingBattle = document.getElementById("loadingBattle");
    const errorBattle = document.getElementById("errorBattle");
    const card1 = document.getElementById("card1");
    const card2 = document.getElementById("card2");

    // MODE TOGGLE
    const searchModeBtn = document.getElementById("searchModeBtn");
    const battleModeBtn = document.getElementById("battleModeBtn");
    const searchMode = document.getElementById("searchMode");
    const battleMode = document.getElementById("battleMode");

    // THEME
    const themeToggle = document.getElementById("themeToggle");

    // -------------------- UTILITIES --------------------

    function show(el) {
    el.classList.remove("hidden");
    }
    function hide(el) {
    el.classList.add("hidden");
    }

    function formatDate(iso) {
    const d = new Date(iso);
    return d.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
    }

    function safeText(text, fallback = "Not Available") {
    if (!text || text.trim() === "") return fallback;
    return text;
    }

    async function fetchUserData(username) {
    const res = await fetch(BASE_URL + username);
    if (res.status === 404) throw new Error("User Not Found");
    if (!res.ok) throw new Error("Something went wrong");
    return res.json();
    }

    async function fetchRepos(reposUrl) {
    const res = await fetch(reposUrl);
    if (!res.ok) throw new Error("Failed to load repos");
    return res.json();
    }

    function renderUser(userData) {
    const blogLink = safeText(userData.blog, "");
    const blogHTML = blogLink
        ? `<a href="${blogLink.startsWith("http") ? blogLink : "https://" + blogLink}" target="_blank">Portfolio</a>`
        : `<span>Portfolio: Not Available</span>`;

    return `
        <div class="profile-card">
        <img class="avatar" src="${userData.avatar_url}" alt="avatar" />
        <div class="profile-info">
            <h2>${safeText(userData.name, userData.login)}</h2>
            <div class="username">@${userData.login}</div>
            <p class="bio">${safeText(userData.bio, "No bio available.")}</p>

            <div class="meta">
            <span>Joined: ${formatDate(userData.created_at)}</span>
            ${blogHTML}
            <a href="${userData.html_url}" target="_blank">GitHub Profile</a>
            </div>

            <div class="stats">
            <div class="stat">Followers: ${userData.followers}</div>
            <div class="stat">Following: ${userData.following}</div>
            <div class="stat">Repos: ${userData.public_repos}</div>
            </div>
        </div>
        </div>
    `;
    }

    function renderReposList(repos) {
    if (!repos || repos.length === 0) {
        return `<p class="bio">No repositories found.</p>`;
    }

    const latestFive = repos
        .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
        .slice(0, 5);

    return `
        <div class="repos-title">Top 5 Latest Repositories</div>
        <div class="repo-list">
        ${latestFive
            .map(
            (repo) => `
            <div class="repo">
                <div>
                <a href="${repo.html_url}" target="_blank">${repo.name}</a><br/>
                <small>Updated: ${formatDate(repo.updated_at)}</small>
                </div>
                <div>
                ⭐ ${repo.stargazers_count}
                </div>
            </div>
            `
            )
            .join("")}
        </div>
    `;
    }

    // -------------------- SEARCH MODE LOGIC --------------------

    async function handleSearch() {
    const username = searchInput.value.trim();
    if (!username) return;

    // reset UI
    profileSingle.innerHTML = "";
    reposSingle.innerHTML = "";
    hide(errorSingle);
    show(loadingSingle);

    searchBtn.disabled = true;

    try {
        const userData = await fetchUserData(username);
        profileSingle.innerHTML = renderUser(userData);

        // Level 2 repos
        const repos = await fetchRepos(userData.repos_url);
        reposSingle.innerHTML = renderReposList(repos);

    } catch (err) {
        errorSingle.textContent = err.message;
        show(errorSingle);
    } finally {
        hide(loadingSingle);
        searchBtn.disabled = false;
    }
    }

    searchBtn.addEventListener("click", handleSearch);
    searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") handleSearch();
    });

    // -------------------- BATTLE MODE LOGIC --------------------

    async function handleBattle() {
    const u1 = battleInput1.value.trim();
    const u2 = battleInput2.value.trim();

    if (!u1 || !u2) {
        errorBattle.textContent = "Please enter both usernames.";
        show(errorBattle);
        return;
    }

    hide(errorBattle);
    show(loadingBattle);
    battleBtn.disabled = true;

    card1.innerHTML = "";
    card2.innerHTML = "";
    card1.className = "battle-card";
    card2.className = "battle-card";

    try {
        const [user1, user2] = await Promise.all([
        fetchUserData(u1),
        fetchUserData(u2),
        ]);

        // Compare by followers
        const winner = user1.followers >= user2.followers ? "user1" : "user2";

        card1.innerHTML = renderUser(user1);
        card2.innerHTML = renderUser(user2);

        if (winner === "user1") {
        card1.querySelector(".profile-card").classList.add("winner");
        card2.querySelector(".profile-card").classList.add("loser");
        } else {
        card2.querySelector(".profile-card").classList.add("winner");
        card1.querySelector(".profile-card").classList.add("loser");
        }

    } catch (err) {
        errorBattle.textContent = err.message;
        show(errorBattle);
    } finally {
        hide(loadingBattle);
        battleBtn.disabled = false;
    }
    }

    battleBtn.addEventListener("click", handleBattle);

    // -------------------- MODE SWITCH --------------------

    searchModeBtn.addEventListener("click", () => {
    searchModeBtn.classList.add("active");
    battleModeBtn.classList.remove("active");
    searchMode.classList.add("active");
    battleMode.classList.remove("active");
    });

    battleModeBtn.addEventListener("click", () => {
    battleModeBtn.classList.add("active");
    searchModeBtn.classList.remove("active");
    battleMode.classList.add("active");
    searchMode.classList.remove("active");
    });

    // -------------------- THEME TOGGLE --------------------

    function loadTheme() {
    const saved = localStorage.getItem("theme");
    if (saved === "light") document.body.classList.add("light");
    }
    loadTheme();

    themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("light");
    localStorage.setItem("theme", document.body.classList.contains("light") ? "light" : "dark");
    });
