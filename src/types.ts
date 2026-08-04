export type BookStatus = "selected" | "recommended" | "suggested";

export interface Book {
  id: string;
  author: string;
  title: string;
  subTitle: string;
  imageLink: string;
  audioLink: string;
  totalRating: number;
  averageRating: number;
  keyIdeas: number;
  type: string;
  status: BookStatus;
  subscriptionRequired: boolean;
  summary: string;
  tags: string[];
  bookDescription: string;
  authorDescription: string;
}

export type Plan = "basic" | "premium" | "premium-plus";

export interface User {
  email: string;
  plan: Plan;
  guest?: boolean;
}

export interface StoredAccount extends User {
  password: string;
}
