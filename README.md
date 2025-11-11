# 🛍️ MobileShop

A small mobile shop built with **React Native (Expo)** for the *Mobile Application 1* exam.  
It demonstrates navigation, API calls, search/sort/filter, and basic cart functionality.

---

## ⚙️ Project Overview
This app fetches product data from the DummyJSON API and allows the user to:
- Browse and search for products.
- Sort alphabetically or by price (low/high).
- Filter products by maximum price.
- Add/remove items from a simple shopping cart.
- View static profile info.

---

## 🌐 API Used
Base URL: [https://dummyjson.com](https://dummyjson.com)

**Endpoints**
- List: `GET /products`  
- Detail: `GET /products/:id`

---

## ▶️ Run Instructions
1. Clone the repository.
2. Run `npm install`.
3. Start Expo: `npm start`.
4. Open on your phone with **Expo Go** (scan QR code) or use the web/emulator.

---

## 🔍 Search, Sort & Filter
- **Search** filters products by title in real time.  
- **Sort** lets you order products alphabetically or by price (low → high, high → low).  
- **Price filter** lets you enter a max price to only show cheaper items.  
- You can **add or remove items** from the cart directly in the list.  
- The cart counter shows how many products you added.

---

## 👤 Profile
Static user info with a simple, professional layout centered on the screen.
