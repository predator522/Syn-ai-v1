async function handleSend() {
  const userInput = document.getElementById("userInput").value;
  if (!userInput) return;

  appendMessage("You", userInput, "user");
  document.getElementById("userInput").value = "";

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
  const msgDiv = document.createElement("div");
  msgDiv.className = `message ${cls}`;

  // add copy button
  const copyBtn = document.createElement("button");
  copyBtn.textContent = "Copy";
  copyBtn.className = "copy-btn";
  copyBtn.onclick = () => {
    navigator.clipboard.writeText(text);
    copyBtn.textContent = "✔ Copied";
    setTimeout(() => (copyBtn.textContent = "Copy"), 2000);
  };

  // detect code snippet
  if (text.includes("<") || text.includes("{") || text.includes(";")) {
    msgDiv.innerHTML = `<strong>${sender}:</strong>`;
    const pre = document.createElement("pre");
    const code = document.createElement("code");
    code.textContent = text;
    pre.appendChild(code);
    msgDiv.appendChild(copyBtn);
    msgDiv.appendChild(pre);
  } else {
    msgDiv.textContent = `${sender}: ${text}`;
    msgDiv.appendChild(copyBtn);
  }

  chatDiv.appendChild(msgDiv);
  chatDiv.scrollTop = chatDiv.scrollHeight;
}

// send on Enter
document.getElementById("userInput").addEventListener("keypress", (e) => {
  if (e.key === "Enter") handleSend();
});
