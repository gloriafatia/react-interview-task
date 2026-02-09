export type Category = {
  id: number;
  label: string;
  color: string;
};

export type ItemType = {
  id: number;
  jobId: number;
  categoryId: number;
  nr: number;
  item: string;
  quantity: number;
  description: string;
  notes: string;
};

export type Jobsite = {
  id: number;
  name: string;
  status: string;
  categories: number[];
};
