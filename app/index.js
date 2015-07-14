'use strict';
var chalk = require('chalk'),
	yeoman = require('yeoman-generator');
var _ = require('underscore');
var slugify = require("underscore.string/slugify");
var async = require('async');
var _nodeChildProcess = require('child_process');
var email = require('git-user-email');
var userEmail = email();

var GitTagGenerator = yeoman.generators.Base.extend({

	initializing: function() {
		this.pkg = require('../package.json');
	},

	prompting: function() {
		var done = this.async();

		this.log(
			'\n' + chalk.bold.underline('Git tag creator.')
		);

		this.prompt([
			{
			type: 'confirm',
			name: 'createTag',
			message: 'Would you like to create a new tag?',
			store: true,
			default: true
			}, {
				type: 'input',
				name: 'tagValue',
				message: 'What version is it?',
				default: '0.1',
				store: true,
				when: function (props) {
					return props.createTag;
				}
			}

		], function(props){
			this.createTag = props.createTag;
			this.tagValue = props.tagValue;
			done();
		}.bind(this));
	},

	end: function() {

		var done = this.async();
			if(this.createTag){
			  this.log('\n\nInitializing Git repository. If this fail, try running ' +
					   chalk.yellow.bold('git init') +
					   ' and make a first commit manually');
			  this.log(this.tagValue)
			  var tagOption = this.tagValue;

			  async.series([
				function (taskDone) {
				  //exec('git tag -a v' + tagOption, taskDone);

				  _nodeChildProcess.exec('git tag -a v' + tagOption + ' -m "Created Tag v '+tagOption+' by '+userEmail+' "', taskDone);
				},
				function (taskDone) {
				  //exec('git push origin v' + tagOption, taskDone);
				  console.log(chalk.yellow.bold('Press "Y" to Push Tag to Origin or "N" to push later.'));
				  _nodeChildProcess.exec('git push --tags', taskDone);
				}
			  ], function (err) {

				console.log(err);
			if (err === 127) {
			  this.log('Could not find the ' + chalk.yellow.bold('git') + ' command. Make sure Git is installed on this machine');
			  return;
			}

			this.log(chalk.green('complete') + ' Git Tag has been created');

			done();
		  }.bind(this));
		} else {
				this.log(chalk.green('complete') + ' Continue on with your work.');
			}

	}

});

module.exports = GitTagGenerator;
