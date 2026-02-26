import type { Account } from '@/types';
import logo from '@/assets/logo.svg';

interface HeaderProps {
  account: Account;
}

export function Header({ account }: HeaderProps) {
  return (
    <header className="border-b bg-card">
      <div className="max-w-3xl mx-auto px-4 h-14 flex items-center justify-between">
        <a
          href="https://www.sheerhealth.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2.5 hover:opacity-80 transition-opacity"
        >
          <img src={logo} alt="Sheer Health logo" className="h-7 w-auto" />
          <span
            className="text-[#2D0053] text-xl leading-none"
            style={{ fontFamily: '"Source Serif 4", "Georgia", serif', fontWeight: 600 }}
          >
            sheer health
            <sup className="text-[5px] font-normal ml-0.5 align-super tracking-normal">TM</sup>
          </span>
        </a>
        <div className="text-sm text-muted-foreground">
          {account.first_name} {account.last_name}
        </div>
      </div>
    </header>
  );
}
