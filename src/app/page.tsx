'use client';

import { useAuth } from '@/components/providers/AuthProvider';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { 
  Calendar, 
  Users, 
  BarChart3, 
  Bell, 
  Smartphone, 
  CheckCircle, 
  Play
} from 'lucide-react';
import FAQ from '@/components/ui/FAQ';
import Stats from '@/components/ui/Stats';
import Navigation from '@/components/ui/Navigation';
import LeadForm from '@/components/ui/LeadForm';

export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [checkingConfig, setCheckingConfig] = useState(true);

  useEffect(() => {
    checkMaintenanceMode();
  }, []);

  useEffect(() => {
    if (!loading && !checkingConfig) {
      if (maintenanceMode) {
        return;
      }
      
      if (user) {
        if (user.role === 'SUPER_ADMIN') {
          router.push('/dashboard/super-admin');
        } else {
          router.push('/dashboard');
        }
      }
    }
  }, [user, loading, maintenanceMode, checkingConfig, router]);

  const checkMaintenanceMode = async () => {
    try {
      const response = await fetch('/api/config?key=maintenance_mode');
      if (response.ok) {
        const config = await response.json();
        setMaintenanceMode(config?.value === 'true');
      }
    } catch (error) {
      console.error('Erro ao verificar modo de manutenção:', error);
    } finally {
      setCheckingConfig(false);
    }
  };

  // Função para cadastro (removida por não estar sendo usada)
  // const handleCadastro = () => {
  //   if (user) {
  //     router.push('/dashboard');
  //   } else {
  //     router.push('/auth/register');
  //   }
  // };

  if (loading || checkingConfig) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-yellow-400"></div>
          <p className="text-white mt-4">Carregando...</p>
        </div>
      </div>
    );
  }

  if (maintenanceMode) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-white mb-4">
            🛠️ Manutenção
          </h1>
          <p className="text-gray-300 text-xl mb-8">
            O sistema está em manutenção
          </p>
          <p className="text-gray-400 text-lg">
            Estamos trabalhando para melhorar sua experiência.
            <br />
            Volte em alguns minutos.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-50 to-gray-100 py-20 lg:py-32 mt-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
                A revolução digital das{' '}
                <span className="text-yellow-500">barbearias</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Primeira plataforma completa para barbearias. Agendamentos online, gestão inteligente 
                e aumento de receita garantido. Seja pioneiro na transformação do seu negócio.
              </p>
              <div className="flex justify-center lg:justify-start">
                <button
                  onClick={() => router.push('/auth/register')}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-4 px-8 rounded-lg text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Cadastre sua barbearia grátis
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-2xl p-8 shadow-2xl">
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-800">Agendamentos</h3>
                    <Calendar className="w-6 h-6 text-yellow-500" />
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm text-gray-600">João Silva</span>
                      <span className="text-sm font-medium text-gray-800">14:00</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm text-gray-600">Pedro Santos</span>
                      <span className="text-sm font-medium text-gray-800">15:30</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm text-gray-600">Carlos Lima</span>
                      <span className="text-sm font-medium text-gray-800">17:00</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Funcionalidades */}
      <section id="funcionalidades" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Tecnologia que transforma seu negócio
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Ferramentas inovadoras para barbearias que querem crescer e se destacar no mercado
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white border-2 border-gray-100 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-yellow-300">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-6">
                <Calendar className="w-6 h-6 text-yellow-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Agendamento Online</h3>
              <p className="text-gray-600">
                Clientes marcam horários pelo site/app, reduzindo ligações e esquecimentos.
              </p>
            </div>

            <div className="bg-white border-2 border-gray-100 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-yellow-300">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-6">
                <Users className="w-6 h-6 text-yellow-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Gestão de Clientes</h3>
              <p className="text-gray-600">
                Histórico, preferências e contato dos clientes em um só lugar.
              </p>
            </div>

            <div className="bg-white border-2 border-gray-100 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-yellow-300">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-6">
                <Smartphone className="w-6 h-6 text-yellow-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Sincronização</h3>
              <p className="text-gray-600">
                Integração com Google e Apple Calendar para evitar conflitos.
              </p>
            </div>

            <div className="bg-white border-2 border-gray-100 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-yellow-300">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-6">
                <Users className="w-6 h-6 text-yellow-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Controle de Equipe</h3>
              <p className="text-gray-600">
                Gerencie horários, folgas e comissões dos barbeiros.
              </p>
            </div>

            <div className="bg-white border-2 border-gray-100 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-yellow-300">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-6">
                <BarChart3 className="w-6 h-6 text-yellow-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Relatórios e Métricas</h3>
              <p className="text-gray-600">
                Acompanhe o crescimento do negócio com gráficos e relatórios.
              </p>
            </div>

            <div className="bg-white border-2 border-gray-100 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-yellow-300">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-6">
                <Bell className="w-6 h-6 text-yellow-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Notificações Inteligentes</h3>
              <p className="text-gray-600">
                Lembretes automáticos para clientes e equipe.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Estatísticas */}
      <Stats items={[
        { number: 50, label: "Milhões de Barbearias", suffix: "+" },
        { number: 95, label: "Redução de Perdas", suffix: "%" },
        { number: 24, label: "Suporte", suffix: "h" },
        { number: 100, label: "Gratuito", suffix: "%" }
      ]} />

      {/* Depoimentos */}
      <section id="depoimentos" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Por que barbearias escolhem nossa plataforma
            </h2>
            <p className="text-xl text-gray-600">
              Descubra como nossa solução pode transformar sua barbearia
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-lg border-l-4 border-yellow-500">
              <div className="flex items-center mb-4">
                <CheckCircle className="w-8 h-8 text-yellow-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Economia de Tempo</h3>
              <p className="text-gray-600 mb-6">
                Reduza em até 70% o tempo gasto com agendamentos e gestão administrativa.
              </p>
              <div className="text-yellow-500 font-semibold">
                Foco no que importa: seus clientes
              </div>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg border-l-4 border-yellow-500">
              <div className="flex items-center mb-4">
                <BarChart3 className="w-8 h-8 text-yellow-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Aumento de Receita</h3>
              <p className="text-gray-600 mb-6">
                Elimine perdas por esquecimentos e otimize a agenda para maximizar lucros.
              </p>
              <div className="text-yellow-500 font-semibold">
                Crescimento garantido
              </div>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg border-l-4 border-yellow-500">
              <div className="flex items-center mb-4">
                <Users className="w-8 h-8 text-yellow-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Clientes Satisfeitos</h3>
              <p className="text-gray-600 mb-6">
                Agendamento online 24/7 e lembretes automáticos aumentam a fidelização.
              </p>
              <div className="text-yellow-500 font-semibold">
                Retorno garantido
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Como Funciona */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Como funciona
            </h2>
            <p className="text-xl text-gray-600">
              Em poucos passos, sua barbearia estará digitalizada
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white font-bold text-xl">1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Cadastro Rápido</h3>
              <p className="text-gray-600">
                Crie sua conta em menos de 2 minutos. Sem complicações.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white font-bold text-xl">2</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Configure sua Barbearia</h3>
              <p className="text-gray-600">
                Adicione serviços, horários e sua equipe de forma simples.
              </p>
            </div>

      <div className="text-center">
              <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white font-bold text-xl">3</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Comece a Usar</h3>
              <p className="text-gray-600">
                Receba agendamentos e gerencie tudo pelo sistema.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Para Investidores */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Para Investidores
            </h2>
            <p className="text-xl text-gray-300">
              Oportunidade única em um mercado em expansão
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <div className="text-4xl font-bold text-yellow-500 mb-4">R$ 50B</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Mercado Total</h3>
              <p className="text-gray-600">
                Mercado brasileiro de barbearias e salões de beleza em crescimento constante.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg">
              <div className="text-4xl font-bold text-yellow-500 mb-4">95%</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Digitalização</h3>
              <p className="text-gray-600">
                Barbearias ainda não digitalizadas - oportunidade de mercado gigante.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg">
              <div className="text-4xl font-bold text-yellow-500 mb-4">24/7</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Disponibilidade</h3>
              <p className="text-gray-600">
                Sistema SaaS escalável com receita recorrente e baixo custo operacional.
        </p>
      </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 mt-12">
            <div className="text-white">
              <h3 className="text-2xl font-bold mb-6">
                Para Investidores
              </h3>
              <ul className="space-y-4 text-lg">
                <li className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">✓</span>
                  </div>
                  Mercado de R$ 50 bilhões
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">✓</span>
                  </div>
                  95% do mercado não digitalizado
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">✓</span>
                  </div>
                  Modelo SaaS escalável
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">✓</span>
                  </div>
                  Receita recorrente garantida
                </li>
              </ul>
            </div>
            
            <div>
              <LeadForm
                type="INVESTOR"
                source="investor_section"
                title="Interessado em investir?"
                subtitle="Entre em contato para conhecer nossa proposta"
                buttonText="Solicitar Pitch Deck"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Perguntas Frequentes
            </h2>
            <p className="text-xl text-gray-600">
              Tire suas dúvidas sobre a plataforma
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <FAQ items={[
              {
                question: "O cadastro é realmente gratuito?",
                answer: "Sim! O cadastro é 100% gratuito e sem compromisso. Você pode testar todas as funcionalidades sem custo."
              },
              {
                question: "Meus dados estão seguros?",
                answer: "Absolutamente! Utilizamos as melhores práticas de segurança e criptografia para proteger seus dados."
              },
              {
                question: "Posso integrar com outros sistemas?",
                answer: "Sim! Oferecemos integração com Google Calendar, Apple Calendar e outros sistemas populares."
              },
              {
                question: "O sistema funciona em qualquer dispositivo?",
                answer: "Sim! Nossa plataforma é 100% responsiva e funciona perfeitamente em computadores, tablets e smartphones."
              },
              {
                question: "Como funciona o suporte técnico?",
                answer: "Oferecemos suporte completo via chat, email e telefone. Nossa equipe está sempre pronta para ajudar!"
              },
              {
                question: "Posso cancelar a qualquer momento?",
                answer: "Sim! Você pode cancelar sua conta a qualquer momento sem taxas ou multas."
              },
              {
                question: "Vocês aceitam investimentos?",
                answer: "Sim! Estamos abertos a parcerias estratégicas e investimentos. Entre em contato para conhecer nossa proposta."
              },
              {
                question: "Qual o potencial de mercado?",
                answer: "O mercado brasileiro de barbearias movimenta R$ 50 bilhões anualmente, com 95% ainda não digitalizado."
              }
            ]} />
          </div>
        </div>
      </section>

      {/* CTA Final com Formulário */}
      <section className="py-20 bg-gradient-to-r from-yellow-500 to-yellow-600">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Transforme sua barbearia hoje mesmo
            </h2>
            <p className="text-xl text-yellow-100 max-w-2xl mx-auto">
              Seja pioneiro na digitalização do seu negócio. Cadastro 100% gratuito e sem compromisso.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <div className="text-white">
              <h3 className="text-2xl font-bold mb-6">
                Para Donos de Barbearias
              </h3>
              <ul className="space-y-4 text-lg">
                <li className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                    <span className="text-yellow-600 font-bold text-sm">✓</span>
                  </div>
                  Cadastro gratuito e sem compromisso
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                    <span className="text-yellow-600 font-bold text-sm">✓</span>
                  </div>
                  Suporte completo para implementação
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                    <span className="text-yellow-600 font-bold text-sm">✓</span>
                  </div>
                  Acesso antecipado a novas funcionalidades
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                    <span className="text-yellow-600 font-bold text-sm">✓</span>
                  </div>
                  Desconto especial para primeiros usuários
                </li>
              </ul>
            </div>
            
            <div>
              <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-200">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Cadastre sua barbearia
                  </h3>
                  <p className="text-gray-600">
                    Seja um dos primeiros a transformar seu negócio
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nome completo *
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-colors"
                      placeholder="Seu nome completo"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email *
                    </label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-colors"
                      placeholder="seu@email.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      WhatsApp *
                    </label>
                    <input
                      type="tel"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-colors"
                      placeholder="(11) 99999-9999"
                    />
                  </div>

                  <button
                    onClick={() => router.push('/auth/register')}
                    className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    Cadastrar Barbearia Grátis
                  </button>

                  <p className="text-xs text-gray-500 text-center">
                    * Campos obrigatórios. Seus dados estão seguros conosco.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <p className="text-yellow-200 text-sm">
              🚀 Oportunidade única para investidores: Mercado de R$ 50 bilhões em crescimento
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contato" className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-5 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Barbearia Admin</h3>
              <p className="text-gray-400">
                A plataforma completa para gestão de barbearias modernas.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Produto</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-yellow-400 transition-colors">Funcionalidades</a></li>
                <li><a href="#" className="hover:text-yellow-400 transition-colors">Preços</a></li>
                <li><a href="#" className="hover:text-yellow-400 transition-colors">Demonstração</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Suporte</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/ajuda" className="hover:text-yellow-400 transition-colors">Central de Ajuda</a></li>
                <li><a href="mailto:suporte@luizfilipeschaeffer.dev" className="hover:text-yellow-400 transition-colors">Contato</a></li>
                <li><a href="#" className="hover:text-yellow-400 transition-colors">Status</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Investidores</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-yellow-400 transition-colors">Pitch Deck</a></li>
                <li><a href="#" className="hover:text-yellow-400 transition-colors">Oportunidades</a></li>
                <li><a href="#" className="hover:text-yellow-400 transition-colors">Contato</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-yellow-400 transition-colors">Termos de Uso</a></li>
                <li><a href="#" className="hover:text-yellow-400 transition-colors">Privacidade</a></li>
                <li><a href="#" className="hover:text-yellow-400 transition-colors">Cookies</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Barbearia Admin. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
