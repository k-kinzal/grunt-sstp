var net = require('net');
var grunt = require('grunt');
var expect = require('chai').expect;

describe('grunt-sstp', function () {

  var _server, _data;
  before(function(done) {
    _server = net.createServer(function(connection) {
      connection.on('data', function(data) {
        _data = data.toString();
      });
    }).listen(9801);
    done();
  });
  after(function(done) {
    _server.close(function() {
      _data = undefined;
      done();
    });
  });

  it('run success task.', function(done) {
    var callback = function(err, result) {
      expect(result.stdout).to.have.string('Done, without errors.');
      done();
    };
    grunt.util.spawn({grunt: true,args: ['success', '--no-color']}, callback);
  });
  it('send success sstp request.', function(done) {
    var actual = 'NOTIFY SSTP/1.1\r\n' +
                         'Sender: grunt-sstp\r\n' +
                         'Script: \\0\\s[5]タスクの実行に成功したよ\\1\\s[10]良かったな\\e\r\n' +
                         'Option: nodescript,notranslate\r\n' +
                         'Charset: UTF-8\r\n';
    var callback = function(err, result) {
      expect(_data).to.equal(actual);
      done();
    };
    grunt.util.spawn({grunt: true,args: ['success', '--no-color']}, callback);
  });

  it('run warning task.', function(done) {
    var callback = function(err, result) {
      expect(result.stdout).to.have.string("Grunt warning test.");
      expect(result.stdout).to.have.string("Aborted due to warnings.");
      done();
    };
    grunt.util.spawn({grunt: true,args: ['warning', '--no-color']}, callback);
  });
  it('send warning sstp request.', function(done) {
    var actual = 'NOTIFY SSTP/1.1\r\n' +
                         'Sender: grunt-sstp\r\n' +
                         'Script: \\0\\s[5]警告を発生させたよ\\1\\s[10]問題ないな\\e\r\n' +
                         'Option: nodescript,notranslate\r\n' + 
                         'Charset: UTF-8\r\n'
    var callback = function(err, result) {
      expect(_data).to.equal(actual);
      done();
    };
    grunt.util.spawn({grunt: true,args: ['warning', '--no-color']}, callback);
  });

  it('run fatal task.', function(done) {
    var callback = function(err, result) {
      expect(result.stdout).to.have.string("Fatal error: Grunt fatal test.");
      done();
    };
    grunt.util.spawn({grunt: true,args: ['fatal', '--no-color']}, callback);
  });
  it('send fatal sstp request.', function(done) {
    var actual = 'NOTIFY SSTP/1.1\r\n' +
                         'Sender: grunt-sstp\r\n' +
                         'Script: \\0\\s[5]致命的なエラーを発生させたよ\\1\\s[10]テストとはいえビックリするな\\e\r\n' +
                         'Option: nodescript,notranslate\r\n' +
                         'Charset: UTF-8\r\n';
    var callback = function(err, result) {
      expect(_data).to.equal(actual);
      done();
    };
    grunt.util.spawn({grunt: true,args: ['fatal', '--no-color']}, callback);
  });

  it('run fail-warning task.', function(done) {
    var callback = function(err, result) {
      expect(result.stdout).to.have.string("Grunt warning test.");
      expect(result.stdout).to.have.string("Aborted due to warnings.");
      done();
    };
    grunt.util.spawn({grunt: true,args: ['fail-warning', '--no-color']}, callback);
  });
  it('send fail-warning sstp request.', function(done) {
    var actual = 'NOTIFY SSTP/1.1\r\n' +
                         'Sender: grunt-sstp\r\n' +
                         'Script: \\0\\s[5]警告を発生させたよ\\1\\s[10]問題ないな\\e\r\n' +
                         'Option: nodescript,notranslate\r\n' + 
                         'Charset: UTF-8\r\n'
    var callback = function(err, result) {
      expect(_data).to.equal(actual);
      done();
    };
    grunt.util.spawn({grunt: true,args: ['fail-warning', '--no-color']}, callback);
  });

  it('run fail-fatal task.', function(done) {
    var callback = function(err, result) {
      expect(result.stdout).to.have.string("Fatal error: Grunt fatal test.");
      done();
    };
    grunt.util.spawn({grunt: true,args: ['fail-fatal', '--no-color']}, callback);
  });
  it('send fail-fatal sstp request.', function(done) {
    var actual = 'NOTIFY SSTP/1.1\r\n' +
                         'Sender: grunt-sstp\r\n' +
                         'Script: \\0\\s[5]致命的なエラーを発生させたよ\\1\\s[10]テストとはいえビックリするな\\e\r\n' +
                         'Option: nodescript,notranslate\r\n' +
                         'Charset: UTF-8\r\n';
    var callback = function(err, result) {
      expect(_data).to.equal(actual);
      done();
    };
    grunt.util.spawn({grunt: true,args: ['fail-fatal', '--no-color']}, callback);
  });

  it('run log-warning task.', function(done) {
    var callback = function(err, result) {
      expect(result.stdout).to.have.string("Grunt warning test.");
      expect(result.stdout).to.have.string("Done, without errors.");
      done();
    };
    grunt.util.spawn({grunt: true,args: ['log-warning', '--no-color']}, callback);
  });
  it('send log-warning sstp request.', function(done) {
    var actual = 'NOTIFY SSTP/1.1\r\n' +
                         'Sender: grunt-sstp\r\n' +
                         'Script: \\0\\s[5]警告を発生させたよ\\1\\s[10]問題ないな\\e\r\n' +
                         'Option: nodescript,notranslate\r\n' + 
                         'Charset: UTF-8\r\n'
    var callback = function(err, result) {
      expect(_data).to.equal(actual);
      done();
    };
    grunt.util.spawn({grunt: true,args: ['log-warning', '--no-color']}, callback);
  });

  it('run log-error task.', function(done) {
    var callback = function(err, result) {
      expect(result.stdout).to.have.string("Grunt error test.");
      expect(result.stdout).to.have.string("Done, without errors.");
      done();
    };
    grunt.util.spawn({grunt: true,args: ['log-error', '--no-color']}, callback);
  });
  it('send log-error sstp request.', function(done) {
    var actual = 'NOTIFY SSTP/1.1\r\n' +
                         'Sender: grunt-sstp\r\n' +
                         'Script: \\0\\s[5]エラーを発生させたよ\\1\\s[10]テストだから気にするな\\e\r\n' +
                         'Option: nodescript,notranslate\r\n' +
                         'Charset: UTF-8\r\n';
    var callback = function(err, result) {
      expect(_data).to.equal(actual);
      done();
    };
    grunt.util.spawn({grunt: true,args: ['log-error', '--no-color']}, callback);
  });

  it('run log-fail task.', function(done) {
    var callback = function(err, result) {
      expect(result.stdout).to.have.string("Grunt error test.");
      expect(result.stdout).to.have.string("Done, without errors.");
      done();
    };
    grunt.util.spawn({grunt: true,args: ['log-fail', '--no-color']}, callback);
  });
  it('send log-fail sstp request.', function(done) {
    var actual = 'NOTIFY SSTP/1.1\r\n' +
                         'Sender: grunt-sstp\r\n' +
                         'Script: \\0\\s[5]エラーを発生させたよ\\1\\s[10]テストだから気にするな\\e\r\n' +
                         'Option: nodescript,notranslate\r\n' +
                         'Charset: UTF-8\r\n';
    var callback = function(err, result) {
      expect(_data).to.equal(actual);
      done();
    };
    grunt.util.spawn({grunt: true,args: ['log-fail', '--no-color']}, callback);
  });

});