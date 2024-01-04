import { Injectable } from '@angular/core';
import { masterkey } from 'src/util/constant';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  private token: string | null = null;

  get isLoggedIn(): boolean {
    return !!this.token;
  }

  getToken(): string | null {
    let data = sessionStorage.getItem(masterkey) || "";
    if (data) {
      let value =  JSON.parse(data);
      if (value)
        return value.Token;
    }
    
    return null;
  }

  setToken(token: string): void {
    this.token = token;
    localStorage.setItem('jwtToken', token);
  }

  removeToken(): void {
    this.token = null;
    localStorage.removeItem('jwtToken');
  }

  isTokenExpired(): boolean {
    const token = this.getToken();
    if (token) {
      const payload = token.split('.')[1];
      const decoded = atob(payload);
      const parsedPayload = JSON.parse(decoded);

      const exp = parsedPayload.exp; // Get expiration time
      const now = Math.floor(Date.now() / 1000); // Current time in seconds

      return exp < now; // True if expired
    }
    return true; // Expired if no token
  }


}
