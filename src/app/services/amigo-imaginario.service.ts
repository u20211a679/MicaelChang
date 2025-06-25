import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AmigoImaginario } from "../models/amigo-imaginario.model";
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class AmigoImaginarioService {
  private baseUrl = 'http://localhost:8081/imaginarios';

  constructor(private http: HttpClient) {}

  listar(): Observable<AmigoImaginario[]> {
    return this.http.get<AmigoImaginario[]>(this.baseUrl);
  }

  registrar(amigo: AmigoImaginario) {
    return this.http.post(this.baseUrl, amigo);
  }

  eliminar(id: number): Observable<any> {
      console.log('Clic en eliminar con ID:', id);
  return this.http.delete(`http://localhost:8081/imaginarios/${id}`);
}
}