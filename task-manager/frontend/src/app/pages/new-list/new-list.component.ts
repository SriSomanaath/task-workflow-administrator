import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/task.service';
import { Router } from '@angular/router';
import { List } from 'src/app/models/list.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
interface resList {
  _id: string;
  title: string;
}
@Component({
  selector: 'app-new-list',
  templateUrl: './new-list.component.html',
  styleUrls: ['./new-list.component.scss']
})

export class NewListComponent implements OnInit {
  List:any={}
  constructor(private taskService: TaskService, private router: Router) { }
  
  ngOnInit() {
  }

  // createList(title: string): Observable<List> { 
  //   return this.taskService.createList(title).pipe(
  //     map((response: Object) => {
  //       const list = response as List;
  //       console.log(list);
  //       // Now we navigate to /lists/task._id
  //       this.router.navigate(['/lists', list._id]);
  //       return list;
  //     })
  //   );
  // }
  createList(title: string) {
    this.taskService.createList(title).subscribe((List) => {
      this.List={_id:'',title:''}
      if (typeof List !== 'undefined' && List !== null) {
        this.List = List
        console.log(List, this.List['_id']);
        // Now we navigate to /Lists/task._id
        this.router.navigate([ '/Lists', this.List._id ]); 
      }
    }, (error) => {
      console.log(error);
    });
  }
  
 
}
