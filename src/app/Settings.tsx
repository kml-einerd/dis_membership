import { ArrowLeft, CreditCard, User, LogOut, Monitor, Zap, Download, Bell, Type, Settings as SettingsIcon, FileText, HelpCircle } from 'lucide-react';
import { useState } from 'react';
import { SettingsSection } from './components/SettingsSection';
import { SettingsRow } from './components/SettingsRow';
import { useNavigation } from './navigation/NavigationContext';

export default function Settings() {
  const { goBack, navigate } = useNavigation();
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
    <div className="min-h-screen bg-[var(--app-bg)] pb-8">
      {/* Header */}
      <div className="flex items-center gap-3 px-6 py-4 mb-4">
        <button
          onClick={goBack}
          className="w-9 h-9 rounded-full bg-[var(--app-surface-hover)] hover:bg-[var(--app-surface)] transition-colors flex items-center justify-center"
        >
          <ArrowLeft className="w-4 h-4 text-[var(--app-text-secondary)]" />
        </button>
        <h1 className="text-[var(--app-text-primary)] text-2xl font-medium">Configurações</h1>
      </div>

      <div className="px-6">
        {/* Conta Section */}
        <SettingsSection title="Conta">
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
            label="Sair"
            destructive
            onClick={() => setShowLogoutDialog(true)}
          />
        </SettingsSection>

        {/* Player e Conteúdo Section */}
        <SettingsSection title="Player e Conteúdo">
          <SettingsRow
            icon={Monitor}
            label="Qualidade padrão"
            value={quality}
            showChevron
            onClick={() => console.log('Open quality selector')}
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
            onClick={() => console.log('Open speed selector')}
          />
          <SettingsRow
            icon={Download}
            label="Downloads só em Wi-Fi"
            toggle
            toggleValue={wifiOnly}
            onToggleChange={setWifiOnly}
          />
        </SettingsSection>

        {/* Notificações Section */}
        <SettingsSection title="Notificações">
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
        </SettingsSection>

        {/* Aparência Section */}
        <SettingsSection title="Aparência">
          <SettingsRow
            icon={Monitor}
            label="Tema"
            value={theme}
            showChevron
            onClick={() => console.log('Open theme selector')}
          />
          <SettingsRow
            icon={Type}
            label="Tamanho da fonte"
            value={font}
            showChevron
            onClick={() => console.log('Open font selector')}
          />
          <SettingsRow
            icon={Zap}
            label="Reduzir animações"
            toggle
            toggleValue={reduceAnimations}
            onToggleChange={setReduceAnimations}
          />
        </SettingsSection>

        {/* Ajuda Section */}
        <SettingsSection title="Ajuda">
          <SettingsRow
            icon={HelpCircle}
            label="Central de ajuda"
            showChevron
            onClick={() => console.log('Navigate to help')}
          />
          <SettingsRow
            icon={FileText}
            label="Termos de uso e privacidade"
            showChevron
            onClick={() => console.log('Navigate to terms')}
          />
          <SettingsRow
            icon={SettingsIcon}
            label="Versão"
            value="2.1.0"
          />
        </SettingsSection>
      </div>

      {/* Logout Confirmation Dialog */}
      {showLogoutDialog && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center px-6 z-50">
          <div className="bg-[var(--app-surface)] border border-[var(--app-border)] rounded-[var(--app-radius-lg)] p-6 max-w-sm w-full">
            <h3 className="text-[var(--app-text-primary)] font-medium text-lg mb-2">Sair da conta?</h3>
            <p className="text-[var(--app-text-tertiary)] text-sm leading-relaxed mb-6">
              Você precisará fazer login novamente para acessar seu conteúdo.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowLogoutDialog(false)}
                className="flex-1 py-3 bg-[var(--app-surface-hover)] hover:bg-[var(--app-surface)] rounded-[var(--app-radius-md)] text-[var(--app-text-primary)] text-sm font-medium transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  setShowLogoutDialog(false);
                  console.log('Logout confirmed');
                }}
                className="flex-1 py-3 bg-red-500/10 hover:bg-red-500/20 rounded-[var(--app-radius-md)] text-red-400 text-sm font-medium transition-colors"
              >
                Sair
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}