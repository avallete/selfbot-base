const chalk = require('chalk');
const winston = require('winston');
const path = require('path');
const util = require('util');
const stripAnsi = require('strip-ansi');


const moment = require('moment');
require('winston-daily-rotate-file');
require('moment-duration-format');

const config = require('./config.js').selfbot[0];
global.embedColor = parseInt("0x" + Math.floor(Math.random() * 16777215).toString(16));

const komada = require('komada');

global.logger = new (
  winston.Logger
)({
  transports: [
    new (
      winston.transports.Console
    )({
      level    : 'silly',
      colorize : true,
      label    : `C 0`,
      timestamp: () => `[${chalk.grey(moment().format('HH:mm:ss'))}]`,
    }),
    new (
      winston.transports.DailyRotateFile
    )({
      colorize   : false,
      datePattern: '.yyyy-MM-dd',
      prepend    : true,
      json       : false,
      formatter  : function ({ level, message = '', meta = {}, formatter, depth, colorize }) {
        const timestamp = moment().format('YYYY-MM-DD hh:mm:ss a');
        const obj = Object.keys(meta).length
          ? `\n\t${meta.stack ? meta.stack : util.inspect(meta, false, depth || null, colorize)}`
          : '';
        return `${timestamp} [${level.toUpperCase()}] ${stripAnsi(message)} ${obj}`;
      },
      filename   : path.join(process.cwd(),`logs/Bot-0.log`),
    }),
  ],
});

const client = new komada.Client({
  ownerID      : config.ownerID,
  prefix       : config.prefix,
  selfbot      : true,
  cmdLogging   : true,
});
client.login(config.token);



