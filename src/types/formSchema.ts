import mongoose, { Document, Schema } from 'mongoose';

export interface CombatPreferences {
  golani: number;
  armor: number;
  artillery: number;
  searchAndRescue: number;
}

export interface SupportPreferences {
  targetingNCO: number;
  nimrodiSergeant: number;
  cook: number;
  sandwichFiller: number;
}

export interface TechPreferences {
  fullstack: number;
  data: number;
  devops: number;
  duty: number;
}

export interface IMilitaryForm extends Document {
  name: string;
  personalNote: string;
  combatPreferences: CombatPreferences;
  supportPreferences: SupportPreferences;
  techPreferences: TechPreferences;
  submissionDate: Date;
  lastModified: Date;
  status: 'draft' | 'submitted' | 'processed';
  version: number;
}

const militaryFormSchema = new Schema<IMilitaryForm>({
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

militaryFormSchema.pre('save', function(next) {
  this.lastModified = new Date();
  next();
});

militaryFormSchema.index({ name: 1, submissionDate: -1 });

militaryFormSchema.virtual('totalScore').get(function() {
  const combatAvg = Object.values(this.combatPreferences).reduce((a, b) => a + b, 0) / 4;
  const supportAvg = Object.values(this.supportPreferences).reduce((a, b) => a + b, 0) / 4;
  const techAvg = Object.values(this.techPreferences).reduce((a, b) => a + b, 0) / 4;
  return (combatAvg + supportAvg + techAvg) / 3;
});

export default mongoose.model<IMilitaryForm>('MilitaryForm', militaryFormSchema);