  
    const USER_HASH_TARGET = "8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918";

   
    const PASS_HASH_TARGET = "c0fa4a86dbf8ca149ee681121d15bf1dd4ef7c06ca4ca7ec31a6135ef00a061d";


    const ENCRYPTED_REDIRECT_URL = "aHR0cHM6Ly9lcmFkaW8uZW52LnBt";

   
    async function sha256(str) {
      const encoder = new TextEncoder();
      const data = encoder.encode(str);
      const hashBuffer = await crypto.subtle.digest('SHA-256', data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    }

    document.getElementById('loginForm').addEventListener('submit', async function(e) {
      e.preventDefault();

      const user = document.getElementById('username').value;
      const pass = document.getElementById('password').value;
      const errorMsg = document.getElementById('errorMsg');

      // Generar hashes de las entradas del usuario
      const userHash = await sha256(user);
      const passHash = await sha256(pass);

      // Validar credenciales comparando hashes
      if (userHash === USER_HASH_TARGET && passHash === PASS_HASH_TARGET) {
        // Decodificar la URL e ingresar
        window.location.href = atob(ENCRYPTED_REDIRECT_URL);
      } else {
        errorMsg.style.display = 'block';
      }
    });
