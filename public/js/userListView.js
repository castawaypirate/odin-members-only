const removeUserBtns = document.querySelectorAll(".remove-user-btn");

for (let btn of removeUserBtns) {
  btn.addEventListener("click", async (event) => {
    try {
      const username = event.target.dataset.username;
      const response = await fetch(
        `${window.location.href}/${encodeURIComponent(username)}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        },
      );

      if (response.status === 200) {
        const result = await response.json();
        console.log(result);
        window.location.href = "/users";
      } else {
        const result = await response.json();
        console.log(result);
        document.querySelector("body").innerHTML =
          `<div>${result.msg}</div><a href="/">Back to message list</a>`;
      }
    } catch (err) {
      throw new Error(err);
    }
  });
}
