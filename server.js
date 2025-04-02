// Mess Feedback Portal - Developed by Jaspreet
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const xlsx = require("xlsx");
const PDFDocument = require("pdfkit");

const app = express();

// Middleware
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
// Serves uploaded files

// MySQL Database Connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root", 
    password: "Preet@2006", 
    database: "mess_feedback"
});

db.connect((err) => {
    if (err) {
        console.error("Database Connection Failed:", err);
        return;
    }
    console.log("✅ MySQL Connected...");
});

// File Upload (Multer Setup)
const storage = multer.diskStorage({
    destination: "./uploads/",
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});
const upload = multer({ storage });

// Submit Feedback API
app.post("/submit-feedback", upload.single("proof"), (req, res) => {
    const { reg_no, student_name, block_room, mess_name, mess_type, category, feedback_type, comments } = req.body;
    const proof = req.file ? req.file.filename : null;

    // 🔹 Debugging: Log received data
    console.log("📥 Received Data from Client:");
    console.log("Reg No:", reg_no);
    console.log("Student Name:", student_name);
    console.log("Block & Room:", block_room);
    console.log("Mess Name:", mess_name);
    console.log("Mess Type:", mess_type);
    console.log("Category:", category);
    console.log("Feedback Type:", feedback_type);
    console.log("Comments:", comments);
    console.log("Proof File:", proof);

    // 🔹 Check if any required field is missing
    if (!reg_no || !student_name || !block_room || !mess_name || !mess_type || !category || !feedback_type || !comments) {
        return res.status(400).json({ error: "⚠️ All fields are required except proof attachment." });
    }

    const sql = "INSERT INTO feedback (reg_no, student_name, block_room, mess_name, mess_type, category, feedback_type, comments, proof) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
    db.query(sql, [reg_no, student_name, block_room, mess_name, mess_type, category, feedback_type, comments, proof], (err, result) => {
        if (err) {
            console.error("❌ Database Error:", err);
            return res.status(500).json({ error: "❌ Database error. Please try again." });
        }
        res.json({ message: "✅ Feedback submitted successfully!" });        
    });
});



// Generate Excel Report API
app.get("/generate-excel", (req, res) => {
    db.query("SELECT * FROM feedback", (err, results) => {
        if (err) return res.status(500).json({ error: "Database error" });

        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(results);
        xlsx.utils.book_append_sheet(wb, ws, "Feedback Report");

        const filename = "feedback-report.xlsx";
        xlsx.writeFile(wb, filename);
        res.download(filename, () => fs.unlinkSync(filename)); // Delete file after download
    });
});

// Generate PDF Report API
app.get("/generate-pdf", (req, res) => {
    db.query("SELECT * FROM feedback", (err, results) => {
        if (err) return res.status(500).json({ error: "Database error" });

        const doc = new PDFDocument();
        const filename = "feedback-report.pdf";
        doc.pipe(fs.createWriteStream(filename));

        doc.fontSize(16).text("Mess Feedback Report", { align: "center" });
        doc.moveDown();

        results.forEach((row) => {
            doc.fontSize(12).text(`Reg No: ${row.reg_no}, Student: ${row.student_name}, Category: ${row.category}, Comments: ${row.comments}`);
            doc.moveDown();
        });

        doc.end();
        res.download(filename, () => fs.unlinkSync(filename));
    });
});

// Serve static files from the "public" folder
app.use(express.static(path.join(__dirname, "public")));

// Serve feedback.html when user visits "/feedback"
app.get("/feedback", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "feedback.html"));
});

// Serve index.html as the default page
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});
app.get("/success", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "success.html"));
});

app.listen(5000, () => {
    console.log("🚀 Server running on http://localhost:5000");
});