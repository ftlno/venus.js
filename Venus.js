/**
 * @author LinkedIn
 */
var colors    = require('colors'),
    master    = require('./lib/master'),
    executor  = require('./lib/executor'),
    i18n      = require('./lib/i18n'),
    cli       = require('./lib/cli'),
    hostname  = require('os').hostname();

/**
 * Application object
 * @params {Array} args the command line arguments
 */
function Venus(args) {

  init(args);

  /**
   * Initialize application
   * @param {Array} args the command line arguments
   */
  function init(args) {
    var config = cli.parseCommandLineArgs(args);
    config.homeFolder = __dirname;

    if(config.master || !config.test) {
      startMaster(config);
    } else {
      startExecutor(config);
    }
  }

  /**
   * Start in Master mode - server which allows browsers to be captured
   */
  function startMaster(config) {
    console.log( i18n('Starting in master mode').yellow );
    master.start(config);
  }

  /**
   * Start in Executor mode - run tests
   */
  function startExecutor(config) {
    console.log( i18n('Starting in executor mode').red );
    config.masterUrl = 'http://'+hostname+':2012';
    executor.start(config);
  }
}

module.exports = Venus;
