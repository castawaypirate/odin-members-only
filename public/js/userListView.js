const removeUserBtns = document.querySelectorAll(".remove-user-btn");

for (let btn of removeUserBtns) {
  btn.addEventListener("click", (event) => {
    console.log(event.target.dataset.username);
  });
}
