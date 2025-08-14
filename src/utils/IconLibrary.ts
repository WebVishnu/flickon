import { IconLibraryConfig, IconMetadata, OfflineStorage, IconData } from '@/types';
import { defaultOfflineStorage } from './offlineStorage';
import { iconRegistry, iconMetadata } from '@/icons';

export class IconLibrary {
  private config: IconLibraryConfig;
  private storage: OfflineStorage;

  constructor(config: Partial<IconLibraryConfig> = {}) {
    this.config = {
      baseUrl: 'https://api.animated-icons.com',
      enableOfflineMode: true,
      defaultSize: 24,
      defaultColor: 'currentColor',
      ...config,
    };

    this.storage = config.offlineStorage || defaultOfflineStorage;
  }

  /**
   * Get an icon component by name
   */
  async getIcon(name: string) {
    try {
      if (iconRegistry[name as keyof typeof iconRegistry]) {
        return await iconRegistry[name as keyof typeof iconRegistry]();
      }
      throw new Error(`Icon "${name}" not found`);
    } catch (error) {
      console.error(`Failed to load icon "${name}":`, error);
      return null;
    }
  }

  /**
   * Get icon metadata
   */
  getIconMetadata(name: string): IconMetadata | null {
    return iconMetadata[name as keyof typeof iconMetadata] || null;
  }

  /**
   * Get all available icon names
   */
  getAvailableIcons(): string[] {
    return Object.keys(iconRegistry);
  }

  /**
   * Check if an icon exists
   */
  hasIcon(name: string): boolean {
    return name in iconRegistry;
  }

  /**
   * Store icon data for offline use
   */
  async storeIconData(data: IconData | IconData[]): Promise<void> {
    if (this.config.enableOfflineMode) {
      this.storage.storeIconData(data);
    }
  }

  /**
   * Get stored icon data
   */
  async getStoredIconData(): Promise<IconData | IconData[] | null> {
    if (this.config.enableOfflineMode) {
      return this.storage.getIconData();
    }
    return null;
  }

  /**
   * Check if offline data is available
   */
  async hasOfflineData(): Promise<boolean> {
    if (this.config.enableOfflineMode) {
      return this.storage.hasIconData();
    }
    return false;
  }

  /**
   * Clear stored icon data
   */
  async clearOfflineData(): Promise<void> {
    if (this.config.enableOfflineMode) {
      this.storage.clearIconData();
    }
  }

  /**
   * Get library configuration
   */
  getConfig(): IconLibraryConfig {
    return { ...this.config };
  }

  /**
   * Update library configuration
   */
  updateConfig(newConfig: Partial<IconLibraryConfig>): void {
    this.config = { ...this.config, ...newConfig };
  }
}

// Default instance
export const defaultIconLibrary = new IconLibrary();
