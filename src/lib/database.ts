import fs from 'fs/promises';
import path from 'path';

interface UrlData {
  id: string;
  originalUrl: string;
  shortCode: string;
  clicks: number;
  createdAt: string;
}

class JsonDatabase {
  private dbPath: string;
  private urls: Map<string, UrlData> = new Map();
  private initialized: boolean = false;

  constructor() {
    this.dbPath = path.join(process.cwd(), 'data', 'urls.json');
  }

  private async ensureDataDir(): Promise<void> {
    const dataDir = path.dirname(this.dbPath);
    try {
      await fs.access(dataDir);
    } catch {
      await fs.mkdir(dataDir, { recursive: true });
    }
  }

  private async loadData(): Promise<void> {
    if (this.initialized) return;

    await this.ensureDataDir();

    try {
      const data = await fs.readFile(this.dbPath, 'utf-8');
      const parsed = JSON.parse(data);
      this.urls = new Map(Object.entries(parsed));
    } catch {
      this.urls = new Map();
    }

    this.initialized = true;
  }

  private async saveData(): Promise<void> {
    await this.ensureDataDir();
    const data = Object.fromEntries(this.urls);
    await fs.writeFile(this.dbPath, JSON.stringify(data, null, 2));
  }

  async saveUrl(originalUrl: string, shortCode: string): Promise<UrlData> {
    await this.loadData();

    const urlData: UrlData = {
      id: Math.random().toString(36).substring(2, 15),
      originalUrl,
      shortCode,
      clicks: 0,
      createdAt: new Date().toISOString()
    };

    this.urls.set(shortCode, urlData);
    await this.saveData();
    return urlData;
  }

  async getUrlByShortCode(shortCode: string): Promise<UrlData | null> {
    await this.loadData();
    return this.urls.get(shortCode) || null;
  }

  async incrementClicks(shortCode: string): Promise<void> {
    await this.loadData();
    const urlData = this.urls.get(shortCode);
    if (urlData) {
      urlData.clicks++;
      this.urls.set(shortCode, urlData);
      await this.saveData();
    }
  }

  async getAllUrls(): Promise<UrlData[]> {
    await this.loadData();
    return Array.from(this.urls.values());
  }
}

export const db = new JsonDatabase();
export type { UrlData };