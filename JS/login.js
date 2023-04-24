const formLogin = document.getElementById("formLogin");

formLogin.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const Users = JSON.parse(localStorage.getItem("users")) || [];
  const validUser = Users.find(
    (user) => user.email === email && user.password === password
  );
  if (!validUser) {
    return swal("Usuario y/o contraseña incorrectos");
  }
  localStorage.setItem("login_sucess", JSON.stringify(validUser));
  window.location.href = "index.html";
});
