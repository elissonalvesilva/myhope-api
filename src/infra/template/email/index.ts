import * as fs from 'fs/promises';
import * as path from 'path';

export async function htmlAsString() {
  return await fs.readFile(path.join(__dirname, './index.html'), 'utf-8');
}