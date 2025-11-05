module.exports = {
  i18n: {
    defaultLocale: "pt_BR",
    locales: ["pt_BR", "en"],
  },
  localePath: "./public/locales",
  react: {
    bindI18n: "loaded languageChanged",
    bindI18nStore: "added",
    useSuspense: true,
  },
};
