const runningInProd = process.env.NODE_ENV === "production";
const testDeployment = process.env.DEPLOY_ENV === "test";

module.exports = {
    cli: {
        migrationsDir: "migrations",
    },
    entities: [
        "entities/*",
    ],
    logger: runningInProd ? "simple-console" : "advanced-console",
    logging: (runningInProd && !testDeployment) ? ["error"] : ["info", "error"],
    maxQueryExecutionTime: 5000,
    migrations: [
        "migrations/*",
    ],
    migrationsRun: true,
    migrationsTableName: "migrations",
    name: "default",
    schema: "public",
    synchronize: false,
    type: "postgres",
    url: process.env.DB_URL,
};
