# A clean and modern e-commerce web app design with a minimalist yet fashionable touch.

# TODO

Introducing “Güllü”, a clean and modern e-commerce web app design with a minimalist yet fashionable touch. This fully responsive design ensures a seamless shopping experience across all devices, from desktops to smartphones. The intuitive layout and elegant visuals create a user-friendly interface that focuses on simplicity and style. Perfect for fashion-forward brands looking to enhance their online presence with a sleek, functional, and aesthetically pleasing web experience.


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
| `color`       | `string`  | Color of the product (stored as hex code or color name)   |
| `image_url`   | `string`  | URL of the product image                                  |

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
  "image_url": "https://example.com/images/tshirt-green.jpg",
}