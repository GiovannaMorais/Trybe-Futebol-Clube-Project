"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminWithPasswordWrong = exports.adminWithEmailWrong = exports.adminUser = exports.UserPermitted = void 0;
exports.UserPermitted = {
    id: 1,
    username: 'Admin',
    role: 'admin',
    email: 'admin@admin.com',
    password: 'secret_admin'
};
exports.adminUser = { email: 'admin@admin.com', password: 'secret_admin' };
exports.adminWithEmailWrong = { email: 'adminss@admin.com', password: 'secret_admin' };
exports.adminWithPasswordWrong = { email: 'admin@admin.com', password: 'secret_adminsss' };
