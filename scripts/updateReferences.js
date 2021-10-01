const workspaceToTypeScriptReferences = require('@monorepo-utils/workspaces-to-typescript-project-references');
const path = require('path');
const fs = require('fs');
const { execSync } = require("child_process");

const res = workspaceToTypeScriptReferences.toProjectReferences({
  rootDir: path.resolve('./'),
});

if (!res.ok) {
  console.error(res.aggregateError.message);
  process.exit(1);
}

const cmdRes = execSync('yarn workspaces list --json').toString();

const allPackages = cmdRes.split('\n').map((line) => {
  if (line.trim() === "") {
    return {
      path: undefined,
    };
  }
  const packageData = JSON.parse(line);
  if (packageData.location === '.') {
    return {
      path: undefined,
    };
  }
  return {
    path: packageData.location
  };
});

const tsConfig = fs.readFileSync('./tsconfig.json');

const tsConfigData = JSON.parse(tsConfig);

tsConfigData.references = allPackages.filter((package) => package.path);

fs.writeFileSync('./tsconfig.json', JSON.stringify(tsConfigData, null, 2));


