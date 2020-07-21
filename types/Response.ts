type LicenseStatus = "active" | "cancelled" | "deleted" | "inactive";
type LicenseType="OPEN_SOURCE" | "COMMUNITY" | "COMMERCIAL" | "ACADEMIC" | "EVALUATION" | "DEMONSTRATION" | "IMMEDIATE_EVALUATION";
export type Hosting="Cloud" | "Data Center" | "Server";
type SaleType = "New" | "Refund" | "Renewal" | "Upgrade";

export type LicenseResponse = {
    addonLicenseId: string;
    hostLicenseId: string | undefined;
    licenseId?: string;
    addonKey: string;
    addonName: string;
    hosting: Hosting;
    lastUpdated: string;
    licenseType: LicenseType;
    maintenanceStartDate: string;
    maintenanceEndDate: string;
    status: LicenseStatus;
    tier: string;
    attribution?: {
        campaignContent?: string;
        campaignMedium?: string;
        campaignName?: string;
        campaignSource?: string;
        channel: string;
        referrerDomain: string;
    };
};

export type TransactionResponse = {
    transactionId: string;
    addonLicenseId: string;
    hostLicenseId?: string;
    licenseId: string;
    addonKey: string;
    addonName: string;
    lastUpdated: string;
    purchaseDetails: {
        saleDate: string;
        tier: string;
        licenseType: LicenseType;
        hosting: Hosting;
        billingPeriod: string;
        purchasePrice: number;
        vendorAmount: number;
        partnerDiscountAmount: number;
        saleType: SaleType;
        maintenanceStartDate: string;
        maintenanceEndDate: string;
    };
};
