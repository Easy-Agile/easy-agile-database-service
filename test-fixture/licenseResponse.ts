import {
    ADDON_KEY,
    ADDON_LICENSE_ID,
    ADDON_NAME,
    HOST_LICENSE_ID,
    LICENSE_ID,
    LICENSE_TYPE,
} from "./const";
import { LicenseResponse } from "../types/Response";

export const licenseResponse = ({
    isServer = true,
    withAttribution = true,
} = {}): LicenseResponse => ({
    addonKey: ADDON_KEY,
    addonLicenseId: ADDON_LICENSE_ID,
    addonName: ADDON_NAME,
    attribution: withAttribution ? {
        campaignContent: "Marketplace App Campaign",
        campaignMedium: "cpc",
        campaignName: "P:jira-software|O:ppm|V:google|G:us|L:en|F:consider|S:brand|M:exact|A:text|D:desktop",
        campaignSource: "google",
        channel: "Paid Search",
        referrerDomain: "id.atlassian.com",
    } : undefined,
    hosting: isServer ? "Server" : "Cloud",
    hostLicenseId: isServer ? HOST_LICENSE_ID : undefined,
    lastUpdated: "2020-01-01",
    licenseId: isServer ? LICENSE_ID : undefined,
    licenseType: LICENSE_TYPE,
    maintenanceEndDate: "2022-01-02",
    maintenanceStartDate: "2018-11-03",
    status: "active",
    tier: "10000 Users",
});
