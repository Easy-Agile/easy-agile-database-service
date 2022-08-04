import { getConnection } from "typeorm";
import { createDBConnection } from "./index";

import { Addon } from "./entities/Addon";

describe("createDBConnection", () => {
    it("should create connection which can be used to return data", async () => {
        const connection = await createDBConnection();
        expect(connection.isConnected).toBe(true);
        const key = "com.easyagile.personas";
        const personas = await getConnection()
            .getRepository(Addon)
            .createQueryBuilder("Addon")
            .where("\"Addon\".key = :key", { key })
            .getOne();
        await connection.close();
        expect(personas?.name).toEqual("Easy Agile Personas for Jira");
        expect(personas?.key).toEqual(key);
    });
});
