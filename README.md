# 📊 k6 Browser Chat Performance Test

This project is a **end-to-end browser-based performance testing script using k6** for a real-time chat application.
It simulates multiple users logging in, navigating chats, and sending messages while measuring UI performance.

---

## 🚀 Features

* 👥 3 Virtual Users (concurrent users simulation)
* ⏱ 5 minutes load test duration
* 💬 Chat login + conversation selection
* ✉️ Automated message sending
* 👀 UI validation (message visible check)
* 📊 Performance thresholds (error rate + response time)
* 🌐 Real browser testing using Chromium

---

## 🧪 Test Scenario

Each virtual user performs:

1. Open login page
2. Login with credentials
3. Navigate to chat section
4. Select a conversation
5. Send a message
6. Verify message appears in UI

---

## 🛠️ Tech Stack

* [k6](https://k6.io/) (Performance testing tool)
* k6 Browser Module (Chromium automation)
* JavaScript (ES6)

---

## 📦 Installation

### 1. Install k6

#### Linux

```bash
sudo apt install k6
```

#### Mac

```bash
brew install k6
```

#### Windows

Download from: [https://k6.io/docs/get-started/installation/](https://k6.io/docs/get-started/installation/)

---

### 2. Clone Project

```bash
git clone https://github.com/your-username/k6-chat-performance.git
cd k6-chat-performance
```

---

## ▶️ Run Test

### Run in non-headless mode (see browser)

```bash
K6_BROWSER_HEADLESS=false k6 run chat-test.js
```

---

### Run in headless mode

```bash
k6 run chat-test.js
```

---

## ⚙️ Configuration

### Current setup:

```js
vus: 3,
duration: "5m",
executor: "constant-vus"
```

---

## 📊 Metrics

The test validates:

* ✔ Message sent successfully
* ✔ Message visible in UI
* ✔ Error rate < 1%
* ✔ Response time (p95 < 2s)

---

## 📁 Project Structure

```
.
├── chat-test.js     # Main k6 browser test script
└── README.md        # Documentation
```

---

## 🔥 Example Output

```
✔ conversation selected
✔ message visible in UI
✔ chat message sent
```

---

## ⚠️ Important Notes

* Use **different test users** for multi-VU testing (recommended)
* Avoid running on production data
* Ensure stable selectors for reliable results
* Chat system must support concurrent sessions

---

## 🚀 Use Cases

* Chat application load testing
* Real-time messaging performance validation
* UI + API hybrid performance testing
* WebSocket-based app testing

---

