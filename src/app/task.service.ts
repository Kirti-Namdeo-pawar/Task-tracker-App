import { Injectable } from '@angular/core';

export interface Task {
  id: number;
  title: string;
  startDate: Date;
  endDate: Date;
  initialTimer: number; // Initial duration in seconds
  timer: number; // Current countdown value in seconds
  isRunning: boolean; // Flag to track if the timer is running
  completed: boolean; // Flag to indicate task completion
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasks: Task[] = [];

  getTasks(): Task[] {
    return this.tasks;
  }

  addTask(task: Task): void {
    task.id = this.tasks.length + 1;
    task.timer = task.initialTimer;
    task.isRunning = false;
    task.completed = false;
    this.tasks.push(task);
  }

  deleteTask(task: Task): void {
    this.tasks = this.tasks.filter(t => t.id !== task.id);
  }

  startTimer(task: Task): void {
    task.isRunning = true;
    this.updateTimer(task);
  }

  pauseTimer(task: Task): void {
    task.isRunning = false;
  }

  resetTimer(task: Task): void {
    task.timer = task.initialTimer;
    task.isRunning = false;
    task.completed = false;
  }

  private updateTimer(task: Task): void {
    const interval = setInterval(() => {
      if (task.isRunning && task.timer > 0) {
        task.timer--;
      } else {
        clearInterval(interval);
        task.isRunning = false;
        task.completed = true; // Optionally mark task as completed when timer ends
      }
    }, 1000);
  }
}
