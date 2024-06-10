import { Resolver } from '@parcel/plugin';
import { resolve } from 'path';
import { existsSync } from 'fs';

export default new Resolver({
  async resolve({ specifier, dependency, options }) {
    if (specifier.startsWith('@/')) {
      const aliasPath = specifier.replace('@/', './src/');
      const resolvedPath = resolve(aliasPath);

      if (existsSync(resolvedPath)) {
        return { filePath: resolvedPath };
      }
    }

    return null;
  }
});
