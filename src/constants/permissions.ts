export const PERMISSIONS = {
    CATEGORY: {
        VIEW: "category:view",
        CREATE: "category:create",
        UPDATE: "category:update",
        DELETE: "category:delete",
    },
    DIVISION: {
        VIEW: "division:view",
        CREATE: "division:create",
        UPDATE: "division:update",
        DELETE: "division:delete",
    },
    USER: {
        VIEW: "user:view",
        CREATE: "user:create",
        UPDATE: "user:update",
        DELETE: "user:delete",
    },
    TICKET: {
        VIEW: "ticket:view",
        CREATE: "ticket:create",
        UPDATE: "ticket:update",
        DELETE: "ticket:delete",
        ASSIGN: "ticket:assign",
        PRIORITY: "ticket:priority",
        RESOLUTION: "ticket:resolution",
        CLOSE: "ticket:close",
    },
    FEEDBACK: {
        VIEW: "feedback:view",
        CREATE: "feedback:create",
        UPDATE: "feedback:update",
        DELETE: "feedback:delete",
    },
    DASHBOARD: {
        VIEW: "dashboard:view",
    },
    RBAC: {
        VIEW: "rbac:view",
        CREATE: "rbac:create",
        UPDATE: "rbac:update",
        DELETE: "rbac:delete",
    },
    IHS: {
        VIEW: "ihs:view",
    },
    ANTRIAN: {
        VIEW: "antrian:view",
        CHECKIN: "antrian:checkin",
    },
} as const;
