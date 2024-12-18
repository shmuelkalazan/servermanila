# שלב 1: שימוש בתמונה רשמית של Node.js
FROM node:18

# שלב 2: הגדרת תיקיית עבודה
WORKDIR /app

# שלב 3: העתקת קבצי הפרויקט
COPY package*.json ./

# שלב 4: התקנת תלויות
RUN npm install

# שלב 5: העתקת שאר הקבצים
COPY . .

# שלב 6: חשיפת פורט שהשרת משתמש בו (לדוגמה: 5000)
EXPOSE 5000

# שלב 7: הפעלת האפליקציה
CMD ["npm", "start"]
