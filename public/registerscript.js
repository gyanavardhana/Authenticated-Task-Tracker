const register = document.getElementById("register-form");

register.addEventListener("submit", async (e) => {
  e.preventDefault();
  const username = document.getElementById("register-username");
  const password = document.getElementById("register-password");
  const result = await fetch("http://localhost:5000/register", {
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
      window.location.href = "http://localhost:5000/login";
    } else if (res.status === 500) {
      console.log("User not ! found.");
    } else {
      console.log("registration failed");
    }
  });
});