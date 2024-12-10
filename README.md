# Güllü: A Simple E-Commerce Web App

Introducing **Güllü**, a clean and modern e-commerce web app design with a minimalist yet fashionable touch. This fully responsive design ensures a seamless shopping experience across all devices, from desktops to smartphones.

---

![Screenshot 2024-12-10 at 08 53 23](https://github.com/user-attachments/assets/9e9f6b84-4216-4220-bac8-a191200e6b4c)

---

## TODO

- Implement the shopping cart functionality (almost complete!)
- Enhance animations for a better user experience
- Implement search feature
- Implement filters feature

---

⚠️ This project is still ongoing, and we're almost there!<br>
The shopping cart functionality is the last major feature remaining.
Stay tuned for the final release. 🚀

---

You can have a look at the complete Figma design here:
### [Figma Design Link](https://www.figma.com/design/ZTXIfVovD9IIbTtLuBylpv/E-Commerce-Gu%CC%88lderen-Fashion-Web-Design?node-id=0-1&t=Uk5SkM16H9eyXz7s-1)

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

### TODO | I will put more images as soon as I complete this project.

---

**License**

_This project is open source and available under the MIT License._
