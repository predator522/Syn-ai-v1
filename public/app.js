async function handleSend() {
  const input = document.getElementById("userInput");
  const chat = document.getElementById("chat");
  const selector = document.getElementById("apiSelector");

  const userMessage = input.value.trim();
  if (!userMessage) return;

  // Show user message
  const userDiv = document.createElement("div");
  userDiv.className = "user";
  userDiv.textContent = "You: " + userMessage;
  chat.appendChild(userDiv);
  chat.scrollTop = chat.scrollHeight;

  input.value = "";

  // Call selected AI
  let botReply = "⚡ Offline AI not implemented yet.";
  if (selector.value === "synai") {
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      });

      const data = await res.json();
      botReply = data.reply || data.error || "⚠️ No response from Syn AI";
    } catch (err) {
      botReply = "⚠️ Error: " + err.message;
    }
  }

  // Show AI reply
  const botDiv = document.createElement("div");
  botDiv.className = "bot";
  botDiv.textContent = "Syn AI: " + botReply;
  chat.appendChild(botDiv);
  chat.scrollTop = chat.scrollHeight;
}
