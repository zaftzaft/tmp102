'use strict';

const exec = require("child_process").execSync;
const fs = require("fs");

let val = ""+exec("i2cget -y 1 0x48 0x00 w");

let lsb = val.slice(2,3);
let msb = val.slice(4,6);

let dec = (parseInt(`0x${msb}${lsb}`, 16) * 0.0625).toFixed(4);

if(dec.slice(-4) === "0000") {
    dec = `${dec.slice(0, -1)}1`;
}

fs.writeFileSync("/opt/node_exporter_directory/tmp102.prom.$$", `sensors_temp ${dec}\n`, "utf8");
fs.renameSync("/opt/node_exporter_directory/tmp102.prom.$$", "/opt/node_exporter_directory/tmp102.prom");
