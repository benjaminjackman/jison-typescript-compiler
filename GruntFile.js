module.exports = function (grunt) {
  grunt.loadNpmTasks('grunt-typescript');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-shell');

  //reused locations
  var tsMainSrc = 'src/main/ts/**/*.ts';
  var tsMainOut = 'target/ts';
  var tsSamplesSrc = 'src/test/samples/ts/**/*.ts';
  var tsSamplesOut = 'target/test/samples/ts/tsc';

  //Makes a jison_js and parse_js task that will execute different jison grammars
  function makeShells() {
    var res = {};
    ['calc', 'js'].forEach(function (name) {
      var jisonGrammar = 'src/main/jison/' + name + '-grammar.jison';
      var jisonLex = 'src/main/jison/' + name + '-lex.jisonlex';
      var jisonOut = 'target/main/jison/' + name + '-parser.js';

      res["jison-" + name] = {
        command: 'jison ' + jisonGrammar + ' ' + jisonLex + ' -o ' + jisonOut,
        options: {failOnError: true}
      };
      res['parse-' + name] = {
        command: 'node ' + jisonOut + ' ' + 'src/test/samples/sample.' + name,
        options: {failOnError: true, stdout: true}
      };

      grunt.registerTask('exec-'+name, ["shell:jison-"+name, "shell:parse-"+name]);
    });



    return res
  }

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
      }
    },

    shell: makeShells()


  });

  grunt.registerTask('jison', ['shell:jison']);
  grunt.registerTask('calc', ['jison', 'shell:calc']);

  grunt.registerTask('default', ['typescript']);
  //loops and recompiles / tests on every source file change.
  grunt.registerTask('loop', ['typescript', 'jison', 'watch']);

};

