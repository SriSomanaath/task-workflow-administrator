import { Component,OnInit} from '@angular/core';
import {TaskService} from 'src/app/task.service';
import {ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss']
})
export class TaskViewComponent implements OnInit{
  
  lists:any;
  tasks:any;
  
  constructor(private taskService:TaskService, private route:ActivatedRoute){ 
   
  } 
 
//   ngOnInit() :void{
//      this.taskService.getLists().subscribe((lists:any)=>{
//       this.lists = lists;
//        });
        
//     this.route.params.subscribe(
//       (params:Params)=>{
//       console.log("recevide aa",params);
//         this.taskService.getTasks(params?.['listId']).subscribe((tasks:any)=>{
//           this.tasks = tasks;
//         });
     
//      }); 
//  }

ngOnInit(): void {
    this.yourFunction();
  }

  async yourFunction() {
  await new Promise<void>((resolve) => {
    this.taskService.getLists().subscribe((lists:any)=>{
      this.lists = lists;
      resolve();
    });
  });

  this.route.params.subscribe((params:Params)=>{
    console.log("received aa",params);
    const listId = params?.['listId'];
    if (listId) {
      this.taskService.getTasks(listId).subscribe((tasks:any)=>{
        this.tasks = tasks;
      });
    }
  });
}

}
