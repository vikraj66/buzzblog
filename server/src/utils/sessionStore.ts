// src/sessionStore.ts
export class SessionStore {
    private sessions: { [key: string]: any } = {};
  
    createSession(data: any) {
      const sessionId = this.generateSessionId();
      this.sessions[sessionId] = data;
      return sessionId;
    }
  
    getSession(sessionId: string) {
      return this.sessions[sessionId];
    }
  
    setSession(sessionId: string, data: any) {
      this.sessions[sessionId] = data;
    }
  
    deleteSession(sessionId: string) {
      delete this.sessions[sessionId];
    }
  
    private generateSessionId() {
      return Math.random().toString(36).substr(2, 9);
    }
  }
  