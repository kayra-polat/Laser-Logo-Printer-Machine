# Laser-Logo-Printer-Machine

## Quick Overview
- The program is a console application written using javascript that can engrave shapes on an 11x11 grid and compare these shapes. Today, this system is also a part of the 3D printer. Node.js environment is needed for the program to run.

## Quick Guide for Node.js
- You can directly to use this link to download and install [Node.js](https://nodejs.org/en/)
- You must download Node.js version 16.14.0 to evaluate the program.
- You can find detail of Command-line options in Node.js website. -> [Command-line options](https://nodejs.org/dist/latest-v16.x/docs/api/cli.html)
- After installing Node js, you can see the version of node.js on your computer by opening Command Prompt and typing the below command to test whether it is installed.
```bash
node -v
```
- You can run the program with this command in command prompt:
```bash
node (program name)
EX: node main.js
```

## VS CODE
- I developed this program in VS code. You can also download VS code from here -> [Visual Studio Code](https://code.visualstudio.com/download)

## Explanation of the Program
- There are four commands the program can take. LOGO, ENGRAVE, SAME, EXIT. Let me explain the functions of these commands in turn with examples.
  - **LOGO** command is a command that allows us to tell the program how to draw the shape we want to draw, using which main directions.
    ```bash
    LOGO [logo name] [Directions]
    ```
    EX: 
    ```bash
    LOGO logo1 DDURLDUU
    ```
    D = Down
    U = Up
    R = Right
    L = Left
  - **ENGRAVE** command is a command that allows us to engrave the given logo (shape) with given directions. Also, in this command, we must give the x and y coordinates to the program.   


