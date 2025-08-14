import { OfflineStorage, IconData } from '@/types';

const STORAGE_KEY = 'animated-icons-data';
const STORAGE_VERSION = '1.0.0';

export class LocalStorageOfflineStorage implements OfflineStorage {
  private storageKey: string;
  private version: string;

  constructor(storageKey = STORAGE_KEY, version = STORAGE_VERSION) {
    this.storageKey = storageKey;
    this.version = version;
  }

  storeIconData(data: IconData | IconData[]): void {
    try {
      const storageData = {
        version: this.version,
        timestamp: Date.now(),
        data,
      };
      
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem(this.storageKey, JSON.stringify(storageData));
      }
    } catch (error) {
      console.warn('Failed to store icon data in localStorage:', error);
    }
  }

  getIconData(): IconData | IconData[] | null {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const stored = window.localStorage.getItem(this.storageKey);
        if (stored) {
          const parsed = JSON.parse(stored);
          if (parsed.version === this.version) {
            return parsed.data;
          }
        }
      }
      return null;
    } catch (error) {
      console.warn('Failed to retrieve icon data from localStorage:', error);
      return null;
    }
  }

  hasIconData(): boolean {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const stored = window.localStorage.getItem(this.storageKey);
        if (stored) {
          const parsed = JSON.parse(stored);
          return parsed.version === this.version && parsed.data != null;
        }
      }
      return false;
    } catch (error) {
      console.warn('Failed to check icon data in localStorage:', error);
      return false;
    }
  }

  clearIconData(): void {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.removeItem(this.storageKey);
      }
    } catch (error) {
      console.warn('Failed to clear icon data from localStorage:', error);
    }
  }

  getStorageInfo(): { size: number; timestamp: number; version: string } | null {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const stored = window.localStorage.getItem(this.storageKey);
        if (stored) {
          const parsed = JSON.parse(stored);
          return {
            size: stored.length,
            timestamp: parsed.timestamp,
            version: parsed.version,
          };
        }
      }
      return null;
    } catch (error) {
      console.warn('Failed to get storage info:', error);
      return null;
    }
  }
}

export class IndexedDBOfflineStorage implements OfflineStorage {
  private dbName: string;
  private storeName: string;
  private version: string;

  constructor(dbName = 'AnimatedIconsDB', storeName = 'iconData', version = STORAGE_VERSION) {
    this.dbName = dbName;
    this.storeName = storeName;
    this.version = version;
  }

  private async getDB(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      if (typeof window === 'undefined' || !window.indexedDB) {
        reject(new Error('IndexedDB not available'));
        return;
      }

      const request = window.indexedDB.open(this.dbName, 1);
      
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);
      
      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains(this.storeName)) {
          db.createObjectStore(this.storeName, { keyPath: 'id' });
        }
      };
    });
  }

  async storeIconData(data: IconData | IconData[]): Promise<void> {
    try {
      const db = await this.getDB();
      const transaction = db.transaction([this.storeName], 'readwrite');
      const store = transaction.objectStore(this.storeName);
      
      const storageData = {
        id: 'icon-data',
        version: this.version,
        timestamp: Date.now(),
        data,
      };
      
      await new Promise((resolve, reject) => {
        const request = store.put(storageData);
        request.onsuccess = () => resolve(undefined);
        request.onerror = () => reject(request.error);
      });
    } catch (error) {
      console.warn('Failed to store icon data in IndexedDB:', error);
    }
  }

  async getIconData(): Promise<IconData | IconData[] | null> {
    try {
      const db = await this.getDB();
      const transaction = db.transaction([this.storeName], 'readonly');
      const store = transaction.objectStore(this.storeName);
      
      return new Promise((resolve, reject) => {
        const request = store.get('icon-data');
        request.onsuccess = () => {
          const result = request.result;
          if (result && result.version === this.version) {
            resolve(result.data);
          } else {
            resolve(null);
          }
        };
        request.onerror = () => reject(request.error);
      });
    } catch (error) {
      console.warn('Failed to retrieve icon data from IndexedDB:', error);
      return null;
    }
  }

  async hasIconData(): Promise<boolean> {
    try {
      const data = await this.getIconData();
      return data != null;
    } catch (error) {
      console.warn('Failed to check icon data in IndexedDB:', error);
      return false;
    }
  }

  async clearIconData(): Promise<void> {
    try {
      const db = await this.getDB();
      const transaction = db.transaction([this.storeName], 'readwrite');
      const store = transaction.objectStore(this.storeName);
      
      await new Promise((resolve, reject) => {
        const request = store.delete('icon-data');
        request.onsuccess = () => resolve(undefined);
        request.onerror = () => reject(request.error);
      });
    } catch (error) {
      console.warn('Failed to clear icon data from IndexedDB:', error);
    }
  }
}

// Default storage instance
export const defaultOfflineStorage = new LocalStorageOfflineStorage();
