'use server';
import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';
export async function parseCSV(content: string) {
  try {
    let record = parse(content, {
      delimiter: ',', // CSV文件的分隔符
      columns: true, // 是否包含列名行
      trim: true, // 去除每个字段的前后空白
    });
    return record;
  } catch (error) {
    console.error('Error parsing CSV:', error);
  }
  
}