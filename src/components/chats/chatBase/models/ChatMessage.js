class ChatMessage {
   constructor({ id, role, content, timestamp }) {
      this.id = id;
      this.role = role;
      this.content = content;
      this.createdAt = timestamp || Date.now();
   }

   appendChunk(chunk) {
      this.content += chunk;
      return this;
   }
}

module.exports = ChatMessage;
