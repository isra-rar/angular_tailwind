import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { CommonModule } from '@angular/common';

import { LocalStorageService } from '../../core/services/local-storage.service';

@Component({
  selector: 'app-call-back-google',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './call-back-google.component.html',
  styleUrl: './call-back-google.component.scss'
})
export class CallBackGoogleComponent implements OnInit {


  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private storage = inject(LocalStorageService);

  constructor() {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const token = params['token'];
      const storedToken = this.storage.getItem('token');
      
      if (token && !storedToken) {
        this.storage.setItem('token', token);
        this.router.navigate(['/home']);
      } else {
        this.router.navigate(['/login']);
      }
    });
  }
}
