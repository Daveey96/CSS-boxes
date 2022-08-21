let move = false;
let x = 0;
let y = 0;
let i = 0;
let pos = lastPosition();

while (i < 48) {
  let fig = document.createElement("figure");
  document.querySelector("#cube").appendChild(fig);

  i++;
}

function rotate(x, y, ex, ey) {
  if (!move) return;
  let axisX = x - ex;
  let axisY = y - ey;
  let xSign = Math.sign(axisX);
  let ySign = Math.sign(axisY);

  let degX = (Math.abs(axisX) / window.innerWidth) * 720;
  let degY = (Math.abs(axisY) / window.innerHeight) * 720;

  if (xSign == 1) degX = 0 - degX;
  degY = degY * ySign;

  document.querySelector("#cube").style.transform = `rotateX(${
    degY + pos[0]
  }deg) rotateY(${degX + pos[1]}deg)`;
}

function lastPosition() {
  let cube = document.querySelector("#cube").style.transform;
  if (cube != "") {
    let pos = cube.replace(/(rotate|X|Y|deg)/g, "").split(" ");

    return [parseFloat(pos[0].slice(1, -1)), parseFloat(pos[1].slice(1, -1))];
  }
  return [0, 0];
}

window.addEventListener("mousedown", (e) => {
  if (move) move = false;
  else move = true;
  x = e.x;
  y = e.y;
  pos = lastPosition();
});
window.addEventListener("mousemove", (e) => rotate(x, y, e.x, e.y));

let controls = document.querySelector("#controls");

controls.addEventListener("click", (e) => {
  if (e.target.classList.contains("control")) {
    document.querySelector("#cube").style.animationPlayState = "paused";

    document.querySelector("#cube").style.animation = "none";
  } else {
    document.querySelector("#cube").style.animation =
      "rotate 15s ease infinite";
  }

  for (let i = 0; i < controls.children.length; i++) {
    controls.children[i].classList.remove("active");
  }
  e.target.classList.add("active");
});
