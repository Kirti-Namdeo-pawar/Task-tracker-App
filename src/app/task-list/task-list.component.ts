import { Component, Input,OnChanges,SimpleChanges,OnInit } from '@angular/core';
import { Task, TaskService } from '../task.service';
import { SimpleChange } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskItemComponent } from '../task-item/task-item.component';
@Component({
  selector: 'app-task-list',
  standalone:true,
  imports:[CommonModule,TaskItemComponent],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],

})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
@Input() selectedDate:Date= new Date ();
  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    
  }
/*
  getTasks(): void {
    this.tasks = this.taskService.getTasks();
  }
  
  startTimer(task: Task): void {
    // Implement timer logic here, e.g., using setTimeout or setInterval
    console.log(`Starting timer for task: ${task.title}`);
  }*/
  addTask(task: Task) {
    this.tasks.push(task);
  }
  formatTimer(timerInSeconds: number): string {
    let hours = Math.floor(timerInSeconds / 3600);
    let minutes = Math.floor((timerInSeconds % 3600) / 60);
    let seconds = timerInSeconds % 60;

    return `${hours}h ${minutes}m ${seconds}s`;
  }

/*
  updateTaskList(): void {
    this.tasks = this.taskService.getTasks().filter(task => 
      task.startDate.toDateString() === this.selectedDate.toDateString()
    );
  }

  deleteTask(task: Task): void {
    this.taskService.deleteTask(task);
    this.updateTaskList();
  }*/
}