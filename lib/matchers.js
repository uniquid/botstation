'use strict';

function isMessage(ev, s) {
    return (ev.type === 'message' && ev.text === s);
}

function beginsWith(ev, s) {
    return (ev.type === 'message' && ev.text.substring(0, s.length) === s);
}

function isJoining(ev) {
    return ev.type === 'channel_joined';
}

module.exports = {
    isMessage: isMessage,
    beginsWith: beginsWith,
    isJoining: isJoining
}
