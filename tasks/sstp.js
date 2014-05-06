/*
 * grunt-sstp
 * https://github.com/k-kinzal/grunt-sstp
 *
 * Copyright (c) 2014 k-kinzal
 * Licensed under the MIT license.
 */
'use strict';

module.exports = function (grunt) {
  var hooker = require('hooker');
  var sstp = require('../lib/sstp');

  var defaults = {
    port: 9801,
    host: '127.0.0.1',
    command: 'NOTIFY SSTP/1.1\n\
                        Sender: grunt-sstp\n\
                        Script: \\h\\s[0]タスクの実行をしたよ\\w9\\u\\s[11]失敗してるぞ\\w9\\w9\\h\\s[4]\\n\\nええー\\e\n\
                        Option: nodescript,notranslate\n\
                        Charset: UTF-8',
    success: 'NOTIFY SSTP/1.1\n\
                   Sender: grunt-sstp\n\
                   Script: \\0\\s[5]タスクの実行に成功したよ\\1\\s[10]良かったな\\e\n\
                   Option: nodescript,notranslate\n\
                   Charset: UTF-8'
  };

  grunt.registerTask('sstp', 'Grunt notify by Sakura Script Transfer Protocol.', function () {
    // initialize
    var options = this.options(defaults);
    var command = options.command;
    var done = this.async();
    sstp.connect(options.host, options.port, function() {
      // callbacks
      function successHook(message) { notify(message, options.success); }
      function warningHook(message) { notify(message, options.warning); }
      function errorHook(message) { notify(message, options.error); }
      function fatalHook(message) { notify(message, options.fatal); }
      function notify(message, command, level) {
        message && sstp.request((command || options.command).replace('{{message}}', message));
        sstp.close();
      }
      // run on success
      hooker.hook(grunt.log, 'success', successHook);
      // run on warning
      hooker.hook(grunt, 'warn', warningHook);
      hooker.hook(grunt.fail, 'warn', warningHook);
      hooker.hook(grunt.log, 'warn', warningHook);
      // run on error
      hooker.hook(grunt.log, 'fail', errorHook);
      hooker.hook(grunt.log, 'error', errorHook);
      // run on fatal
      hooker.hook(grunt, 'fatal', fatalHook);
      hooker.hook(grunt.fail, 'fatal', fatalHook);
      done();
    });
  });
};
