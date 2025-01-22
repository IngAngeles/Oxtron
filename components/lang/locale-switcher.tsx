'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { i18n } from '@/i18n.config';
import i18next from 'i18next';

export default function LocalSwitcher() {
    const pathName = usePathname();

    const redirectedPathName = (locale: string) => {
        if (!pathName) return '/';
        const segments = pathName.split('/');
        segments[1] = locale;
        return segments.join('/');
    };

    const handleLocaleChange = (locale: string) => {
        i18next.changeLanguage(locale).then(() => {
            console.log(`Language changed to: ${locale}`);
        });
    };

    return (
      <ul className="flex gap-x-3">
          {i18n.locales.map((locale) => (
            <li key={locale}>
                <Link
                  href={redirectedPathName(locale)}
                  className="rounded-md border bg-black px-3 py-2 text-white"
                  onClick={() => handleLocaleChange(locale)}
                >
                    {locale}
                </Link>
            </li>
          ))}
      </ul>
    );
}
