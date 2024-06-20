const cyclist = document.getElementById("cyclist");
let directionX = 1;
let directionY = 1;
let mouseX = 0;
let mouseY = 0;

function moveCyclist() {
  const roadRect = document.querySelector(".road").getBoundingClientRect();
  const cyclistRect = cyclist.getBoundingClientRect();

  const deltaX = cyclistRect.left + cyclistRect.width / 2 - mouseX;
  const deltaY = cyclistRect.top + cyclistRect.height / 2 - mouseY;
  const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

  if (distance < 300) {
    directionX = (deltaX / distance) * 10;
    directionY = (deltaY / distance) * 10;
  }

  let newLeft = cyclist.offsetLeft + directionX;
  let newTop = cyclist.offsetTop + directionY;

  if (newLeft <= 0 || newLeft >= roadRect.width - cyclistRect.width) {
    directionX *= -1;
  }
  if (newTop <= 0 || newTop >= roadRect.height - cyclistRect.height) {
    directionY *= -1;
  }

  cyclist.style.left = `${newLeft}px`;
  cyclist.style.top = `${newTop}px`;

  requestAnimationFrame(moveCyclist);
}

document.addEventListener("mousemove", (e) => {
  const roadRect = document.querySelector(".road").getBoundingClientRect();
  mouseX = e.clientX - roadRect.left;
  mouseY = e.clientY - roadRect.top;
});

document.querySelector(".road").addEventListener("click", (e) => {
  const roadRect = e.currentTarget.getBoundingClientRect();
  const clickX = e.clientX - roadRect.left;
  const clickY = e.clientY - roadRect.top;

  const cyclistRect = cyclist.getBoundingClientRect();
  const cyclistX = cyclistRect.left + cyclistRect.width / 2 - roadRect.left;
  const cyclistY = cyclistRect.top + cyclistRect.height / 2 - roadRect.top;

  if (Math.abs(cyclistX - clickX) < 50 && Math.abs(cyclistY - clickY) < 50) {
    cyclist.classList.add("explosion");
    setTimeout(() => (cyclist.style.display = "none"), 500);
  }
});

moveCyclist();
