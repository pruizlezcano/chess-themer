<a name="readme-top"></a>

<br />
<div align="center">
  <a href="https://github.com/pruizlezcano/chess-themer">
    <img src="./public/icons/icon.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Chess Themer</h3>

  <p align="center">
    Unify and personalize your chess experience across Chess.com and Lichess.org with seamless theme synchronization.
    <br />
    <br />
</div>


## Getting Started

##### Firefox

Install Chess Themer from it's [Firefox Add-Ons page](https://addons.mozilla.org/firefox/addon/chess-themer)

##### Other browsers

Follow the instructions in [Manual installation](#manual-installation)

### Manual installation

Download the latest Chess Themer [build](https://github.com/pruizlezcano/chess-themer/releases/latest) and import it to your browser.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Build

**Prequisites**

* [node + npm](https://nodejs.org/en) (Current Version)

**Steps**

1. Clone the repo
   ```sh
   git clone https://github.com/pruizlezcano/chess-themer.git
   ```
2. Install NPM packages
   ```sh
   pnpm install
   ```
3. Build and package the extension
   ```sh
   pnpm release
   ```
4. A new folder `release` is generated containing the extension build for each browser

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'feat: Added some AmazingFeature`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Adding your themes

1. Fork the Project
2. Create your Theme Branch (`git checkout -b theme/AmazingTheme`)
3. Add the images to `public/themes/`
  - `boards`: The board image should be named `200.png` and the recommended dimensions are `1600x1600`
  - `pieces`: Each piece should be named with two letters `<color><piece>.png` for **b**lack, **w**hite, **p**awn, **b**ishop, k**n**ight, **r**ook, **q**ueen, **k**ing and the recommended dimensions are `150x150`
4. Add the entry in `src/themes.ts`
5. Run the tests (`pnpm test`)
6. Commit your Changes (`git commit -m 'feat(theme): Added theme AmazingTheme'`)
7. Push to the Branch (`git push origin theme/AmazingTheme`)
8. Open a Pull Request

> if the name exist you can append `@yourname` so the folder name will be `amazing-theme@yourname`


<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
