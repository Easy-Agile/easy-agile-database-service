import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateDb1594962768480 implements MigrationInterface {
    name = "CreateDb1594962768480";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE \"public\".\"license\" (\"id\" SERIAL NOT NULL, \"addonSen\" character varying(255), \"hostSen\" character varying(255), \"type\" character varying(255), \"tier\" character varying(255), \"startDate\" date, \"endDate\" date, \"status\" character varying(255), \"hosting\" character varying(255), \"attributionChannel\" character varying(255), \"createdAt\" TIMESTAMP WITH TIME ZONE NOT NULL, \"updatedAt\" TIMESTAMP WITH TIME ZONE NOT NULL, \"addonKey\" character varying(255), CONSTRAINT \"PK_85b270dfdad063d2cf0aa9ba63a\" PRIMARY KEY (\"id\"))");
        await queryRunner.query("CREATE INDEX \"license_type\" ON \"public\".\"license\" (\"type\") ");
        await queryRunner.query("CREATE UNIQUE INDEX \"license_pkey\" ON \"public\".\"license\" (\"id\") ");
        await queryRunner.query("CREATE INDEX \"license_hosting\" ON \"public\".\"license\" (\"hosting\") ");
        await queryRunner.query("CREATE INDEX \"license_addon_sen\" ON \"public\".\"license\" (\"addonSen\") ");
        await queryRunner.query("CREATE INDEX \"license_addon_key_type\" ON \"public\".\"license\" (\"addonKey\", \"type\") ");
        await queryRunner.query("CREATE INDEX \"license_addon_key_hosting\" ON \"public\".\"license\" (\"addonKey\", \"hosting\") ");
        await queryRunner.query("CREATE INDEX \"license_addon_key\" ON \"public\".\"license\" (\"addonKey\") ");
        await queryRunner.query("CREATE TABLE \"public\".\"addon\" (\"key\" character varying(255) NOT NULL, \"name\" character varying(255), \"tagline\" text, \"summary\" text, \"status\" character varying(255), \"iconUrl\" character varying(255), \"createdAt\" TIMESTAMP WITH TIME ZONE NOT NULL, \"updatedAt\" TIMESTAMP WITH TIME ZONE NOT NULL, CONSTRAINT \"PK_0f663915e2ba64810e41449dcce\" PRIMARY KEY (\"key\"))");
        await queryRunner.query("CREATE UNIQUE INDEX \"addon_pkey\" ON \"public\".\"addon\" (\"key\") ");
        await queryRunner.query("CREATE TABLE \"public\".\"transaction\" (\"id\" SERIAL NOT NULL, \"orderId\" character varying(255), \"saleDate\" date, \"tier\" character varying(255), \"licenseType\" character varying(255), \"addonKey\" character varying(255), \"addonSen\" character varying(255), \"hosting\" character varying(255), \"billingPeriod\" character varying(255), \"purchasePrice\" double precision, \"vendorAmount\" double precision, \"saleType\" character varying(255), \"startDate\" date, \"endDate\" date, \"createdAt\" TIMESTAMP WITH TIME ZONE NOT NULL, \"updatedAt\" TIMESTAMP WITH TIME ZONE NOT NULL, CONSTRAINT \"PK_fa13c33f0837fcbdd5ab433e2d5\" PRIMARY KEY (\"id\"))");
        await queryRunner.query("CREATE INDEX \"transaction_sale_type\" ON \"public\".\"transaction\" (\"saleType\") ");
        await queryRunner.query("CREATE UNIQUE INDEX \"transaction_pkey\" ON \"public\".\"transaction\" (\"id\") ");
        await queryRunner.query("CREATE INDEX \"transaction_hosting\" ON \"public\".\"transaction\" (\"hosting\") ");
        await queryRunner.query("CREATE INDEX \"transaction_addon_sen\" ON \"public\".\"transaction\" (\"addonSen\") ");
        await queryRunner.query("CREATE INDEX \"transaction_addon_key_hosting\" ON \"public\".\"transaction\" (\"addonKey\", \"hosting\") ");
        await queryRunner.query("CREATE INDEX \"transaction_addon_key_sale_type\" ON \"public\".\"transaction\" (\"addonKey\", \"saleType\") ");
        await queryRunner.query("ALTER TABLE \"public\".\"license\" ADD CONSTRAINT \"FK_b3bf037a87d61acc1e54433c663\" FOREIGN KEY (\"addonKey\") REFERENCES \"public\".\"addon\"(\"key\") ON DELETE SET NULL ON UPDATE CASCADE");

        // populate addon table
        await queryRunner.query(`
            insert into addon ( "key", "name", "tagline", "summary", "status", "iconUrl","createdAt", "updatedAt" )
            values  ('com.easyagile.kanban.workflow','Easy Agile Kanban Workflow for Jira','An easy way for Kanban teams to adopt a best practice Jira workflow','The Easy Agile Kanban Workflow for Jira helps teams get up and running quickly with a workflow created for agile teams. From the team behind Easy Agile Roadmaps and Easy Agile User Story Maps for Jira.','public','https://marketplace-cdn.atlassian.com/files/images/33f52f3e-e40e-495b-b94f-ac95441913fa.png', now(),now()),
                    ('com.easyagile.personas','Easy Agile Personas for Jira','A customer centric approach to backlog grooming','Enable product managers of agile teams to capture their customer archetypes alongside their product backlog in Jira, ensuring the team understands who the customer is and aligns to deliver value to the customer.','public','https://marketplace-cdn.atlassian.com/files/images/8ee49b08-e15b-4265-91aa-bcbb7f5c8835.png', now(),now()),
                    ('com.kretar.jira.plugin.user-story-map','Easy Agile User Story Maps for Jira','Build simple and collaborative story maps in Jira, and focus development on providing value to your customers fast and often','The story mapping tool built for Jira. Build simple and collaborative story maps inside Jira, and focus development on providing value to your customers fast and often','public','https://marketplace-cdn.atlassian.com/files/images/db4f4b9e-2983-4ba3-8502-2388ff2fe40f.png', now(),now()),
                    ('com.arijea.plugins.betterblogs','Better Blogs for Confluence','Keep everyone informed of new blog posts, and do so with ease','Better Blogs for Confluence allows Space Administrators to subscribe groups to email notifications of new blog posts in a space. Never again will any employee miss out on reading the latest blog. Keep everyone informed, and do so with ease.','public','https://marketplace-cdn.atlassian.com/files/images/a2bfb47d-12d4-45bb-8ef4-635cc1c47052.png', now(),now()),
                    ('com.arijea.plugins.redact','Redaction, Protect High Security Content','In-page content security for Confluence: specify users/groups that can view words, paragraphs and table cells','Redaction allows users to secure sensitive content on a page or blog post by censoring specific words, paragraphs and table cells. A team can collaborate on private information and share the results as a sanitized PDF and Word document.','public','https://marketplace-cdn.atlassian.com/files/images/ce0caace-0337-4f61-84c2-f74ed1203eb6.png', now(),now()),
                    ('com.arijea.easy-agile-roadmaps','Easy Agile Roadmaps for Jira','The simplest and most flexible roadmapping tool for Jira','Easy Agile Roadmaps is the simplest & most flexible way to create & maintain roadmaps in Jira. Drag & drop all issue types onto the roadmap timeline, visualising work alongside fix versions and milestones to better align business & engineering teams.','public','https://marketplace-cdn.atlassian.com/files/images/123194c8-7bc8-4896-b9fd-d33d59916cdf.png', now(),now()),
                    ('com.easyagile.programs','Easy Agile Programs for Jira','The complete PI Planning solution for Jira. Ideal for distributed, remote or face-to-face Program Increment Planning','Plan agile Program Increments inside Jira and gain a holistic view of your organisation. The perfect tool for scaled agile teams to communicate objectives, visualise cross-team dependencies and track progress towards Epic / Feature completion.','public','https://marketplace-cdn.atlassian.com/files/images/eb2295db-bb7a-41c8-9268-b2b20c4d4957.png', now(),now())
        `);

        // populate license table
        await queryRunner.query(`
            insert into license (
                "createdAt",
                "updatedAt",
                "attributionChannel",
                "addonSen" ,
                "hostSen",
                "type",
                "tier",
                "startDate",
                "endDate",
                "status",
                "hosting",
                "addonKey"
            )
            values (now(),now(),null,'SEN-16888865',null,'COMMERCIAL','2000 Users','2020-05-11','2021-05-11','active','Server','com.kretar.jira.plugin.user-story-map')
            ,(now(),now(),'Organic search','SEN-15715349','SEN-13540061','COMMERCIAL','Subscription','2020-04-04','2021-04-25','active','Cloud','com.kretar.jira.plugin.user-story-map')
            ,(now(),now(),null,'SEN-16912471',null,'COMMERCIAL','2000 Users','2020-05-12','2021-05-12','active','Server','com.kretar.jira.plugin.user-story-map')
            ,(now(),now(),null,'SEN-16939586',null,'COMMERCIAL','2000 Users','2020-05-14','2021-05-14','active','Server','com.kretar.jira.plugin.user-story-map')
            ,(now(),now(),null,'SEN-16942255',null,'COMMERCIAL','10 Users','2020-05-14','2021-05-14','active','Server','com.arijea.easy-agile-roadmaps')
            ,(now(),now(),null,'SEN-16937992',null,'COMMERCIAL','7000 Users','2020-04-28','2021-04-28','active','Data Center','com.kretar.jira.plugin.user-story-map')
            ,(now(),now(),null,'SEN-16938278',null,'COMMERCIAL','1000 Users','2020-05-14','2021-05-14','active','Data Center','com.easyagile.programs')
            ,(now(),now(),'Atlassian','SEN-12302361','SEN-4206368','COMMERCIAL','Subscription','2020-05-15','2021-04-12','active','Cloud','com.kretar.jira.plugin.user-story-map')
            ,(now(),now(),null,'SEN-16957935',null,'COMMERCIAL','4000 Users','2020-05-15','2021-05-15','active','Data Center','com.kretar.jira.plugin.user-story-map')
            ,(now(),now(),'Atlassian','SEN-16350404','SEN-9274648','COMMERCIAL','Subscription','2020-05-05','2020-06-05','inactive','Cloud','com.arijea.easy-agile-roadmaps')
            ,(now(),now(),null,'SEN-16985644',null,'COMMERCIAL','50 Users','2020-05-18','2021-05-18','active','Server','com.kretar.jira.plugin.user-story-map')
            ,(now(),now(),null,'SEN-16985428',null,'COMMERCIAL','15000 Users','2020-05-21','2021-05-29','active','Data Center','com.easyagile.programs')
            ,(now(),now(),null,'SEN-16911363',null,'COMMERCIAL','Unlimited Users','2020-05-12','2021-05-12','active','Data Center','com.kretar.jira.plugin.user-story-map')
            ,(now(),now(),null,'SEN-17010695',null,'COMMERCIAL','250 Users','2020-05-19','2021-05-19','active','Server','com.arijea.easy-agile-roadmaps')
            ,(now(),now(),'Paid Search','SEN-14597491','SEN-14477612','COMMERCIAL','Subscription','2019-10-19','2020-06-19','inactive','Cloud','com.kretar.jira.plugin.user-story-map')
            ,(now(),now(),null,'SEN-16998929',null,'COMMERCIAL','100 Users','2020-05-19','2021-05-19','active','Server','com.arijea.easy-agile-roadmaps')
            ,(now(),now(),'Atlassian','SEN-16588565','SEN-3442601','COMMERCIAL','Subscription','2020-05-19','2020-10-18','active','Cloud','com.kretar.jira.plugin.user-story-map')
            ,(now(),now(),null,'SEN-16715528',null,'COMMERCIAL','6000 Users','2020-04-28','2021-11-07','active','Data Center','com.kretar.jira.plugin.user-story-map')
            ,(now(),now(),null,'SEN-16995844',null,'COMMERCIAL','2000 Users','2020-05-18','2021-05-18','active','Server','com.kretar.jira.plugin.user-story-map')
            ,(now(),now(),'Other','SEN-16003678','SEN-9922387','COMMERCIAL','Subscription','2020-06-06','2021-02-12','active','Cloud','com.kretar.jira.plugin.user-story-map')
            ,(now(),now(),null,'SEN-17071498',null,'COMMERCIAL','2000 Users','2020-05-24','2021-05-24','active','Data Center','com.kretar.jira.plugin.user-story-map')
            ,(now(),now(),'Paid Search','SEN-16242771','SEN-13247230','COMMERCIAL','Subscription','2020-05-21','2021-02-05','active','Cloud','com.arijea.easy-agile-roadmaps')
            ,(now(),now(),null,'SEN-17075246',null,'COMMERCIAL','10 Users','2020-05-25','2021-05-25','active','Server','com.kretar.jira.plugin.user-story-map')
            ,(now(),now(),'Other','SEN-16642822','SEN-2944088','COMMERCIAL','Subscription','2020-05-25','2020-06-25','inactive','Cloud','com.arijea.easy-agile-roadmaps')
            ,(now(),now(),null,'SEN-17081196',null,'COMMERCIAL','6000 Users','2020-05-25','2021-05-25','active','Data Center','com.kretar.jira.plugin.user-story-map')
            ,(now(),now(),'Paid Search','SEN-16548674','SEN-16501998','EVALUATION','Subscription','2020-04-16','2020-06-13','inactive','Cloud','com.kretar.jira.plugin.user-story-map')
            ,(now(),now(),'Organic search','SEN-16548822','SEN-16546571','EVALUATION','Subscription','2020-04-16','2020-06-16','inactive','Cloud','com.arijea.easy-agile-roadmaps')
            ,(now(),now(),'Atlassian','SEN-16551774','SEN-12944681','EVALUATION','Subscription','2020-04-16','2020-06-07','inactive','Cloud','com.easyagile.programs')
            ,(now(),now(),'Paid Search','SEN-16552472','SEN-16444359','EVALUATION','Subscription','2020-04-16','2020-06-08','inactive','Cloud','com.kretar.jira.plugin.user-story-map')
            ,(now(),now(),'Atlassian','SEN-L15312268',null,'EVALUATION','Evaluation','2020-04-16','2020-05-16','inactive','Server','com.easyagile.programs')
            ,(now(),now(),'Organic search','SEN-L15312778',null,'EVALUATION','Evaluation','2020-04-16','2020-05-16','inactive','Server','com.kretar.jira.plugin.user-story-map')
            ,(now(),now(),'Organic search','SEN-16556437','SEN-15407944','EVALUATION','Subscription','2020-04-17','2020-05-26','inactive','Cloud','com.arijea.easy-agile-roadmaps')
            ,(now(),now(),'Organic search','SEN-16559162','SEN-16206643','EVALUATION','Subscription','2020-04-17','2020-05-23','inactive','Cloud','com.kretar.jira.plugin.user-story-map')
            ,(now(),now(),'Atlassian','SEN-16559752','SEN-16466560','EVALUATION','Subscription','2020-04-17','2020-06-10','inactive','Cloud','com.arijea.easy-agile-roadmaps')
            ,(now(),now(),'Paid Search','SEN-16567265','SEN-16567113','EVALUATION','Subscription','2020-04-17','2020-06-17','inactive','Cloud','com.arijea.easy-agile-roadmaps')
            ,(now(),now(),'Other','SEN-L15313173',null,'EVALUATION','Evaluation','2020-04-17','2020-05-16','inactive','Data Center','com.kretar.jira.plugin.user-story-map')
            ,(now(),now(),'Referral','SEN-L15313670',null,'EVALUATION','Evaluation','2020-04-17','2020-05-16','inactive','Server','com.kretar.jira.plugin.user-story-map')
            ,(now(),now(),'Atlassian','SEN-L15314341',null,'EVALUATION','Evaluation','2020-04-17','2020-05-16','inactive','Server','com.easyagile.programs')
            ,(now(),now(),'Direct','SEN-L15314985',null,'EVALUATION','Evaluation','2020-04-17','2020-05-16','inactive','Server','com.easyagile.programs')
            ,(now(),now(),'Organic search','SEN-L15314992',null,'EVALUATION','Evaluation','2020-04-17','2020-05-16','inactive','Server','com.easyagile.programs')
            ,(now(),now(),'Organic search','SEN-L15314993',null,'EVALUATION','Evaluation','2020-04-17','2020-05-16','inactive','Server','com.easyagile.programs')
            ,(now(),now(),'Organic search','SEN-L15315267',null,'EVALUATION','Evaluation','2020-04-17','2020-05-16','inactive','Server','com.easyagile.programs')`
        );

        // populate transaction table
        await queryRunner.query(`insert into "transaction" (
                "createdAt",
                "updatedAt",
                "orderId",
                "saleDate" ,
                "tier",
                "licenseType",
                "addonKey",
                "addonSen",
                "hosting",
                "billingPeriod",
                "purchasePrice",
                "vendorAmount",
                "saleType",
                "startDate",
                "endDate"
            )
            values (now(),now(),'AT-99745729','2020-05-11','2000 Users','COMMERCIAL','com.kretar.jira.plugin.user-story-map','SEN-16888865','Server','Annual','10000','7000','New','2020-05-11','2021-05-11')
            ,(now(),now(),'AT-97910629','2020-05-12','2000 Users','COMMERCIAL','com.kretar.jira.plugin.user-story-map','SEN-16912471','Server','Annual','10000','7000','New','2020-05-12','2021-05-12')
            ,(now(),now(),'AT-100405195','2020-05-14','2000 Users','COMMERCIAL','com.kretar.jira.plugin.user-story-map','SEN-16939586','Server','Annual','8000','5600','New','2020-05-14','2021-05-14')
            ,(now(),now(),'AT-101166950','2020-05-14','10 Users','COMMERCIAL','com.arijea.easy-agile-roadmaps','SEN-16942255','Server','Annual','100','70','New','2020-05-14','2021-05-14')
            ,(now(),now(),'AT-93880280','2020-05-14','7000 Users','COMMERCIAL','com.kretar.jira.plugin.user-story-map','SEN-16937992','Data Center','Annual','12000','9000','New','2020-04-28','2021-04-28')
            ,(now(),now(),'AT-98702313','2020-05-14','1000 Users','COMMERCIAL','com.easyagile.programs','SEN-16938278','Data Center','Annual','12000','9000','New','2020-05-14','2021-05-14')
            ,(now(),now(),'AT-101251172','2020-05-15','3000 Users','COMMERCIAL','com.kretar.jira.plugin.user-story-map','SEN-16957935','Data Center','Annual','8000','6000','New','2020-05-15','2021-05-15')
            ,(now(),now(),'AT-99738817','2020-05-18','50 Users','COMMERCIAL','com.kretar.jira.plugin.user-story-map','SEN-16985644','Server','Annual','1300','910','New','2020-05-18','2021-05-18')
            ,(now(),now(),'AT-99978785','2020-05-18','15000 Users','COMMERCIAL','com.easyagile.programs','SEN-16985428','Data Center','Annual','20439','15329.25','New','2020-05-21','2021-05-29')
            ,(now(),now(),'AT-98701309','2020-05-12','Unlimited Users','COMMERCIAL','com.kretar.jira.plugin.user-story-map','SEN-16911363','Data Center','Annual','24000','18000','New','2020-05-12','2021-05-12')
            ,(now(),now(),'4342191131','2020-05-19','Unlimited Users','COMMERCIAL','com.kretar.jira.plugin.user-story-map','SEN-16911363','Data Center','Annual','-24000','-18000','Refund','2020-05-12','2021-05-12')
            ,(now(),now(),'AT-100404210','2020-05-19','250 Users','COMMERCIAL','com.arijea.easy-agile-roadmaps','SEN-17010695','Server','Annual','4000','2800','New','2020-05-19','2021-05-19')
            ,(now(),now(),'AT-101578205','2020-05-19','100 Users','COMMERCIAL','com.arijea.easy-agile-roadmaps','SEN-16998929','Server','Annual','2000','1400','New','2020-05-19','2021-05-19')
            ,(now(),now(),'AT-99985623','2020-05-21','6000 Users','COMMERCIAL','com.kretar.jira.plugin.user-story-map','SEN-16715528','Data Center','Annual','2380.2900390625','1785.219970703125','Upgrade','2020-05-13','2021-11-07')
            ,(now(),now(),'AT-99349167','2020-05-18','2000 Users','COMMERCIAL','com.kretar.jira.plugin.user-story-map','SEN-16995844','Server','Annual','10000','7000','New','2020-05-18','2021-05-18')
            ,(now(),now(),'4348750024','2020-05-22','2000 Users','COMMERCIAL','com.kretar.jira.plugin.user-story-map','SEN-16995844','Server','Annual','-10000','-7000','Refund','2020-05-18','2021-05-18')
            ,(now(),now(),'AT-101757524','2020-05-24','2000 Users','COMMERCIAL','com.kretar.jira.plugin.user-story-map','SEN-17071498','Data Center','Annual','10000','7500','New','2020-05-24','2021-05-24')
            ,(now(),now(),'AT-101840120','2020-05-25','10 Users','COMMERCIAL','com.kretar.jira.plugin.user-story-map','SEN-17075246','Server','Annual','100','70','New','2020-05-25','2021-05-25')
            ,(now(),now(),'AT-98776311','2020-05-25','6000 Users','COMMERCIAL','com.kretar.jira.plugin.user-story-map','SEN-17081196','Data Center','Annual','12000','9000','New','2020-05-25','2021-05-25')`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE \"public\".\"license\" DROP CONSTRAINT \"FK_b3bf037a87d61acc1e54433c663\"");
        await queryRunner.query("DROP INDEX \"public\".\"transaction_addon_key_sale_type\"");
        await queryRunner.query("DROP INDEX \"public\".\"transaction_addon_key_hosting\"");
        await queryRunner.query("DROP INDEX \"public\".\"transaction_addon_sen\"");
        await queryRunner.query("DROP INDEX \"public\".\"transaction_hosting\"");
        await queryRunner.query("DROP INDEX \"public\".\"transaction_pkey\"");
        await queryRunner.query("DROP INDEX \"public\".\"transaction_sale_type\"");
        await queryRunner.query("DROP TABLE \"public\".\"transaction\"");
        await queryRunner.query("DROP INDEX \"public\".\"IDX_8df389b9b1541e4417649264dd\"");
        await queryRunner.query("DROP INDEX \"public\".\"IDX_46dc8d9183d71f18f3d409adef\"");
        await queryRunner.query("DROP INDEX \"public\".\"addon_pkey\"");
        await queryRunner.query("DROP TABLE \"public\".\"addon\"");
        await queryRunner.query("DROP INDEX \"public\".\"license_addon_key\"");
        await queryRunner.query("DROP INDEX \"public\".\"license_addon_key_hosting\"");
        await queryRunner.query("DROP INDEX \"public\".\"license_addon_key_type\"");
        await queryRunner.query("DROP INDEX \"public\".\"license_addon_sen\"");
        await queryRunner.query("DROP INDEX \"public\".\"license_hosting\"");
        await queryRunner.query("DROP INDEX \"public\".\"license_pkey\"");
        await queryRunner.query("DROP INDEX \"public\".\"license_type\"");
        await queryRunner.query("DROP TABLE \"public\".\"license\"");
    }
}
