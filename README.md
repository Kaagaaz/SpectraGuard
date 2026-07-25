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
