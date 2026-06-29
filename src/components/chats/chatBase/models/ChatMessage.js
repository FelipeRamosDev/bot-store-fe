class ChatMessage {
   constructor({ id, role, content, timestamp, status = null, statusLabel = '' }) {
      this.id = id;
      this.role = role;
      this.content = content;
      this.status = status;
      this.statusLabel = statusLabel;
      this.createdAt = timestamp || Date.now();
   }

   appendChunk(chunk) {
      this.content += chunk;
      return this;
   }

   setStatus(status, statusLabel = '') {
      this.status = status;
      this.statusLabel = statusLabel;
      return this;
   }
}

module.exports = ChatMessage;
