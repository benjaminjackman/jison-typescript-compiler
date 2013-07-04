module.exports = function (grunt) {
  grunt.loadNpmTasks('grunt-typescript');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-shell');

  //reused locations
  var tsMainSrc = 'src/main/ts/**/*.ts';
  var tsMainOut = 'target/ts';
  var tsSamplesSrc = 'src/test/samples/ts/**/*.ts';
  var tsSamplesOut = 'target/test/samples/ts/tsc';
  var jisonGrammar = 'src/main/jison/typescript-grammar.jison';
  var jisonLex = 'src/main/jison/typescript-lex.jisonlex';
  var jisonOut = 'target/main/jison/typescript-parser.js';

  grunt.initConfig({
    typescript: {
      main: {
        src: [tsMainSrc],
        dest: tsMainOut,
        options: {
          target: 'es3',
          sourcemap: true
        }
      },
      testSamples: {
        src: [tsSamplesSrc],
        dest: tsSamplesOut,
        options: { target: 'es3' }
      }
    },

    watch: {
      tsMain: {
        files: [tsMainSrc],
        tasks: ['typescript:main']
      },
      tsSamples: {
        files: [tsSamplesSrc],
        tasks: ['typescript:testSamples']
      },
      jison: {
        files: [jisonGrammar, jisonLex],
        tasks: ['jison']
      }
    },

    shell: {
      jison: {
        command: 'jison ' + jisonGrammar + ' ' + jisonLex + ' -o ' + jisonOut,
        options: {failOnError: true}
      },
      calc: {
        command: 'node '+ jisonOut + ' ' + 'src/test/samples/calculator/sample.calc',
        options: {failOnError: true, stdout: true}
      }

    }


  });

  grunt.registerTask('jison', ['shell:jison']);
  grunt.registerTask('calc', ['jison', 'shell:calc']);

  grunt.registerTask('default', ['typescript']);
  //loops and recompiles / tests on every source file change.
  grunt.registerTask('loop', ['typescript', 'jison', 'watch']);

};

