

const login = document.getElementById("login-form");

login.addEventListener("submit", async (e) => {
    e.preventDefault();
    const username = document.getElementById("login-username");
    const password = document.getElementById("login-password");
    fetch("http://localhost:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username.value,
        password: password.value,
      }),
    }).then( (res) => {
      if (res.status === 200) {
        // Successful login, fetch additional data or perform actions
        console.log('okay !')
        localStorage.setItem("username", username.value);
        window.location.href = "http://localhost:5000/task.html";
      } else if (res.status === 500) {
        console.log("User not ! found.");
      } else {
        console.log("Login failed. !");
      }
    });
  });
  