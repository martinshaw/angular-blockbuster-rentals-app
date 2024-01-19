import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {
  constructor() { }

  public getDateTodayPlusDays(days: number = 0): Date {
    const date = new Date();
    date.setDate(date.getDate() + days);
    return date;
  }

  public formatNumberWithOrdinal(n: number): string {
    const s = ['th', 'st', 'nd', 'rd'];
    const v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
  };

  public formatReturnDateRange(from: Date, caption?: string) {
    if (caption == null) caption = from.toLocaleString('default', { weekday: 'long' });
    return `${caption} ${this.formatNumberWithOrdinal(from.getDate())} ${from.toLocaleString('default', { month: 'long' })}`;
  }
}
