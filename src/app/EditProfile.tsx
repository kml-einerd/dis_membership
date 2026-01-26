import { ArrowLeft, Upload, Check } from 'lucide-react';
import { useState } from 'react';
import { ImageWithFallback } from './components/figma/ImageWithFallback';
import { PreferenceChip } from './components/PreferenceChip';
import { motion, AnimatePresence } from 'motion/react';
import { GlassSurface, Button } from './components/design-system';
import { useNavigation } from './App';

export default function EditProfile() {
  const { navigate } = useNavigation();
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
      navigate('profile');
    }
  };

  return (
    <div className="min-h-screen bg-[var(--app-bg)] pb-24 relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[var(--accent-primary-soft)] opacity-10 blur-[120px] pointer-events-none" />

      {/* Header */}
      <div className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 bg-[var(--app-bg)]/60 backdrop-blur-xl border-b border-[var(--glass-border)]">
        <button
          onClick={handleBackClick}
          className="w-10 h-10 rounded-full bg-[var(--glass-surface-2)] border border-[var(--glass-border)] hover:bg-[var(--glass-surface-hover)] transition-all flex items-center justify-center group active:scale-95"
        >
          <ArrowLeft className="w-5 h-5 text-[var(--text-primary)] group-hover:-translate-x-0.5 transition-transform" />
        </button>
        <h1 className="text-[var(--text-primary)] text-sm font-bold uppercase tracking-[0.2em]">Editar perfil</h1>
        <div className="w-10" /> {/* Spacer */}
      </div>

      <div className="px-6 relative z-10 pt-8 max-w-2xl mx-auto">
        {/* Avatar Upload */}
        <div className="flex flex-col items-center mb-10">
          <div className="relative mb-4 group">
            <div className="w-32 h-32 rounded-3xl overflow-hidden ring-4 ring-[var(--glass-border)] shadow-2xl relative">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1683815251677-8df20f826622?w=400"
                alt="Avatar"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Upload className="w-6 h-6 text-white" />
              </div>
            </div>
            <button className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-[var(--accent-primary)] hover:bg-[var(--accent-primary-hover)] flex items-center justify-center transition-all border-4 border-[var(--app-bg)] shadow-lg active:scale-90">
              <Upload className="w-4 h-4 text-black font-bold" />
            </button>
          </div>
          <button className="text-[var(--accent-primary)] text-xs font-bold uppercase tracking-widest hover:text-[var(--accent-primary-hover)] transition-colors">
            Alterar foto de perfil
          </button>
        </div>

        {/* Form Fields */}
        <div className="space-y-6 mb-10">
          {/* Name */}
          <div>
            <label className="block text-[var(--text-muted)] text-[10px] font-bold uppercase tracking-widest mb-2.5 ml-1">Nome completo</label>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                handleInputChange();
              }}
              className="w-full px-5 py-4 bg-[var(--glass-surface-2)] border border-[var(--glass-border)] rounded-2xl text-[var(--text-primary)] text-sm placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-primary-border)] transition-all shadow-inner"
              placeholder="Seu nome"
            />
          </div>

          {/* Username */}
          <div>
            <label className="block text-[var(--text-muted)] text-[10px] font-bold uppercase tracking-widest mb-2.5 ml-1">
              Nome de usuário <span className="text-[var(--text-subtle)] lowercase font-medium">(opcional)</span>
            </label>
            <div className="relative">
              <span className="absolute left-5 top-1/2 -translate-y-1/2 text-[var(--text-subtle)] font-medium">@</span>
              <input
                type="text"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  handleInputChange();
                }}
                className="w-full pl-10 pr-5 py-4 bg-[var(--glass-surface-2)] border border-[var(--glass-border)] rounded-2xl text-[var(--text-primary)] text-sm placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-primary-border)] transition-all shadow-inner"
                placeholder="seuusuario"
              />
            </div>
          </div>

          {/* Email (readonly) */}
          <div>
            <label className="block text-[var(--text-muted)] text-[10px] font-bold uppercase tracking-widest mb-2.5 ml-1">
              Email <span className="text-[var(--accent-primary)] lowercase font-medium">(verificado)</span>
            </label>
            <div className="relative">
              <input
                type="email"
                value="ana.silva@email.com"
                readOnly
                className="w-full px-5 py-4 bg-white/[0.02] border border-white/5 rounded-2xl text-[var(--text-muted)] text-sm cursor-not-allowed opacity-60"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2">
                <div className="flex items-center gap-1.5 px-2.5 py-1 bg-[var(--accent-primary-soft)] rounded-full border border-[var(--accent-primary-border)]">
                  <Check className="w-3 h-3 text-[var(--accent-primary)]" />
                  <span className="text-[9px] text-[var(--accent-primary)] font-black uppercase tracking-tighter">Validado</span>
                </div>
              </div>
            </div>
          </div>

          {/* Phone */}
          <div>
            <label className="block text-[var(--text-muted)] text-[10px] font-bold uppercase tracking-widest mb-2.5 ml-1">Telefone</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
                handleInputChange();
              }}
              className="w-full px-5 py-4 bg-[var(--glass-surface-2)] border border-[var(--glass-border)] rounded-2xl text-[var(--text-primary)] text-sm placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-primary-border)] transition-all shadow-inner"
              placeholder="+55 11 12345-6789"
            />
          </div>

          {/* Bio */}
          <div>
            <label className="block text-[var(--text-muted)] text-[10px] font-bold uppercase tracking-widest mb-2.5 ml-1">Bio</label>
            <div className="relative">
              <textarea
                value={bio}
                onChange={(e) => {
                  setBio(e.target.value);
                  handleInputChange();
                }}
                rows={3}
                maxLength={120}
                className="w-full px-5 py-4 bg-[var(--glass-surface-2)] border border-[var(--glass-border)] rounded-2xl text-[var(--text-primary)] text-sm placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-primary-border)] transition-all resize-none shadow-inner"
                placeholder="Conte um pouco sobre você..."
              />
              <p className="absolute bottom-3 right-4 text-[var(--text-subtle)] text-[10px] font-bold">{bio.length}/120</p>
            </div>
          </div>
        </div>

        {/* Preference Chips */}
        <div className="mb-12">
          <label className="block text-[var(--text-muted)] text-[10px] font-bold uppercase tracking-widest mb-4 ml-1">Preferências de notificação</label>
          <div className="flex flex-wrap gap-2.5">
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
      <AnimatePresence>
        {hasChanges && (
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            className="fixed bottom-0 left-0 right-0 bg-[var(--app-bg)]/80 backdrop-blur-2xl border-t border-[var(--glass-border-strong)] px-6 py-5 z-50 flex justify-center"
          >
            <Button
              onClick={handleSave}
              variant="primary"
              size="lg"
              className="w-full max-w-md shadow-2xl shadow-[var(--accent-primary-soft)] font-black tracking-widest"
            >
              SALVAR ALTERAÇÕES
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Unsaved Changes Dialog */}
      {showUnsavedDialog && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center px-6 z-[100]">
          <GlassSurface
            variant="surface-3"
            blur="heavy"
            className="rounded-3xl p-8 max-w-sm w-full border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)]"
          >
            <h3 className="text-[var(--text-primary)] font-black text-xl mb-3 tracking-tight text-center">
              Descartar alterações?
            </h3>
            <p className="text-[var(--text-tertiary)] text-sm leading-relaxed mb-8 text-center font-light">
              Você tem alterações não salvas que serão perdidas permanentemente.
            </p>
            <div className="flex flex-col gap-3">
              <Button
                onClick={() => {
                  setShowUnsavedDialog(false);
                  setHasChanges(false);
                  navigate('profile');
                }}
                variant="ghost"
                className="py-4 text-red-400 font-bold hover:bg-red-500/10"
              >
                DESCARTAR
              </Button>
              <Button
                onClick={() => setShowUnsavedDialog(false)}
                variant="secondary"
                className="py-4 font-bold"
              >
                CANCELAR
              </Button>
            </div>
          </GlassSurface>
        </div>
      )}
    </div>
  );
}