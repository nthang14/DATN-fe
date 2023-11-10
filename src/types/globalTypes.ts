export interface PaginationProps {
  page: number;
  total: number | undefined;
  onChangePage?: (page: number, pageSize: number) => void;
}

export type TypeFolder = {
  title: string;
  parentId?: string;
}