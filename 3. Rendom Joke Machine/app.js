const jokeEl = document.getElementById("joke");
const getJoke = document.getElementById("get_joke");

const url = "https://icanhazdadjoke.com/";

async function generateJoke() {
  try {
    const response = await fetch(url, {
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch joke");
    }

    const data = await response.json();
    jokeEl.innerHTML = data.joke;
  } catch (error) {
    console.error(error);
    jokeEl.innerHTML = "Failed to fetch joke. Please try again.";
  }
}

window.addEventListener("DOMContentLoaded", generateJoke);
getJoke.addEventListener("click", generateJoke);
