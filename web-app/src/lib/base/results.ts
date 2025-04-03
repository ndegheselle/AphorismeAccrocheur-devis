export class PaginatedResults<T> {
    results: T[];
    total: number;
    currentPage: number;
    capacity: number;

    constructor(results: T[], total: number, currentPage: number, capacity: number) {
        this.results = results;
        this.total = total;
        this.currentPage = currentPage;
        this.capacity = capacity;
    }
}