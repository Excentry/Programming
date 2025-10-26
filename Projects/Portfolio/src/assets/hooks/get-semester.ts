export function calcularSemestreActual(lang: 'es' | 'en'): string {
  const initYear = 2024;
  const initSemester: 1 | 2 = 1;

  const actualDate = new Date();
  const actualYear = actualDate.getFullYear();
  const actualMonth = actualDate.getMonth() + 1;
  const semester: 1 | 2 = actualMonth <= 6 ? 1 : 2;
  const semesterNum = (actualYear - initYear) * 2 + (semester - initSemester) + 1;

  const ordinalNumber = {
    es: {
      er: [1, 3],
      do: [2],
      to: [4, 5, 6],
      vo: [8],
      no: [9],
      mo: [7, 10],
    },
    en: {
      st: [1],
      nd: [2],
      rd: [3],
      th: [4, 5, 6, 7, 8, 9, 10],
    },
  };

  const ordinalMap = (ordinalNumber: Record<string, number[]>) => {
    return Object.entries(ordinalNumber).reduce((acc, [suffix, nums]) => {
      nums.forEach((n) => (acc[n] = suffix));
      return acc;
    }, {} as Record<number, string>);
  };

  const maps = {
    es: ordinalMap(ordinalNumber.es),
    en: ordinalMap(ordinalNumber.en),
  };

  const getOrdinal = (num: number, lang: 'es' | 'en') => `${num}${maps[lang][num] ?? ''}`;

  return getOrdinal(semesterNum, lang);
}
