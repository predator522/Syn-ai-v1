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
  const messageWrapper = document.createElement("div");
  messageWrapper.className = cls;

  // ✅ Detect if reply looks like code block
  if (text.includes("<") || text.includes("{") || text.includes(";")) {
    const pre = document.createElement("pre");
    const code = document.createElement("code");
    code.textContent = text; // keep it raw so browser doesn’t execute it
    pre.appendChild(code);

    messageWrapper.innerHTML = `<strong>${sender}:</strong>`;
    messageWrapper.appendChild(pre);
  } else {
    // Normal text bubble
    const p = document.createElement("p");
    p.textContent = `${sender}: ${text}`;
    messageWrapper.appendChild(p);
  }

  chatDiv.appendChild(messageWrapper);
  chatDiv.scrollTop = chatDiv.scrollHeight;
}
