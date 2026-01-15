import React from 'react';
import { motion } from 'motion/react';
import { MessageCircle, Users, Calendar, ChevronRight, Zap } from 'lucide-react';
import { Button } from '../design-system';
import { cn } from '../../utils/cn';

// ==========================================
// WHATSAPP BANNER V2 - STEVE JOBS PHILOSOPHY
// ==========================================
// Design Principles:
// 1. Simplicity - Every element has purpose
// 2. Focus - Clear visual hierarchy guiding to CTA
// 3. Premium - Elegant gradients, breathing space
// 4. Desktop: Perfect 3-column layout (Image | Content | CTA)

interface WhatsAppBannerProps {
    /** Banner image URL */
    imageUrl: string;
    /** Main headline */
    headline?: string;
    /** Highlighted text (green) */
    highlightText?: string;
    /** Short description */
    description?: string;
    /** Number of members for social proof */
    memberCount?: string;
    /** Schedule text */
    schedule?: string;
    /** CTA button text */
    ctaText?: string;
    /** WhatsApp link */
    whatsappUrl?: string;
    /** Optional className */
    className?: string;
}

export function WhatsAppBanner({
    imageUrl = 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1200',
    headline = 'Participe da Live do',
    highlightText = 'Clube de Viagens',
    description = 'Dúvidas ao vivo, ofertas secretas e técnicas exclusivas para membros VIP.',
    memberCount = '2.847',
    schedule = 'Toda quinta 20h',
    ctaText = 'Entrar no Grupo VIP',
    whatsappUrl = 'https://wa.me/5511999999999',
    className,
}: WhatsAppBannerProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
            className={cn("w-full", className)}
        >
            <div
                className={cn(
                    "relative overflow-hidden",
                    "rounded-2xl lg:rounded-3xl",
                    "border border-white/10",
                    // Glass effect escuro
                    "backdrop-blur-xl",
                    "bg-black/70",
                )}
                style={{
                    boxShadow: '0 0 80px rgba(37, 211, 102, 0.08), 0 0 40px rgba(37, 211, 102, 0.05)',
                }}
            >
                {/* Glass gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#25D366]/8 via-transparent to-[#25D366]/5 pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none" />

                {/* Grid Layout - Desktop: 3 columns */}
                <div className="relative grid grid-cols-1 lg:grid-cols-[320px_1fr_auto] items-stretch min-h-[180px] lg:min-h-[200px]">

                    {/* ========== COLUMN 1: IMAGE ========== */}
                    <div className="relative h-44 lg:h-full overflow-hidden">
                        <img
                            src={imageUrl}
                            alt="Live"
                            className="w-full h-full object-cover scale-105 transform transition-transform duration-700 hover:scale-110"
                        />
                        {/* Gradient fade */}
                        <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-black via-black/60 to-transparent" />

                        {/* Live Badge - Floating */}
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="absolute top-4 left-4"
                        >
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#FF7E00] rounded-full shadow-lg shadow-[#FF7E00]/30">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
                                </span>
                                <span className="text-white text-[11px] font-black uppercase tracking-wider">Ao Vivo</span>
                            </div>
                        </motion.div>
                    </div>

                    {/* ========== COLUMN 2: CONTENT ========== */}
                    <div className="flex flex-col justify-center px-6 py-6 lg:px-10 lg:py-8">
                        {/* Social proof + Schedule - Inline */}
                        <div className="flex flex-wrap items-center gap-4 lg:gap-6 mb-4">
                            <div className="flex items-center gap-2">
                                <Users className="w-4 h-4 text-[#25D366]" />
                                <span className="text-white/60 text-sm font-medium">{memberCount} membros</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-[#56E88A]" />
                                <span className="text-white/60 text-sm font-medium">{schedule}</span>
                            </div>
                        </div>

                        {/* Headline - Large, impactful */}
                        <h3 className="text-white text-2xl lg:text-3xl xl:text-4xl font-black leading-[1.1] tracking-tight mb-3">
                            {headline}{' '}
                            <span className="text-[#25D366]">{highlightText}</span>
                        </h3>

                        {/* Description - Clean and concise */}
                        <p className="text-white/50 text-sm lg:text-base max-w-md leading-relaxed">
                            {description}
                        </p>

                        {/* Mobile-only CTA */}
                        <div className="mt-6 lg:hidden">
                            <Button
                                variant="primary"
                                size="lg"
                                onClick={() => window.open(whatsappUrl, '_blank')}
                                className="w-full font-black group"
                                style={{
                                    background: 'linear-gradient(135deg, #25D366 0%, #20BA5A 100%)',
                                    boxShadow: '0 4px 20px rgba(37, 211, 102, 0.4)',
                                }}
                            >
                                <MessageCircle className="w-5 h-5 mr-2" />
                                {ctaText}
                            </Button>
                        </div>
                    </div>

                    {/* ========== COLUMN 3: CTA (Desktop only) ========== */}
                    <div className="hidden lg:flex items-center px-8 xl:px-12 border-l border-white/5">
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <Button
                                variant="primary"
                                size="lg"
                                onClick={() => window.open(whatsappUrl, '_blank')}
                                className="font-black whitespace-nowrap group px-8 py-4 text-base"
                                style={{
                                    background: 'linear-gradient(135deg, #25D366 0%, #20BA5A 100%)',
                                    boxShadow: '0 8px 32px rgba(37, 211, 102, 0.35)',
                                }}
                            >
                                <MessageCircle className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
                                {ctaText}
                                <ChevronRight className="w-5 h-5 ml-2 opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                            </Button>
                        </motion.div>
                    </div>
                </div>

                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#25D366]/50 to-transparent" />
            </div>
        </motion.div>
    );
}

export default WhatsAppBanner;
