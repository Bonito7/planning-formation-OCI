"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApprenantsController = void 0;
const common_1 = require("@nestjs/common");
const apprenants_service_1 = require("./apprenants.service");
let ApprenantsController = class ApprenantsController {
    constructor(apprenantsService) {
        this.apprenantsService = apprenantsService;
    }
    async getFormationsDisponibles() {
        return this.apprenantsService.getFormationsDisponibles();
    }
    async getPlanningParDate(date) {
        return this.apprenantsService.getPlanningParDate(date);
    }
    async getModulesDuJour() {
        return this.apprenantsService.getModulesDuJour();
    }
};
exports.ApprenantsController = ApprenantsController;
__decorate([
    (0, common_1.Get)("formations"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ApprenantsController.prototype, "getFormationsDisponibles", null);
__decorate([
    (0, common_1.Get)("calendrier/:date"),
    __param(0, (0, common_1.Param)("date")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ApprenantsController.prototype, "getPlanningParDate", null);
__decorate([
    (0, common_1.Get)("modules/aujourdhui"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ApprenantsController.prototype, "getModulesDuJour", null);
exports.ApprenantsController = ApprenantsController = __decorate([
    (0, common_1.Controller)("apprenants"),
    __metadata("design:paramtypes", [apprenants_service_1.ApprenantsService])
], ApprenantsController);
//# sourceMappingURL=apprenants.controller.js.map