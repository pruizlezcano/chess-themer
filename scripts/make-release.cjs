/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
const { execSync } = require('child_process');
const archiver = require('archiver');

const root = `${__dirname}/..`;
const releasesPath = `${root}/release`;

const packageJson = JSON.parse(fs.readFileSync(`${root}/package.json`));

const latestVersion = packageJson.version;
const packageName = packageJson.name;

const releaseDir = `${releasesPath}`;
const sourceDir = `${releaseDir}/source`;

if (fs.existsSync(releaseDir)) {
  console.error(`${latestVersion} dir already exists`);
  process.exit(1);
}

function copySource() {
  const toCopy = [
    'public/icons',
    'public/manifest',
    'public/popup',
    'scripts',
    'src',
    'webpack',
    '.eslintrc.js',
    'LICENSE',
    'package.json',
    'pnpm-lock.yaml',
    'README.md',
    'tsconfig.json',
  ];

  for (const f of toCopy) {
    const src = `${root}/${f}`;
    const dest = `${sourceDir}/${f}`;

    fs.cpSync(src, dest, {
      recursive: true,
    });
  }
}

function run(command) {
  execSync(
    command,
    {
      cwd: sourceDir,
    },
    (error, stdout, stderr) => {
      if (error) {
        console.error(error);
        process.exit(2);
      }
      console.log(stdout);
      if (stderr) {
        console.error('Errors:', stderr);
      }
    },
  );
}

async function zipSource() {
  const output = fs.createWriteStream(
    `${releaseDir}/${packageName}-${latestVersion}_source.zip`,
  );
  const archive = archiver('zip');

  archive.on('error', (err) => {
    throw err;
  });
  archive.pipe(output);
  archive.directory(sourceDir, false);
  await archive.finalize();
}

function cleanup() {
  fs.rmSync(sourceDir, {
    recursive: true,
  });
}

(async function () {
  console.log(`Creating release ${latestVersion}`);
  console.log('1. copy source');
  copySource();

  console.log('2. zip source');
  await zipSource();

  console.log('3. npm install');
  run('npm install');

  console.log('4. build...');
  for (const platform of ['firefox', 'chrome', 'edge']) {
    console.log(`...${platform}`);
    run(`npm run build ${platform} -- --production`);
    fs.cpSync(
      `${sourceDir}/dist/${platform}.zip`,
      `${releaseDir}/${packageName}-${latestVersion}_${platform}.zip`,
    );
  }

  console.log('5. cleanup');
  cleanup();
})();
