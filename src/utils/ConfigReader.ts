export class ConfigReader {
    static get(key: string): string | undefined {
        return process.env[key];
    }

    static getInt(key: string): number {
        const value = ConfigReader.get(key);
        return Number.parseInt(value ?? '', 10);
    }

    static getBoolean(key: string): boolean {
        const value = ConfigReader.get(key);
        return value === 'true';
    }
}
