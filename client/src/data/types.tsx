"use client";

export interface Description {
  type?: string;
  value?: string;
}
export interface TButtonTabs {
  title: string;
  value: string;
  src: string;
}

interface Answer {
  description?: Description[];
}

type AnswerArray = Answer[];

interface SourceItem {
  url: string;
  description: string;
}

export type Adtype = {
  id: string;
  title: string;
  description: string;
  image: string;
  expiresAt: string;
  createdAt: string;
  updatedAt: string;
  url: string;
}

interface ImageEntity {
  source: SourceItem[];
  title: string;
  url: string;
}

// If 'image' is an array of 'ImageEntity' objects
type ImageEntityArray = ImageEntity[];

interface Thumb {
  ratio: null | number; // Assuming ratio is a number or null
  url: null | string; // Assuming url is a string or null
}

interface WebEntity {
  date: null | string; // Assuming date is a string or null
  description: string;
  sublink: any[]; // Replace 'any' with a more specific type if possible
  table: any[]; // Replace 'any' with a more specific type if possible
  thumb: Thumb;
  title: string;
  type: string;
  url: string;
}

type WebEntityArray = WebEntity[];

export interface Result {
  status?: string;
  spelling?: JSON;
  answer?: AnswerArray;
  web?: WebEntityArray;
  image?: ImageEntityArray;
  related?: [string];
}

