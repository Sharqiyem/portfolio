export interface Project {
  id: number;
  imageUrl: string;
  title: string;
  tag: string[];
  description: string;
  gitUrl: string;
  previewUrl: string;
}

export interface Achievement {
  metric: string;
  value: string;
  postfix: string;
  prefix?: string;
}
