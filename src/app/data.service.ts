import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SoruModel } from './soruekle/soruModel';
import { Observable } from 'rxjs';
import { Sorular } from './models/Sorular';

@Injectable({
  providedIn: 'root'

})

export class DataService {
  public baseUrl = 'http://der-api.herokuapp.com/';
  
 
  constructor(private http: HttpClient) { }

  getSoru<T>(id){
    return this.http.get<Sorular>(this.baseUrl+'sorular/'+id)
  }
  getSorular<T>(){
    return this.http.get<Sorular[]>(this.baseUrl+'sorular')
  }
  getSorularCevaplar(soruId){

    return this.http.get(this.baseUrl+'sorular/'+soruId+'/cevaplar')
  }
  deleteSoru(soruId){
    return this.http.delete(this.baseUrl+'sorular/'+soruId)
  }
  soruGuncelle(soru:SoruModel,id){
  const headers=new HttpHeaders().set('Content-Type','application/json');
  return this.http.put<SoruModel>(this.baseUrl+"sorular/"+id,JSON.stringify(soru),{
    headers:headers
  });
  }
 /* getSoruGuncelle(soruId){
    return this.http.put('localhost:8080/sorular/'+soruId)

  }
  */
 getSoruEkle(soru:SoruModel) {
  //return this.http.post('http://localhost:8080/sorular',soru);
  const headers=new HttpHeaders().set('Content-Type','application/json');
  return this.http.post<SoruModel>("http://der-api.herokuapp.com/sorular",JSON.stringify(soru),{
    headers:headers
  });
}

}
