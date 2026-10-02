'use client'

import { useState } from 'react'
import { motion, AnimatePresence, PanInfo } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import BaseTokenIcon from './icons/BaseTokenIcon'
import NeutronIcon from './icons/NeutronIcon'
import ProtonIcon from './icons/ProtonIcon'

export type ReactionItem = {
  id: string | number
  title: string
  meta?: string
  description?: string
  inputTokens?: readonly ('base' | 'neutron' | 'proton')[]
  outputTokens?: readonly ('base' | 'neutron' | 'proton')[]
}

interface MobileHowItWorksProps {
  items: ReactionItem[]
}

const LABELS = { base: 'Base', neutron: 'Neutron', proton: 'Proton' } as const

function TokenBadge({ type, size = 48 }: { type: 'base' | 'neutron' | 'proton'; size?: number }) {
  const Icon = type === 'base' ? BaseTokenIcon : type === 'neutron' ? NeutronIcon : ProtonIcon
  const glow =
    type === 'base'
      ? 'shadow-[0_0_14px_rgba(139,92,246,0.45)]'
      : type === 'neutron'
        ? 'shadow-[0_0_14px_rgba(245,158,11,0.45)]'
        : 'shadow-[0_0_14px_rgba(229,36,35,0.45)]'
  const rounded = type === 'base' ? 'rounded-xl' : 'rounded-full'

  const labelColor =
    type === 'base'
      ? 'text-violet-400'
      : type === 'neutron'
        ? 'text-[#f59e0b]'
        : 'text-[#E42423]'

  return (
    <div className="flex flex-col items-center gap-1.5 p-1">
      <div
        className={`${rounded} flex items-center justify-center overflow-hidden backdrop-blur-md bg-white/[0.08] border border-[rgba(252,204,24,0.2)] ${glow}`}
        style={{ width: size, height: size }}
      >
        <Icon size={Math.round(size * 0.85)} className="shrink-0" />
      </div>
      <span className={`text-[11px] font-semibold ${labelColor}`}>
        {LABELS[type]}
      </span>
    </div>
  )
}

function MobileReactionVisualizer({
  inputTokens = [],
  outputTokens = [],
}: {
  inputTokens?: readonly ('base' | 'neutron' | 'proton')[]
  outputTokens?: readonly ('base' | 'neutron' | 'proton')[]
}) {
  const isSplit = inputTokens.length === 1 && outputTokens.length === 2
  const isMerge = inputTokens.length === 2 && outputTokens.length === 1

  return (
    <div className="flex w-full items-center justify-center rounded-xl bg-surface-elevated/70 border border-white/5 py-4 px-3 sm:px-6">
      <div className="flex w-full max-w-xs items-center justify-between gap-2 sm:gap-4">
        {/* Input side */}
        <div className="flex items-center justify-center min-w-[64px]">
          {inputTokens.length === 1 ? (
            <TokenBadge type={inputTokens[0]} size={52} />
          ) : (
            <div className="flex flex-col gap-1">
              {inputTokens.map((t, i) => (
                <TokenBadge key={i} type={t} size={40} />
              ))}
            </div>
          )}
        </div>

        {/* Reaction Flow Arrow */}
        <div className="flex flex-col items-center justify-center text-white/60 font-light px-2">
          {isSplit && (
            <div className="flex items-center text-lg sm:text-xl text-gluon/80">
              <span>→</span>
              <span className="flex flex-col text-xs sm:text-sm leading-none ml-0.5">
                <span>↗</span>
                <span>↘</span>
              </span>
            </div>
          )}
          {isMerge && (
            <div className="flex items-center text-lg sm:text-xl text-gluon/80">
              <span className="flex flex-col text-xs sm:text-sm leading-none mr-0.5">
                <span>↘</span>
                <span>↗</span>
              </span>
              <span>→</span>
            </div>
          )}
          {!isSplit && !isMerge && (
            <span className="text-2xl text-gluon/80">→</span>
          )}
        </div>

        {/* Output side */}
        <div className="flex items-center justify-center min-w-[64px]">
          {outputTokens.length === 1 ? (
            <TokenBadge type={outputTokens[0]} size={52} />
          ) : (
            <div className="flex flex-col gap-1">
              {outputTokens.map((t, i) => (
                <TokenBadge key={i} type={t} size={40} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function highlightTokenTerms(text: string) {
  const parts = text.split(/(\bneutrons?\b|\bprotons?\b|\bbase\b)/gi)
  return parts.map((part, i) => {
    const lower = part.toLowerCase()
    if (lower === 'neutron' || lower === 'neutrons') {
      return <span key={i} className="font-medium text-[#f59e0b]">{part}</span>
    }
    if (lower === 'proton' || lower === 'protons') {
      return <span key={i} className="font-medium text-[#E42423]">{part}</span>
    }
    if (lower === 'base') {
      return <span key={i} className="text-violet-400 font-medium">{part}</span>
    }
    return part
  })
}

export default function MobileHowItWorks({ items }: MobileHowItWorksProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const current = items[activeIndex]

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setActiveIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1))
  }

  const onDragEnd = (
    _e: MouseEvent | TouchEvent | PointerEvent,
    { offset, velocity }: PanInfo
  ) => {
    const swipe = Math.abs(offset.x) * velocity.x
    if (swipe < -1000 || offset.x < -60) {
      handleNext()
    } else if (swipe > 1000 || offset.x > 60) {
      handlePrev()
    }
  }

  return (
    <div className="w-full space-y-4">
      {/* Reaction Tabs / Selector Grid */}
      <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:justify-center sm:gap-2">
        {items.map((item, idx) => {
          const isActive = idx === activeIndex
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveIndex(idx)}
              className={`px-3 py-2.5 text-xs sm:text-sm font-semibold rounded-xl transition-all duration-200 text-center flex items-center justify-center min-h-[44px] ${
                isActive
                  ? 'bg-white/[0.12] border border-gluon text-gluon shadow-lg shadow-gluon/15 scale-[1.02]'
                  : 'bg-white/[0.04] border border-white/10 text-white/70 hover:bg-white/[0.08] hover:text-white'
              }`}
            >
              {item.title}
            </button>
          )
        })}
      </div>

      {/* Main Reaction Display Card */}
      <motion.div
        className="glass-card-strong rounded-2xl p-4 sm:p-6 relative overflow-hidden border border-[rgba(252,204,24,0.2)] shadow-2xl"
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.15}
        onDragEnd={onDragEnd}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="space-y-4"
          >
            {/* Visualizer */}
            <MobileReactionVisualizer
              inputTokens={current.inputTokens}
              outputTokens={current.outputTokens}
            />

            {/* Reaction Title & Formula */}
            <div className="space-y-1.5 pt-1">
              <div className="flex items-center justify-between">
                <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-white/80">
                  {current.meta ? highlightTokenTerms(current.meta) : ''}
                </span>
                <span className="text-xs font-mono text-white/50">
                  {activeIndex + 1} / {items.length}
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                {current.title}
              </h3>
            </div>

            {/* Description */}
            {current.description && (
              <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                {highlightTokenTerms(current.description)}
              </p>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation & Dot Indicator Controls */}
        <div className="mt-5 pt-3 border-t border-white/10 flex items-center justify-between">
          <button
            type="button"
            onClick={handlePrev}
            className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-xl flex items-center justify-center bg-white/[0.05] hover:bg-white/[0.12] active:scale-95 text-white/80 transition-all border border-white/10"
            aria-label="Previous reaction"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Dots */}
          <div className="flex items-center gap-1.5">
            {items.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveIndex(idx)}
                className={`transition-all duration-300 rounded-full h-2 ${
                  idx === activeIndex
                    ? 'w-6 bg-gluon shadow-sm shadow-gluon/50'
                    : 'w-2 bg-white/20 hover:bg-white/40'
                }`}
                aria-label={`Go to reaction ${idx + 1}`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={handleNext}
            className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-xl flex items-center justify-center bg-white/[0.05] hover:bg-white/[0.12] active:scale-95 text-white/80 transition-all border border-white/10"
            aria-label="Next reaction"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </motion.div>
    </div>
  )
}
