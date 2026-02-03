import { Component, Input, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Coin } from '../crypto.model';

@Component({
  selector: 'app-crypto-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './crypto-card.component.html',
  styleUrl: './crypto-card.component.css'
})
export class CryptoCardComponent {
  @Input({ required: true }) coin!: Signal<Coin>;
  @Input({ required: true }) updateQuantity!: (amount: number) => void;
}
