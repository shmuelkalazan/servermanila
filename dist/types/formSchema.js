"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const militaryFormSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, 'נא להזין שם מלא'],
        trim: true,
        minlength: [2, 'שם חייב להכיל לפחות 2 תווים'],
        maxlength: [50, 'שם לא יכול להכיל יותר מ-50 תווים']
    },
    personalNote: {
        type: String,
        default: '',
        maxlength: [1000, 'הערה אישית לא יכולה להכיל יותר מ-1000 תווים']
    },
    combatPreferences: {
        golani: {
            type: Number,
            required: true,
            min: [1, 'דירוג חייב להיות בין 1 ל-5'],
            max: [5, 'דירוג חייב להיות בין 1 ל-5']
        },
        armor: {
            type: Number,
            required: true,
            min: [1, 'דירוג חייב להיות בין 1 ל-5'],
            max: [5, 'דירוג חייב להיות בין 1 ל-5']
        },
        artillery: {
            type: Number,
            required: true,
            min: [1, 'דירוג חייב להיות בין 1 ל-5'],
            max: [5, 'דירוג חייב להיות בין 1 ל-5']
        },
        searchAndRescue: {
            type: Number,
            required: true,
            min: [1, 'דירוג חייב להיות בין 1 ל-5'],
            max: [5, 'דירוג חייב להיות בין 1 ל-5']
        }
    },
    supportPreferences: {
        targetingNCO: {
            type: Number,
            required: true,
            min: [1, 'דירוג חייב להיות בין 1 ל-5'],
            max: [5, 'דירוג חייב להיות בין 1 ל-5']
        },
        nimrodiSergeant: {
            type: Number,
            required: true,
            min: [1, 'דירוג חייב להיות בין 1 ל-5'],
            max: [5, 'דירוג חייב להיות בין 1 ל-5']
        },
        cook: {
            type: Number,
            required: true,
            min: [1, 'דירוג חייב להיות בין 1 ל-5'],
            max: [5, 'דירוג חייב להיות בין 1 ל-5']
        },
        sandwichFiller: {
            type: Number,
            required: true,
            min: [1, 'דירוג חייב להיות בין 1 ל-5'],
            max: [5, 'דירוג חייב להיות בין 1 ל-5']
        }
    },
    techPreferences: {
        fullstack: {
            type: Number,
            required: true,
            min: [1, 'דירוג חייב להיות בין 1 ל-5'],
            max: [5, 'דירוג חייב להיות בין 1 ל-5']
        },
        data: {
            type: Number,
            required: true,
            min: [1, 'דירוג חייב להיות בין 1 ל-5'],
            max: [5, 'דירוג חייב להיות בין 1 ל-5']
        },
        devops: {
            type: Number,
            required: true,
            min: [1, 'דירוג חייב להיות בין 1 ל-5'],
            max: [5, 'דירוג חייב להיות בין 1 ל-5']
        },
        duty: {
            type: Number,
            required: true,
            min: [1, 'דירוג חייב להיות בין 1 ל-5'],
            max: [5, 'דירוג חייב להיות בין 1 ל-5']
        }
    },
    submissionDate: {
        type: Date,
        default: Date.now
    },
    lastModified: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['draft', 'submitted', 'processed'],
        default: 'draft'
    },
    version: {
        type: Number,
        default: 1
    }
}, {
    timestamps: true
});
militaryFormSchema.pre('save', function (next) {
    this.lastModified = new Date();
    next();
});
militaryFormSchema.index({ name: 1, submissionDate: -1 });
militaryFormSchema.virtual('totalScore').get(function () {
    const combatAvg = Object.values(this.combatPreferences).reduce((a, b) => a + b, 0) / 4;
    const supportAvg = Object.values(this.supportPreferences).reduce((a, b) => a + b, 0) / 4;
    const techAvg = Object.values(this.techPreferences).reduce((a, b) => a + b, 0) / 4;
    return (combatAvg + supportAvg + techAvg) / 3;
});
exports.default = mongoose_1.default.model('MilitaryForm', militaryFormSchema);
