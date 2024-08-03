import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Task ,TaskService} from '../task.service';
import { DatePipe } from '@angular/common';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-task-item',
  standalone:true,
imports:[DatePipe,CommonModule],
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css'],
  providers:[TaskService],
})
export class TaskItemComponent implements OnInit, OnDestroy {
  @Input() task: Task;

  timerActive: boolean = false;
  interval: any;

  constructor() {}

  startTimer() {
    if (!this.timerActive) {
      this.timerActive = true;
      this.interval = setInterval(() => {
        if (this.task.timer > 0) {
          this.task.timer--;
        } else {
          this.stopTimer();
        }
      }, 1000);
    }
  }

  stopTimer() {
    clearInterval(this.interval);
    this.timerActive = false;
  }

  resetTimer() {
    this.stopTimer();
    this.task.timer = this.task.initialTimer;
  }

  pauseTimer() {
    this.stopTimer();
  }

  deleteTask() {
    // Logic to delete the task
  }

  formatRemainingTime(): string {
    let hours = Math.floor(this.task.timer / 3600);
    let minutes = Math.floor((this.task.timer % 3600) / 60);
    let seconds = this.task.timer % 60;
    return `${hours}:${minutes}:${seconds}`;
  }
}