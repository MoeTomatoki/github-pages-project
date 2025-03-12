import { ReactNode } from "react";

type Props = {
  list: ReactNode;
  copyright: ReactNode;
};

export function Layout({ list, copyright }: Props) {
  return (
    <footer className="flex flex-col md:flex-row items-center justify-between px-4 md:px-10 py-4 text-neutral-800 dark:text-neutral-100 bg-neutral-50 dark:bg-neutral-900">
      <div className="flex flex-wrap gap-4 justify-center md:justify-start opacity-80 hover:cursor-not-allowed mb-4 md:mb-0">
        {list}
      </div>

      <div className="flex gap-4 text-sm md:text-base">{copyright}</div>
    </footer>
  );
}
