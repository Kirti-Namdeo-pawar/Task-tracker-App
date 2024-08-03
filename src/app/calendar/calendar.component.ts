import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  @Output() dateSelected = new EventEmitter<Date>();
  selectedDate: Date = new Date();
  today: Date = new Date();
  daysInMonth: { number: number; date: Date }[] = [];

  ngOnInit(): void {
    this.generateCalendar();
  }

  generateCalendar(): void {
    const year = this.selectedDate.getFullYear();
    const month = this.selectedDate.getMonth();
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const firstDayIndex = firstDayOfMonth.getDay();
    const lastDayIndex = lastDayOfMonth.getDay();

    const prevDays = firstDayIndex;
    const nextDays = 6 - lastDayIndex;

    const daysInPreviousMonth = new Date(year, month, 0).getDate();
    const daysInCurrentMonth = lastDayOfMonth.getDate();

    this.daysInMonth = [];

    for (let i = prevDays; i > 0; i--) {
      this.daysInMonth.push({
        number: daysInPreviousMonth - i + 1,
        date: new Date(year, month - 1, daysInPreviousMonth - i + 1)
      });
    }

    for (let i = 1; i <= daysInCurrentMonth; i++) {
      this.daysInMonth.push({ number: i, date: new Date(year, month, i) });
    }

    for (let i = 1; i <= nextDays; i++) {
      this.daysInMonth.push({ number: i, date: new Date(year, month + 1, i) });
    }
  }

  selectDate(date: Date): void {
    this.selectedDate = date;
    this.dateSelected.emit(date);
  }

  goToPreviousMonth(): void {
    this.selectedDate = new Date(this.selectedDate.getFullYear(), this.selectedDate.getMonth() - 1, 1);
    this.generateCalendar();
  }

  goToNextMonth(): void {
    this.selectedDate = new Date(this.selectedDate.getFullYear(), this.selectedDate.getMonth() + 1, 1);
    this.generateCalendar();
  }
}
