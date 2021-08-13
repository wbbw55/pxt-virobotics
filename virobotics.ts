
//% weight=5 color=#4B7A00 icon="\uf140"
//% groups='["Generic", "Face", "Posture", "Other"]'
namespace VIRobotics {

    let cmd = pins.createBuffer(3);
    const addrI2c = 0x71;
    
    //% blockId=setRecogOn block="[VIRobotics] Start the Generic Recognizer"
    //% weight=95
    //% group="Generic"
    export function setRecogOn(): void {
        cmd[0] = "G".charCodeAt(0);
        cmd[1] = "R".charCodeAt(0);
        cmd[2] = 1;
        pins.i2cWriteBuffer(addrI2c, cmd);
        basic.pause(100);
    }
    
    //% blockId=setRecogOff block="[VIRobotics] Stop the Generic Recognizer"
    //% weight=85
    //% group="Generic"
    export function setRecogOff(): void {
        cmd[0] = "G".charCodeAt(0);
        cmd[1] = "R".charCodeAt(0);
        cmd[2] = 0;
        pins.i2cWriteBuffer(addrI2c, cmd);
        basic.pause(100);
    }
    
    //% blockId=getRecogResult block="[VIRobotics] Get the Generic Recognizer Result"
    //% weight=75
    //% group="Generic"
    export function getRecogResult(): string {
        cmd[0] = "G".charCodeAt(0);
        cmd[1] = "R".charCodeAt(0);
        cmd[2] = 2;
        pins.i2cWriteBuffer(addrI2c, cmd);
        basic.pause(10);
        let r = pins.i2cReadBuffer(addrI2c, 16, false);
        return r.toString().split('#')[0];
    }
    
    //% blockId=print block="[VIRobotics] Print the Specified Text: $text|"
    //% weight=95
    //% group="Other"
    export function printText(text:string): void {
        let cmdText = pins.createBuffer(22);
        cmdText[0] = "O".charCodeAt(0);
        cmdText[1] = "P".charCodeAt(0);
        for (let i=0; i<20; i++) {
            if (text.length>i) {
                cmdText[2+i] = text.charCodeAt(i);
            } else {
                cmdText[2+i] = 0;
            }
        }
        pins.i2cWriteBuffer(addrI2c, cmdText);
        basic.pause(100);
    }

    // ...

}
