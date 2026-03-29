declare module 'imapflow' {
    export class ImapFlow {
        constructor(options: any);
        connect(): Promise<void>;
        logout(): Promise<void>;
        getMailboxLock(path: string): Promise<any>;
        fetch(range: string, options: any): AsyncIterableIterator<any>;
        // Füge hier bei Bedarf weitere Methoden hinzu [cite: 2026-03-08]
    }
}