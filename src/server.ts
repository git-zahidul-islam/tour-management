/* eslint-disable no-console */
import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";
import { envVar } from "./app/config/env";

let server: Server;

const startServer = async () => {
    try {
        await mongoose.connect(envVar.DB_URL);
        console.log("Database connect successfully!!!");

        server = app.listen(envVar.PORT, () => {
            console.log(`Server is listening on the port ${envVar.PORT}`);
        });
    } catch (error) {
        console.log("Database connect Error!!!",error);
    }
};
startServer();


/* 
*there are 3 typre of error i will get 
* 1. unhabdle rejection
* 2. unchaught
* 3. signal terminations
*/

process.on("unhandledRejection",(err)=>{
    console.log("Unhandle rejection detected.. server sutting down..",err);

    if(server){
        server.close(()=>{
            process.exit(1)
        })
    };

    process.exit(1);
});

process.on("uncaughtException",(err)=>{
    console.log("Uncaught exception detected.. server sutting down..",err);

    if(server){
        server.close(()=>{
            process.exit(1)
        })
    };

    process.exit(1);
});

process.on("SIGTERM",()=>{
    console.log("SIGTERM signal received.. server sutting down..");

    if(server){
        server.close(()=>{
            process.exit(1)
        })
    };

    process.exit(1);
});

// unhandledRejection below --
// Promise.reject(new Error('i forget handle promise'))
// uncaughtException error below
// throw new Error('i not handle local error')