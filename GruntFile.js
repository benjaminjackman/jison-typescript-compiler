module.exports = function (grunt) {
  grunt.loadNpmTasks('grunt-typescript');
  grunt.loadNpmTasks('grunt-contrib-watch');

  var jsGen = 'src/main/js/gen';

  grunt.initConfig({
    typescript: {
      theta: {
        src: ['src/main/ts/**/*.ts'],
        dest: 'target/ts',
        options: {
          target: 'es5', //or es3
          sourcemap: true
        }
      }
    },

    watch: {
      ts: {
        files: ['src/main/ts/**/*.ts'],
        tasks: ['typescript']
      }
    }
  });


  grunt.registerTask('default', ['typescript']);
  //loops and recompiles / tests on every source file change.
  grunt.registerTask('loop', ['typescript', 'watch']);

};

