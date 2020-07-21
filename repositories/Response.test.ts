import { advanceTo, clear } from "jest-date-mock";
import { isEmpty } from "lodash";
import {
    getCustomRepository,
    useTestFixture,
    licenseResponse,
    transactionResponse,
} from "../test-fixture";
import {
    ADDON_KEY,
    LICENSE_ID,
    LICENSE_TYPE,
} from "../test-fixture/const";
import { ResponseRepository } from "./Response";
import { LicenseResponse, TransactionResponse } from "../types/Response";

describe("ResponseRepository", () => {
    useTestFixture();

    describe("createNew", () => {
        it("should create a new record in the db given a valid licenseResponse", async () => {
            const fixedDate = new Date(2019, 1, 1);
            advanceTo(fixedDate);
            const responseRepository: ResponseRepository = getCustomRepository(ResponseRepository);
            const saveSpy = jest.spyOn(responseRepository, "save");
            const data: LicenseResponse = licenseResponse({ isServer: false });
            await responseRepository.createNew(data);
            expect(saveSpy).toHaveBeenCalledWith(expect.objectContaining({
                data,
                fromDate: fixedDate,
                toDate: Infinity,
            }));
            clear();
        });
    });

    describe("updateFromDateAndCreateNew", () => {
        it("should update the toDate of the current response and create a new record", async () => {
            const createdDate = new Date(2019, 1, 1);
            const updatedDate = new Date(2020, 1, 1);
            advanceTo(createdDate);
            const responseRepository: ResponseRepository = getCustomRepository(ResponseRepository);
            const data: LicenseResponse = licenseResponse({ isServer: false });
            const response = await responseRepository.createNew(data);

            advanceTo(updatedDate);
            const changedData: LicenseResponse = data || {};
            expect(isEmpty(changedData)).toBe(false);
            changedData.licenseType = "COMMERCIAL";

            const saveSpy = jest.spyOn(responseRepository, "save");
            await responseRepository.updateFromDateAndCreateNew(response, changedData);

            expect(saveSpy).toHaveBeenCalledTimes(2);
            expect(saveSpy).toHaveBeenNthCalledWith(
                1, expect.objectContaining({
                    data,
                    fromDate: createdDate,
                    toDate: updatedDate,
                }));
            expect(saveSpy).toHaveBeenNthCalledWith(
                2, expect.objectContaining({
                    data: changedData,
                    fromDate: updatedDate,
                    toDate: Infinity,
                }));

            clear();
        });
    });

    describe("findLicense", () => {
        it("should find the default cloud license in the test fixture", async () => {
            const responseRepository: ResponseRepository = getCustomRepository(ResponseRepository);
            const responseData: LicenseResponse = licenseResponse({ isServer: false });
            const response = await responseRepository.findLicense({
                addonKey: responseData.addonKey,
                addonLicenseId: responseData.addonLicenseId,
                licenseType: responseData.licenseType,
            });
            expect(response?.data).toEqual(responseData);
        });
        it("should not find the default server license in the test fixture if the at date is outside the record's fromDate and toDate", async () => {
            const responseRepository: ResponseRepository = getCustomRepository(ResponseRepository);
            const responseData: LicenseResponse = licenseResponse({ isServer: true });
            const response = await responseRepository.findLicense({
                addonKey: responseData.addonKey,
                licenseId: responseData.licenseId || "",
                licenseType: responseData.licenseType,
            }, new Date(2019, 1, 1));
            expect(response).toBeUndefined();
        });
        it("should not find a made up cloud license in the test fixture", async () => {
            const responseRepository: ResponseRepository = getCustomRepository(ResponseRepository);
            const response = await responseRepository.findLicense({
                addonKey: ADDON_KEY,
                addonLicenseId: "NOT-AN-ID",
                licenseType: LICENSE_TYPE,
            });
            expect(response).toBeUndefined();
        });

        it("should find the default server license in the test fixture", async () => {
            const responseRepository: ResponseRepository = getCustomRepository(ResponseRepository);
            const responseData: LicenseResponse = licenseResponse({ isServer: true });
            const response = await responseRepository.findLicense({
                addonKey: responseData.addonKey,
                licenseId: responseData.licenseId || "",
                licenseType: responseData.licenseType,
            });
            expect(response?.data).toEqual(licenseResponse({ isServer: true }));
        });
        it("should not find the default server license in the test fixture if the current date is outside the record's fromDate and toDate", async () => {
            advanceTo(new Date(2019, 1, 1));
            const responseRepository: ResponseRepository = getCustomRepository(ResponseRepository);
            const responseData: LicenseResponse = licenseResponse({ isServer: true });
            const response = await responseRepository.findLicense({
                addonKey: responseData.addonKey,
                licenseId: responseData.licenseId || "",
                licenseType: responseData.licenseType,
            });
            expect(response).toBeUndefined();
            clear();
        });
        it("should not find a made up server license in the test fixture", async () => {
            const responseRepository: ResponseRepository = getCustomRepository(ResponseRepository);
            const response = await responseRepository.findLicense({
                addonKey: ADDON_KEY,
                licenseId: "NOT-AN-ID",
                licenseType: LICENSE_TYPE,
            });
            expect(response).toBeUndefined();
        });
    });

    describe("findTransaction", () => {
        it("should find the default transaction in the test fixture", async () => {
            const responseRepository: ResponseRepository = getCustomRepository(ResponseRepository);
            const responseData: TransactionResponse = transactionResponse();
            const response = await responseRepository.findTransaction({
                addonKey: responseData.addonKey,
                licenseId: responseData.licenseId,
                transactionId: responseData.transactionId,
            });
            expect(response?.data).toEqual(responseData);
        });

        it("should not find the default transaction in the test fixture if the current date is outside the record's fromDate and toDate", async () => {
            advanceTo(new Date(2019, 1, 1));
            const responseRepository: ResponseRepository = getCustomRepository(ResponseRepository);
            const responseData: TransactionResponse = transactionResponse();
            const response = await responseRepository.findTransaction({
                addonKey: responseData.addonKey,
                licenseId: responseData.licenseId,
                transactionId: responseData.transactionId,
            });
            expect(response).toBeUndefined();
            clear();
        });

        it("should not find a made up transaction the test fixture", async () => {
            const responseRepository: ResponseRepository = getCustomRepository(ResponseRepository);
            const response = await responseRepository.findTransaction({
                addonKey: ADDON_KEY,
                licenseId: LICENSE_ID,
                transactionId: "NOT-AN-ID",
            });
            expect(response).toBeUndefined();
        });
    });
});
