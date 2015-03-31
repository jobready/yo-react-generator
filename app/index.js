'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var mkdirp = require('mkdirp');

module.exports = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../package.json');
  },

  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the slick ' + chalk.red('React') + ' generator!'
    ));

    var prompts = [
      {
        type: 'input',
        name: 'appName',
        message: 'Your project name',
        default: this.appName
      },
      {
        type: 'confirm',
        name: 'skipInstall',
        message: 'Skip npm install?',
        default: true
      },
    ];

    this.prompt(prompts, function (props) {
      this.appName = props.appName;
      this.options['skip-install'] = props.skipInstall;

      done();
    }.bind(this));
  },

  writing: {
    app: function () {
      var file = JSON.parse(this.readFileAsString(this.templatePath('_package.json')));
      file.name = this.appName;
      this.write(this.destinationPath('package.json'),JSON.stringify(file));

      this.fs.copy(
        this.templatePath('_bower.json'),
        this.destinationPath('bower.json')
      );

      this.fs.copy(
        this.templatePath('_gulpfile.js'),
        this.destinationPath('gulpfile.js')
      );
    },

    projectFolders: function() {
      var folders = [
        'dist',
        'example',
        'src/actions',
        'src/components',
        'src/constants',
        'src/dispatcher',
        'src/stores',
        'src/utils'
      ];
      folders.forEach(function(element) {
        mkdirp(element);
      });
    },

    projectfiles: function () {
      this.fs.copy(
        this.templatePath('editorconfig'),
        this.destinationPath('.editorconfig')
      );
      this.fs.copy(
        this.templatePath('jshintrc'),
        this.destinationPath('.jshintrc')
      );
    }
  },

  install: function () {
    this.installDependencies({
      skipInstall: this.options['skip-install']
    });
  }
});
