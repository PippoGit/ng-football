import { Injectable } from '@angular/core';
import { Match } from 'src/app/types/api.fixtures';
import { Standing } from 'src/app/types/api.standings';
import { CachedResult } from 'src/app/types/cache';

@Injectable({
  providedIn: 'root',
})
export class CacheService {
  TTL = 60000; // 1 hour time to live
  cache = {
    standings: new Map<string, CachedResult<Standing[]>>(),
    fixtures: new Map<string, CachedResult<Match[]>>(),
  };

  private cacheEntry: <T>(data: T) => CachedResult<T> = (data) => ({
    data,
    timestamp: Date.now(),
  });

  private get(key: string, type: 'standings' | 'fixtures') {
    const item = this.cache[type].get(key);
    if (item) {
      const now = Date.now();
      if (now - item.timestamp < this.TTL) {
        return item.data;
      } else {
        this.cache[type].delete(key);
      }
    }
    return null;
  }

  getStandings(key: string) {
    return this.get(key, 'standings') as Standing[];
  }

  setStandings(key: string, data: Standing[]) {
    this.cache['standings'].set(key, this.cacheEntry(data));
  }

  setFixtures(key: string, data: Match[]) {
    this.cache['fixtures'].set(key, this.cacheEntry(data));
  }

  getFixtures(key: string) {
    return this.get(key, 'fixtures');
  }
}
