# grunt-sstp

> Grunt notify by Sakura Script Transfer Protocol.

## Getting Started
This plugin requires Grunt.

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-sstp --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-sstp');
```

## The "sstp" task

### Overview
In your project's Gruntfile, add a section named `sstp` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  sstp: {
    options: {
      // Task-specific options go here.
    },
  }
})

// Load task
grunt.loadNpmTasks('grunt-sstp');

// run sstp notify
grunt.task.run('sstp');
```

### Options

#### host
Type: `String`
Default value: `'127.0.0.1'`

The SSTP server hostname.

#### port
Type: `Integer`
Default value: `9801`

The SSTP server port number.

#### command
Type: `String`
Default value: `'NOTIFY SSTP/1.1\r\n\
                           Sender: grunt-sstp\r\n\
                           Script: \\h\\s[0]タスクの実行をしたよ\\w9\\u\\s[11]失敗してるぞ\\w9\\w9\\h\\s[4]\\n\\nええー\\e\r\n\
                          Option: nodescript,notranslate\r\n\
                          Charset: UTF-8'\r\n'`

A default command. it performs, when other comannds are no set up.

#### success
Type: `String`
Default value: `'NOTIFY SSTP/1.1\r\n\
                           Sender: grunt-sstp\r\n\
                           Script: \\0\\s[5]タスクの実行に成功したよ\\1\\s[10]良かったな\\e\r\n\
                           Option: nodescript,notranslate\r\n\
                           Charset: UTF-8\r\n'`

A success command. it performs, when Grunt is 'Done, without errors.'.

#### warning
Type: `String`

A warning command. it performs, when warning occurs in Grunt.

#### error
Type: `String`

A error command. it performs, when error occurs in Grunt.

#### fatal
Type: `String`

A fatal error command. it performs, when  fatal error occurs in Grunt.

### Command Reference

#### Sakura Script Transfer Protocol
[http://usada.sakura.vg/contents/sstp.html](http://usada.sakura.vg/contents/sstp.html)

#### SIORI
[http://usada.sakura.vg/contents/shiori.html](http://usada.sakura.vg/contents/shiori.html)

#### SIORI Surface
[http://usada.sakura.vg/contents/shell.html](http://usada.sakura.vg/contents/shell.html)

## License
Copyright (c) 2014 k-kinzal. Licensed under the MIT license.
