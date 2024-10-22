import path from 'node:path';

export default {
  entry: './build/index.js',
  mode: 'production',
  output: {
    filename: 'index.js',
    path: path.resolve(import.meta.dirname, 'dist'),
  },
  externals: {
    'node:http': 'commonjs2 node:http',
    'node:os': 'commonjs2 node:os',
    'node:path': 'commonjs2 node:path',
    'node:crypto': 'commonjs2 node:crypto',
  },
  resolve: {
    fallback: { "path": false, "os": false, "crypto": false },
  }
};