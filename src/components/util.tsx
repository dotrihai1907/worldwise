export const formatDate = (date: string) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

export const flagEmojiToPNG = (flag: string) => {
  if (!/^[a-zA-Z]+$/.test(flag)) {
    flag = Array.from(flag, (codeUnit) =>
      String.fromCharCode((codeUnit.codePointAt(0) ?? 0) - 127397).toLowerCase()
    ).join("");
  } else {
    flag = flag.toLowerCase();
  }
  return <img src={`https://flagcdn.com/24x18/${flag}.png`} alt="flag" />;
};
