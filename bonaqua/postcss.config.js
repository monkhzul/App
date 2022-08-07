module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
  resolve: {
    alias: {
      crypto: require.resolve('rollup-plugin-node-builtins'),
    }
  }
}
