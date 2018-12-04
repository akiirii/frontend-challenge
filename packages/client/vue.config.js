module.exports = {
  devServer: {
    proxy: {
      "/countries": {
        target: "http://localhost:5000"
      },
      "/task": {
        target: "http://localhost:5000"
      }
    }
  }
}
