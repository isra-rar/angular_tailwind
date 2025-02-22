import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ClockPrayService } from '../../core/services/clock-pray.service';
import {
  ClockPrayResponse,
  ClockTimeResponse,
} from '../../models/clock-pray.model';


@Component({
  selector: 'app-prayclocktable',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './prayclocktable.component.html',
  styleUrl: './prayclocktable.component.scss',
})
export class PrayclocktableComponent implements OnInit {
  
  clocks: ClockPrayResponse[] = [];
  selectedClock: ClockPrayResponse | undefined;
  clockTimes: ClockTimeResponse[] = [];
  orderAsc: boolean = true;


  private clockPrayService = inject(ClockPrayService);

  ngOnInit(): void {
    this.clockPrayService.getClockPrayers();

    this.clockPrayService.getClocks().subscribe({
      next: (data) => {
        this.clocks = data;
      },
      error: (err) => {
        console.log('Erro ao carregar os dados de ClockPray:', err);
      }
    });

    
    this.clockPrayService.getClockTimes().subscribe({
      next: (data) => {
        this.clockTimes = data;
      },
      error: (err) => {
        console.log('Erro ao carregar os dados de ClockPray:', err);
      }
    })

  }

  selectPray(clockPrayId: number) {
    this.clockPrayService.getClockTimesClockPrayerId(clockPrayId).subscribe({
      error: (err) => {
        console.log('err ==> ', err);
      },
    });
  }

  onClockSelected(event: any) {
    const clockId = Number(event.target.value);
    this.selectedClock = this.clocks.find((clock) => clock.id === clockId);
    this.selectPray(clockId);
  }

  reserveClock(clock: ClockTimeResponse) {
    this.clockPrayService.reserveClockTime(clock.id, 5).subscribe({
      next: () => {
        this.selectPray(Number(this.selectedClock?.id));
      },
      error: (err) => {
        console.error('Erro ao reservar horário:', err);
      },
    });
  }

  sortByTime() {
    this.orderAsc = !this.orderAsc;
  
    this.clockTimes.sort((a, b) => {
      return this.orderAsc 
        ? b.time.localeCompare(a.time)
        : a.time.localeCompare(b.time);
    });
  }
  

}
