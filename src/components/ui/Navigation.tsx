'use client';

import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-lg fixed w-full top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-gray-900">
              Barbearia <span className="text-yellow-500">Admin</span>
            </h1>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#funcionalidades" className="text-gray-700 hover:text-yellow-500 transition-colors">
              Funcionalidades
            </a>
            <a href="#depoimentos" className="text-gray-700 hover:text-yellow-500 transition-colors">
              Depoimentos
            </a>
            <a href="#faq" className="text-gray-700 hover:text-yellow-500 transition-colors">
              FAQ
            </a>
            <a href="#contato" className="text-gray-700 hover:text-yellow-500 transition-colors">
              Contato
            </a>
            <button 
              onClick={() => window.location.href = '/auth/register'}
              className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-6 rounded-lg transition-all duration-300"
            >
              Cadastre-se Grátis
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-yellow-500 transition-colors"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              <a href="#funcionalidades" className="text-gray-700 hover:text-yellow-500 transition-colors">
                Funcionalidades
              </a>
              <a href="#depoimentos" className="text-gray-700 hover:text-yellow-500 transition-colors">
                Depoimentos
              </a>
              <a href="#faq" className="text-gray-700 hover:text-yellow-500 transition-colors">
                FAQ
              </a>
              <a href="#contato" className="text-gray-700 hover:text-yellow-500 transition-colors">
                Contato
              </a>
              <button 
                onClick={() => window.location.href = '/auth/register'}
                className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-6 rounded-lg transition-all duration-300 w-full"
              >
                Cadastre-se Grátis
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
