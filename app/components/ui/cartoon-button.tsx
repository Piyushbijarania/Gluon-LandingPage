'use client';

interface CartoonButtonProps {
  label: string;
  href?: string;
  disabled?: boolean;
  onClick?: () => void;
  external?: boolean;
  noBorder?: boolean;
}

export function CartoonButton({
  label,
  href,
  disabled = false,
  onClick,
  external = false,
  noBorder = false,
}: CartoonButtonProps) {
  const baseStyles = `relative h-12 px-6 text-base rounded-xl font-bold text-white ${noBorder ? '' : 'border-[0.25px] border-[#FCCC18]'} bg-black transition-all duration-150 overflow-hidden group
    ${disabled ? 'cursor-not-allowed opacity-50 pointer-events-none' : 'cursor-pointer hover:-translate-y-1 hover:shadow-[0_4px_0_0_#FCCC18] active:translate-y-0 active:shadow-none'}`;

  if (href) {
    return (
      <a
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        className={`inline-block ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
      >
        <button
          disabled={disabled}
          className={baseStyles}
        >
          <span className="relative z-10 whitespace-nowrap">{label}</span>
        </button>
      </a>
    );
  }

  return (
    <div className={`inline-block ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}>
      <button
        disabled={disabled}
        onClick={onClick}
        className={baseStyles}
      >
        <span className="relative z-10 whitespace-nowrap">{label}</span>
      </button>
    </div>
  );
}
