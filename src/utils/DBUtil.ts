import { Pool } from 'pg';
import { ConfigReader } from './ConfigReader';

export class DBUtil {
    private static pool: Pool | null = null;

    static getConnection(): Pool {
        if (DBUtil.pool == null) {
            DBUtil.pool = new Pool({
                host: ConfigReader.get('db.host'),
                port: ConfigReader.getInt('db.port'),
                database: ConfigReader.get('db.name'),
                user: ConfigReader.get('db.user'),
                password: ConfigReader.get('db.password')
            });
        }
        return DBUtil.pool;
    }

    /** Creates tables and inserts seed data (runs once per suite). */
    static async initDatabase(): Promise<void> {
        await DBUtil.runScript('db/schema.sql');
        await DBUtil.runScript('db/data.sql');
    }

    private static async runScript(resourcePath: string): Promise<void> {
        const sql = await DBUtil.readSqlFile(resourcePath);
        const statements = sql.split(';');
        for (const statement of statements) {
            if (statement.trim() !== '') {
                await DBUtil.getConnection().query(statement.trim());
            }
        }
    }

    private static async readSqlFile(resourcePath: string): Promise<string> {
        const response = await fetch(resourcePath);
        if (!response.ok) {
            throw new Error(`SQL script not found: ${resourcePath}`);
        }
        return await response.text();
    }

    /** Returns {username, password, expected_error} rows for a user type: VALID, LOCKED or INVALID. */
    static async getUsersByType(userType: string): Promise<string[][]> {
        const query = 'SELECT username, password, expected_error FROM test_users WHERE user_type = ?';
        try {
            const result = await DBUtil.getConnection().query(query, [userType]);
            const rows = result.rows as Array<{ username: string; password: string; expected_error: string }>;
            return rows.map((row) => [row.username, row.password, row.expected_error]);
        } catch (error) {
            throw new Error('Failed to read test users');
        }
    }

    static async getProductPrice(productName: string): Promise<number> {
        const query = 'SELECT price FROM products WHERE name = ?';
        try {
            const result = await DBUtil.getConnection().query(query, [productName]);
            const rows = result.rows as Array<{ price: number }>;
            if (rows.length > 0) {
                return rows[0].price;
            }
            throw new Error(`Product not found in DB: ${productName}`);
        } catch (error) {
            throw new Error('Failed to read product price');
        }
    }

    static async getAllProductNames(): Promise<string[]> {
        const names: string[] = [];
        try {
            const result = await DBUtil.getConnection().query('SELECT name FROM products ORDER BY id');
            const rows = result.rows as Array<{ name: string }>;
            for (const row of rows) {
                names.push(row.name);
            }
        } catch (error) {
            throw new Error('Failed to read products');
        }
        return names;
    }

    static async saveOrder(
        username: string,
        firstName: string,
        lastName: string,
        postalCode: string,
        itemCount: number,
        status: string
    ): Promise<void> {
        const sql = 'INSERT INTO orders (username, first_name, last_name, postal_code, item_count, status) VALUES (?, ?, ?, ?, ?, ?)';
        try {
            await DBUtil.getConnection().query(sql, [username, firstName, lastName, postalCode, itemCount, status]);
        } catch (error) {
            throw new Error('Failed to save order');
        }
    }

    static async getLatestOrderStatus(username: string): Promise<string | null> {
        const query = 'SELECT status FROM orders WHERE username = ? ORDER BY id DESC LIMIT 1';
        try {
            const result = await DBUtil.getConnection().query(query, [username]);
            const rows = result.rows as Array<{ status: string }>;
            return rows.length > 0 ? rows[0].status : null;
        } catch (error) {
            throw new Error('Failed to read order');
        }
    }

    static async closeConnection(): Promise<void> {
        if (DBUtil.pool != null) {
            await DBUtil.pool.end();
            DBUtil.pool = null;
        }
    }
}
