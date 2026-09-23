const messages = document.querySelectorAll(".message");

for (const message of messages) {
  message.addEventListener("click", () => {
    window.location.href = `/messages/${message.dataset.id}`;
  });
}
