'use client';

import { useState, useEffect } from 'react';
import { ToggleLeft, ToggleRight } from 'lucide-react';

interface SystemConfig {
  id: string;
  key: string;
  value: string;
  description?: string;
}

export default function SettingsPage() {
  const [configs, setConfigs] = useState<SystemConfig[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchConfigs();
  }, []);

  const fetchConfigs = async () => {
    try {
      const response = await fetch('/api/config');
      const data = await response.json();
      setConfigs(data);
    } catch (error) {
      console.error('Erro ao buscar configurações:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateConfig = async (key: string, value: string) => {
    try {
      const response = await fetch('/api/config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key, value }),
      });

      if (response.ok) {
        // Atualizar estado local
        setConfigs(prev => 
          prev.map(config => 
            config.key === key ? { ...config, value } : config
          )
        );
      }
    } catch (error) {
      console.error('Erro ao atualizar configuração:', error);
    }
  };

  const handleToggle = async (key: string, currentValue: string) => {
    const newValue = currentValue === 'true' ? 'false' : 'true';
    setSaving(true);
    await updateConfig(key, newValue);
    setSaving(false);
  };

  const getConfigValue = (key: string) => {
    const config = configs.find(c => c.key === key);
    return config?.value || 'false';
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Configurações</h1>
          <p className="text-gray-600 mt-2">
            Gerencie as configurações do sistema
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-8 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Configurações</h1>
        <p className="text-gray-600 mt-2">
          Gerencie as configurações do sistema
        </p>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            Configurações de Segurança
          </h2>
        </div>

        <div className="p-6 space-y-6">
          {/* Registro de Super Admin */}
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium text-gray-900">
                Registro de Super Admin
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                Permite criar novos super admins através da tela de registro
              </p>
            </div>
            <button
              onClick={() => handleToggle('allow_super_admin_registration', getConfigValue('allow_super_admin_registration'))}
              disabled={saving}
              className={`flex items-center px-4 py-2 rounded-md transition-colors ${
                getConfigValue('allow_super_admin_registration') === 'true'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              {getConfigValue('allow_super_admin_registration') === 'true' ? (
                <ToggleRight className="w-5 h-5 mr-2" />
              ) : (
                <ToggleLeft className="w-5 h-5 mr-2" />
              )}
              {getConfigValue('allow_super_admin_registration') === 'true' ? 'Habilitado' : 'Desabilitado'}
            </button>
          </div>

          {/* Manutenção do Sistema */}
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium text-gray-900">
                Modo de Manutenção
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                Ativa o modo de manutenção, bloqueando acesso de usuários
              </p>
            </div>
            <button
              onClick={() => handleToggle('maintenance_mode', getConfigValue('maintenance_mode'))}
              disabled={saving}
              className={`flex items-center px-4 py-2 rounded-md transition-colors ${
                getConfigValue('maintenance_mode') === 'true'
                  ? 'bg-red-100 text-red-800'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              {getConfigValue('maintenance_mode') === 'true' ? (
                <ToggleRight className="w-5 h-5 mr-2" />
              ) : (
                <ToggleLeft className="w-5 h-5 mr-2" />
              )}
              {getConfigValue('maintenance_mode') === 'true' ? 'Ativo' : 'Inativo'}
            </button>
          </div>

          {/* Logs de Auditoria */}
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium text-gray-900">
                Logs de Auditoria
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                Registra todas as ações dos usuários para auditoria
              </p>
            </div>
            <button
              onClick={() => handleToggle('audit_logs_enabled', getConfigValue('audit_logs_enabled'))}
              disabled={saving}
              className={`flex items-center px-4 py-2 rounded-md transition-colors ${
                getConfigValue('audit_logs_enabled') === 'true'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              {getConfigValue('audit_logs_enabled') === 'true' ? (
                <ToggleRight className="w-5 h-5 mr-2" />
              ) : (
                <ToggleLeft className="w-5 h-5 mr-2" />
              )}
              {getConfigValue('audit_logs_enabled') === 'true' ? 'Habilitado' : 'Desabilitado'}
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            Informações do Sistema
          </h2>
        </div>

        <div className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Versão do Sistema</h3>
              <p className="text-lg font-semibold text-gray-900">1.0.0</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Última Atualização</h3>
              <p className="text-lg font-semibold text-gray-900">
                {new Date().toLocaleDateString('pt-BR')}
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Status do Banco</h3>
              <p className="text-lg font-semibold text-green-600">Conectado</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Total de Usuários</h3>
              <p className="text-lg font-semibold text-gray-900">150</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
