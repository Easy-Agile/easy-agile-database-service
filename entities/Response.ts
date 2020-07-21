import {
    Column,
    Entity,
    Index,
    PrimaryGeneratedColumn,
} from "typeorm";
import { LicenseResponse, TransactionResponse } from "../types/Response";

@Index("license_response_addonLicenseId", { synchronize: false })
@Index("license_response_licenseType", { synchronize: false })
@Index("response_addonKey", { synchronize: false })
@Index("response_licenseId", { synchronize: false })
@Index("transaction_response_transactionId", { synchronize: false })
@Entity("response")
export class Response {
    @PrimaryGeneratedColumn({
        name: "id",
        type: "integer",
    })
    id!: number;

    @Column(
        "jsonb", {
            array: false,
            name: "data",
            nullable: false,
        })
    data!: LicenseResponse | TransactionResponse;

    @Index()
    @Column("timestamp with time zone", {
        default: () => "current_timestamp",
        name: "fromDate",
    })
    fromDate!: Date;

    @Index()
    @Column("timestamp with time zone", {
        default: () => "'infinity'::timestamp",
        name: "toDate",
    })
    toDate!: Date;
}
