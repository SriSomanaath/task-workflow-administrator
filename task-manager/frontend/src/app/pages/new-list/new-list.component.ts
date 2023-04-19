import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/task.service';
import { Router } from '@angular/router';
import { List } from 'src/app/models/list.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-new-list',
  templateUrl: './new-list.component.html',
  styleUrls: ['./new-list.component.scss']
})
export class NewListComponent implements OnInit {

  constructor(private taskService: TaskService, private router: Router) { }

  ngOnInit() {
  }

  createList(title: string): Observable<List> { 
    return this.taskService.createList(title).pipe(
      map((response: Object) => {
        const list = response as List;
        console.log(list);
        // Now we navigate to /lists/task._id
        this.router.navigate(['/lists', list._id]);
        return list;
      })
    );
  }
  
 
}
