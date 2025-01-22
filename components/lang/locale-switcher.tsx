'use client';
import {useEffect, useState} from "react";
import {usePathname, useRouter} from 'next/navigation';
import i18next from "i18next";


export default function LocalSwitcher() {
    const [selectedLanguage, setSelectedLanguage] = useState(i18next.language);
    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        const language = pathname.split('/')[1];
        setSelectedLanguage(language);
        try {
            i18next.changeLanguage(selectedLanguage);
        } catch (e) {}
    }, []);

    const handleLanguageChange = (event: any) => {
        const newLanguage = event.target.value;
        const route = pathname.replace(`/${selectedLanguage}`, `/${newLanguage}`);

        setSelectedLanguage(newLanguage);

        try {
            i18next.changeLanguage(newLanguage);
        } catch (e) {
        }

        router.replace(route);
    };

    return (
      <div>
          <select value={selectedLanguage} onChange={handleLanguageChange} className="bg-transparent focus:outline-none">
              <option value="en" className="bg-black">English</option>
              <option value="es" className="bg-black">Español</option>
          </select>
      </div>
    );
}
