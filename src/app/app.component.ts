import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from './calendar/calendar.component';
import { TaskFormComponent } from './task-form/task-form.component';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskService } from './task.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [CommonModule, CalendarComponent, TaskFormComponent, TaskListComponent],
  providers:[TaskListComponent],
})
export class AppComponent {
  title = 'task-tracker';
  showTaskForm = false;
  selectedDate: Date = new Date(); 
  
  tasks: Task[] = [];// Set to today's date

  openTaskForm(): void {
    this.showTaskForm = true;
  }

  closeTaskForm(): void {
    this.showTaskForm = false;
  }

  handleTaskAdded(): void {
    this.closeTaskForm();
    // Refresh the task list
  }

  onDateSelected(date: Date): void {
    this.selectedDate = date;
  }
  onTaskAdded(): void {
    this.tasks.push(task);
  }
  
   
  
}
