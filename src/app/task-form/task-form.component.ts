import { Component, EventEmitter, Output, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService, Task } from '../task.service';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, FormsModule,DatePipe],
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css'],
  providers:[TaskService]
})
export class TaskFormComponent {
  newTask: any = {
    title: '',
    startDate: '',
    endDate: '',
    timer: 0 // Initialize timer in seconds
  };
  hours: number = 0;
  minutes: number = 0;
  seconds: number = 0;
  @Input() selectedDate: Date=new Date(); 
  @Output() taskAdded = new EventEmitter<Task>();
 

  constructor(private taskService: TaskService) {}
  addTask() {
    // Calculate total seconds from hours, minutes, seconds input
    let totalSeconds = this.hours * 3600 + this.minutes * 60 + this.seconds;
    
    this.newTask.initialTimer = totalSeconds;
    this.newTask.timer = totalSeconds;
    
    // Emit newTask to parent component
    this.taskAdded.emit(this.newTask);

    // Reset form fields after emitting task
    this.newTask = {
      id: 0,
      title: '',
      completed: false,
      initialTimer: 0,
      timer: 0,
      isRunning: false,
      startDate: undefined,
      endDate: undefined,
      date: new Date()
    };
    this.hours = 0;
    this.minutes = 0;
    this.seconds = 0;
  }
}