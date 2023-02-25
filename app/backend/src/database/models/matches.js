"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const _1 = __importDefault(require("."));
const teams_1 = __importDefault(require("./teams"));
class Matches extends sequelize_1.Model {
}
Matches.init({
    id: {
        type: sequelize_1.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    homeTeam: {
        type: sequelize_1.INTEGER,
        allowNull: false,
    },
    homeTeamGoals: {
        type: sequelize_1.INTEGER,
        allowNull: false,
    },
    awayTeam: {
        type: sequelize_1.INTEGER,
        allowNull: false,
    },
    awayTeamGoals: {
        type: sequelize_1.INTEGER,
        allowNull: false,
    },
    inProgress: {
        type: sequelize_1.BOOLEAN,
        allowNull: false,
    },
}, {
    underscored: true,
    sequelize: _1.default,
    modelName: 'matches',
    timestamps: false,
});
Matches.belongsTo(teams_1.default, { foreignKey: 'homeTeam', as: 'teamHome' });
Matches.belongsTo(teams_1.default, { foreignKey: 'awayTeam', as: 'teamAway' });
teams_1.default.hasMany(Matches, { foreignKey: 'homeTeam', as: 'homeMatch' });
teams_1.default.hasMany(Matches, { foreignKey: 'awayTeam', as: 'awayMatch' });
exports.default = Matches;
