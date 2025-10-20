import React from 'react';
import { Type } from 'lucide-react';

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}

export const Wrapper = (props: {
  header: React.ReactNode;
  children: React.ReactNode;
  footer: React.ReactNode;
}) => {
  return (
    <div className="flex flex-col h-screen w-full overflow-hidden">
      {props.header}
      <div className="flex-1 overflow-y-auto py-8 pt-6 scrollbar-thin scrollbar-track-background scrollbar-thumb-muted hover:scrollbar-thumb-muted-foreground">
        <div className="max-w-7xl mx-auto grid sm:grid-cols-2 xl:grid-cols-3 gap-4 px-4">
          {props.children}
        </div>
      </div>

      {props.footer}
    </div>
  );
};

export const StatsBar = ({
  total,
  currentPage,
  pageCount,
  minScore,
  maxScore,
}: {
  total: number;
  currentPage: number;
  pageCount: number;
  minScore: number;
  maxScore: number;
}) => {
  return (
    <div className="flex-shrink-0 border-b border-border bg-background/80 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span>
            <span className="font-medium text-foreground">
              {total}
            </span>{' '}
            emails
          </span>
          <span className="text-border">|</span>
          <span>
            Page{' '}
            <span className="font-medium text-foreground">
              {currentPage}
            </span>
            /{pageCount}
          </span>
          {maxScore > 0 && (
            <>
              <span className="text-border">|</span>
              <span>
                Score range{' '}
                <span className="font-medium text-foreground">
                  {maxScore.toFixed(1)}
                </span>
                {' - '}
                <span className="font-medium text-foreground">
                  {minScore.toFixed(1)}
                </span>
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export const EmailCard = ({
  index,
  from,
  to,
  subject,
  body,
  score,
}: {
  index: number;
  from: string;
  to: string;
  subject: string;
  body: string;
  score: number;
}) => {
  return (
    <div className="rounded-lg border border-border bg-card shadow-sm">
      <div className="px-4 py-2 border-b border-border bg-muted/30 flex items-center justify-between">
        <span className="text-xs font-medium text-muted-foreground">
          Email #{index + 1}
        </span>
        <div className="flex items-center gap-2">
          <span
            className="text-xs font-mono flex items-center text-foreground font-medium"
            title="BM25 Score"
          >
            <Type className="w-3 h-3 mr-1.5 text-blue-500" />
            {score.toFixed(1)}
          </span>
        </div>
      </div>
      <div className="px-4 py-3 space-y-2">
        <div className="text-xs">
          <span className="text-muted-foreground">From:</span>{' '}
          <span className="text-foreground font-medium">{from}</span>
        </div>
        <div className="text-xs">
          <span className="text-muted-foreground">To:</span>{' '}
          <span className="text-foreground font-medium">{to}</span>
        </div>
        <div className="text-sm font-semibold text-foreground pt-1">
          {subject}
        </div>
        <div className="pt-2 border-t border-border/50">
          <p className="text-xs text-foreground/90 whitespace-pre-wrap font-extralight">
            {body.trim()}
          </p>
        </div>
      </div>
    </div>
  );
};

export const SearchInput = ({
  value,
  onChange,
  onSubmit,
}: {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (value: string) => void;
}) => {
  return (
    <div className="flex-shrink-0 border-b border-border bg-background/80 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto py-3 px-4">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit(value);
          }}
        >
          <input
            type="text"
            placeholder="Search emails... (press Enter)"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={cn(
              'w-full rounded-lg border border-input bg-card px-4 py-2.5 text-sm shadow-sm transition-all max-w-lg',
              'placeholder:text-muted-foreground',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:border-transparent',
              'hover:border-ring/50',
            )}
          />
        </form>
      </div>
    </div>
  );
};

export const Pagination = ({
  currentPage,
  pageCount,
  onPageChange,
}: {
  currentPage: number;
  pageCount: number;
  onPageChange: (page: number) => void;
}) => {
  return (
    <div className="flex-shrink-0 border-t border-border bg-background/80 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-center gap-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={cn(
            'px-4 py-2 text-sm font-medium rounded-lg border border-border transition-all',
            currentPage === 1
              ? 'opacity-50 cursor-not-allowed bg-card text-muted-foreground'
              : 'bg-card text-foreground hover:bg-accent hover:text-accent-foreground',
          )}
        >
          Previous
        </button>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === pageCount}
          className={cn(
            'px-4 py-2 text-sm font-medium rounded-lg border border-border transition-all',
            currentPage === pageCount
              ? 'opacity-50 cursor-not-allowed bg-card text-muted-foreground'
              : 'bg-card text-foreground hover:bg-accent hover:text-accent-foreground',
          )}
        >
          Next
        </button>
      </div>
    </div>
  );
};
