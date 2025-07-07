import React, { useState, useEffect } from 'react';
import { ShoppingCart, Plus, Minus, X, Filter, Search, Star, ChevronLeft, ChevronRight, Phone, Mail, MapPin, Clock, Facebook, Twitter, Instagram } from 'lucide-react';
import ChatBot from './components/ChatBot';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  description: string;
  popular?: boolean;
}

interface CartItem extends Product {
  quantity: number;
}

const categories = [
  { id: 'all', name: 'All Items', color: 'bg-black' },
  { id: 'pizza', name: 'Pizza', color: 'bg-gray-800' },
  { id: 'burger', name: 'Burgers', color: 'bg-gray-700' },
  { id: 'sushi', name: 'Sushi', color: 'bg-gray-600' },
  { id: 'dessert', name: 'Desserts', color: 'bg-gray-500' },
  { id: 'drink', name: 'Drinks', color: 'bg-gray-400' },
  { id: 'pasta', name: 'Pasta', color: 'bg-gray-300' },
  { id: 'salad', name: 'Salads', color: 'bg-gray-200' },
];

const products: Product[] = [
  {
    id: 1,
    name: 'Margherita Supreme',
    price: 399,
    image: 'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'pizza',
    rating: 4.8,
    description: 'Fresh mozzarella, basil, and tomato sauce on crispy crust',
    popular: true,
  },
  {
    id: 2,
    name: 'Gourmet Beef Burger',
    price: 299,
    image: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'burger',
    rating: 4.9,
    description: 'Premium beef patty with truffle mayo and caramelized onions',
    popular: true,
  },
  {
    id: 3,
    name: 'Dragon Roll',
    price: 449,
    image: 'https://images.pexels.com/photos/357756/pexels-photo-357756.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'sushi',
    rating: 4.7,
    description: 'Eel, cucumber, avocado topped with spicy mayo and eel sauce',
  },
  {
    id: 4,
    name: 'Chocolate Lava Cake',
    price: 199,
    image: 'https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'dessert',
    rating: 4.6,
    description: 'Warm chocolate cake with molten center and vanilla ice cream',
  },
  {
    id: 5,
    name: 'Pepperoni Deluxe',
    price: 379,
    image: 'https://images.pexels.com/photos/1146760/pexels-photo-1146760.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'pizza',
    rating: 4.5,
    description: 'Double pepperoni with extra cheese and Italian herbs',
  },
  {
    id: 6,
    name: 'Craft Cola',
    price: 89,
    image: 'https://images.pexels.com/photos/50593/coca-cola-cold-drink-soft-drink-coke-50593.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'drink',
    rating: 4.2,
    description: 'Artisan cola with natural ingredients and real cane sugar',
  },
  {
    id: 7,
    name: 'Chicken Teriyaki Burger',
    price: 269,
    image: 'https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'burger',
    rating: 4.4,
    description: 'Grilled chicken with teriyaki glaze and asian slaw',
  },
  {
    id: 8,
    name: 'Salmon Nigiri Set',
    price: 399,
    image: 'https://images.pexels.com/photos/248444/pexels-photo-248444.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'sushi',
    rating: 4.8,
    description: 'Fresh salmon nigiri with wasabi and pickled ginger',
  },
  {
    id: 9,
    name: 'Truffle Mushroom Pizza',
    price: 459,
    image: 'https://images.pexels.com/photos/1146760/pexels-photo-1146760.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'pizza',
    rating: 4.9,
    description: 'Wild mushrooms, truffle oil, and parmesan on thin crust',
    popular: true,
  },
  {
    id: 10,
    name: 'Classic Cheeseburger',
    price: 219,
    image: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'burger',
    rating: 4.3,
    description: 'Beef patty with cheddar, lettuce, tomato, and special sauce',
  },
  {
    id: 11,
    name: 'California Roll',
    price: 329,
    image: 'https://images.pexels.com/photos/357756/pexels-photo-357756.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'sushi',
    rating: 4.5,
    description: 'Crab, avocado, cucumber with sesame seeds',
  },
  {
    id: 12,
    name: 'Tiramisu',
    price: 229,
    image: 'https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'dessert',
    rating: 4.7,
    description: 'Classic Italian dessert with coffee-soaked ladyfingers',
  },
  {
    id: 13,
    name: 'Fresh Orange Juice',
    price: 79,
    image: 'https://images.pexels.com/photos/50593/coca-cola-cold-drink-soft-drink-coke-50593.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'drink',
    rating: 4.4,
    description: 'Freshly squeezed orange juice with pulp',
  },
  {
    id: 14,
    name: 'Carbonara Pasta',
    price: 319,
    image: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'pasta',
    rating: 4.6,
    description: 'Creamy pasta with pancetta, egg, and parmesan',
  },
  {
    id: 15,
    name: 'Penne Arrabbiata',
    price: 289,
    image: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'pasta',
    rating: 4.4,
    description: 'Spicy tomato sauce with garlic and red chilies',
  },
  {
    id: 16,
    name: 'Caesar Salad',
    price: 179,
    image: 'https://images.pexels.com/photos/1059905/pexels-photo-1059905.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'salad',
    rating: 4.3,
    description: 'Crisp romaine lettuce with caesar dressing and croutons',
  },
  {
    id: 17,
    name: 'Greek Salad',
    price: 199,
    image: 'https://images.pexels.com/photos/1059905/pexels-photo-1059905.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'salad',
    rating: 4.5,
    description: 'Fresh vegetables with feta cheese and olive oil',
  },
  {
    id: 18,
    name: 'BBQ Chicken Pizza',
    price: 419,
    image: 'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'pizza',
    rating: 4.6,
    description: 'Grilled chicken with BBQ sauce and red onions',
  },
  {
    id: 19,
    name: 'Veggie Burger',
    price: 239,
    image: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'burger',
    rating: 4.2,
    description: 'Plant-based patty with avocado and sprouts',
  },
  {
    id: 20,
    name: 'Spicy Tuna Roll',
    price: 369,
    image: 'https://images.pexels.com/photos/357756/pexels-photo-357756.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'sushi',
    rating: 4.7,
    description: 'Fresh tuna with spicy mayo and cucumber',
  },
  {
    id: 21,
    name: 'Cheesecake',
    price: 219,
    image: 'https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'dessert',
    rating: 4.5,
    description: 'New York style cheesecake with berry compote',
  },
  {
    id: 22,
    name: 'Iced Coffee',
    price: 99,
    image: 'https://images.pexels.com/photos/50593/coca-cola-cold-drink-soft-drink-coke-50593.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'drink',
    rating: 4.3,
    description: 'Cold brew coffee with ice and cream',
  },
  {
    id: 23,
    name: 'Lasagna Bolognese',
    price: 349,
    image: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'pasta',
    rating: 4.8,
    description: 'Layered pasta with meat sauce and three cheeses',
    popular: true,
  },
  {
    id: 24,
    name: 'Quinoa Power Bowl',
    price: 259,
    image: 'https://images.pexels.com/photos/1059905/pexels-photo-1059905.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'salad',
    rating: 4.6,
    description: 'Quinoa with roasted vegetables and tahini dressing',
  },
];

const ITEMS_PER_PAGE = 8;

function App() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('orderingCart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem('orderingCart', JSON.stringify(cart));
  }, [cart]);

  // Reset to first page when category or search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchTerm]);

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      if (existingItem) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(prev => {
      const existingItem = prev.find(item => item.id === productId);
      if (existingItem && existingItem.quantity > 1) {
        return prev.map(item =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      }
      return prev.filter(item => item.id !== productId);
    });
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const goToPage = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white font-system">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                <span className="text-white font-semibold text-sm">F</span>
              </div>
              <h1 className="text-xl font-semibold text-gray-900 tracking-tight">FoodieExpress</h1>
            </div>
            
            {/* Search Bar */}
            <div className="hidden md:flex items-center flex-1 max-w-lg mx-8">
              <div className="relative w-full">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search for food"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-2.5 bg-gray-100 border-0 rounded-full focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-200 text-sm"
                />
              </div>
            </div>

            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-all duration-200 flex items-center space-x-2 text-sm font-medium"
            >
              <ShoppingCart className="w-4 h-4" />
              <span className="hidden sm:inline">Cart</span>
              {getTotalItems() > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                  {getTotalItems()}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Search */}
      <div className="md:hidden p-4 bg-white border-b border-gray-100">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search for food"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-2.5 bg-gray-100 border-0 rounded-full focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
          />
        </div>
      </div>

      {/* Category Filters */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-3 py-4 overflow-x-auto scrollbar-hide">
            <Filter className="w-4 h-4 text-gray-400 flex-shrink-0" />
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex-shrink-0 ${
                  selectedCategory === category.id
                    ? 'bg-black text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {paginatedProducts.map(product => (
            <div
              key={product.id}
              className="bg-white rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all duration-300 overflow-hidden group"
            >
              <div className="relative overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {product.popular && (
                  <div className="absolute top-3 left-3 bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                    Popular
                  </div>
                )}
                <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
                  <Star className="w-3 h-3 fill-current text-yellow-400" />
                  <span>{product.rating}</span>
                </div>
              </div>
              
              <div className="p-5">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 tracking-tight">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">{product.description}</p>
                
                <div className="flex items-center justify-between">
                  <span className="text-xl font-semibold text-gray-900">{formatPrice(product.price)}</span>
                  <button
                    onClick={() => addToCart(product)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-all duration-200 flex items-center space-x-1 text-sm font-medium"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No items found</h3>
            <p className="text-gray-500">Try adjusting your search or filters</p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center space-x-2 mt-12">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => goToPage(page)}
                className={`w-10 h-10 rounded-full text-sm font-medium transition-all duration-200 ${
                  currentPage === page
                    ? 'bg-black text-white'
                    : 'hover:bg-gray-100 text-gray-700'
                }`}
              >
                {page}
              </button>
            ))}
            
            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">F</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900">FoodieExpress</h3>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                Premium food ordering experience with the finest ingredients and exceptional service. 
                Delivering happiness to your doorstep since 2020.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-gray-600 transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-gray-600 transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-gray-600 transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Contact Us</h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">+91 93306 61315</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">hello@foodieexpress.com</span>
                </div>
                <div className="flex items-start space-x-3">
                  <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                  <span className="text-sm text-gray-600">
                    123 Food Street, Esplanade<br />
                    Kolkata, West Bengal
                  </span>
                </div>
              </div>
            </div>

            {/* Business Hours */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Business Hours</h4>
              <div className="space-y-2">
                <div className="flex items-center space-x-3">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <div className="text-sm text-gray-600">
                    <div>Mon - Thu: 10:00 AM - 11:00 PM</div>
                    <div>Fri - Sat: 10:00 AM - 12:00 AM</div>
                    <div>Sunday: 11:00 AM - 10:00 PM</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Quick Links</h4>
              <div className="space-y-2">
                <a href="#" className="block text-sm text-gray-600 hover:text-gray-900 transition-colors">About Us</a>
                <a href="#" className="block text-sm text-gray-600 hover:text-gray-900 transition-colors">Privacy Policy</a>
                <a href="#" className="block text-sm text-gray-600 hover:text-gray-900 transition-colors">Terms of Service</a>
                <a href="#" className="block text-sm text-gray-600 hover:text-gray-900 transition-colors">Refund Policy</a>
                <a href="#" className="block text-sm text-gray-600 hover:text-gray-900 transition-colors">Help & Support</a>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-gray-200 mt-8 pt-8">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
              <p className="text-sm text-gray-500">
                © 2025 FoodieExpress. All rights reserved.
              </p>
              <div className="flex items-center space-x-6">
                <span className="text-xs text-gray-400">GST: 27AABCU9603R1ZX</span>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Cart Sidebar */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={() => setIsCartOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl transform transition-transform duration-300">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-xl font-semibold text-gray-900">Your Cart</h2>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {cart.length === 0 ? (
                <div className="text-center py-16">
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ShoppingCart className="w-10 h-10 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Your cart is empty</h3>
                  <p className="text-gray-500">Add some delicious items to get started!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map(item => (
                    <div key={item.id} className="flex items-center space-x-4 bg-gray-50 p-4 rounded-xl">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 text-sm">{item.name}</h4>
                        <p className="text-sm text-gray-600">{formatPrice(item.price)}</p>
                      </div>
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="p-1.5 hover:bg-gray-200 rounded-full transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-8 text-center font-semibold text-sm">{item.quantity}</span>
                        <button
                          onClick={() => addToCart(item)}
                          className="p-1.5 hover:bg-gray-200 rounded-full transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="border-t border-gray-100 p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-lg font-semibold text-gray-900">Total</span>
                  <span className="text-2xl font-semibold text-gray-900">{formatPrice(getTotalPrice())}</span>
                </div>
                <button className="w-full bg-blue-600 text-white py-3 rounded-full hover:bg-blue-700 transition-all duration-200 font-medium text-sm">
                  Checkout • {getTotalItems()} {getTotalItems() === 1 ? 'item' : 'items'}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* AI Chatbot */}
      <ChatBot products={products} categories={categories} />
    </div>
  );
}

export default App;