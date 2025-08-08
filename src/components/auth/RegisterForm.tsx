'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle, AlertCircle, Calendar, Users, BarChart3 } from 'lucide-react';

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [demoFormData, setDemoFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [demoLoading, setDemoLoading] = useState(false);
  const [error, setError] = useState('');
  const [demoError, setDemoError] = useState('');
  const [success, setSuccess] = useState('');
  const [demoSuccess, setDemoSuccess] = useState(false);
  const [registrationEnabled, setRegistrationEnabled] = useState(false);
  
  const router = useRouter();

  useEffect(() => {
    // Verificar se o registro está habilitado
    checkRegistrationConfig();
  }, []);

  const checkRegistrationConfig = async () => {
    try {
      const response = await fetch('/api/config?key=allow_super_admin_registration');
      if (response.ok) {
        const config = await response.json();
        setRegistrationEnabled(config?.value === 'true');
      }
    } catch {
      console.error('Erro ao verificar configuração');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleDemoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setDemoFormData({
      ...demoFormData,
      [e.target.name]: e.target.value,
    });
  };

  const handleDemoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setDemoLoading(true);
    setDemoError('');

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: demoFormData.name,
          email: demoFormData.email,
          phone: demoFormData.phone,
          type: 'BARBERSHOP_OWNER',
          source: 'demo_request',
          notes: `Empresa: ${demoFormData.company}\nMensagem: ${demoFormData.message}`
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setDemoSuccess(true);
        setDemoFormData({ name: '', email: '', phone: '', company: '', message: '' });
      } else {
        setDemoError(data.error || 'Erro ao solicitar demonstração. Tente novamente.');
      }
    } catch (err) {
      setDemoError('Erro de conexão. Tente novamente.');
    } finally {
      setDemoLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    // Verificar se o registro está habilitado
    if (!registrationEnabled) {
      setError('O registro de super admin está desabilitado');
      setLoading(false);
      return;
    }

    // Validações
    if (formData.password !== formData.confirmPassword) {
      setError('As senhas não coincidem');
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: 'SUPER_ADMIN',
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Erro ao criar usuário');
      } else {
        setSuccess('Super admin criado com sucesso!');
        setTimeout(() => {
          router.push('/auth/login');
        }, 2000);
      }
    } catch {
      setError('Erro de conexão');
    } finally {
      setLoading(false);
    }
  };

  // Se o registro não estiver habilitado, mostrar formulário de demonstração
  if (!registrationEnabled) {
    if (demoSuccess) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Demonstração Solicitada!
            </h1>
            <p className="text-gray-600 mb-6">
              Obrigado pelo interesse! Entraremos em contato em breve para agendar sua demonstração personalizada.
            </p>
            <button
              onClick={() => router.push('/')}
              className="bg-yellow-500 text-white px-6 py-2 rounded-md hover:bg-yellow-600 transition-colors"
            >
              Voltar à Página Inicial
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-2xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Agende sua Demonstração
            </h1>
            <p className="text-gray-600 text-lg">
              Descubra como nossa plataforma pode transformar sua barbearia
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                O que você vai ver:
              </h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Calendar className="w-6 h-6 text-yellow-500" />
                  <span className="text-gray-700">Sistema de agendamento completo</span>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="w-6 h-6 text-yellow-500" />
                  <span className="text-gray-700">Gestão de clientes e equipe</span>
                </div>
                <div className="flex items-center gap-3">
                  <BarChart3 className="w-6 h-6 text-yellow-500" />
                  <span className="text-gray-700">Relatórios e métricas avançadas</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">✓</span>
                  </div>
                  <span className="text-gray-700">Integração com Google/Apple Calendar</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">✓</span>
                  </div>
                  <span className="text-gray-700">Notificações automáticas</span>
                </div>
              </div>
            </div>

            <div>
              <form onSubmit={handleDemoSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nome completo *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={demoFormData.name}
                    onChange={handleDemoChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    placeholder="Seu nome completo"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={demoFormData.email}
                    onChange={handleDemoChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    placeholder="seu@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    WhatsApp *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={demoFormData.phone}
                    onChange={handleDemoChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    placeholder="(11) 99999-9999"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nome da Barbearia
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={demoFormData.company}
                    onChange={handleDemoChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    placeholder="Barbearia Exemplo"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Mensagem (opcional)
                  </label>
                  <textarea
                    name="message"
                    value={demoFormData.message}
                    onChange={handleDemoChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    placeholder="Conte-nos sobre suas necessidades..."
                  />
                </div>

                {demoError && (
                  <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-md">
                    <AlertCircle className="w-5 h-5 text-red-500" />
                    <p className="text-red-700 text-sm">{demoError}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={demoLoading}
                  className="w-full bg-yellow-500 hover:bg-yellow-600 disabled:bg-yellow-300 text-white font-semibold py-3 px-6 rounded-md transition-all duration-300 transform hover:scale-105 disabled:transform-none"
                >
                  {demoLoading ? 'Solicitando...' : 'Agendar Demonstração'}
                </button>

                <p className="text-xs text-gray-500 text-center">
                  * Campos obrigatórios. Entraremos em contato em até 24h.
                </p>
              </form>
            </div>
          </div>

          <div className="text-center mt-8">
            <button
              onClick={() => router.push('/')}
              className="text-gray-600 hover:text-gray-800 text-sm underline"
            >
              Voltar à Página Inicial
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
          Registrar Super Admin
        </h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nome Completo
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Senha
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Confirmar Senha
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          
          {error && (
            <div className="text-red-600 text-sm bg-red-50 p-3 rounded-md">{error}</div>
          )}
          
          {success && (
            <div className="text-green-600 text-sm bg-green-50 p-3 rounded-md">{success}</div>
          )}
          
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Criando...' : 'Criar Super Admin'}
          </button>
          
          <div className="text-center">
            <button
              type="button"
              onClick={() => router.push('/')}
              className="text-blue-600 hover:text-blue-700 text-sm"
            >
              Voltar à Página Inicial
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
