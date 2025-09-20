const chatDiv = document.getElementById("chat");

async function handleSend() {
  const userInput = document.getElementById("userInput").value.trim();
  if (!userInput) return;

  appendMessage("You", userInput, "user");
  document.getElementById("userInput").value = "";

  const apiSelector = document.getElementById("apiSelector").value;
  if (apiSelector === "offline") {
    appendMessage("Syn AI", "⚡ Offline AI not implemented yet.", "bot");
    return;
  }

  // Show typing indicator
  const typingMsg = appendMessage("Syn AI", "⚡ Syn AI is typing...", "bot");

  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: userInput }),
    });

    const data = await response.json();

    // Remove typing indicator
    chatDiv.removeChild(typingMsg);

    appendMessage("Syn AI", data.reply || "⚠️ No response from Syn AI", "bot");
  } catch (err) {
    chatDiv.removeChild(typingMsg);
    appendMessage("Syn AI", `Error: ${err.message}`, "bot");
  }
}

function appendMessage(sender, text, cls) {
  const p = document.createElement("p");
  p.className = cls;
  p.textContent = `${sender}: ${text}`;
  chatDiv.appendChild(p);
  chatDiv.scrollTop = chatDiv.scrollHeight;
  return p; // return the element for removal if needed
}
