import type { Account } from '@/types';
import { Activity } from 'lucide-react';

interface HeaderProps {
  account: Account;
}

export function Header({ account }: HeaderProps) {
  return (
    <header className="border-b bg-card">
      <div className="max-w-3xl mx-auto px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-primary" />
          <span className="font-semibold text-sm">Health Timeline</span>
        </div>
        <div className="text-sm text-muted-foreground">
          {account.first_name} {account.last_name}
        </div>
      </div>
    </header>
  );
}
