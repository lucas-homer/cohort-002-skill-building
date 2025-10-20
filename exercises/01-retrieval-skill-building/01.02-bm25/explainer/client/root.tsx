import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query';
import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  EmailCard,
  Pagination,
  SearchInput,
  StatsBar,
  Wrapper,
} from './components.tsx';
import './tailwind.css';

type EmailsResponse = {
  emails: Array<{
    index: number;
    id: string;
    from: string;
    to: string;
    subject: string;
    body: string;
    timestamp: string;
    score: number;
  }>;
  stats: {
    total: number;
    pageCount: number;
    currentPage: number;
    minScore: number;
    maxScore: number;
  };
};

const EmailViewer = () => {
  const [inputValue, setInputValue] = useState('');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const { data, isLoading } = useQuery({
    queryKey: ['emails', search, page],
    queryFn: async () => {
      const params = new URLSearchParams({
        search,
        page: page.toString(),
      });
      const res = await fetch(`/api/emails?${params}`);
      return (await res.json()) as EmailsResponse;
    },
    refetchInterval: 5000,
  });

  const handleSearchSubmit = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  return (
    <Wrapper
      header={
        <>
          <SearchInput
            value={inputValue}
            onChange={setInputValue}
            onSubmit={handleSearchSubmit}
          />
          {isLoading ? (
            <div className="flex-shrink-0 border-b border-border bg-background/80 backdrop-blur-sm">
              <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-center">
                <span className="text-xs text-muted-foreground">
                  Loading...
                </span>
              </div>
            </div>
          ) : data ? (
            <StatsBar
              total={data.stats.total}
              currentPage={data.stats.currentPage}
              pageCount={data.stats.pageCount}
              minScore={data.stats.minScore}
              maxScore={data.stats.maxScore}
            />
          ) : null}
        </>
      }
      footer={
        isLoading || !data ? null : (
          <Pagination
            currentPage={page}
            pageCount={data.stats.pageCount}
            onPageChange={setPage}
          />
        )
      }
    >
      {isLoading ? (
        <div className="flex items-center justify-center py-12 text-muted-foreground">
          Loading emails...
        </div>
      ) : data ? (
        data.emails.map((email) => (
          <EmailCard
            key={email.id}
            index={email.index}
            from={email.from}
            to={email.to}
            subject={email.subject}
            body={email.body}
            score={email.score}
          />
        ))
      ) : null}
    </Wrapper>
  );
};

const App = () => {
  return <EmailViewer />;
};

const root = createRoot(document.getElementById('root')!);
root.render(
  <QueryClientProvider client={new QueryClient()}>
    <App />
  </QueryClientProvider>,
);
