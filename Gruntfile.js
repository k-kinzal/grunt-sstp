/*
 * grunt-sstp
 * https://github.com/k-kinzal/grunt-sstp
 *
 * Copyright (c) 2014 k-kinzal
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {
  // time
  // require('time-grunt')(grunt);
  // load all npm grunt tasks
  require('load-grunt-tasks')(grunt);
  grunt.loadTasks('tasks');
  // grunt configuration
  grunt.initConfig({
    mochaTest: {
      notify: {
          src: 'test/**/*.js',
          options: {
              timeout: 10000,
              reporter: 'dot'
          }
      }
    },
    sstp: {
      options: {
        warning: 'NOTIFY SSTP/1.1\n\
                         Sender: grunt-sstp\n\
                         Script: \\0\\s[5]警告を発生させたよ\\1\\s[10]問題ないな\\e\n\
                         Option: nodescript,notranslate\n\
                         Charset: UTF-8',
        error: 'NOTIFY SSTP/1.1\n\
                    Sender: grunt-sstp\n\
                    Script: \\0\\s[5]エラーを発生させたよ\\1\\s[10]テストだから気にするな\\e\n\
                    Option: nodescript,notranslate\n\
                    Charset: UTF-8',
        fatal: 'NOTIFY SSTP/1.1\n\
                  Sender: grunt-sstp\n\
                  Script: \\0\\s[5]致命的なエラーを発生させたよ\\1\\s[10]テストとはいえビックリするな\\e\n\
                  Option: nodescript,notranslate\n\
                  Charset: UTF-8'
      }
    }
  });
  // debugging
  grunt.registerTask('success', function() {
  });
  grunt.registerTask('warning', function() {
    grunt.warn('Grunt warning test.');
  });
  grunt.registerTask('fatal', function() {
    grunt.fatal('Grunt fatal test.');
  });
  grunt.registerTask('fail-warning', function() {
    grunt.fail.warn('Grunt warning test.');
  });
  grunt.registerTask('fail-fatal', function() {
    grunt.fail.fatal('Grunt fatal test.');
  });
  grunt.registerTask('log-warning', function() {
    grunt.log.warn('Grunt warning test.');
  });
  grunt.registerTask('log-error', function() {
    grunt.log.error('Grunt error test.');
  });
  grunt.registerTask('log-fail', function() {
    grunt.log.fail('Grunt error test.');
  });
  // test
  grunt.registerTask('test', ['mochaTest']);
  grunt.cli.tasks.indexOf('test') === -1 && grunt.task.run('sstp');
};
