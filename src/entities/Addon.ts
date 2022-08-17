import {
    Column,
    Entity,
    Index,
    OneToMany,
} from "typeorm";
// eslint-disable-next-line import/no-cycle
import { License } from "./License";

@Index("addon_pkey", ["key"], { unique: true })
@Entity("addon")
export class Addon {
    @Column("character varying", {
        length: 255,
        name: "key",
        primary: true,
    })
    key!: string;

    @Column("character varying", {
        length: 255,
        name: "name",
        nullable: true,
    })
    name!: string | null;

    @Column("text", {
        name: "tagline",
        nullable: true,
    })
    tagline!: string | null;

    @Column("text", {
        name: "summary",
        nullable: true,
    })
    summary!: string | null;

    @Column("character varying", {
        length: 255,
        name: "status",
        nullable: true,
    })
    status!: string | null;

    @Column("character varying", {
        length: 255,
        name: "iconUrl",
        nullable: true,
    })
    iconUrl!: string | null;

    @Column("timestamp with time zone", { name: "createdAt" })
    createdAt!: Date;

    @Column("timestamp with time zone", { name: "updatedAt" })
    updatedAt!: Date;

    @OneToMany(() => License, license => license.addonKey)
    licenses!: License[];
}
