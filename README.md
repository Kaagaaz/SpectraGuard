# 🛡️ Spectra Guard


A modern **passive website security analyzer** that helps users understand the security posture and privacy signals of websites.

Spectra Guard analyzes publicly available website information and provides a security score based on:

- HTTPS configuration
- Security headers
- Cookie security
- Tracker detection
- Technology detection
- Basic exposure checks

The goal of Spectra Guard is to make website security information easier to understand for everyone.

---

# ✨ Features

## 🔒 HTTPS Analysis

Spectra Guard checks whether a website uses HTTPS encryption.

It helps identify:

- Secure connections
- Missing HTTPS protection
- Basic connection security issues


---

## 🛡️ Security Header Analysis

The scanner checks important HTTP security headers:

- Content Security Policy (CSP)
- HTTP Strict Transport Security (HSTS)
- X-Frame-Options
- X-Content-Type-Options
- Referrer Policy
- Permissions Policy


Security headers help websites defend against various browser-based attacks.


---

## 🍪 Cookie Security Analysis

Spectra Guard analyzes cookie security settings:

Checks:

- Secure flag
- HttpOnly flag
- SameSite attribute


Poor cookie configuration can increase privacy and security risks.


---

## 📡 Tracker Detection

The scanner detects common third-party tracking services.

Examples:

- Google Analytics
- Google Tag Manager
- DoubleClick
- Facebook tracking
- Hotjar
- Microsoft Clarity


This helps users understand how much third-party tracking a website uses.


---

## ⚙️ Technology Detection

Spectra Guard can identify some technologies used by websites.

Examples:

- WordPress
- Shopify
- React
- Vue.js


---

## 📊 Security Score System

Every scan generates a security score from:


Risk levels:

| Score | Risk |
|------|------|
| 85-100 | 🟢 Low |
| 60-84 | 🟡 Medium |
| 35-59 | 🟠 High |
| 0-34 | 🔴 Critical |


The score is calculated using multiple security factors.


---



---

# 🔧 How It Works


1. User enters a website URL.

2. The frontend sends the URL to the Spectra Guard API.

3. The API fetches publicly available website information.

4. The scanner analyzes:

   - HTTPS
   - Headers
   - Cookies
   - Trackers
   - Technologies

5. A security score is generated.

6. Results are displayed instantly.


---

# 🛠️ Tech Stack


## Frontend

- HTML5
- CSS3
- JavaScript
- GitHub Pages


## Backend

- Cloudflare Workers
- JavaScript


## Tools Used

- Git
- GitHub
- Cloudflare


---

# 📁 Repository Structure

│ ├── index.html │ ├── assets │   │ │   ├── css │   │   ├── style.css │   │   ├── variables.css │   │   └── animations.css │   │ │   └── js │       └── app.js │ └── README.md




---

# 🚀 Deployment


## Frontend

Hosted using:

GitHub Pages


## Backend

Hosted using:

Cloudflare Workers



---

# 🔐 Security Notice

Spectra Guard performs **passive security analysis**.

It does NOT:

- Exploit websites
- Perform unauthorized penetration testing
- Attempt attacks
- Access private information


Only publicly available information is analyzed.


Always get permission before performing security testing on websites you do not own.


---

# 🛣️ Future Roadmap


## Version 5.2

Planned:

- SSL certificate information
- Better domain information
- Improved scoring


## Version 5.3

Planned:

- Scan history
- Export reports
- More technology detection


## Version 6.0

Planned:

- Advanced security reports
- Better visualization
- More detailed analysis


---

# 🤝 Contributing


Contributions are welcome.

Steps:

1. Fork this repository

2. Create a new branch
