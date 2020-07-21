    -- ran against prod to generate part of the strings required to setup the database from scratch
    select
    '(' || '''' || concat_ws(E'\',\'', "key" , "name",
        "tagline",
        "summary",
        "status",
        "iconUrl"
    ) || '''' || ')' as addonData
	from addon
    where key like '%easyagile%'
    or key like '%arijea%'
    or key like '%kretar%';

	select
    '(' || '''' || concat_ws(E'\',\'',
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
    ) || '''' || ')' as licenseData
	from license
	where type != 'COMMERCIAL' and "attributionChannel" is not null
	order by "createdAt" desc limit 25;

	select
    '(' || '''' || concat_ws(E'\',\'',
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
    ) || '''' || ')' as licenseData
	from license
	where type = 'COMMERCIAL'
	order by "createdAt" desc limit 25;

	select
    '(' || '''' || concat_ws(E'\',\'',
        t."orderId",
        t."saleDate" ,
        t."tier",
        t."licenseType",
        t."addonKey",
        t."addonSen",
        t."hosting",
        t."billingPeriod",
        t."purchasePrice",
        t."vendorAmount",
        t."saleType",
        t."startDate",
        t."endDate"
    ) || '''' || ')' as transactionData
	from
	(
        select * from license
	    where type = 'COMMERCIAL'
	    order by "createdAt" desc limit 25
    ) as l
	inner join transaction t
	on l."addonKey" = t."addonKey"
	and l."addonSen" = t."addonSen";
