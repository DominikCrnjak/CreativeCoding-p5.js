import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentsComponent } from './students/students.component';
import { StudentDetailComponent } from './student-detail/student-detail.component';



const routes: Routes = [
  { path: 'students', component: StudentsComponent, runGuardsAndResolvers: 'always' },
  { path: 'students/detail/:jmbag', component: StudentDetailComponent,  runGuardsAndResolvers: 'always' }
  ];

@NgModule({
  declarations: [],
  imports: [
  RouterModule.forRoot(routes,{
    onSameUrlNavigation: 'reload'
  })
  
  ],
  exports: [
  RouterModule
  ]
  })
  export class AppRoutingModule { }
