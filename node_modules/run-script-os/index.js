#! /usr/bin/env node
"use strict";
const path = require("path");

if (!process.env["npm_config_argv"]) {
    console.log("This is meant to be run from within npm script. See https://github.com/charlesguse/run-script-os");
    return;
}
const spawn = require("child_process").spawn;

let scripts;
if (process.platform === "win32") {
    scripts = require("./package.json").scripts;
} else {
    scripts = require(path.join(process.env.PWD, "package.json")).scripts;
}

let npmArgs = JSON.parse(process.env["npm_config_argv"]);
let options = npmArgs.original;
if (!(options[0] === "run" || options[0] === "run-script")) {
    options.unshift("run");
}
let osCommand = `${options[1]}:${process.platform}`
if (!(osCommand in scripts)) {
    let regex = new RegExp(`^(${options[1]}):([a-zA-Z0-9-]*:)*(${process.platform})(:[a-zA-Z0-9-]*)*$`, "g")
    for (let command in scripts) {
        if (command.match(regex)) {
            osCommand = command;
            break;
        }
    }
}
options[1] = osCommand;

let platformSpecific;
if (process.platform === "win32") {
    platformSpecific = spawn("npm.cmd", options, { shell: true, stdio: "inherit"});
} else {
    platformSpecific = spawn("npm", options, { shell: true, stdio: "inherit" });
}
