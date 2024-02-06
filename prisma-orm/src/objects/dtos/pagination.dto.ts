export default class PaginationDto {
  page: number;
  pageSize: number;

  constructor(page: number, size: number) {
    this.page = page - 1;
    this.pageSize = size;
  }
}
