import {
    Column,
    Entity,
    Index,
    PrimaryGeneratedColumn,
} from "typeorm";

@Index("transaction_addon_key_sale_type", ["addonKey", "saleType"], {})
@Index("transaction_addon_key_hosting", ["addonKey", "hosting"], {})
@Index("transaction_addon_sen", ["addonSen"], {})
@Index("transaction_hosting", ["hosting"], {})
@Index("transaction_pkey", ["id"], { unique: true })
@Index("transaction_sale_type", ["saleType"], {})
@Entity("transaction")
export class Transaction {
    @PrimaryGeneratedColumn({
        name: "id",
        type: "integer",
    })
    id!: number;

    @Column("character varying", {
        length: 255,
        name: "orderId",
        nullable: true,
    })
    orderId!: string | null;

    @Column("date", {
        name: "saleDate",
        nullable: true,
    })
    saleDate!: string | null;

    @Column("character varying", {
        length: 255,
        name: "tier",
        nullable: true,
    })
    tier!: string | null;

    @Column("character varying", {
        length: 255,
        name: "licenseType",
        nullable: true,
    })
    licenseType!: string | null;

    @Column("character varying", {
        length: 255,
        name: "addonKey",
        nullable: true,
    })
    addonKey!: string | null;

    @Column("character varying", {
        length: 255,
        name: "addonSen",
        nullable: true,
    })
    addonSen!: string | null;

    @Column("character varying", {
        length: 255,
        name: "hosting",
        nullable: true,
    })
    hosting!: string | null;

    @Column("character varying", {
        length: 255,
        name: "billingPeriod",
        nullable: true,
    })
    billingPeriod!: string | null;

    @Column("double precision", {
        name: "purchasePrice",
        nullable: true,
    })
    purchasePrice!: number | null;

    @Column("double precision", {
        name: "vendorAmount",
        nullable: true,
    })
    vendorAmount!: number | null;

    @Column("character varying", {
        length: 255,
        name: "saleType",
        nullable: true,
    })
    saleType!: string | null;

    @Column("date", {
        name: "startDate",
        nullable: true,
    })
    startDate!: string | null;

    @Column("date", {
        name: "endDate",
        nullable: true,
    })
    endDate!: string | null;

    @Column("timestamp with time zone", { name: "createdAt" })
    createdAt!: Date;

    @Column("timestamp with time zone", { name: "updatedAt" })
    updatedAt!: Date;
}
