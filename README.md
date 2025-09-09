# 🛒 FreshCart Ecommerce

A modern, responsive ecommerce application built with Next.js 14, featuring a sleek design and smooth user experience.

## ✨ Features

- 🏠 **Dynamic Homepage** with product listings and interactive sliders
- 🛍️ **Product Details** with enhanced UI and user-friendly design
- 📱 **Responsive Design** optimized for all devices
- 🎨 **Modern UI Components** using Tailwind CSS and shadcn/ui
- 🔄 **Interactive Sliders** with news ticker-style category browsing
- ⚡ **Performance Optimized** with Next.js Image component and SSR
- 🎯 **Professional Error Pages** (404, loading, error handling)

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ecommerce
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Visit [http://localhost:3000](http://localhost:3000) to see the application.

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Icons**: Font Awesome
- **Slider**: Swiper.js
- **Language**: TypeScript
- **API**: External ecommerce API integration

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── _Components/        # Reusable UI components
│   ├── product-details/    # Product detail pages
│   └── globals.css        # Global styles
├── apis/                  # API integration functions
└── Assets/               # Static assets (images, icons)
```

## 🎨 Key Components

- **MainSlider**: Hero slider with autoplay and navigation
- **SwiperCategory**: News ticker-style category browser
- **HomeCard**: Product card with hover effects
- **Navbar**: Responsive navigation header

## 🌐 API Integration

The application fetches data from:
- **Products API**: `https://ecommerce.routemisr.com/api/v1/products`
- **Categories API**: `https://ecommerce.routemisr.com/api/v1/categories`
- **Single Product API**: `https://ecommerce.routemisr.com/api/v1/products/{id}`

## 📦 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

## 🚢 Deployment

Deploy easily on [Vercel](https://vercel.com/new) - the platform made by the creators of Next.js.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

---

Built with ❤️ using Next.js and modern web technologies.
