export interface PaginatedResult<T> {
  results: T;
  count: number;
  page: number;
  previous: string | null;
  next: string | null;
}
