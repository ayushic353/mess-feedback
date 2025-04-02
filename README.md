cat > README.md <<EOF
# 📢 Mess Feedback Portal

A web-based **Mess Feedback Portal** for students to submit feedback, suggestions, and improvements regarding mess services. Built with **HTML, CSS, JavaScript, Node.js, Express, and MySQL**.

---

## 🚀 Features

✅ Submit feedback with various categories (Quality, Quantity, Hygiene, etc.)  
✅ Upload proof (PDF, DOC, JPG) for feedback  
✅ Stores feedback in **MySQL database**  
✅ Generates **Excel & PDF reports**  
✅ Responsive UI for better user experience  
✅ Backend developed using **Node.js and Express**  

---

## 🛠 Tech Stack

- **Frontend**: HTML, CSS, JavaScript  
- **Backend**: Node.js, Express.js  
- **Database**: MySQL  
- **File Upload**: Multer  
- **Reports**: xlsx (Excel), PDFKit (PDF)  

---

## 📂 Project Structure

\`\`\`
mess-feedback1/         # Main Project Folder
│── 📁 public/          # Static files (HTML, CSS, JS)
│   ├── index.html      # Homepage
│   ├── feedback.html   # Feedback Form Page
│   ├── success.html    # Success Page (after feedback submission)
│   ├── 📁 css/         # CSS Folder
│   │   ├── styles.css  # Main Stylesheet
│   ├── 📁 js/          # JavaScript Folder
│   │   ├── script.js   # Client-side JavaScript
│── 📁 uploads/         # Stores uploaded files (Proof attachments)
│── 📁 reports/         # Stores generated Excel/PDF reports
│── mess_feedback.sql   # SQL file to create tables
│── server.js           # Node.js Backend (Express + MySQL)
│── package.json        # Node.js Dependencies
│── package-lock.json   # Auto-generated file (Do not edit manually)
│── .gitignore          # Ignore node_modules and other unnecessary files
│── README.md           # Project Documentation
\`\`\`

---

## 🔧 Installation & Setup

### 1️⃣ **Clone the Repository**
\`\`\`sh
git clone https://github.com/jass-06/mess-feedback1.git
cd mess-feedback1
\`\`\`

### 2️⃣ **Install Dependencies**
\`\`\`sh
npm install
\`\`\`

### 3️⃣ **Set Up MySQL Database**
1. Create a database **mess_feedback** in MySQL.  
2. Run the \`mess_feedback.sql\` file to create necessary tables.

### 4️⃣ **Start the Server**
\`\`\`sh
node server.js
\`\`\`
Server will run at: **\`http://localhost:5000\`**

---

## 📋 API Endpoints

| Method | Endpoint             | Description                 |
|--------|----------------------|-----------------------------|
| POST   | \`/submit-feedback\`   | Submit feedback form       |
| GET    | \`/generate-excel\`    | Generate Excel report      |
| GET    | \`/generate-pdf\`      | Generate PDF report        |

---

## 📸 Screenshots

### 🎯 Homepage  
![Homepage](https://via.placeholder.com/600x300?text=Homepage+Screenshot)

### 🎯 Feedback Form  
![Feedback Form](https://via.placeholder.com/600x300?text=Feedback+Form+Screenshot)

---

## 🤝 Contributing

1. **Fork** the repository  
2. **Clone** it locally: \`git clone <your-fork-url>\`  
3. Create a **new branch**: \`git checkout -b feature-name\`  
4. Commit changes: \`git commit -m "Added new feature"\`  
5. Push to GitHub: \`git push origin feature-name\`  
6. Create a **Pull Request**  

---

## 📞 Contact

👤 **Jaspreet**  
📧 Email: [your-email@example.com](mailto:your-email@example.com)  
🔗 GitHub: [jass-06](https://github.com/jass-06)  

---

⭐ **If you find this project useful, don't forget to star the repo!** ⭐
EOF

# ✅ Add, commit, and push to GitHub
git add README.md
git commit -m "Added README file"
git push origin main

echo "✅ README.md file created and pushed to GitHub successfully!"
