const livesBase = ['👽', '👽', '👽'];
let lives = livesBase.slice();
let scoreActual = 0;
let catchedWords = 0;

export const easy = 500;
export const normal = 300;
export const hard = 200;

export const resetScoreAndCatched = function () {
  scoreActual = 0;
  catchedWords = 0;
};

export const manageCatchedWords = function (value) {
  catchedWords += value;
  return catchedWords;
};
export const manageScoreActual = function (value) {
  scoreActual += value;
  return scoreActual;
};

export const decreaseLives = function () {
  lives.length > 0 ? lives.pop() : '';
};
export const resetLives = function () {
  lives = livesBase.slice();
};
export const getLives = function () {
  return lives;
};

export const letters = [
  'A',
  'Ą',
  'B',
  'C',
  'Ć',
  'D',
  'E',
  'Ę',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'Ł',
  'M',
  'N',
  'Ń',
  'O',
  'Ó',
  'P',
  'Q',
  'R',
  'S',
  'Ś',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z',
  'Ź',
  'Ż',
];

const wordsList = [];

const words =
  `Chyba już nigdy nie zmądrzeję! Tyle razy nabrał mnie przecież na ten kawał. Ale nie ma większego osła niż stary osioł. I jak można przewidzieć, co ten chłopak znowu wymyśli. Zwłaszcza że doskonale wie, na ile może sobie pozwolić i ile wytrzymuje moja cierpliwość. Niech tylko na chwilę odwróci moją uwagę albo mnie rozśmieszy — to już koniec, złość mi mija i nawet nie mogę mu dać porządnego klapsa. Och, on o tym świetnie wie. Bóg mi świadkiem, że nie spełniam swoich obowiązków względem tego chłopca. Grzech i męki piekielne ściągam na nas oboje — bo diabeł w nim siedzi. Ale, mój Boże, to przecież sierotka. Syn mojej świętej pamięci rodzonej siostry. Biedactwo! Ile razy mu daruję, mam wyrzuty sumienia, że zaniedbuję jego wychowanie, a jak mu złoję skórę — to mało mi serce potem nie pęknie z żalu. Tak, życie człowieka zrodzonego z niewiasty jest krótkie i pełne trosk, jak mówi Pismo Święte, i wielka to prawda. Dziś po południu na pewno pójdzie na wagary i za karę będę musiała kazać mu jutro pracować. Straszna to będzie rzecz dla niego — pracować w niedzielę, gdy inni chłopcy będą mogli bawić się i robić co im się podoba. Zwłaszcza, że z całego serca nie cierpi pracy, ale muszę spełnić mój obowiązek, bo inaczej byłabym sprawczynią jego wiecznej zguby. istotnie poszedł na wagary i świetnie się bawił. Wrócił do domu tuż przed kolacją i zabrał się do pomocy małemu Murzynkowi w rąbaniu drzewa na podpałkę. Pomoc polegała na tym, że  opowiadał swoje przygody, a  wykonywał trzy czwarte pracy.  młodszy brat  (a ściśle: brat przyrodni), skończył już przydzieloną mu pracę (zbierał drzazgi), bo był to chłopiec grzeczny, który nie miał w sobie awanturniczego i niespokojnego ducha. Podczas kolacji kradł cukier, ilekroć tylko nadarzyła się sposobność, zaś ciotka Polly zadawała mu podstępne i zdradzieckie pytania, aby wyciągnąć z niego kompromitujące zeznania. Jak wszyscy ludzie prostoduszni, uważała się za mistrzynię dyplomatycznej przebiegłości i swoje najbardziej przejrzyste podstępy miała za cuda niezwykłej przenikliwości.`
    .replaceAll(/[.,!-*+—?^${}()|[\]\\]/g, '')
    .toLowerCase()
    .split(' ')
    .forEach(el => {
      if (el.length > 2) wordsList.push(el);
    });

export const randomWord = function () {
  return wordsList[Math.floor(Math.random() * wordsList.length)];
};
