import { Injectable } from '@angular/core';
import { Student } from './student';
import { Observable, of } from "rxjs";
import { HttpClient } from '@angular/common/http';
import { HttpHeaders} from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
providedIn: 'root'
})

export class StudentService {
    private studentsUrl = 'http://localhost:8080/student';
    httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    constructor(
    private http: HttpClient
    ) { }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
        console.error(operation);
        console.error(error);
        return of(result as T);
        };
        }

    getStudents(): Observable<Student[]> {
     return this.http.get<Student[]>(this.studentsUrl)
        .pipe(
        tap(_ => console.log('fetched students')),
        catchError(this.handleError<Student[]>('getStudents', []))
        );
    }

    getStudent(jmbag: string): Observable<Student> {
        const url = `${this.studentsUrl}/${jmbag}`;
        return this.http.get<Student>(url)
          .pipe(
            tap(_ => console.log(`fetched student jmbag=${jmbag}`)),
            catchError(this.handleError<Student>(`getStudent jmbag=${jmbag}`))
          );
      }
      addStudent(student: Student): Observable<Student> {
        return this.http.post<Student>(this.studentsUrl, student).pipe(
          tap((newStudent: Student) => console.log(`added student w/ JMBAG=${newStudent.jmbag}`)),
          catchError(this.handleError<Student>('addStudent'))
        );
      }
    
      deleteStudent(student: Student): Observable<Student> {
        const url = `${this.studentsUrl}/${student.jmbag}`;
        console.log(url)
        return this.http.delete<Student>(url).pipe(
          tap(_ => console.log(`deleted student JMBAG=${student.jmbag}`)),
          catchError(this.handleError<Student>('deleteStudent'))
        );
      }


   

}