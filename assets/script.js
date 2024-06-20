const cyclist = document.getElementById("cyclist");

document.querySelector(".road").addEventListener("click", (e) => {
  const roadRect = e.currentTarget.getBoundingClientRect();
  const clickX = e.clientX - roadRect.left;
  const clickY = e.clientY - roadRect.top;

  const cyclistRect = cyclist.getBoundingClientRect();
  const cyclistX = cyclistRect.left + cyclistRect.width / 2 - roadRect.left;
  const cyclistY = cyclistRect.top + cyclistRect.height / 2 - roadRect.top;

  const deltaX = cyclistX - clickX;
  const deltaY = cyclistY - clickY;
  const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

  const moveX = (deltaX / distance) * 50;
  const moveY = (deltaY / distance) * 50;

  const newLeft = cyclist.offsetLeft + moveX;
  const newTop = cyclist.offsetTop + moveY;

  if (newLeft >= 0 && newLeft <= roadRect.width - cyclistRect.width) {
    cyclist.style.left = `${newLeft}px`;
  }
  if (newTop >= 0 && newTop <= roadRect.height - cyclistRect.height) {
    cyclist.style.top = `${newTop}px`;
  }
});
