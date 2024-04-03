import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { CommonModule} from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-employee-table',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './employee-table.component.html',
  styleUrl: './employee-table.component.css'
})
export class EmployeeTableComponent implements OnInit{
  
  constructor(public employeeService:EmployeeService){}
  data:any = null;
  size=10;
  page=0
  selectedValueId=0;

  id=0
  body:any
  display_update=false
  display_add=false

  nome=""
  cognome=""

  

  isDisabled_add=false
  isDisabled_update=false

  ngOnInit(): void {
    this.loadData(0,this.size)
  }

  loadData(page:number,size:number){
    this.employeeService.get(page,size).subscribe(remoteData=>{
      this.data=remoteData;
    })
  }
  changePage(number:number){
    this.page+=number
    if(this.page<0)this.page=0
    this.loadData(this.page,this.size)
  }
  delete(id:number){
    this.employeeService.delete(id).subscribe(()=>{
      this.loadData(this.page,this.size)
    });
  }
  update(){
    this.changeBodyValue(this.nome,this.cognome,this.id)

    this.employeeService.update(this.id,this.body).subscribe(()=>{
      this.loadData(this.page,this.size)
    });

    this.nome=""
    this.cognome=""
    this.id=0

    this.display_update=false
    this.isDisabled_add=false

  }
  modified(id:number,nome:string,cognome:string){
    this.nome=nome
    this.cognome=cognome
    this.id=id
    this.display_update=true
    this.isDisabled_add=true
  }
  to_add(){
    this.display_add=true
    this.display_update=false
    this.isDisabled_update=true
  }

  changeBodyValue(nome:string,cognome:string,id:number){
    this.body={
      "birthDate": "2024-04-03",
      "firstName":nome,
      "gender": "M",
      "hireDate": "2024-04-03",
      "id": id,
      "lastName": cognome,
      "links": [
        {
          "href": "string",
          "rel": "string",
          "templated": true
        }
      ]
    }
  }

  add(){
    this.display_add=false
    this.isDisabled_update=false

    this.changeBodyValue(this.nome,this.cognome,0)
    this.employeeService.add(0,this.body).subscribe(()=>{
      this.loadData(this.page,this.size)
    })
  }
}
