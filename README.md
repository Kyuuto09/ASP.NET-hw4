# 🛍️ Apple-Style E-Commerce Platform

<div align="center">

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-19.1.1-61DAFB?logo=react)
![.NET](https://img.shields.io/badge/.NET-9.0-512BD4?logo=dotnet)
![Vite](https://img.shields.io/badge/Vite-7.1.7-646CFF?logo=vite)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-4.1.13-38B2AC?logo=tailwind-css)

**A modern, responsive e-commerce platform inspired by Apple's design language**

</div>

---

## 📸 Screenshots

### 🌟 Main Interface
*Screenshots coming soon...*

### 🌙 Dark Mode
*Screenshots coming soon...*

### 🛒 Shopping Cart
*Screenshots coming soon...*

### 🌍 Multi-Language Support
*Screenshots coming soon...*

---

## ✨ Features

### 🎨 **Design & UI**
- 🍎 **Apple-inspired design** with glass morphism effects
- 🌙 **Dark/Light mode** with smooth transitions
- 📱 **Fully responsive** design for all devices
- ✨ **Glass blur effects** and smooth animations
- 🎯 **Modern typography** with SF Pro Display font

### 🛒 **E-Commerce Functionality**
- 🛍️ **Product catalog** with advanced filtering
- 🔍 **Smart search** by name, color, and capacity
- 🛒 **Shopping cart** with real-time updates
- 📊 **Category management** and sorting options
- 💰 **Price calculations** and checkout flow

### 🌍 **Internationalization**
- 🇺🇸 **English** - Full support
- 🇯🇵 **Japanese** (日本語) - Complete translation
- 🇺🇦 **Ukrainian** (Українська) - Full localization
- 🔄 **Auto language detection** based on browser settings
- 🍪 **Persistent preferences** via cookies

### ⚡ **Technical Features**
- ⚡ **Lightning fast** with Vite and React 19
- 🎪 **State management** with React Context
- 🔗 **RESTful API** with ASP.NET Core
- 🗄️ **SQLite database** with Entity Framework
- 🎨 **Tailwind CSS** for styling
- 🔧 **Hot module replacement** for development

---

## 🛠️ Tech Stack

### Frontend 🎨
| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 19.1.1 | UI Framework |
| **Vite** | 7.1.7 | Build Tool & Dev Server |
| **Tailwind CSS** | 4.1.13 | Styling Framework |
| **React Router** | 7.9.2 | Client-side Routing |
| **i18next** | 25.5.2 | Internationalization |
| **React i18next** | 16.0.0 | React Integration |

### Backend ⚙️
| Technology | Version | Purpose |
|------------|---------|---------|
| **ASP.NET Core** | 9.0 | Web API Framework |
| **Entity Framework** | 9.0.9 | ORM |
| **SQLite** | - | Database |
| **Swagger** | 9.0.4 | API Documentation |

---

## 🚀 Quick Start

### 📋 Prerequisites

Before running this project, make sure you have the following installed:

- **Node.js** (v18 or higher) 📦
- **npm** or **yarn** 📦  
- **.NET 9.0 SDK** ⚙️
- **Git** 🔧

### 📥 Installation

#### 🚀 **Quick Start (One Command Setup)**
```bash
# Clone and setup everything at once
git clone https://github.com/Kyuuto09/ASP-NET-hw4.git && cd ASP-NET-hw4 && cd backend && dotnet restore && dotnet ef database update && cd ../frontend && npm install && npm run dev
```

> **💡 Pro Tip**: The above command will clone, install all dependencies, setup the database, and start the development server automatically!

#### 📋 **Step-by-Step Installation**

1. **Clone the repository**
   ```bash
   git clone https://github.com/Kyuuto09/ASP-NET-hw4.git
   cd ASP-NET-hw4
   ```

2. **Setup Backend** 🔧
   ```bash
   cd backend
   dotnet restore
   dotnet ef database update
   dotnet run
   ```
   Backend will run on `https://localhost:7017`

3. **Setup Frontend** 🎨
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
   Frontend will run on `http://localhost:5173`

#### 📦 **Frontend Dependencies**
All required packages will be installed automatically with `npm install`:

**Main Dependencies:**
```bash
npm install react@^19.1.1 react-dom@^19.1.1 react-router-dom@^7.9.2 i18next@^25.5.2 react-i18next@^16.0.0 i18next-browser-languagedetector@^8.2.0 tailwindcss@^4.1.13 @tailwindcss/vite@^4.1.13
```

**Development Dependencies:**
```bash
npm install -D @eslint/js@^9.36.0 @types/react@^19.1.13 @types/react-dom@^19.1.9 @vitejs/plugin-react@^5.0.3 eslint@^9.36.0 eslint-plugin-react-hooks@^5.2.0 eslint-plugin-react-refresh@^0.4.20 globals@^16.4.0 vite@^7.1.7
```

**Or install everything at once:**
```bash
npm install react@^19.1.1 react-dom@^19.1.1 react-router-dom@^7.9.2 i18next@^25.5.2 react-i18next@^16.0.0 i18next-browser-languagedetector@^8.2.0 tailwindcss@^4.1.13 @tailwindcss/vite@^4.1.13 && npm install -D @eslint/js@^9.36.0 @types/react@^19.1.13 @types/react-dom@^19.1.9 @vitejs/plugin-react@^5.0.3 eslint@^9.36.0 eslint-plugin-react-hooks@^5.2.0 eslint-plugin-react-refresh@^0.4.20 globals@^16.4.0 vite@^7.1.7
```

#### ⚙️ **Backend Dependencies** 
All required packages will be restored automatically with `dotnet restore`:
```bash
dotnet add package Microsoft.EntityFrameworkCore --version 9.0.9
dotnet add package Microsoft.EntityFrameworkCore.Sqlite --version 9.0.9
dotnet add package Microsoft.EntityFrameworkCore.Tools --version 9.0.9
dotnet add package Microsoft.AspNetCore.OpenApi --version 9.0.8
dotnet add package Swashbuckle.AspNetCore --version 9.0.4
```

### 🎯 Development Commands

#### Frontend Commands
```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

#### Backend Commands
```bash
# Run development server
dotnet run

# Run with watch mode
dotnet watch run

# Create database migration
dotnet ef migrations add MigrationName

# Update database
dotnet ef database update

# Build project
dotnet build
```

---

## 🏗️ Project Structure

```
ASP-NET-hw4/
├── 📁 backend/                 # ASP.NET Core API
│   ├── 📁 Controllers/         # API Controllers
│   ├── 📁 Models/             # Data Models & DTOs
│   ├── 📁 Data/               # Database Context
│   ├── 📁 Migrations/         # EF Migrations
│   └── 🗄️ eshop.db           # SQLite Database
├── 📁 frontend/               # React Application  
│   ├── 📁 src/                # Source Code
│   │   ├── 📁 components/     # Reusable Components
│   │   ├── 📁 pages/          # Page Components
│   │   ├── 📁 context/        # React Context
│   │   ├── 📁 hooks/          # Custom Hooks
│   │   └── 📁 api/            # API Integration
│   ├── 📁 public/             # Static Assets
│   └── 📄 package.json        # Dependencies
└── 📖 README.md               # Project Documentation
```

---

## 🔧 Configuration

### 🌍 Environment Variables

Create a `.env` file in the frontend directory:

```env
VITE_API_URL=https://localhost:7017/api
VITE_APP_TITLE=Apple E-Shop
```

### 🗄️ Database Configuration

The project uses SQLite by default. Connection string in `appsettings.json`:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Data Source=eshop.db"
  }
}
```

---

## 🌟 Key Features Explained

### 🎨 **Apple Design System**
- **Glass Morphism**: Uses `backdrop-filter` for modern glass effects
- **Typography**: SF Pro Display font family for authentic Apple feel  
- **Color Palette**: Carefully selected colors matching Apple's design language
- **Animations**: Smooth transitions using CSS cubic-bezier curves

### 🌙 **Theme System**
- **Smart Detection**: Automatically detects system theme preference
- **Instant Switching**: Real-time theme changes without page reload
- **Persistent Storage**: Saves user preference in localStorage and cookies
- **Welcome Modal**: First-time setup for theme and language preferences

### 🌍 **Internationalization (i18n)**
- **Multi-language Support**: English, Japanese, and Ukrainian
- **Smart Detection**: Browser language auto-detection
- **Contextual Translation**: Dynamic content translation including placeholders
- **Cultural Adaptation**: Proper formatting for different locales

### 🛒 **Shopping Experience**
- **Real-time Cart**: Instant updates with smooth animations
- **Advanced Filtering**: Filter by category, color, capacity, and price
- **Smart Search**: Intelligent product search across multiple fields
- **Responsive Design**: Optimized for mobile, tablet, and desktop

---

## 📱 API Endpoints

### Products
- `GET /api/products` - Get all products with filtering
- `GET /api/products/{id}` - Get single product
- `POST /api/products` - Create new product
- `PUT /api/products/{id}` - Update product
- `DELETE /api/products/{id}` - Delete product

### Categories
- `GET /api/categories` - Get all categories
- `POST /api/categories` - Create new category

### Users & Cart
- `GET /api/users` - Get all users
- `POST /api/users` - Create user
- `GET /api/carts/{userId}` - Get user cart
- `POST /api/carts` - Add to cart
- `DELETE /api/carts/{id}` - Remove from cart

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **🍴 Fork the Project**
2. **🌿 Create your Feature Branch** (`git checkout -b feature/AmazingFeature`)
3. **💾 Commit your Changes** (`git commit -m 'Add some AmazingFeature'`)
4. **🚀 Push to the Branch** (`git push origin feature/AmazingFeature`)
5. **🎯 Open a Pull Request**

### 📝 Commit Convention
```bash
feat: add new feature
fix: bug fix
docs: documentation updates
style: code style changes
refactor: code refactoring
test: add tests
chore: maintenance tasks
```

---

## � Troubleshooting

### 🚨 **Common Issues & Solutions**

#### Frontend Won't Start?
```bash
# Clear npm cache and reinstall
npm cache clean --force
rm -rf node_modules package-lock.json  # Linux/Mac
# OR
rmdir /s node_modules & del package-lock.json  # Windows
npm install
```

#### Build Errors?
```bash
# Make sure you have Node.js v18+ and npm latest
node --version  # Should be v18+
npm --version
npm install -g npm@latest
```

#### Database Issues?
```bash
# Recreate database
cd backend
rm eshop.db eshop.db-shm eshop.db-wal
dotnet ef database update
```

#### Port Already in Use?
- **Frontend (5173)**: Change port in `vite.config.js` or kill process
- **Backend (7017)**: Change port in `launchSettings.json`

### 📞 **Need Help?**
If you encounter any issues:
1. Check the [Issues](https://github.com/Kyuuto09/ASP-NET-hw4/issues) page
2. Make sure all prerequisites are installed
3. Follow the installation steps exactly as written
4. Try the troubleshooting steps above

---

## �🐛 Known Issues & Roadmap

### 🔧 Current Issues
- [ ] Mobile navigation needs improvement
- [ ] Search performance optimization needed
- [ ] Add product image upload functionality

### 🗺️ Roadmap
- [ ] **Payment Integration** - Stripe/PayPal support
- [ ] **User Authentication** - Login/Register system
- [ ] **Product Reviews** - Rating and review system
- [ ] **Wishlist Feature** - Save favorite products
- [ ] **Order History** - Track past purchases
- [ ] **Admin Dashboard** - Product management interface

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Kyuuto09** 
- GitHub: [@Kyuuto09](https://github.com/Kyuuto09)
- Project Link: [ASP-NET-hw4](https://github.com/Kyuuto09/ASP-NET-hw4)

---

## 🙏 Acknowledgments

- 🍎 **Apple Inc.** - Design inspiration
- ⚛️ **React Team** - Amazing framework
- 🎨 **Tailwind CSS** - Utility-first CSS framework
- 🌍 **i18next Team** - Internationalization made easy
- 🔧 **Vite Team** - Lightning-fast build tool

---

<div align="center">

**⭐ Star this project if you find it helpful!**

Made with ❤️ and lots of ☕

</div>