/* eslint-disable @typescript-eslint/no-var-requires */
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const path = require('path');
const fs = require('fs');
const MergeJsonWebpackPlugin = require('merge-json-webpack-plugin');
const ExtensionReloader = require('webpack-ext-reloader');
const FileManagerPlugin = require('filemanager-webpack-plugin');

class WebpackRunner {
  constructor(browser) {
    this._browser = browser;

    if (!['firefox', 'chrome', 'edge'].includes(this._browser)) {
      throw new Error(`Unknown browser ${this._browser}`);
    }

    this._development = true;
    this._server = false;

    this._config = require('./webpack.config.cjs');
  }

  set development(value) {
    this._development = value;
  }

  set server(value) {
    this._server = value;
  }

  get _mode() {
    return this._development ? 'dev' : 'prod';
  }

  get _outputDirectoryName() {
    return path.resolve(
      this._config.output.path,
      `${this._mode}.${this._browser}`,
    );
  }

  _buildOptions() {
    const options = {};

    options.output = {
      path: path.resolve(this._outputDirectoryName),
    };

    // if (this._development) {
    //   options.mode = 'development';
    //   options.devtool = 'eval-source-map';
    // } else {
    //   options.mode = 'production';
    //   options.devtool = 'source-map';
    // }

    const manifestsDirectory = 'public/manifest';
    const fileNames = [
      'base.json',
      `base.${this._mode}.json`,
      `${this._browser}.json`,
      `${this._browser}.${this._mode}.json`,
    ];

    console.log('\x1b[33;1m%s\x1b[0m', 'Building manifest from...');
    const files = [];
    for (const fileName of fileNames) {
      const path = `${manifestsDirectory}/${fileName}`;
      if (fs.existsSync(path)) {
        files.push(path);
        console.log(`  ${manifestsDirectory}/\x1b[32;1m${fileName}\x1b[0m`);
      }
    }
    console.log('');

    options.plugins = [
      new MergeJsonWebpackPlugin({
        groups: [
          {
            files,
            to: 'manifest.json',
          },
        ],
        mergeFn: (object, other) => merge(object, other),
        minify: !this._development,
      }),
      new webpack.DefinePlugin({
        __BROWSER__: JSON.stringify(this._browser),
      }),
    ];

    if (this._server) {
      options.watch = true;
      options.plugins.push(
        new ExtensionReloader({
          entries: {
            background: 'background',
            extensionPage: 'options',
            contentScript: Object.keys(this._config.entry).filter(
              (entry) => entry !== 'background' && entry !== 'options',
            ),
          },
        }),
      );
    }

    if (!this._development) {
      options.plugins.push(
        new FileManagerPlugin({
          events: {
            onEnd: {
              archive: [
                {
                  source: this._outputDirectoryName,
                  destination: `${this._config.output.path}/${this._browser}.zip`,
                  options: {
                    zlib: {
                      level: 6,
                    },
                  },
                },
              ],
            },
          },
        }),
      );
    }

    return options;
  }

  run() {
    if (!this._development && this._server) {
      throw new Error('Hot reload server requires development mode');
    }

    const options = this._buildOptions();

    webpack(merge(this._config, options), (err, stats) => {
      if (err) {
        console.error(err.stack || err);
        if (err.details) {
          console.error(err.details);
        }
        return;
      }

      console.log(
        stats.toString({
          colors: true,
        }),
      );
    });
  }
}

module.exports = WebpackRunner;
