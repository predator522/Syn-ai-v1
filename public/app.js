const chatDiv = document.getElementById("chat");
const userInput = document.getElementById("userInput");

async function handleSend() {
  const message = userInput.value.trim();
  if (!message) return;

  appendMessage("You", message, "user");
  userInput.value = "";

  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });

    const data = await res.json();
    if (data.reply) {
      appendMessage("Syn AI", data.reply, "bot");
    } else if (data.error) {
      appendMessage("Syn AI Error", data.error, "bot");
    }
  } catch (err) {
    appendMessage("Syn AI Error", err.message, "bot");
  }
}

function appendMessage(sender, text, className) {
  const p = document.createElement("p");
  p.className = className;
  p.textContent = `${sender}: ${text}`;
  chatDiv.appendChild(p);
  chatDiv.scrollTop = chatDiv.scrollHeight;
}
