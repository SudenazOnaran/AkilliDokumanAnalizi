import { BrainCircuit } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Logo({ className }: { className?: string }) {
  return (
    <div className={cn('flex items-center justify-center gap-2', className)}>
      <BrainCircuit className="h-8 w-8 text-primary" />
      <span className="text-xl font-bold">AkilDoc</span>
    </div>
  );
}
