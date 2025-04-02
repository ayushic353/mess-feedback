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
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // Serves uploaded files
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public"))); // Serves static files

// MySQL Database Connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Preet@2006",
    database: "mess_feedback",
});

db.connect((err) => {
    if (err) {
        console.error("❌ Database Connection Failed:", err);
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

// ✅ Submit Feedback API
app.post("/submit-feedback", upload.single("proof"), async (req, res) => {
    try {
        const { reg_no, student_name, block_room, mess_name, mess_type, category, feedback_type, comments } = req.body;
        const proof = req.file ? req.file.filename : null;

        if (!reg_no || !student_name || !block_room || !mess_name || !mess_type || !category || !feedback_type || !comments) {
            return res.status(400).json({ error: "⚠️ All fields are required except proof attachment." });
        }

        const sql = "INSERT INTO feedback (reg_no, student_name, block_room, mess_name, mess_type, category, feedback_type, comments, proof) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
        await db.promise().query(sql, [reg_no, student_name, block_room, mess_name, mess_type, category, feedback_type, comments, proof]);

        res.json({ message: "✅ Feedback submitted successfully!" });
    } catch (err) {
        console.error("❌ Error submitting feedback:", err);
        res.status(500).json({ error: "❌ Server error. Please try again." });
    }
});

// ✅ Generate Excel Report API
app.get("/generate-excel", async (req, res) => {
    try {
        const [results] = await db.promise().query("SELECT * FROM feedback");
        if (results.length === 0) {
            return res.status(404).send("⚠️ No feedback found.");
        }

        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(results);
        xlsx.utils.book_append_sheet(wb, ws, "Feedback Report");

        const filename = "feedback-report.xlsx";
        xlsx.writeFile(wb, filename);

        res.download(filename, () => {
            fs.unlinkSync(filename); // Delete after download
        });
    } catch (err) {
        console.error("❌ Error generating Excel:", err);
        res.status(500).json({ error: "❌ Server error" });
    }
});

// ✅ Generate PDF Report API
app.get("/generate-pdf", async (req, res) => {
    try {
        const [results] = await db.promise().query("SELECT * FROM feedback");
        if (results.length === 0) {
            return res.status(404).send("⚠️ No feedback found.");
        }

        const doc = new PDFDocument();
        res.setHeader("Content-Disposition", 'attachment; filename="feedback-report.pdf"');
        res.setHeader("Content-Type", "application/pdf");
        doc.pipe(res);

        doc.fontSize(16).text("Mess Feedback Report", { align: "center" });
        doc.moveDown();

        results.forEach((row) => {
            doc.fontSize(12).text(`Reg No: ${row.reg_no}\nStudent: ${row.student_name}\nCategory: ${row.category}\nComments: ${row.comments}`, { width: 450, align: "left" });
            doc.moveDown();
        });

        doc.end();
    } catch (err) {
        console.error("❌ Error generating PDF:", err);
        res.status(500).json({ error: "❌ Server error" });
    }
});

// ✅ Serve Static Pages
app.get("/feedback", (req, res) => res.sendFile(path.join(__dirname, "public", "feedback.html")));
app.get("/", (req, res) => res.sendFile(path.join(__dirname, "public", "index.html")));
app.get("/success", (req, res) => res.sendFile(path.join(__dirname, "public", "success.html")));

// ✅ Start Server
app.listen(5000, () => console.log("🚀 Server running on http://localhost:5000"));