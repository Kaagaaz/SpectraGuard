-- =====================================
-- Spectra Guard v4.1 Database
-- Cloudflare D1
-- =====================================


-- Users table

CREATE TABLE IF NOT EXISTS users (

    id INTEGER PRIMARY KEY AUTOINCREMENT,

    username TEXT NOT NULL,

    email TEXT UNIQUE NOT NULL,

    password_hash TEXT NOT NULL,

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP

);





-- Websites table

CREATE TABLE IF NOT EXISTS websites (

    id INTEGER PRIMARY KEY AUTOINCREMENT,

    user_id INTEGER NOT NULL,

    url TEXT NOT NULL,

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,


    FOREIGN KEY(user_id)
    REFERENCES users(id)

);







-- Scan results table

CREATE TABLE IF NOT EXISTS scans (

    id INTEGER PRIMARY KEY AUTOINCREMENT,


    website_id INTEGER NOT NULL,


    score INTEGER,


    risk TEXT,


    https BOOLEAN,


    cookies INTEGER,


    trackers INTEGER,


    technologies TEXT,


    vulnerabilities TEXT,


    issues TEXT,


    recommendations TEXT,


    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,


    FOREIGN KEY(website_id)
    REFERENCES websites(id)

);







-- Sessions table

CREATE TABLE IF NOT EXISTS sessions (

    id INTEGER PRIMARY KEY AUTOINCREMENT,


    user_id INTEGER NOT NULL,


    token TEXT UNIQUE NOT NULL,


    expires_at DATETIME NOT NULL,


    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,


    FOREIGN KEY(user_id)
    REFERENCES users(id)

);
