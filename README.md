# Güllü: A Simple E-Commerce Web App

Introducing **Güllü**, a clean and modern e-commerce web app design with a minimalist yet fashionable touch. This fully responsive design ensures a seamless shopping experience across all devices, from desktops to smartphones.

---

![Screenshot 2024-12-10 at 08 53 23](https://github.com/user-attachments/assets/9e9f6b84-4216-4220-bac8-a191200e6b4c)

<img width="724" alt="Screenshot 2024-12-17 at 19 20 06" src="https://github.com/user-attachments/assets/5b414243-76eb-4400-9ebc-8fe5757c0f20" />

---

## 🚀 Live Preview

You can have a look at the live preview link:
## [Live Preview Link](https://ecommerce-web-app-react-fawn.vercel.app/)

### 🖥️ Figma Design

ℹ️ This project was fully designed and developed by me — from the initial sketches on paper to every pixel and line of code:

![823d292030fb2719143db2b483a1021b6e8f5e69](https://github.com/user-attachments/assets/cce6c4cc-90ee-41f2-b52b-1b45b1f6e75e)

Check out the complete UI design in Figma:  
## [Figma Design Link](https://www.figma.com/design/ZTXIfVovD9IIbTtLuBylpv/E-Commerce-Gu%CC%88lderen-Fashion-Web-Design?node-id=0-1&t=Uk5SkM16H9eyXz7s-1)

---

## Features

- **Responsive Design:** Seamless UI experience on all devices.
- **Product Listing:** Display products by category and gender.
- **Details:** Display the product details, and select the size and amount.
- **Sort:** Sort products by price in asc/desc order.
- **Shopping Cart (Coming very soon):** A user-friendly cart system to manage selected products.
- **Animations:** Nice animations using framer motion.
- **UI Components:** Built using reusable react components for efficiency.
- **State Management:** Atom-based state management with clear separation of concerns.
- **Dark Mode Support:** Integrated light and dark mode switcher.
- **Supabase Integration:** Handles backend storage and database operations.
- **Custom Hooks:** Optimized performance for features like shopping cart management.

---

## TODO

- Enhance animations for a better user experience
- Implement search feature
- Implement filters feature

---

## Technologies

- **Frontend:** React, TypeScript, Tailwind CSS, Framer Motion, Custom Fonts, Figma
- **State Management:** Jotai (Atoms)
- **Backend:** Supabase (PostgreSQL Database and Authentication)
- **Image Storage:** Cloudinary
- **Build Tool:** Vite

---

## Database Schema (Supabase)

This project uses [Supabase](https://supabase.io/) as a backend for storing product information.
Below is the schema used for the `products` table:

### `products` Table

| Column Name   | Data Type | Description                                               |
|---------------|-----------|-----------------------------------------------------------|
| `id`          | `integer` | Primary key, auto-incremented                             |
| `title`       | `string`  | Name of the product (e.g., “Green Cotton T-Shirt”)        |
| `description` | `text`    | Detailed description of the product                       |
| `category`    | `string`  | Product category (e.g., “tshirt”, “hoodie”, “sweatpants”) |
| `price`       | `decimal` | Price of the product                                      |
| `gender`      | `string`  | Target gender for the product (e.g., “men”, “women”)      |
| `image_url`   | `string`  | URL of the product image                                  |

---

### Sample Product JSON

Here’s a sample product JSON that can be used for seeding the database:

```json
{
  "id": 1,
  "title": "Green Cotton T-Shirt",
  "description": "High-quality, breathable cotton T-shirt in green.",
  "category": "tshirt",
  "price": 19.99,
  "gender": "men",
  "color": "#34A853",
  "image_url": "https://example.com/images/tshirt-green.jpg"
}
```

### Project Structure

Below is a brief explanation of the project structure:

```
src/
├── atoms/         # Recoil atoms for state management
├── components/    # Reusable UI components
├── config/        # App-level configuration constants
├── containers/    # Main container components
├── hooks/         # Custom hooks
├── pages/         # Page components
├── supabase/      # Supabase-specific code (context, model, seed, utils)
└── utils/         # Utility functions
```

---

## Screenshots

![Screenshot 2024-12-10 at 08 57 09](https://github.com/user-attachments/assets/0551630d-7dbe-4480-b159-bd746c2d6d7d)

---

![Screenshot 2024-12-10 at 08 56 43](https://github.com/user-attachments/assets/5d47d0fc-f040-4b34-aa19-781882ab769a)

---

![Screenshot 2024-12-10 at 08 56 14](https://github.com/user-attachments/assets/1a748478-767a-43f4-bba5-bfce677abf6e)

---

![Screenshot 2024-12-10 at 08 55 01](https://github.com/user-attachments/assets/66584cb9-c505-4e9e-acb7-189d9b927087)

---

![Screenshot 2024-12-10 at 08 54 16](https://github.com/user-attachments/assets/902af54a-e1fd-4a50-8ab4-56a8549e04d5)

---

<img width="724" alt="Screenshot 2024-12-17 at 19 19 45" src="https://github.com/user-attachments/assets/222421dd-1c37-4649-96e1-05ffdf4e5c65" />

---

<img width="724" alt="Screenshot 2024-12-17 at 19 19 57" src="https://github.com/user-attachments/assets/76d6824c-be5b-47af-b5fe-e742d7167493" />

---

**License**

_This project is open source and available under the MIT License._
