'use client';

import { useRouter } from 'next/navigation';
import { Construction, ArrowLeft, Mail, Phone, MessageCircle } from 'lucide-react';

export default function AjudaPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => router.push('/')}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Voltar à Página Inicial
            </button>
            <h1 className="text-2xl font-bold text-gray-900">
              Central de Ajuda
            </h1>
            <div className="w-20"></div> {/* Espaçador */}
          </div>
        </div>
      </div>

      {/* Conteúdo Principal */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Seção em Construção */}
          <div className="text-center mb-16">
            <div className="w-24 h-24 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Construction className="w-12 h-12 text-yellow-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Central de Ajuda em Construção
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Estamos trabalhando para criar uma central de ajuda completa. 
              Enquanto isso, você pode entrar em contato conosco pelos canais abaixo.
            </p>
          </div>

          {/* Canais de Contato */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-200 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Email
              </h3>
              <p className="text-gray-600 mb-4">
                Envie suas dúvidas por email
              </p>
              <a
                href="mailto:suporte@luizfilipeschaeffer.dev"
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Enviar Email
              </a>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-200 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                WhatsApp
              </h3>
              <p className="text-gray-600 mb-4">
                Fale conosco pelo WhatsApp
              </p>
              <a
                href="https://wa.me/5548996846044?text=Olá! Preciso de ajuda com o sistema de barbearias."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
              >
                Abrir WhatsApp
              </a>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-200 text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Telefone
              </h3>
              <p className="text-gray-600 mb-4">
                Ligue para nossa equipe
              </p>
              <a
                href="tel:+5548996846044"
                className="inline-block bg-yellow-600 text-white px-6 py-3 rounded-lg hover:bg-yellow-700 transition-colors"
              >
                Ligar Agora
              </a>
            </div>
          </div>

          {/* FAQ Básico */}
          <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Perguntas Frequentes
            </h3>
            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-4">
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  Como funciona o cadastro?
                </h4>
                <p className="text-gray-600">
                  O cadastro é gratuito e leva menos de 2 minutos. Basta preencher seus dados e começar a usar o sistema.
                </p>
              </div>

              <div className="border-b border-gray-200 pb-4">
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  O sistema funciona em qualquer dispositivo?
                </h4>
                <p className="text-gray-600">
                  Sim! Nossa plataforma é 100% responsiva e funciona perfeitamente em computadores, tablets e smartphones.
                </p>
              </div>

              <div className="border-b border-gray-200 pb-4">
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  Posso integrar com outros sistemas?
                </h4>
                <p className="text-gray-600">
                  Sim! Oferecemos integração com Google Calendar, Apple Calendar e outros sistemas populares.
                </p>
              </div>

              <div className="border-b border-gray-200 pb-4">
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  Como funciona o suporte técnico?
                </h4>
                <p className="text-gray-600">
                  Oferecemos suporte completo via email, WhatsApp e telefone. Nossa equipe está sempre pronta para ajudar!
                </p>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  Posso cancelar a qualquer momento?
                </h4>
                <p className="text-gray-600">
                  Sim! Você pode cancelar sua conta a qualquer momento sem taxas ou multas.
                </p>
              </div>
            </div>
          </div>

          {/* CTA Final */}
          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">
              Não encontrou o que procurava?
            </p>
            <a
              href="mailto:suporte@luizfilipeschaeffer.dev"
              className="inline-block bg-yellow-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-yellow-600 transition-colors"
            >
              Entrar em Contato
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
