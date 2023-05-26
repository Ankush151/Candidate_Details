import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import{server} from '../config'


@Injectable({
  providedIn: 'root'
})
export class ComponentService {

  constructor(
    private http:HttpClient
  ) { }

  create(studentsDetailsData:any){
    return this.http.post<any>(`${server}studentsData`,studentsDetailsData)
 }
 findOne(_id: any){
    return this.http.get<any>(`${server}studentsData/${_id}`)
 }
 findAll(){
    return this.http.get<any[]>(`${server}studentsData/allstudentdetails`)
 }
 findOneAndUpdate(_id: any,studentsDetailsData: any){
    return this.http.put<any>(`${server}studentsData/${_id}`,studentsDetailsData)
 }
 delete(_id: any){
  return this.http.delete<any>(`${server}studentsData/delete/${_id}`)
 }


}
