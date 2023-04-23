import { Languages } from "@/hooks";
import { useRouter } from "next/router";
import { useState } from "react";
import { InfoModal } from "./InfoModal";
import { ApartmentBuildingIcon } from "@/assets/icons";

type LanguageKey = (typeof Languages)[keyof typeof Languages];

export const Footer = () => {
  const [infoModalOpen, setInfoModalOpen] = useState(false);
  const router = useRouter();
  const { locale, pathname, asPath, query } = router;

  const handleLanguageSelect = (value: LanguageKey) => {
    router.push({ pathname, query }, asPath, { locale: value });
  };

  return (
    <>
      <footer className="footer flex p-8 justify-between items-end md:items-center">
        <div className="flex gap-3 flex-col md:flex-row md:items-center">
          <ApartmentBuildingIcon />
          <p>© 2023 Petr Hovorka</p>
          <p className="hidden md:inline">·</p>
          <p className="link link-hover">
            <a
              href="https://github.com/pehovorka/dao-prototype/"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
          </p>
          <p className="hidden md:inline">·</p>
          <button
            onClick={() => setInfoModalOpen(true)}
            className="link link-hover"
          >
            Info
          </button>
        </div>
        <div>
          <select
            className="select select-md select-ghost select-bordered"
            value={locale}
            onChange={(e) =>
              handleLanguageSelect(e.target.value as LanguageKey)
            }
          >
            <option value={Languages.CS}>Česky</option>
            <option value={Languages.EN}>English</option>
          </select>
        </div>
      </footer>
      <InfoModal open={infoModalOpen} onClose={() => setInfoModalOpen(false)} />
    </>
  );
};
