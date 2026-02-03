import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CryptoCardComponent } from '../crypto-card/crypto-card.component';
import { CryptoService } from '../crypto.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, CryptoCardComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  readonly coins = this.cryptoService.coins;
  readonly totalPortfolio = this.cryptoService.totalPortfolio;
  readonly isRich = this.cryptoService.isRich;

  constructor(readonly cryptoService: CryptoService) {}

  simulateMarket() {
    this.cryptoService.simulateMarket();
  }

  updateQuantity(id: string, amount: number) {
    this.cryptoService.updateQuantity(id, amount);
  }

  createQuantityUpdater(id: string) {
    return (amount: number) => this.updateQuantity(id, amount);
  }
}
