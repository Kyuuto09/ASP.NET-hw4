import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Translation resources
const resources = {
  en: {
    translation: {
      // Navigation
      navigation: {
        brand: "My E-Shop",
        home: "Home",
        products: "Products", 
        cart: "Bag"
      },
      
      // Home page
      home: {
        loading: "Loading products...",
        error: "Error loading products",
        retry: "Retry",
        noProducts: "No products found"
      },

      // Products page
      products: {
        title: "Products",
        description: "Discover our amazing collection of premium products, carefully curated for you.",
        filters: {
          category: "Category",
          allCategories: "All Categories",
          color: "Color",
          colorPlaceholder: "e.g., Silver, Starlight, Midnight",
          capacity: "Capacity", 
          capacityPlaceholder: "e.g., 256GB, 512GB, 1TB",
          sortBy: "Sort by",
          featured: "Featured",
          priceLowToHigh: "Price: Low to High",
          priceHighToLow: "Price: High to Low", 
          nameAtoZ: "Name: A to Z",
          nameZtoA: "Name: Z to A",
          sort: "Sort",
          clearAll: "Clear All",
          clearAllFilters: "Clear All Filters"
        },
        noProductsFound: "No products found",
        showing: "Showing {{count}} product",
        showing_plural: "Showing {{count}} products",
        adjustFilters: "Try adjusting your filters to see more products.",
        page: "Page",
        of: "of",
        previous: "Previous",
        next: "Next"
      },

      // Cart page
      cart: {
        loading: "Loading your cart...",
        title: "Bag", 
        empty: "Your bag is empty",
        emptyMessage: "Discover amazing products and add them to your bag to get started.",
        continueShopping: "Continue Shopping",
        itemCount: "{{count}} item",
        itemCount_plural: "{{count}} items",
        qty: "Qty", 
        subtotal: "Subtotal",
        total: "Total",
        checkout: "Check Out",
        clearBag: "Clear Bag",
        remove: "Remove"
      },

      // Footer
      footer: {
        brand: "My E-Shop",
        tagline: "Premium products, premium experience.",
        shop: {
          title: "Shop",
          home: "Home",
          products: "Products", 
          bag: "Bag"
        },
        support: {
          title: "Support",
          contact: "Contact",
          help: "Help",
          returns: "Returns"
        },
        connect: {
          title: "Connect",
          github: "GitHub",
          userExperience: "User Experience"
        },
        madeBy: "Made by",
        with: "with",
        and: "and",
        copyright: "© 2025 My E-Shop. All rights reserved."
      },

      // Cookie Notification
      cookies: {
        title: "We use cookies",
        description: "We use cookies only to enhance your experience by remembering your preferences.",
        features: {
          theme: "Theme preference",
          language: "Language choice"
        },
        accept: "Accept",
        decline: "Decline",
        privacy: "No tracking, no analytics - just better UX! 🎉"
      },

      // Common
      common: {
        addToBag: "Add to Bag",
        loading: "Loading...",
        error: "Something went wrong",
        retry: "Try Again",
        close: "Close"
      }
    }
  },
  
  ja: {
    translation: {
      // Navigation
      navigation: {
        brand: "My E-Shop",
        home: "ホーム",
        products: "商品", 
        cart: "バッグ"
      },
      
      // Home page
      home: {
        loading: "商品を読み込み中...",
        error: "商品の読み込みでエラーが発生しました",
        retry: "再試行",
        noProducts: "商品が見つかりません"
      },

      // Products page
      products: {
        title: "商品",
        description: "厳選されたプレミアム商品の素晴らしいコレクションをご覧ください。",
        filters: {
          category: "カテゴリー",
          allCategories: "全カテゴリー",
          color: "色",
          colorPlaceholder: "例：Silver, Starlight, Midnight",
          capacity: "容量", 
          capacityPlaceholder: "例： 256GB、512GB、1TB",
          sortBy: "並び替え",
          featured: "おすすめ",
          priceLowToHigh: "価格：安い順",
          priceHighToLow: "価格：高い順", 
          nameAtoZ: "名前：A-Z",
          nameZtoA: "名前：Z-A",
          sort: "並び替え",
          clearAll: "すべてクリア",
          clearAllFilters: "すべてのフィルターをクリア"
        },
        noProductsFound: "商品が見つかりません",
        showing: "{{count}}商品を表示",
        adjustFilters: "フィルターを調整してより多くの商品を表示してください。",
        page: "ページ",
        of: "の",
        previous: "前へ",
        next: "次へ"
      },

      // Cart page
      cart: {
        loading: "カートを読み込み中...",
        title: "バッグ", 
        empty: "バッグは空です",
        emptyMessage: "素晴らしい商品を見つけてバッグに追加して始めましょう。",
        continueShopping: "ショッピングを続ける",
        itemCount: "{{count}}アイテム",
        qty: "数量", 
        subtotal: "小計",
        total: "合計",
        checkout: "チェックアウト",
        clearBag: "バッグをクリア",
        remove: "削除"
      },

      // Footer
      footer: {
        brand: "My E-Shop",
        tagline: "プレミアム商品、プレミアム体験。",
        shop: {
          title: "ショップ",
          home: "ホーム",
          products: "商品", 
          bag: "バッグ"
        },
        support: {
          title: "サポート",
          contact: "お問い合わせ",
          help: "ヘルプ",
          returns: "返品"
        },
        connect: {
          title: "つながる",
          github: "GitHub",
          userExperience: "ユーザー体験"
        },
        madeBy: "作成者",
        with: "で",
        and: "と",
        copyright: "© 2025 My E-Shop. 全著作権所有。"
      },

      // Cookie Notification
      cookies: {
        title: "Cookieを使用しています",
        description: "お客様の設定を記憶し、体験を向上させるためのみにCookieを使用しています。",
        features: {
          theme: "テーマ設定",
          language: "言語選択"
        },
        accept: "承諾",
        decline: "拒否",
        privacy: "追跡なし、分析なし - より良いUXのみ！🎉"
      },

      // Common
      common: {
        addToBag: "バッグに追加",
        loading: "読み込み中...",
        error: "エラーが発生しました",
        retry: "再試行",
        close: "閉じる"
      }
    }
  },

  uk: {
    translation: {
      // Navigation
      navigation: {
        brand: "My E-Shop",
        home: "Головна",
        products: "Товари", 
        cart: "Кошик"
      },
      
      // Home page
      home: {
        loading: "Завантаження товарів...",
        error: "Помилка завантаження товарів",
        retry: "Спробувати знову",
        noProducts: "Товари не знайдено"
      },

      // Products page
      products: {
        title: "Товари",
        description: "Відкрийте для себе нашу дивовижну колекцію преміум товарів, ретельно відібраних для вас.",
        filters: {
          category: "Категорія",
          allCategories: "Всі категорії",
          color: "Колір",
          colorPlaceholder: "напр., Silver, Starlight, Midnight",
          capacity: "Ємність", 
          capacityPlaceholder: "напр., 256GB, 512GB, 1TB",
          sortBy: "Сортувати за",
          featured: "Рекомендовані",
          priceLowToHigh: "Ціна: за зростанням",
          priceHighToLow: "Ціна: за спаданням", 
          nameAtoZ: "Назва: А-Я",
          nameZtoA: "Назва: Я-А",
          sort: "Сортування",
          clearAll: "Очистити все",
          clearAllFilters: "Очистити всі фільтри"
        },
        noProductsFound: "Товари не знайдено",
        showing: "Показано {{count}} товар",
        showing_plural: "Показано {{count}} товарів",
        adjustFilters: "Спробуйте налаштувати фільтри, щоб побачити більше товарів.",
        page: "Сторінка",
        of: "з",
        previous: "Попередня",
        next: "Наступна"
      },

      // Cart page
      cart: {
        loading: "Завантаження кошика...",
        title: "Кошик", 
        empty: "Ваш кошик порожній",
        emptyMessage: "Знайдіть дивовижні товари та додайте їх до кошика, щоб почати.",
        continueShopping: "Продовжити покупки",
        itemCount: "{{count}} товар",
        itemCount_plural: "{{count}} товарів",
        qty: "Кіл-ть", 
        subtotal: "Проміжна сума",
        total: "Всього",
        checkout: "Оформити",
        clearBag: "Очистити кошик",
        remove: "Видалити"
      },

      // Footer
      footer: {
        brand: "My E-Shop",
        tagline: "Преміум товари, преміум досвід.",
        shop: {
          title: "Магазин",
          home: "Головна",
          products: "Товари", 
          bag: "Кошик"
        },
        support: {
          title: "Підтримка",
          contact: "Контакти",
          help: "Допомога",
          returns: "Повернення"
        },
        connect: {
          title: "Зв'язок",
          github: "GitHub",
          userExperience: "Користувацький досвід"
        },
        madeBy: "Створено",
        with: "з",
        and: "та",
        copyright: "© 2025 My E-Shop. Всі права захищені."
      },

      // Cookie Notification
      cookies: {
        title: "Ми використовуємо cookies",
        description: "Ми використовуємо cookies тільки для покращення вашого досвіду, запам'ятовуючи ваші налаштування.",
        features: {
          theme: "Налаштування теми",
          language: "Вибір мови"
        },
        accept: "Прийняти",
        decline: "Відхилити",
        privacy: "Без відстеження, без аналітики - тільки кращий UX! 🎉"
      },

      // Common
      common: {
        addToBag: "Додати до кошика",
        loading: "Завантаження...",
        error: "Щось пішло не так",
        retry: "Спробувати знову",
        close: "Закрити"
      }
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: false,
    
    interpolation: {
      escapeValue: false,
    },

    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },
  });

export default i18n;