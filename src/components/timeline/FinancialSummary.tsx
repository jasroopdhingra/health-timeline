import { useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { formatCurrency, formatDate } from '@/lib/format';
import { getAllBills } from '@/services/dataService';
import type { HealthEvent } from '@/types';
import { TrendingDown, Receipt, DollarSign } from 'lucide-react';

interface FinancialSummaryProps {
  events: HealthEvent[];
}

export function FinancialSummary({ events }: FinancialSummaryProps) {
  const { totalBilled, totalAllowed, totalSaved, dateRange } = useMemo(() => {
    const bills = getAllBills();
    const billed = bills.reduce((sum, b) => sum + b.amount_billed, 0);
    const allowed = bills.reduce((sum, b) => sum + b.amount_allowed, 0);

    const dates = events.map((e) => new Date(e.create_time).getTime());
    const earliest = dates.length > 0 ? new Date(Math.min(...dates)) : null;
    const latest = dates.length > 0 ? new Date(Math.max(...dates)) : null;

    return {
      totalBilled: billed,
      totalAllowed: allowed,
      totalSaved: billed - allowed,
      dateRange:
        earliest && latest
          ? `${formatDate(earliest.toISOString())} – ${formatDate(latest.toISOString())}`
          : null,
    };
  }, [events]);

  if (events.length === 0) return null;

  return (
    <Card className="mb-6 border-primary/20 bg-gradient-to-r from-primary/5 to-transparent">
      <CardContent className="pt-5 pb-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-sm font-semibold text-foreground">Your Health Summary</h2>
            {dateRange && (
              <p className="text-xs text-muted-foreground mt-0.5">
                {events.length} event{events.length !== 1 ? 's' : ''} &middot; {dateRange}
              </p>
            )}
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Receipt className="h-3.5 w-3.5" />
              Total Billed
            </div>
            <p className="text-lg font-bold">{formatCurrency(totalBilled)}</p>
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <DollarSign className="h-3.5 w-3.5" />
              Approved
            </div>
            <p className="text-lg font-bold">{formatCurrency(totalAllowed)}</p>
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-xs text-emerald-600">
              <TrendingDown className="h-3.5 w-3.5" />
              You Saved
            </div>
            <p className="text-lg font-bold text-emerald-600">{formatCurrency(totalSaved)}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
