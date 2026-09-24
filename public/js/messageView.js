const removeButton = document.querySelector(".remove-button");

if (removeButton) {
  removeButton.addEventListener("click", async () => {
    try {
      const response = await fetch(window.location.href, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
        },
      });

      if (response.status === 200) {
        const result = await response.json();
        console.log(result);
        window.location.href = "/";
      } else {
        const result = await response.json();
        console.log(result.msg);
        document.querySelector("body").innerHTML =
          `<div>${result.msg}</div><a href="/">Back to message list</a>`;
      }
    } catch (err) {
      throw new Error(err);
    }
  });
}
