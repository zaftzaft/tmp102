'use strict';

const exec = require("child_process").execSync;
const fs   = require("fs");
const path = require("path");

let addr = process.argv[2] || "0x48";
let filename = `/tmp/node_exporter/tmp102-${addr}.prom`;

let val = ""+exec(`i2cget -y 1 ${addr} 0x00 w`);

let lsb = val.slice(2, 3);
let msb = val.slice(4, 6);

let dec = (parseInt(`0x${msb}${lsb}`, 16) * 0.0625).toFixed(4);

if(dec.slice(-4) === "0000") {
  dec = `${dec.slice(0, -1)}1`;
}

try{
  fs.mkdirSync(path.dirname(filename));
}catch(e){
  //if(e.errno === -17) {}
}

fs.writeFileSync(`${filename}.$$`, `sensors_temp{addr="${addr}"} ${dec}\n`, "utf8");
fs.renameSync(`${filename}.$$`, filename);
