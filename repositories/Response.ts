import { EntityRepository, Repository, SelectQueryBuilder } from "typeorm";
import { Response } from "../entities/Response";
import { LicenseResponse, TransactionResponse } from "../types/Response";

type ByDefaultLicense = {licenseType: string; addonKey: string};
type ByAddonLicenseId = ByDefaultLicense & { addonLicenseId: string};
type ByLicenseId = ByDefaultLicense & { licenseId: string};

type ByTransactionId = {transactionId: string; licenseId: string; addonKey: string};

type By = ByAddonLicenseId | ByTransactionId | ByLicenseId;

@EntityRepository(Response)
export class ResponseRepository extends Repository<Response> {
    createNew = (data: LicenseResponse | TransactionResponse, fromDate: Date = new Date()): Promise<Response> => {
        const response = new Response();
        response.data = data;
        response.fromDate = fromDate;
        return this.save(response);
    };

    updateFromDateAndCreateNew = (response: Response, data: LicenseResponse | TransactionResponse): Promise<Response> => {
        const now = new Date();
        response.toDate = now;
        this.save(response);
        return this.createNew(data, now);
    };

    private activeRecord = (at: Date): string => {
        const atEpoch = at.getTime() / 1000;
        return `to_timestamp(${atEpoch}) between response.fromDate and response.toDate`;
    };

    private getJSONBWhere = (by: By): [string, typeof by] => {
        const query = Object.keys(by).map(
            key => `response.data->>'${key}' = :${key}`
        ).join(" AND ");
        return [query, by];
    };

    private createDefaultQuery = (by: By, at: Date = new Date()): SelectQueryBuilder<Response> => this.createQueryBuilder("response")
        .where(...this.getJSONBWhere(by))
        .andWhere(this.activeRecord(at));

    findLicense = (by: ByAddonLicenseId | ByLicenseId, at: Date = new Date()): Promise<Response|undefined> => this.createDefaultQuery(by, at)
        .andWhere("response.data->>'transactionId' IS NULL")
        .getOne();

    findTransaction = (by: ByTransactionId, at: Date = new Date()): Promise<Response|undefined> => this.createDefaultQuery(by, at)
        .getOne();
}
