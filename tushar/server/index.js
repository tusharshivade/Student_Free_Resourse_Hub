const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const { SESClient, SendEmailCommand } = require("@aws-sdk/client-ses");
const { GoogleGenerativeAI } = require("@google/generative-ai");

require('dotenv').config();

const sesClient = new SESClient({
  region: process.env.AWS_REGION || 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Database setup
const dbFile = path.join(__dirname, 'chat.db');
const db = new sqlite3.Database(dbFile, (err) => {
  if (err) {
    console.error('Error opening database', err.message);
  } else {
    // Create users table
    db.run(`CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      accountType TEXT DEFAULT 'student',
      skills TEXT DEFAULT '[]',
      points INTEGER DEFAULT 0,
      streaks INTEGER DEFAULT 0,
      badges TEXT DEFAULT '[]',
      bio TEXT,
      profilePic TEXT,
      joinDate DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);
    
    // Create roadmap_progress table
    db.run(`CREATE TABLE IF NOT EXISTS roadmap_progress (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      userId INTEGER,
      roadmapType TEXT,
      stepIndex INTEGER,
      completedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      UNIQUE(userId, roadmapType, stepIndex)
    )`);

    // Create interviews table
    db.run(`CREATE TABLE IF NOT EXISTS interviews (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      requesterId INTEGER,
      partnerId INTEGER,
      domain TEXT,
      status TEXT DEFAULT 'pending',
      scheduledAt DATETIME,
      feedback TEXT,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    // Create contributions table
    db.run(`CREATE TABLE IF NOT EXISTS contributions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      userId INTEGER,
      repoName TEXT,
      issueUrl TEXT,
      status TEXT DEFAULT 'completed',
      pointsAwarded INTEGER DEFAULT 50,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);
    
    // Create messages table
    db.run(`CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      role TEXT,
      content TEXT,
      imageUrl TEXT,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    // Create aptitude_results table
    db.run(`CREATE TABLE IF NOT EXISTS aptitude_results (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      userId INTEGER,
      category TEXT,
      logicScore INTEGER,
      securityScore INTEGER,
      efficiencyScore INTEGER,
      syntaxScore INTEGER,
      architectureScore INTEGER,
      aiFeedback TEXT,
      attemptDate DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);
    
    // Create password_resets table
    db.run(`CREATE TABLE IF NOT EXISTS password_resets (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT NOT NULL,
      token TEXT NOT NULL,
      expiresAt DATETIME NOT NULL
    )`);

    // Create jobs table
    db.run(`CREATE TABLE IF NOT EXISTS jobs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      company TEXT NOT NULL,
      location TEXT NOT NULL,
      category TEXT NOT NULL,
      salary TEXT,
      type TEXT,
      skills TEXT,
      description TEXT,
      postedAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);
    
    console.log('Database tables ready');

    // Helper to add columns if they don't exist
    const addColumn = (table, column, type) => {
      db.run(`ALTER TABLE ${table} ADD COLUMN ${column} ${type}`, (err) => {
        // Ignore error if column already exists
      });
    };

    addColumn('users', 'skills', "TEXT DEFAULT '[]'");
    addColumn('users', 'points', 'INTEGER DEFAULT 0');
    addColumn('users', 'streaks', 'INTEGER DEFAULT 0');
    addColumn('users', 'badges', "TEXT DEFAULT '[]'");
    addColumn('users', 'bio', 'TEXT');
    addColumn('users', 'profilePic', 'TEXT');
  }
});


// Configure Multer for image uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(__dirname, 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'project-architecture-' + uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

// API Routes

// 1. Get all messages
app.get('/api/messages', (req, res) => {
  db.all('SELECT * FROM messages ORDER BY id ASC', [], (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({ messages: rows });
  });
});

// 2. Save a message
app.post('/api/messages', (req, res) => {
  const { role, content, imageUrl } = req.body;
  db.run(
    'INSERT INTO messages (role, content, imageUrl) VALUES (?, ?, ?)',
    [role, content, imageUrl || null],
    function (err) {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.json({
        id: this.lastID,
        role,
        content,
        imageUrl,
        timestamp: new Date().toISOString()
      });
    }
  );
});

// 3. Clear chat (optional utility)
app.delete('/api/messages', (req, res) => {
  db.run('DELETE FROM messages', function (err) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({ message: 'All messages deleted' });
  });
});

// 4. Upload an image
app.post('/api/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'Please upload a file' });
  }
  // Construct the URL to access the uploaded image
  const imageUrl = `http://localhost:${PORT}/uploads/${req.file.filename}`;
  res.json({ imageUrl, filename: req.file.filename });
});

// ======================== AUTH ROUTES ========================

// 5. Signup - Create new user
app.post('/api/auth/signup', async (req, res) => {
  const { name, email, password, accountType } = req.body;
  
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Name, email and password are required' });
  }
  
  // Check if user already exists
  db.get('SELECT id FROM users WHERE email = ?', [email], async (err, row) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    if (row) {
      return res.status(400).json({ error: 'User with this email already exists' });
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Insert new user
    db.run(
      'INSERT INTO users (name, email, password, accountType) VALUES (?, ?, ?, ?)',
      [name, email, hashedPassword, accountType || 'student'],
      function(err) {
        if (err) {
          return res.status(400).json({ error: err.message });
        }
        res.json({
          id: this.lastID,
          name,
          email,
          accountType: accountType || 'student',
          joinDate: new Date().toISOString()
        });
      }
    );
  });
});

// 6. Login - Authenticate user
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }
  
  db.get('SELECT * FROM users WHERE email = ?', [email], async (err, user) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      // Fallback for plain text passwords (Migration)
      if (user.password === password) {
        // Migration: Hash the password and save it
        const hashedPassword = await bcrypt.hash(password, 10);
        db.run('UPDATE users SET password = ? WHERE id = ?', [hashedPassword, user.id]);
      } else {
        return res.status(401).json({ error: 'Invalid email or password' });
      }
    }
    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      accountType: user.accountType,
      joinDate: user.joinDate
    });
  });
});

// 7. Get Current User (Me)
app.get('/api/auth/me', (req, res) => {
  const userId = req.headers['x-user-id'];
  if (!userId) return res.status(401).json({ error: 'Not authenticated' });

  db.get('SELECT id, name, email, accountType, joinDate, skills, points, streaks, badges, bio, profilePic FROM users WHERE id = ?', [userId], (err, user) => {
    if (err) return res.status(400).json({ error: err.message });
    if (!user) return res.status(401).json({ error: 'User not found' });
    
    try {
      if (user.skills) user.skills = JSON.parse(user.skills);
      if (user.badges) user.badges = JSON.parse(user.badges);
    } catch (e) {
      // Ignore parse errors
    }
    res.json(user);
  });
});

// 8. Update User Profile
app.put('/api/auth/profile', (req, res) => {
  const userId = req.headers['x-user-id'];
  const { skills, bio, name } = req.body;
  
  if (!userId) return res.status(401).json({ error: 'Not authenticated' });

  db.run(
    'UPDATE users SET skills = ?, bio = ?, name = ? WHERE id = ?',
    [JSON.stringify(skills || []), bio, name, userId],
    function(err) {
      if (err) return res.status(400).json({ error: err.message });
      res.json({ message: 'Profile updated successfully' });
    }
  );
});

// ======================== ROADMAP ROUTES ========================

// 9. Get Roadmap Progress
app.get('/api/roadmaps/:userId', (req, res) => {
  const { userId } = req.params;
  db.all('SELECT * FROM roadmap_progress WHERE userId = ?', [userId], (err, rows) => {
    if (err) return res.status(400).json({ error: err.message });
    res.json({ progress: rows });
  });
});

// 10. Toggle Roadmap Step
app.post('/api/roadmaps/toggle', (req, res) => {
  const { userId, roadmapType, stepIndex } = req.body;
  
  db.get(
    'SELECT id FROM roadmap_progress WHERE userId = ? AND roadmapType = ? AND stepIndex = ?',
    [userId, roadmapType, stepIndex],
    (err, row) => {
      if (err) return res.status(400).json({ error: err.message });
      
      if (row) {
        // Remove if exists
        db.run('DELETE FROM roadmap_progress WHERE id = ?', [row.id], (err) => {
          if (err) return res.status(400).json({ error: err.message });
          res.json({ status: 'removed', points: -10 });
        });
      } else {
        // Add if not exists
        db.run(
          'INSERT INTO roadmap_progress (userId, roadmapType, stepIndex) VALUES (?, ?, ?)',
          [userId, roadmapType, stepIndex],
          function(err) {
            if (err) return res.status(400).json({ error: err.message });
            // Award points
            db.run('UPDATE users SET points = points + 10 WHERE id = ?', [userId]);
            res.json({ status: 'added', points: 10 });
          }
        );
      }
    }
  );
});

// ======================== INTERVIEW ROUTES ========================

// 11. Get Interviews
app.get('/api/interviews', (req, res) => {
  db.all('SELECT i.*, u.name as requesterName FROM interviews i JOIN users u ON i.requesterId = u.id WHERE status = "pending"', (err, rows) => {
    if (err) return res.status(400).json({ error: err.message });
    res.json({ interviews: rows });
  });
});

// 12. Book/Request Interview
app.post('/api/interviews/request', (req, res) => {
  const { userId, domain, scheduledAt } = req.body;
  db.run(
    'INSERT INTO interviews (requesterId, domain, scheduledAt) VALUES (?, ?, ?)',
    [userId, domain, scheduledAt],
    function(err) {
      if (err) return res.status(400).json({ error: err.message });
      res.json({ id: this.lastID, message: 'Interview requested' });
    }
  );
});

// ======================== CONTRIBUTION ROUTES ========================

// 13. Log Contribution
app.post('/api/contributions', (req, res) => {
  const { userId, repoName, issueUrl } = req.body;
  db.run(
    'INSERT INTO contributions (userId, repoName, issueUrl) VALUES (?, ?, ?)',
    [userId, repoName, issueUrl],
    function(err) {
      if (err) return res.status(400).json({ error: err.message });
      // Award points
      db.run('UPDATE users SET points = points + 50 WHERE id = ?', [userId]);
      res.json({ id: this.lastID, message: 'Contribution logged (50 points awarded)' });
    }
  );
});

app.get('/api/contributions/:userId', (req, res) => {
  db.all('SELECT * FROM contributions WHERE userId = ?', [req.params.userId], (err, rows) => {
    if (err) return res.status(400).json({ error: err.message });
    res.json({ contributions: rows });
  });
});

// ======================== APTITUDE ROUTES ========================

// 14. Log Aptitude Result
app.post('/api/aptitude/results', (req, res) => {
  const { userId, category, scores, aiFeedback } = req.body;
  const { logic, security, efficiency, syntax, architecture } = scores;
  
  db.run(
    'INSERT INTO aptitude_results (userId, category, logicScore, securityScore, efficiencyScore, syntaxScore, architectureScore, aiFeedback) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    [userId, category, logic, security, efficiency, syntax, architecture, aiFeedback],
    function(err) {
      if (err) return res.status(400).json({ error: err.message });
      // Award points for completing an aptitude test
      db.run('UPDATE users SET points = points + 100 WHERE id = ?', [userId]);
      res.json({ id: this.lastID, message: 'Aptitude result logged (100 points awarded)' });
    }
  );
});

// 15. Get Aptitude Results
app.get('/api/aptitude/results/:userId', (req, res) => {
  db.all('SELECT * FROM aptitude_results WHERE userId = ? ORDER BY attemptDate DESC', [req.params.userId], (err, rows) => {
    if (err) return res.status(400).json({ error: err.message });
    res.json({ results: rows });
  });
});

// ======================== PASSWORD RESET ROUTES ========================

// 16. Forgot Password - Request Reset Link
app.post('/api/auth/forgot-password', async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: 'Email is required' });

  db.get('SELECT id FROM users WHERE email = ?', [email], async (err, user) => {
    if (err) return res.status(500).json({ error: err.message });
    
    // Even if user doesn't exist, we return success to prevent email enumeration
    if (!user) {
      return res.json({ message: 'If an account exists with this email, a reset link has been sent.' });
    }

    const token = crypto.randomBytes(32).toString('hex');
    const hashedToken = await bcrypt.hash(token, 10);
    const expiresAt = new Date(Date.now() + 3600000).toISOString(); // 1 hour

    db.run(
      'INSERT INTO password_resets (email, token, expiresAt) VALUES (?, ?, ?)',
      [email, hashedToken, expiresAt],
      async (err) => {
        if (err) return res.status(500).json({ error: err.message });

        const resetLink = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/reset-password?token=${token}&email=${email}`;

        const params = {
          Destination: { ToAddresses: [email] },
          Message: {
            Body: {
              Html: {
                Charset: "UTF-8",
                Data: `
                  <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
                    <h2 style="color: #F13E93;">Password Reset Request</h2>
                    <p>You requested to reset your password for EduHub. Click the button below to proceed:</p>
                    <a href="${resetLink}" style="display: inline-block; padding: 12px 24px; background-color: #F13E93; color: white; text-decoration: none; border-radius: 8px; font-weight: bold; margin: 20px 0;">Reset Password</a>
                    <p style="color: #666; font-size: 14px;">This link will expire in 1 hour.</p>
                    <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
                    <p style="color: #999; font-size: 12px;">If you didn't request this, you can safely ignore this email.</p>
                  </div>
                `
              }
            },
            Subject: { Charset: "UTF-8", Data: "Reset your EduHub Password" }
          },
          Source: process.env.SES_FROM_EMAIL || "noreply@example.com",
        };

        try {
          await sesClient.send(new SendEmailCommand(params));
          res.json({ message: 'If an account exists with this email, a reset link has been sent.' });
        } catch (sesErr) {
          console.error("SES Error:", sesErr);
          res.status(500).json({ error: 'Failed to send email. Please try again later.' });
        }
      }
    );
  });
});

// 17. Reset Password - Finalize
app.post('/api/auth/reset-password', async (req, res) => {
  const { email, token, newPassword } = req.body;

  if (!email || !token || !newPassword) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  db.all('SELECT * FROM password_resets WHERE email = ?', [email], async (err, resets) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!resets || resets.length === 0) {
      return res.status(400).json({ error: 'Invalid or expired token' });
    }

    // Check tokens
    let validReset = null;
    for (const reset of resets) {
      const isMatch = await bcrypt.compare(token, reset.token);
      const isExpired = new Date(reset.expiresAt) < new Date();
      if (isMatch && !isExpired) {
        validReset = reset;
        break;
      }
    }

    if (!validReset) {
      return res.status(400).json({ error: 'Invalid or expired token' });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update user
    db.run('UPDATE users SET password = ? WHERE email = ?', [hashedPassword, email], (err) => {
      if (err) return res.status(500).json({ error: err.message });

      // Clean up ALL resets for this email
      db.run('DELETE FROM password_resets WHERE email = ?', [email]);

      res.json({ message: 'Password reset successfully' });
    });
  });
});

// ======================== JOB PORTAL ROUTES ========================

const genAI = new GoogleGenerativeAI(process.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY);

// 18. Get Jobs
app.get('/api/jobs', (req, res) => {
  const { location } = req.query;
  let query = 'SELECT * FROM jobs ORDER BY postedAt DESC';
  let params = [];

  if (location) {
    query = 'SELECT * FROM jobs WHERE location LIKE ? ORDER BY postedAt DESC';
    params = [`%${location}%`];
  }

  db.all(query, params, (err, rows) => {
    if (err) return res.status(400).json({ error: err.message });
    
    // Parse skills JSON string
    const processedJobs = rows.map(job => ({
      ...job,
      skills: job.skills ? JSON.parse(job.skills) : []
    }));
    
    res.json({ jobs: processedJobs });
  });
});

// 19. Refresh Jobs via Gemini
app.post('/api/jobs/refresh', async (req, res) => {
  let newJobs;
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const today = new Date().toLocaleDateString();
    
    const prompt = `Generate 10 realistic, high-quality technical job listings for Pune, India for today ${today}. 
    Each job should be unique and include:
    - title (e.g., Senior React Developer)
    - company (realistic company names in Pune like tech hubs in Hinjewadi, Magarpatta, or Baner)
    - location (specific areas in Pune)
    - category (Web Development, AI & Data Science, DevOps, Mobile App Development, or UI/UX Design)
    - salary (in INR, e.g., ₹8,00,000 - ₹15,00,000)
    - type (Full-time, Internship, or Contract)
    - skills (list of 4-6 relevant technologies)
    - description (2-3 sentences about the role)
    
    Format the output as a JSON array of objects. Do not include any markdown formatting like \`\`\`json. Just the raw array.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text().trim();
    
    const jsonString = text.replace(/```json|```/g, '').trim();
    newJobs = JSON.parse(jsonString);
  } catch (err) {
    console.warn('Gemini refresh failed, using fallback Pune jobs:', err.message);
    newJobs = [
      {
        title: "Senior Full Stack Developer",
        company: "Zensar Technologies",
        location: "Kharadi, Pune",
        category: "Web Development",
        salary: "₹18,00,000 - ₹28,00,000",
        type: "Full-time",
        skills: ["React", "Node.js", "PostgreSQL", "Docker"],
        description: "Join our core engineering team to build scalable digital solutions for global clients."
      },
      {
        title: "AI Engineer",
        company: "NVIDIA",
        location: "Yerwada, Pune",
        category: "AI & Data Science",
        salary: "₹25,00,000 - ₹40,00,000",
        type: "Full-time",
        skills: ["Python", "PyTorch", "TensorFlow", "CUDA"],
        description: "Develop and optimize deep learning models for autonomous vehicle systems."
      },
      {
        title: "DevOps Specialist",
        company: "Mastercard",
        location: "Magarpatta, Pune",
        category: "DevOps",
        salary: "₹14,00,000 - ₹24,00,000",
        type: "Full-time",
        skills: ["Kubernetes", "AWS", "Terraform", "Jenkins"],
        description: "Manage and automate cloud infrastructure for secure payment processing systems."
      },
      {
        title: "Backend Developer (Go)",
        company: "PhonePe",
        location: "Baner, Pune",
        category: "Web Development",
        salary: "₹20,00,000 - ₹35,00,000",
        type: "Full-time",
        skills: ["Go", "Redis", "Kafka", "Microservices"],
        description: "Build high-throughput backend services for India's leading digital payments platform."
      },
      {
        title: "UI/UX Designer",
        company: "ThoughtWorks",
        location: "Yerwada, Pune",
        category: "UI/UX Design",
        salary: "₹10,00,000 - ₹18,00,000",
        type: "Full-time",
        skills: ["Figma", "Adobe XD", "User Research", "Prototyping"],
        description: "Create intuitive and impactful user experiences for diverse digital products."
      }
    ];
  }

  try {
    const stmt = db.prepare(`INSERT INTO jobs (title, company, location, category, salary, type, skills, description) 
                             VALUES (?, ?, ?, ?, ?, ?, ?, ?)`);

    newJobs.forEach(job => {
      stmt.run(
        job.title,
        job.company,
        job.location,
        job.category,
        job.salary,
        job.type,
        JSON.stringify(job.skills || []),
        job.description
      );
    });

    stmt.finalize();
    res.json({ message: 'Jobs refreshed successfully', count: newJobs.length });
  } catch (err) {
    res.status(500).json({ error: 'Failed to save refreshed jobs: ' + err.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
