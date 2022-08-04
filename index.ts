import { DataSource } from "typeorm";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";
import { Addon } from "./entities/Addon";
import { License } from "./entities/License";
import { LicenseResponse, TransactionResponse } from "./types/Response";
import { Transaction } from "./entities/Transaction";

import ormconfig from "./ormconfig";

const dataSource = new DataSource(ormconfig as PostgresConnectionOptions);

export const createDBConnection = async () => {
    if (!dataSource.isInitialized) {
        await dataSource.initialize()
    }
    return dataSource;
}

export const getConnection = () => {
    return dataSource;
};

export const getRepository: DataSource["getRepository"] = (repository) =>
    getConnection().getRepository(repository);


export {
    Addon,
    License,
    LicenseResponse,
    Transaction,
    TransactionResponse,
};
