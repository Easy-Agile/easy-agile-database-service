import {
    Column,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from "typeorm";

// eslint-disable-next-line import/no-cycle
import { Addon } from "./Addon";

@Index("license_addon_key", ["addonKey"], {})
@Index("license_addon_key_hosting", ["addonKey", "hosting"], {})
@Index("license_addon_key_type", ["addonKey", "type"], {})
@Index("license_addon_sen", ["addonSen"], {})
@Index("license_hosting", ["hosting"], {})
@Index("license_pkey", ["id"], { unique: true })
@Index("license_type", ["type"], {})
@Entity("license")
export class License {
    @PrimaryGeneratedColumn({
        name: "id",
        type: "integer",
    })
    id!: number;

    @Column("character varying", {
        length: 255,
        name: "addonSen",
        nullable: true,
    })
    addonSen!: string | null;

    @Column("character varying", {
        length: 255,
        name: "hostSen",
        nullable: true,
    })
    hostSen!: string | null;

    @Column("character varying", {
        length: 255,
        name: "type",
        nullable: true,
    })
    type!: string | null;

    @Column("character varying", {
        length: 255,
        name: "tier",
        nullable: true,
    })
    tier!: string | null;

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

    @Column("character varying", {
        length: 255,
        name: "status",
        nullable: true,
    })
    status!: string | null;

    @Column("character varying", {
        length: 255,
        name: "hosting",
        nullable: true,
    })
    hosting!: string | null;

    @Column("character varying", {
        length: 255,
        name: "attributionChannel",
        nullable: true,
    })
    attributionChannel!: string | null;

    @Column("timestamp with time zone", { name: "createdAt" })
    createdAt!: Date;

    @Column("timestamp with time zone", { name: "updatedAt" })
    updatedAt!: Date;

    @ManyToOne(() => Addon, addon => addon.licenses, {
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
    })

    @JoinColumn([{
        name: "addonKey",
        referencedColumnName: "key",
    }])
    addonKey!: Addon;
}
