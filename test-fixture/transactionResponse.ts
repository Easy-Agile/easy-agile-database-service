import {
    ADDON_LICENSE_ID,
    ADDON_KEY,
    ADDON_NAME,
} from "./const";
import { TransactionResponse } from "../types/Response";

export const transactionResponse = ({ technicalIsBilling = true, hasPartner = true } = {}): TransactionResponse => ({

    addonKey: ADDON_KEY,
    addonLicenseId: ADDON_LICENSE_ID,
    addonName: ADDON_NAME,
    lastUpdated: "2020-01-01",
    licenseId: `SEN-${ADDON_LICENSE_ID}`,
    purchaseDetails: {
        billingPeriod: "Annual",
        hosting: "Server",
        licenseType: "COMMERCIAL",
        maintenanceEndDate: "2022-01-03",
        maintenanceStartDate: "2020-01-03",
        partnerDiscountAmount: 0.0,
        purchasePrice: 12000.0,
        saleDate: "2019-12-31",
        saleType: "New",
        tier: "10000 Users",
        vendorAmount: 9000.0,
    },
    transactionId: "AT-12345",
});
