# Vulnerabilities in old.js and Fixes

## 1. Hard-coded JWT Secret
- **Vulnerability:** The JWT secret is hard-coded in the source code, making it easy to leak or accidentally commit to version control. Attackers can use this secret to forge tokens.
- **Fix:** Use an environment variable (`process.env.JWT_SECRET`) to store the secret securely outside the codebase. The new.js file loads secrets from a `.env` file using the `dotenv` package.

## 2. SQL Injection in Login Endpoint
- **Vulnerability:** The SQL query in `/login` directly interpolates user input, allowing attackers to inject malicious SQL and bypass authentication or access data.
- **Fix:** Use parameterized queries (`?` placeholders) with `db.query` to safely pass user input, preventing SQL injection. The new.js file uses parameterized queries for authentication.

## 3. Hard-coded Database Credentials
- **Vulnerability:** Database credentials are hard-coded, risking exposure if the code is shared or published.
- **Fix:** Store database credentials in environment variables and load them securely. The new.js file expects DB credentials in environment variables, loaded via `dotenv`.

---

**Summary:**
- Secrets and credentials should never be hard-coded.
- Always use parameterized queries to prevent SQL injection.
- Use environment variables and secure configuration management for sensitive data.
