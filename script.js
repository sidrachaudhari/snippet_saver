let snippets = JSON.parse(localStorage.getItem("snippets")) || [];

// ADD SNIPPET
function addSnippet() {
  let title = document.getElementById("title").value.trim();
  let code = document.getElementById("code").value.trim();

  // If you added dropdown
  let langElement = document.getElementById("language");
  let language = langElement ? langElement.value : "javascript";

  if (!title || !code) {
    alert("Fill all fields");
    return;
  }

  snippets.push({ title, code, language });

  localStorage.setItem("snippets", JSON.stringify(snippets));

  document.getElementById("title").value = "";
  document.getElementById("code").value = "";

  displaySnippets();
}
// DISPLAY
function displaySnippets(filtered = snippets) {
  let container = document.getElementById("snippets");
  container.innerHTML = "";

  if (filtered.length === 0) {
    container.innerHTML = "<p>No snippets yet 👀</p>";
    return;
  }

  filtered.forEach((s, index) => {
    let lang = s.language || "javascript";

    container.innerHTML += `
      <div class="snippet">
        <h3>📌 ${s.title}</h3>
        <pre><code class="language-${lang}">
${escapeHTML(s.code)}
        </code></pre>

        <button onclick="copyCode(${index})">Copy</button>
        <button onclick="deleteSnippet(${index})">Delete</button>
      </div>
    `;
  });

  if (window.Prism) {
    Prism.highlightAll();
  }
}

function escapeHTML(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
// COPY
function copyCode(index) {
  const code = snippets[index].code;

  navigator.clipboard.writeText(code);

  let toast = document.getElementById("toast");
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 2000);
}

// DELETE
function deleteSnippet(index) {
  snippets.splice(index, 1);
  localStorage.setItem("snippets", JSON.stringify(snippets));
  displaySnippets();
}

// SEARCH
function searchSnippet() {
  let query = document.getElementById("search").value.toLowerCase();

  let filtered = snippets.filter(s =>
    s.title.toLowerCase().includes(query) ||
    s.code.toLowerCase().includes(query)
  );

  displaySnippets(filtered);
}

// INIT
displaySnippets();
