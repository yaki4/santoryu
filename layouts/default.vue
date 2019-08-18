<template>
  <div>
    <nuxt />
  </div>
</template>

<style lang="scss">
html {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -webkit-font-smoothing:antialiased;
	-moz-osx-font-smoothing:grayscale;
	-moz-font-feature-settings:"lnum";
  -ms-font-feature-settings:"lnum";
  -webkit-font-feature-settings:"lnum";
  -o-font-feature-settings:"lnum";
  font-feature-settings:"lnum";
  box-sizing: border-box;
}
body {
  color: #161216;
  background: #161216;
  -webkit-text-stroke-color: #161216;
}
canvas {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;
}
*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
  user-select: none;
}
p, p a, p span {
  user-select: text;
}
p::selection {
  background: #fff;
  color: #161216;
}
p *::selection {
  background: #fff;
  color: #161216;
}

@media screen and (min-width: 320px) {
html {
  font-size: calc(16px + 6 * ((100vw - 320px) / 680));
}
}
@media screen and (min-width: 1000px) {
  html {
    font-size: 22px;
  }
}
</style>
