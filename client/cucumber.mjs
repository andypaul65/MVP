export default {
  default: {
    require: ['src/test/js/steps/**/*.js'],
    import: ['src/test/resources/features/**/*.feature'],
    format: ['progress'],
    publish: false,
  },
};