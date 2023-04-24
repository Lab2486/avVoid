//modal--------------------------------
const contenedorModal = document.querySelector(".modal-contenedor");
const botonAbrir = document.getElementById("botonCarrito");
const botonCerrar = document.getElementById("carritoCerrar");
const modalCarrito = document.querySelector(".modal-carrito");
const btnVaciar = document.getElementById("vaciar-carrito");
const contadorCarrito = document.getElementById("cantidadCarrito");
const precioTotal = document.getElementById("precioTotal");
const finalizarCompra = document.getElementById("finalizarCompra");

botonAbrir.addEventListener("click", () => {
  contenedorModal.classList.add("modal-active");
});
botonCerrar.addEventListener("click", () => {
  contenedorModal.classList.remove("modal-active");
});

contenedorModal.addEventListener("click", (event) => {
  if (event.target === contenedorModal) {
    contenedorModal.classList.remove("modal-active");
  }
});

modalCarrito.addEventListener("click", (event) => {
  event.stopPropagation();
});

btnVaciar.addEventListener("click", () => {
  carrito.length = 0;
  actualizarCarrito();
});

finalizarCompra.addEventListener("click", () => {
  if (carrito.length === 0) {
    swal({
      title: "Carrito vacio",
      text: "Tu carrito esta vacio bro",
      icon: "error",
      button: "Uh que bldo tenes razon",
    });
  } else {
    swal({
      title: "Compra Finalizada",
      text: "Gracias por su compra",
      icon: "success",
      button: "De nada, altos tracks me compre",
    });
    carrito.length = 0;
    actualizarCarrito();
  }
});

//main------------------------

const contenedorCarrito = document.getElementById("carritoContenedor");

function filterProduct(value) {
  let buttons = document.querySelectorAll(".button-value");
  buttons.forEach((button) => {
    if (value.toUpperCase() == button.innerText.toUpperCase()) {
      button.classList.add("active");
    } else {
      button.classList.remove("active");
    }
  });

  let elements = document.querySelectorAll(".card");

  elements.forEach((element) => {
    if (value == "all") {
      element.classList.remove("hide");
    } else {
      if (element.classList.contains(value)) {
        element.classList.remove("hide");
      } else {
        element.classList.add("hide");
      }
    }
  });
}

window.onload = () => {
  filterProduct("all");
};

let carrito = [];

document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("carrito")) {
    carrito = JSON.parse(localStorage.getItem("carrito"));
    actualizarCarrito();
  }
});

for (let i of products.data) {
  let card = document.createElement("div");
  card.classList.add("card", i.category, "hide");

  let imgContainer = document.createElement("div");
  imgContainer.classList.add("image-container");

  let image = document.createElement("img");
  image.setAttribute("src", i.image);
  imgContainer.appendChild(image);
  card.appendChild(imgContainer);

  let container = document.createElement("div");
  container.classList.add("container");
  container.innerHTML = `
    <audio src="${i.sound}" class="card-audio" controls></audio>
    <h5 class="product-name">${i.productName.toUpperCase()}</h5>
    <h6>$${i.price}</h6>
    <button class="btn-comprar" id="agregar${i.id}">BUY</button>
  `;

  card.appendChild(container);
  document.getElementById("products").appendChild(card);

  const botonComprar = document.getElementById(`agregar${i.id}`);
  botonComprar.addEventListener("click", () => {
    agregarAlCarrito(i.id);
  });
}

const agregarAlCarrito = (prodId) => {
  const item = products.data.find((prod) => prod.id === prodId);
  const existingItem = carrito.find((prod) => prod.id === prodId);

  if (existingItem) {
    alert("Solo podes comprar una vez cada track");
  } else {
    carrito.push(item);
    actualizarCarrito();
  }
};

const eliminarDelCarrito = (prodId) => {
  const item = carrito.find((prod) => prod.id === prodId);
  const indice = carrito.indexOf(item);
  carrito.splice(indice, 1);
  actualizarCarrito();
};

const actualizarCarrito = () => {
  contenedorCarrito.innerHTML = "";
  carrito.forEach((prod) => {
    const div = document.createElement("div");
    div.className = "productoEnCarrito";
    div.innerHTML = `
    <p>${prod.productName}</p>
    <p>${prod.price}</p>
    <button onclick="eliminarDelCarrito(${prod.id})"><i class="bi bi-trash3"></i></button>
    `;

    contenedorCarrito.appendChild(div);

    localStorage.setItem("carrito", JSON.stringify(carrito));
  });
  contadorCarrito.innerText = carrito.length;
  precioTotal.innerText = carrito.reduce((acc, prod) => acc + prod.price, 0);
};
//login

const user = JSON.parse(localStorage.getItem("login_sucess")) || false;
if (!user) {
  window.location.href = "login.html";
}

const logout = document.getElementById("logout");
logout.addEventListener("click", () => {
  localStorage.removeItem("login-succes");
  window.location.href = "login.html";
});

//WAVESURFER--------
let playBtn = document.getElementById("playBtn");
let pauseBtn = document.getElementById("pauseBtn");
let stopBtn = document.getElementById("stopBtn");
let volumenBtn = document.getElementById("volumenBtn");

var wavesurfer = WaveSurfer.create({
  container: "#waveform",
  waveColor: "white",
  progressColor: "darkred",
  barWidth: 5,
  barHeight: 0.5,
  barRadius: 5,
  responsive: true,
  hideScrollbar: true,
});

wavesurfer.load(
  "./media/JØKR - All Night Long (Original Mix) Bandcamp Exclusive.mp3"
);

playBtn.onclick = function () {
  wavesurfer.playPause();
  if (playBtn.src.includes("/media/play-fill.svg")) {
    playBtn.src = "/media/pause-fill.svg";
  } else {
    playBtn.src = "/media/play-fill.svg";
  }
};

stopBtn.onclick = function () {
  wavesurfer.stop();
};
volumenBtn.onclick = function () {
  wavesurfer.toggleMute();
  if (volumenBtn.src.includes("/media/volume-up-fill.svg")) {
    volumenBtn.src = "/media/volume-mute-fill.svg";
  } else {
    volumenBtn.src = "/media/volume-up-fill.svg";
  }
};
