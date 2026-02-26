import type { Bill } from '@/types';
import { formatCurrency } from '@/lib/format';
import { DollarSign } from 'lucide-react';

interface BillSummaryProps {
  bill: Bill | undefined;
}

export function BillSummary({ bill }: BillSummaryProps) {
  if (!bill) {
    return (
      <p className="text-sm text-muted-foreground py-4 text-center">
        No billing information for this event.
      </p>
    );
  }

  const difference = bill.amount_billed - bill.amount_allowed;

  return (
    <div className="rounded-lg border bg-muted/30 p-4">
      <div className="flex items-center gap-2 mb-4">
        <DollarSign className="h-5 w-5 text-muted-foreground" />
        <h4 className="font-medium text-sm">Billing Summary</h4>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-wide">Amount Billed</p>
          <p className="text-lg font-semibold mt-1">{formatCurrency(bill.amount_billed)}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-wide">Amount Allowed</p>
          <p className="text-lg font-semibold mt-1 text-emerald-600">
            {formatCurrency(bill.amount_allowed)}
          </p>
        </div>
      </div>
      <div className="mt-4 pt-3 border-t">
        <div className="flex justify-between items-center">
          <p className="text-xs text-muted-foreground uppercase tracking-wide">Your Savings</p>
          <p className="text-sm font-semibold text-emerald-600">
            {formatCurrency(difference)}
          </p>
        </div>
      </div>
    </div>
  );
}
