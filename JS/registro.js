const formRegistro = document.getElementById("formRegistro");

formRegistro.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const Users = JSON.parse(localStorage.getItem("users")) || [];
  const isUserRegistered = Users.find((user) => user.email === email);
  if (isUserRegistered) {
    return alert("El usuario ya esta registrado");
  }

  Users.push({ name: name, email: email, password: password });
  localStorage.setItem("users", JSON.stringify(Users));
  alert("Registro exitoso");
  window.location.href = "login.html";
});
