async function handleSend() {
  const userInput = document.getElementById("userInput").value;
  if (!userInput) return;

  appendMessage("You", userInput, "user");
  document.getElementById("userInput").value = "";

  const apiSelector = document.getElementById("apiSelector").value;
  if (apiSelector === "offline") {
    appendMessage("Syn AI", "⚡ Offline AI not implemented yet.", "bot");
    return;
  }

  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: userInput }),
    });

    const data = await response.json();
    appendMessage("Syn AI", data.reply || "⚠️ No response from Syn AI", "bot");
  } catch (err) {
    appendMessage("Syn AI", `Error: ${err.message}`, "bot");
  }
}

function appendMessage(sender, text, cls) {
  const chatDiv = document.getElementById("chat");
  const p = document.createElement("p");
  p.className = cls;
  p.textContent = `${sender}: ${text}`;
  chatDiv.appendChild(p);
  chatDiv.scrollTop = chatDiv.scrollHeight;
}
