# 🍽️ FoodieExpress – AI-Powered Food Ordering Web App

Welcome to **FoodieExpress**, a sleek, responsive, and intelligent online restaurant ordering interface powered by React, TypeScript, TailwindCSS, and Gemini AI (Google Generative AI).

This project was built as a solution to the following prompt:

> **"Ordering Page (Frontend Only):**
> Create a simple, responsive ordering UI with:
>
> * Category filters
> * Add to cart
> * Cart summary with total
> * Bonus: Store cart in localStorage"

But I took it a step further.

---

## 🚀 Why I Went Beyond

Though the task required only a static frontend, I wanted to push myself:

* ✅ Integrated **AI Chatbot** (Google Gemini)
* ✅ Made the design fully **responsive & mobile-friendly**
* ✅ Added **cart persistence via localStorage**
* ✅ Included **UX polish**: loading spinners, empty cart state, etc.
* ✅ Structured components for easy future backend integration

---

## ✨ Features

* 🧠 Gemini AI-powered food assistant chatbot
* 📦 Add to cart with quantity, itemized pricing
* 📂 Category-based product filtering
* 🧾 Total price calculation
* 💾 Cart saved in localStorage
* 💬 Conversational UI powered by Google Generative AI
* 📱 Fully mobile responsive
* 🎨 Clean UI using TailwindCSS + Lucide Icons

---

## 🧠 AI ChatBot Integration (Gemini by Google)

### 🧩 Approach

I used the `@google/generative-ai` package to interact with Gemini 1.5 Flash.
I created a custom chatbot with the following steps:

### 🔐 API Setup

In `.env` file:

```env
VITE_GEMINI_API_KEY=your_google_genai_api_key
```

### 📦 Installation

```bash
npm install @google/generative-ai
```

### 🧠 Code Integration (ChatBot.tsx)

```ts
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
const prompt = `${generateRestaurantContext()}\n\nCustomer Question: ${inputText}`;

const result = await model.generateContent(prompt);
const response = await result.response;
const text = response.text();
const plainText = text.replace(/\*\*(.*?)\*\*/g, '$1');
```

* Used a detailed menu and restaurant context to guide the AI
* Cleaned up markdown (e.g., removed bold `**` from AI response)
* Displayed messages in a chat UI with timestamps, loading state

### 🔁 Dynamic Restaurant Context

The chatbot is aware of:

* Menu items (name, price, category, rating)
* Pricing breakdown (under ₹500)
* Special combos, popular items
* Operating hours, contact info
* Dietary information (e.g., vegetarian, allergens)

---

## 📂 Project Structure

```
├── public/
├── src/
│   ├── components/
│   │   └── ChatBot.tsx         # Gemini AI-powered assistant
│   ├── App.tsx                # Main UI & logic
│   ├── index.tsx              # Entry point
│   └── styles/
│       └── tailwind.css
├── .env                       # Gemini API Key
├── vite.config.ts
└── package.json
```

---

## 💡 UX Decisions

* ✨ **Pagination** was added even though not required, improving usability
* 🔁 **State Persistence** via localStorage for a seamless cart experience
* 📱 **Responsive design** ensured that users on mobile/tablet have the same fluidity as desktop
* 🧠 **AI Chatbot** gives a real-time restaurant support feel, like BookMyShow/Swiggy apps


---

## ⚙️ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/foodie-express.git
cd foodie-express
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Add `.env` File

```
VITE_GEMINI_API_KEY=your_google_genai_api_key_here
```

### 4. Start Development Server

```bash
npm run dev
```

> Visit `http://localhost:5173`

---

## 📦 Technologies Used

* ⚛️ React + TypeScript
* 💨 TailwindCSS
* ⚡ Vite
* 🔮 Google Generative AI (Gemini)
* 📦 LocalStorage
* 🎨 Lucide Icons

---

## 📌 Improvements Ahead

* [ ] Hook to a backend (orders, inventory)
* [ ] Auth system (JWT + role-based dashboard)
* [ ] Payment API integration
* [ ] Multilingual support

---

## 🙋‍♂️ Author

**Trideep Makal**

> Built with passion, curiosity, and love for clean UX.



## 🌐 Deployment

Deploy it to:

* [Vercel](https://foodie-express-ruby.vercel.app) – frontend

---

Enjoy a smarter way to explore and order food with 🍕 **FoodieExpress**.
