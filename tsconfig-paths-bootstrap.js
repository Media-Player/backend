const path = require('path')
const tsConfigPaths = require('tsconfig-paths')

const tsConfig = require('./tsconfig.json')

tsConfigPaths.register({
  baseUrl: path.resolve(tsConfig.compilerOptions.baseUrl || '', tsConfig.compilerOptions.outDir || ''),
  paths: tsConfig.compilerOptions.paths,
})
