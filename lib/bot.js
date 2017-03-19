'use strict';

const SlackBot = require('slackbots');
const matchers = require('./matchers');

function match(data, set) {
    return new Promise(function(resolve, reject) {
       var task = set.find(t => matchers[t.matcher](data, t.content));

       if (!task) { return reject({error: "Task not found"}); }
       resolve(task);
    });
}

function parse(data, ctx) {
    match(data, ctx.taskSet).then(function(task) {
        task.exec(ctx.bot.instance, data, ctx.bot.params);
    }).catch(function() {
        return;
    });
}

function storeConfig(configObj) {
    Object.assign(this.configStore, configObj)
}

function task(t) {
    this.taskSet.push(t);
}

function start(cb) {
    var slackbot = new SlackBot({
        token: this.configStore.key,  
        name: this.configStore.name
    });

    var ctx = this;

    this.bot.instance = slackbot;

    slackbot.on('message', function(data) {
        parse(data, ctx)
    });

    cb()
}

function Bot() {
    this.configStore = {
        key: "",
        name: "A Simple Bot" 
    };
    this.taskSet = [];
    this.bot = {
        instance: {},
        params: {as_user: true}
    }
    this.config = storeConfig;
    this.task = task;
    this.start = start;
    this.parse = parse;
    this.match = match;
}

module.exports = Bot
