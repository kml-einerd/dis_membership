import { ArrowLeft, Upload, Check } from 'lucide-react';
import { useState } from 'react';
import { ImageWithFallback } from './components/figma/ImageWithFallback';
import { PreferenceChip } from './components/PreferenceChip';
import { useNavigation } from './navigation/NavigationContext';

export default function EditProfile() {
  const { goBack } = useNavigation();
  const [name, setName] = useState('Ana Carolina Silva');
  const [username, setUsername] = useState('anasilva');
  const [phone, setPhone] = useState('+55 11 98765-4321');
  const [bio, setBio] = useState('Apaixonada por viagens e sempre em busca de passagens baratas.');
  
  const [preferences, setPreferences] = useState({
    novidades: true,
    modulos: true,
    promocoes: false,
  });

  const [hasChanges, setHasChanges] = useState(false);
  const [showUnsavedDialog, setShowUnsavedDialog] = useState(false);

  const handleInputChange = () => {
    setHasChanges(true);
  };

  const togglePreference = (key: 'novidades' | 'modulos' | 'promocoes') => {
    setPreferences((prev) => ({ ...prev, [key]: !prev[key] }));
    setHasChanges(true);
  };

  const handleSave = () => {
    setHasChanges(false);
    // Save logic here
  };

  const handleBackClick = () => {
    if (hasChanges) {
      setShowUnsavedDialog(true);
    } else {
      goBack();
    }
  };

  return (
    <div className="min-h-screen bg-[var(--app-bg)] pb-24">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 mb-4">
        <button
          onClick={handleBackClick}
          className="w-9 h-9 rounded-full bg-[var(--app-surface-hover)] hover:bg-[var(--app-surface)] transition-colors flex items-center justify-center"
        >
          <ArrowLeft className="w-4 h-4 text-[var(--app-text-secondary)]" />
        </button>
        <h1 className="text-[var(--app-text-primary)] text-lg font-medium">Editar perfil</h1>
        <div className="w-9" /> {/* Spacer */}
      </div>

      <div className="px-6">
        {/* Avatar Upload */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative mb-3">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1683815251677-8df20f826622?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdCUyMHBlcnNvbnxlbnwxfHx8fDE3NjcwNDY4Mzl8MA&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Avatar"
              className="w-24 h-24 rounded-full object-cover"
            />
            <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-[var(--app-accent)] hover:bg-[var(--app-accent-hover)] flex items-center justify-center transition-colors border-2 border-[var(--app-bg)]">
              <Upload className="w-3.5 h-3.5 text-white" />
            </button>
          </div>
          <button className="text-[var(--app-accent)] text-sm font-medium hover:text-[var(--app-accent-hover)] transition-colors">
            Alterar foto
          </button>
        </div>

        {/* Form Fields */}
        <div className="space-y-4 mb-6">
          {/* Name */}
          <div>
            <label className="block text-[var(--app-text-tertiary)] text-xs mb-2">Nome completo</label>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                handleInputChange();
              }}
              className="w-full px-4 py-3 bg-[var(--app-surface-hover)] border border-[var(--app-border)] rounded-[var(--app-radius-md)] text-[var(--app-text-primary)] text-sm placeholder-[var(--app-text-muted)] focus:outline-none focus:border-[var(--app-accent)]/50 transition-colors"
              placeholder="Seu nome"
            />
          </div>

          {/* Username */}
          <div>
            <label className="block text-[var(--app-text-tertiary)] text-xs mb-2">
              Nome de usuário <span className="text-[var(--app-text-muted)]">(opcional)</span>
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                handleInputChange();
              }}
              className="w-full px-4 py-3 bg-[var(--app-surface-hover)] border border-[var(--app-border)] rounded-[var(--app-radius-md)] text-[var(--app-text-primary)] text-sm placeholder-[var(--app-text-muted)] focus:outline-none focus:border-[var(--app-accent)]/50 transition-colors"
              placeholder="@seuusuario"
            />
          </div>

          {/* Email (readonly) */}
          <div>
            <label className="block text-[var(--app-text-tertiary)] text-xs mb-2">
              Email <span className="text-[var(--app-text-muted)]">(verificado)</span>
            </label>
            <div className="relative">
              <input
                type="email"
                value="ana.silva@email.com"
                readOnly
                className="w-full px-4 py-3 bg-[var(--app-surface)] border border-[var(--app-border-subtle)] rounded-[var(--app-radius-md)] text-[var(--app-text-muted)] text-sm cursor-not-allowed"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <div className="flex items-center gap-1 px-2 py-0.5 bg-[var(--app-accent-soft)] rounded-md">
                  <Check className="w-2.5 h-2.5 text-[var(--app-accent)]" />
                  <span className="text-[10px] text-[var(--app-accent)] font-medium">Verificado</span>
                </div>
              </div>
            </div>
          </div>

          {/* Phone */}
          <div>
            <label className="block text-[var(--app-text-tertiary)] text-xs mb-2">
              Telefone <span className="text-[var(--app-text-muted)]">(opcional)</span>
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
                handleInputChange();
              }}
              className="w-full px-4 py-3 bg-[var(--app-surface-hover)] border border-[var(--app-border)] rounded-[var(--app-radius-md)] text-[var(--app-text-primary)] text-sm placeholder-[var(--app-text-muted)] focus:outline-none focus:border-[var(--app-accent)]/50 transition-colors"
              placeholder="+55 11 12345-6789"
            />
          </div>

          {/* Bio */}
          <div>
            <label className="block text-[var(--app-text-tertiary)] text-xs mb-2">
              Bio <span className="text-[var(--app-text-muted)]">(opcional)</span>
            </label>
            <textarea
              value={bio}
              onChange={(e) => {
                setBio(e.target.value);
                handleInputChange();
              }}
              rows={3}
              maxLength={120}
              className="w-full px-4 py-3 bg-[var(--app-surface-hover)] border border-[var(--app-border)] rounded-[var(--app-radius-md)] text-[var(--app-text-primary)] text-sm placeholder-[var(--app-text-muted)] focus:outline-none focus:border-[var(--app-accent)]/50 transition-colors resize-none"
              placeholder="Conte um pouco sobre você..."
            />
            <p className="text-[var(--app-text-muted)] text-xs mt-1 text-right">{bio.length}/120</p>
          </div>
        </div>

        {/* Preference Chips */}
        <div className="mb-8">
          <label className="block text-[var(--app-text-tertiary)] text-xs mb-3">Preferências de notificação</label>
          <div className="flex flex-wrap gap-2">
            <PreferenceChip
              label="Alertas de preço"
              selected={preferences.novidades}
              onToggle={() => togglePreference('novidades')}
            />
            <PreferenceChip
              label="Novos guias"
              selected={preferences.modulos}
              onToggle={() => togglePreference('modulos')}
            />
            <PreferenceChip
              label="Ofertas exclusivas"
              selected={preferences.promocoes}
              onToggle={() => togglePreference('promocoes')}
            />
          </div>
        </div>
      </div>

      {/* Sticky CTA */}
      {hasChanges && (
        <div className="fixed bottom-0 left-0 right-0 bg-[var(--app-bg)]/95 backdrop-blur-xl border-t border-[var(--app-border)] px-6 py-4 z-50">
          <button
            onClick={handleSave}
            className="w-full py-3.5 bg-[var(--app-accent)] hover:bg-[var(--app-accent-hover)] rounded-[var(--app-radius-md)] font-medium text-white transition-all duration-200"
          >
            Salvar alterações
          </button>
        </div>
      )}

      {/* Unsaved Changes Dialog */}
      {showUnsavedDialog && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center px-6 z-50">
          <div className="bg-[var(--app-surface)] border border-[var(--app-border)] rounded-[var(--app-radius-lg)] p-6 max-w-sm w-full">
            <h3 className="text-[var(--app-text-primary)] font-medium text-lg mb-2">
              Descartar alterações?
            </h3>
            <p className="text-[var(--app-text-tertiary)] text-sm leading-relaxed mb-6">
              Você tem alterações não salvas. Deseja descartá-las e voltar?
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowUnsavedDialog(false)}
                className="flex-1 py-3 bg-[var(--app-surface-hover)] hover:bg-[var(--app-surface)] rounded-[var(--app-radius-md)] text-[var(--app-text-primary)] text-sm font-medium transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  setShowUnsavedDialog(false);
                  setHasChanges(false);
                  goBack();
                }}
                className="flex-1 py-3 bg-red-500/10 hover:bg-red-500/20 rounded-[var(--app-radius-md)] text-red-400 text-sm font-medium transition-colors"
              >
                Descartar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}