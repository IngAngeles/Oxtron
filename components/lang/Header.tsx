//import Link from 'next/link';
import { Locale } from '@/i18n.config';
import { getDictionary } from '@/lib/dictionary';
import LocalSwitcher from './locale-switcher';

export default async function Header({ lang }: { lang: Locale }) {
    const dictionary = await getDictionary(lang);
    ///const dashboardTitle = dictionary.pages.dashboard.title;

    return (
        <header className='py-6'>
            <nav className='container flex items-center justify-between'>
                <ul className='flex gap-x-8'>
                    {/* <li>
                        <Link href={`/${lang}`}>{dashboardTitle}</Link>
                    </li>
                    <li>
                        <Link href={`/${lang}/dashboard`}>{dashboardTitle}</Link>
                    </li> */}
                </ul>
                <LocalSwitcher />
            </nav>
        </header>
    );
}
