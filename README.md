# 🌐 InfoHub

**InfoHub** is a modern **React Single Page Application (SPA)** that delivers curated information such as quotes, insights, and helpful data in an engaging and minimal interface.  
It features dynamic data fetching, smooth loading animations, and a fully responsive design.

---

## 🚀 Features

- ⚡ **Single Page Application (SPA)** built with React  
- 🔄 **Live API Fetching** using Axios  
- 💬 **Random Quote Generator** with beautiful UI  
- 🎨 **Modern UI/UX** styled with CSS and React Icons  
- ⏳ **Loading Spinners** using `react-loader-spinner`  
- 💡 **Error Handling** for failed API requests  

---

## 🧩 Tech Stack

| Category    | Technology             |
| ----------- | ---------------------- |
| Frontend    | React.js (Vite) |
| Styling     | CSS3                   |
| Icons       | React Icons            |
| HTTP Client | Axios                  |
| Loader      | react-loader-spinner   |

---

## 🗂️ Folder Structure

```
INFOHUB-CHALLENGE/
├── client/
│   ├── node_modules/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── CurrencyConverter/
│   │   │   │   ├── index.css
│   │   │   │   └── index.jsx
│   │   │   ├── Header/
│   │   │   │   ├── index.css
│   │   │   │   └── index.jsx
│   │   │   ├── QuoteGenerator/
│   │   │   │   ├── index.css
│   │   │   │   └── index.jsx
│   │   │   └── WeatherModule/
│   │   │       ├── index.css
│   │   │       └── index.jsx
│   │   ├── App.css
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── .gitignore
│   ├── eslint.config.js
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   ├── README.md
│   └── vite.config.js
│
├── server/
│   ├── node_modules/
│   ├── .env
│   ├── package-lock.json
│   ├── package.json
│   └── server.js
│
└── README.md

```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```bash
https://github.com/Sanjeevan1122003/Info-hub.git
cd infohub
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Start the Development Server

```bash
npm start
```

Or if you’re using **Vite**:

```bash
npm run dev
```

The app will be available at **http://localhost:5173** (Vite).

---

## 🧠 How It Works

1. When the app loads, `QuoteGenerator` fetches a random quote from an external API (like [Quotable](https://api.quotable.io/random)).
2. While fetching, a **Three Dots Loader** is shown using the `react-loader-spinner` package.
3. Once the data is received, it is displayed beautifully with icons (`BsFillChatLeftQuoteFill`).
4. If an error occurs, an error message is displayed instead.

---

## 📜 Example Component

```jsx
import { useState, useEffect } from "react";
import { ThreeDots } from "react-loader-spinner";
import { BsFillChatLeftQuoteFill } from "react-icons/bs";
import axios from "axios";
import "./index.css";

const QuoteGenerator = () => {
  const [data, setData] = useState(null);
  const [loading, setLoader] = useState(true);
  const [error, setError] = useState("");

  const fetchQuote = async () => {
    try {
      setLoader(true);
      const response = await axios.get("https://api.quotable.io/random");
      setData(response.data);
    } catch (err) {
      setError("Failed to fetch quote. Please try again.");
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <div className="quote-container">
      {loading ? (
        <ThreeDots height="80" width="80" color="#4fa94d" />
      ) : error ? (
        <p className="error-text">{error}</p>
      ) : (
        <div className="quote-card">
          <BsFillChatLeftQuoteFill className="quote-icon" />
          <p className="quote-text">"{data.content}"</p>
          <p className="quote-author">— {data.author}</p>
          <button onClick={fetchQuote}>Get New Quote</button>
        </div>
      )}
    </div>
  );
};

export default QuoteGenerator;
```

---

## 🧰 Environment Variables (Optional)

If your app uses private APIs, create a `.env` file in the project root:

```
REACT_APP_API_URL=https://api.example.com
```

Then use it in code as:

```js
axios.get(`${process.env.REACT_APP_API_URL}/random`);
```

---

## 📦 Build for Production

To build a production-ready version:

```bash
npm run build
```

The optimized files will be output to the `build/` folder.

---

## 🧑‍💻 Contributing

Contributions are welcome!  
If you find bugs or have ideas for improvement:

1. Fork the repository  
2. Create a feature branch (`git checkout -b feature/your-feature`)  
3. Commit your changes (`git commit -m 'Add new feature'`)  
4. Push to your branch and open a Pull Request

---

## 🪪 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

## ✨ Author

**Sanjeevan Thangaraj**  
📧 [sanjeevan1122003@gmail.com]  
🔗 [GitHub Profile](https://github.com/Sanjeevan1122003/)

---

## 💬 Acknowledgments

- [Quotable API](https://api.quotable.io) — for providing free quote data  
- [React Loader Spinner](https://www.npmjs.com/package/react-loader-spinner) — for smooth loading UI  
- [React Icons](https://react-icons.github.io/react-icons) — for modern iconography  

---

⭐ **If you like this project, consider giving it a star on GitHub!**
