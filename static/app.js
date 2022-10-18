async function fetchTodo(search) {
  if(!search) {
    try {
      const res = await fetch("/feed");
      const data = await res.json();
      console.log(data);
      syncDOM(data);
    } catch (err) {
      console.error("Couldn't get feed");
    }
  } else {
    try {
      const res = await fetch("/search?q=" + search.trim());
      const data = await res.json();
      console.log(data);
      syncDOM(data);
    } catch (err) {
      console.error("Couldn't get search");
    }
  }
}

function syncDOM(data = []) {
  const elemContainer = document.querySelector(".todos");
  elemContainer.replaceChildren(...data.map(({body}) => Object.assign(document.createElement("li"), { textContent: body })))
}

const form = document.querySelector("form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  // fetch data
  const searchQuery = form.querySelector("[name=search]");
  fetchTodo(searchQuery?.value);
});

// initialize app
fetchTodo();