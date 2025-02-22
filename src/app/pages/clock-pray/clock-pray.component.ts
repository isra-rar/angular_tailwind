import { Component, inject } from '@angular/core';
import { PrayclocktableComponent } from '../../components/prayclocktable/prayclocktable.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClockPrayRequest, ClockType } from '../../models/clock-pray.model';
import { ClockPrayService } from '../../core/services/clock-pray.service';

@Component({
  selector: 'app-clock-pray',
  standalone: true,
  imports: [CommonModule, FormsModule, PrayclocktableComponent],
  templateUrl: './clock-pray.component.html',
  styleUrl: './clock-pray.component.scss'
})
export class ClockPrayComponent {
  
  private clockPrayService = inject(ClockPrayService);
  
  clockTypes = Object.values(ClockType)

  clockPrayRequest: ClockPrayRequest = {
    name: '',
    description: '',
    clockType: ClockType.DEFAULT_VALUE,
  };

  submitForm(form: any) {
    if (form.valid) {
      this.clockPrayService.createClockPray(this.clockPrayRequest).subscribe({
        next: () => {
          // Recarregar os dados após o sucesso
          this.clockPrayService.getClockPrayers();
        },
        error: (err) => {
          console.log("err ==> ", err);
        },
      });
    }
  }

}