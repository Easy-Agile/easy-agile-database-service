import "dotenv/config";
import { createDBConnection, getRepository, License } from "./database";
import express, { Request, Response } from "express";

const app = express();
app.use("/healthcheck", (request: Request, response: Response) =>{
    response.sendStatus(200);
});

app.use("/license/:id", async (request: Request, response: Response) =>{
    const id = request.params.id ? +request.params.id : 0;
    const license = await getRepository(License).findOneBy({ id });
    response.send(JSON.stringify(license));
});

const startExpressListener = () => {
    return new Promise<void>((resolve, reject) => {
        app.listen(8089, () => resolve()).on("error", reject);
    });
};

const startServer = async () => {
    try {
        await createDBConnection();
        console.log("Database connection setup successfully");

        await startExpressListener();
        console.log("Started server on port 8089");
    } catch (error) {
        console.error(
            `Error occurred starting the server ${(error as Error).message}`,
        );
        process.exit(1);
    }
};

startServer();
