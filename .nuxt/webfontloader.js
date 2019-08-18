
import WebFont from 'webfontloader'

const options = {"google":{"families":["M PLUS 1p:900"]},"active":function() {
      window._fontsAreLoaded = true
    },"loading":() => {
      window._fontsAreLoading = true
    }}

WebFont.load(options)
