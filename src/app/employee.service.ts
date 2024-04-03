import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private httpClient:HttpClient) { }

  get(page:number,size:number):Observable<any>{
    return this.httpClient.get("http://localhost:8080/employees?page="+page+"&size="+size)
  }
  delete(id:number):Observable<any>{
    return this.httpClient.delete("http://localhost:8080/employees/"+id)
  }
  update(id:number,body:any):Observable<any>{
    return this.httpClient.put("http://localhost:8080/employees/"+id,body)
  }
  add(id:number,body:any):Observable<any>{
    return this.httpClient.post("http://localhost:8080/employees?id="+id,body)
  }



  
}
