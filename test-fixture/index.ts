import { createConnection, getConnectionManager, getCustomRepository } from "typeorm";
import { Response } from "../entities/Response";
import { ResponseRepository } from "../repositories/Response";
import { licenseResponse } from "./licenseResponse";
import { transactionResponse } from "./transactionResponse";
import { createDBConnection } from "../index";
import { LicenseResponse, TransactionResponse } from "../types/Response";

export const createTestConnection = async () => createConnection({
    dropSchema: true,
    entities: [Response],
    logging: ["error"],
    maxQueryExecutionTime: 500,
    name: "test",
    schema: "test",
    synchronize: true,
    type: "postgres",
    url: process.env.DB_URL,
});

export const setupTestSchema = async () => {
    const connection = await createDBConnection();
    await connection.query("CREATE SCHEMA IF NOT EXISTS test");
};

const getTestRepository = (repository: any): typeof repository => getCustomRepository(repository, "test");

const createResponseData = async (responseRepository: ResponseRepository, data: LicenseResponse | TransactionResponse): Promise<Response> => {
    const preexistingResponse: Response = new Response();
    preexistingResponse.data = data;
    return responseRepository.save(preexistingResponse);
};

export const createFixture = async () => {
    const responseRepository: ResponseRepository = getTestRepository(ResponseRepository);

    await createResponseData(responseRepository, licenseResponse({ isServer: false }));
    await createResponseData(responseRepository, licenseResponse({ isServer: true }));

    await createResponseData(responseRepository, transactionResponse());
};

const dropTestConnection = () => getConnectionManager().get("test").close();

export const teardownTestSchema = async () => {
    await getConnectionManager().get("default").query("DROP SCHEMA test CASCADE");
    return getConnectionManager().get("default").close();
};

export const useTestFixture = async () => {
    beforeAll(async () => {
        await setupTestSchema();
    });

    beforeEach(async () => {
        await createTestConnection();
        await createFixture();
    });
    afterEach(async () => {
        await dropTestConnection();
    });

    afterAll(async () => {
        await teardownTestSchema();
    });
};

export { getTestRepository as getCustomRepository, licenseResponse, transactionResponse };
