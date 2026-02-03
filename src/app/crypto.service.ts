import { Injectable, Signal, computed, effect, signal } from '@angular/core';

import { Coin } from './crypto.model';

@Injectable({ providedIn: 'root' })
export class CryptoService {
  readonly coins = signal<Coin[]>([
    {
      id: 'btc',
      name: 'Bitcoin',
      price: 48250,
      quantity: 0.75,
      change24h: 0.021,
      lastUpdate: new Date()
    },
    {
      id: 'eth',
      name: 'Ethereum',
      price: 3120,
      quantity: 5.2,
      change24h: -0.013,
      lastUpdate: new Date()
    },
    {
      id: 'sol',
      name: 'Solana',
      price: 142,
      quantity: 42.125,
      change24h: 0.034,
      lastUpdate: new Date()
    }
  ]);

  readonly totalPortfolio = computed(() =>
    this.coins().reduce((total, coin) => total + coin.price * coin.quantity, 0)
  );

  readonly isRich = signal(false);
  private readonly marketTick = signal(0);
  private readonly coinSignals = new Map<string, Signal<Coin>>();

  constructor() {
    effect(() => {
      const tick = this.marketTick();
      if (tick > 0) {
        console.log('⚡ Marché mis à jour !');
      }
    });

    effect(
      () => {
        this.isRich.set(this.totalPortfolio() > 50000);
      },
      { allowSignalWrites: true }
    );
  }

  getCoinSignal(id: string) {
    const cached = this.coinSignals.get(id);
    if (cached) {
      return cached;
    }

    const created = computed(() => {
      const coin = this.coins().find((item) => item.id === id);
      return coin ?? this.coins()[0];
    });

    this.coinSignals.set(id, created);
    return created;
  }

  updateQuantity(id: string, amount: number) {
    this.coins.update((coins) =>
      coins.map((coin) =>
        coin.id === id
          ? {
              ...coin,
              quantity: Math.max(0, coin.quantity + amount),
              lastUpdate: new Date()
            }
          : coin
      )
    );
  }

  simulateMarket() {
    this.coins.update((coins) =>
      coins.map((coin) => {
        const delta = (Math.random() * 10 - 5) / 100;
        return {
          ...coin,
          price: Math.max(0.01, coin.price * (1 + delta)),
          change24h: delta,
          lastUpdate: new Date()
        };
      })
    );

    this.marketTick.update((value) => value + 1);
  }
}
