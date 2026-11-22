export class AuthAdapter {
  constructor(options = {}) { this.options = options; this.user = null; }
  async isSignedIn() { if (this.options.testUser) return true; return !!this.user; }
  async signInPrompt() {
    const existing = this.options.signInUrl || 'https://www.houselearning.org/auth/';
    if (this.options.prompt) return this.options.prompt(existing);
    window.location.assign(existing);
  }
}
