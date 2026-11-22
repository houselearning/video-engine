export class FirebaseAuthAdapter {
  constructor(options={}) {
    this.options=options;
    this.user=null;
    this.ready=options.testUser ? Promise.resolve(true) : this.init();
  }
  async init() {
    try {
      const [{initializeApp,getApps,getApp},{getAuth,onAuthStateChanged}] = await Promise.all([
        import('https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js'),
        import('https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js')
      ]);
      const config={apiKey:'AIzaSyDoXSwni65CuY1_32ZE8B1nwfQO_3VNpTw',authDomain:'contract-center-llc-10.firebaseapp.com',projectId:'contract-center-llc-10',storageBucket:'contract-center-llc-10.firebasestorage.app',messagingSenderId:'323221512767',appId:'1:323221512767:web:6421260f875997dbf64e8a'};
      const app=getApps().length?getApp():initializeApp(config,'houselearning-video-engine');
      const auth=getAuth(app);
      await new Promise(resolve=>onAuthStateChanged(auth,user=>{this.user=user;resolve();}));
      return true;
    } catch (_) { return false; }
  }
  async isSignedIn() { await this.ready; return this.options.testUser ? true : !!this.user; }
  async signInPrompt() { window.location.assign(this.options.signInUrl || 'https://www.houselearning.org/auth/'); }
}
