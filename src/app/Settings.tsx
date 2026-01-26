import { ArrowLeft, CreditCard, User, LogOut, Monitor, Zap, Download, Bell, Type, Settings as SettingsIcon, FileText, HelpCircle } from 'lucide-react';
import { useState } from 'react';
import { SettingsSection } from './components/SettingsSection';
import { SettingsRow } from './components/SettingsRow';
import { GlassSurface, Button } from './components/design-system';

import { useNavigation } from './App';

export default function Settings() {
  const { navigate } = useNavigation();
  const [quality, setQuality] = useState('Alta');
  const [autoplay, setAutoplay] = useState(true);
  const [speed, setSpeed] = useState('1.0x');
  const [wifiOnly, setWifiOnly] = useState(true);

  const [pushNotifications, setPushNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [newsNotifications, setNewsNotifications] = useState(false);

  const [theme, setTheme] = useState('Escuro');
  const [font, setFont] = useState('Padrão');
  const [reduceAnimations, setReduceAnimations] = useState(false);

  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  return (
    <div className="min-h-screen bg-[var(--app-bg)] pb-8 relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-[var(--accent-secondary-soft)] opacity-10 blur-[150px] pointer-events-none" />

      {/* Header */}
      <div className="sticky top-0 z-50 flex items-center gap-4 px-6 py-4 bg-[var(--app-bg)]/60 backdrop-blur-xl border-b border-[var(--glass-border)]">
        <button
          onClick={() => navigate('profile')}
          className="w-10 h-10 rounded-full bg-[var(--glass-surface-2)] border border-[var(--glass-border)] hover:bg-[var(--glass-surface-hover)] transition-all flex items-center justify-center group active:scale-95"
        >
          <ArrowLeft className="w-5 h-5 text-[var(--text-primary)] group-hover:-translate-x-0.5 transition-transform" />
        </button>
        <h1 className="text-[var(--text-primary)] text-sm font-bold uppercase tracking-[0.2em]">Configurações</h1>
      </div>

      <div className="px-6 relative z-10 pt-6 max-w-2xl mx-auto space-y-8">
        {/* Conta Section */}
        <SettingsSection title="Sua Conta">
          <div className="bg-[var(--glass-surface-2)] border border-[var(--glass-border)] rounded-3xl overflow-hidden divide-y divide-[var(--glass-border-subtle)]">
            <SettingsRow
              icon={CreditCard}
              label="Assinatura e compras"
              showChevron
              onClick={() => navigate('store')}
            />
            <SettingsRow
              icon={User}
              label="Dados da conta"
              showChevron
              onClick={() => navigate('edit-profile')}
            />
            <SettingsRow
              icon={LogOut}
              label="Sair da conta"
              destructive
              onClick={() => setShowLogoutDialog(true)}
            />
          </div>
        </SettingsSection>

        {/* Player e Conteúdo Section */}
        <SettingsSection title="Experiência de Uso">
          <div className="bg-[var(--glass-surface-2)] border border-[var(--glass-border)] rounded-3xl overflow-hidden divide-y divide-[var(--glass-border-subtle)]">
            <SettingsRow
              icon={Monitor}
              label="Qualidade padrão"
              value={quality}
              showChevron
              onClick={() => window.alert('Seletor de qualidade em breve')}
            />
            <SettingsRow
              icon={Zap}
              label="Autoplay"
              toggle
              toggleValue={autoplay}
              onToggleChange={setAutoplay}
            />
            <SettingsRow
              icon={SettingsIcon}
              label="Velocidade padrão"
              value={speed}
              showChevron
              onClick={() => window.alert('Seletor de velocidade em breve')}
            />
            <SettingsRow
              icon={Download}
              label="Downloads só em Wi-Fi"
              toggle
              toggleValue={wifiOnly}
              onToggleChange={setWifiOnly}
            />
          </div>
        </SettingsSection>

        {/* Notificações Section */}
        <SettingsSection title="Notificações">
          <div className="bg-[var(--glass-surface-2)] border border-[var(--glass-border)] rounded-3xl overflow-hidden divide-y divide-[var(--glass-border-subtle)]">
            <SettingsRow
              icon={Bell}
              label="Notificações push"
              toggle
              toggleValue={pushNotifications}
              onToggleChange={setPushNotifications}
            />
            <SettingsRow
              icon={Bell}
              label="Notificações por email"
              toggle
              toggleValue={emailNotifications}
              onToggleChange={setEmailNotifications}
            />
            <SettingsRow
              icon={Bell}
              label="Novidades e promoções"
              toggle
              toggleValue={newsNotifications}
              onToggleChange={setNewsNotifications}
            />
          </div>
        </SettingsSection>

        {/* Aparência Section */}
        <SettingsSection title="Interface">
          <div className="bg-[var(--glass-surface-2)] border border-[var(--glass-border)] rounded-3xl overflow-hidden divide-y divide-[var(--glass-border-subtle)]">
            <SettingsRow
              icon={Monitor}
              label="Tema do sistema"
              value={theme}
              showChevron
              onClick={() => window.alert('Seletor de tema em breve')}
            />
            <SettingsRow
              icon={Type}
              label="Tamanho da fonte"
              value={font}
              showChevron
              onClick={() => window.alert('Seletor de fonte em breve')}
            />
            <SettingsRow
              icon={Zap}
              label="Reduzir movimentos"
              toggle
              toggleValue={reduceAnimations}
              onToggleChange={setReduceAnimations}
            />
          </div>
        </SettingsSection>

        {/* Ajuda Section */}
        <SettingsSection title="Suporte e Jurídico">
          <div className="bg-[var(--glass-surface-2)] border border-[var(--glass-border)] rounded-3xl overflow-hidden divide-y divide-[var(--glass-border-subtle)]">
            <SettingsRow
              icon={HelpCircle}
              label="Central de ajuda"
              showChevron
              onClick={() => window.open('https://google.com', '_blank')}
            />
            <SettingsRow
              icon={FileText}
              label="Termos de uso e privacidade"
              showChevron
              onClick={() => window.open('https://google.com', '_blank')}
            />
            <div className="px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <SettingsIcon className="w-5 h-5 text-[var(--text-muted)]" />
                <span className="text-[var(--text-tertiary)] text-sm">Versão do App</span>
              </div>
              <span className="text-[var(--text-muted)] text-xs font-mono">v3.4.2-premium</span>
            </div>
          </div>
        </SettingsSection>
      </div>

      {/* Logout Confirmation Dialog */}
      {showLogoutDialog && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center px-6 z-[100]">
          <GlassSurface
            variant="surface-3"
            blur="heavy"
            className="rounded-3xl p-8 max-w-sm w-full border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)]"
          >
            <h3 className="text-[var(--text-primary)] font-black text-xl mb-3 tracking-tight text-center">
              Encerrar Sessão?
            </h3>
            <p className="text-[var(--text-tertiary)] text-sm leading-relaxed mb-8 text-center font-light">
              Você precisará fazer login novamente para acessar seus cursos e ferramentas exclusivas.
            </p>
            <div className="flex flex-col gap-3">
              <Button
                onClick={() => {
                  setShowLogoutDialog(false);
                  navigate('onboarding');
                }}
                variant="ghost"
                className="py-4 text-red-400 font-bold hover:bg-red-500/10"
              >
                ENCERRAR SESSÃO
              </Button>
              <Button
                onClick={() => setShowLogoutDialog(false)}
                variant="secondary"
                className="py-4 font-bold"
              >
                VOLTAR
              </Button>
            </div>
          </GlassSurface>
        </div>
      )}
    </div>
  );
}