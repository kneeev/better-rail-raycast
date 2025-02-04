import { useState, useEffect, useMemo } from "react"

type Station = {
  id: string
  hebrew: string
  english: string
  russian: string
  arabic: string
  image?: any
  blurhash?: string
  alias?: string[]
}

export type NormalizedStation = {
  id: string
  name: string
  image?: any
  hebrew: string
  alias: string[]
}

const stations: Station[] = [
  {
    id: "3700",
    hebrew: "תל אביב - סבידור מרכז",
    english: "Tel Aviv - Savidor Center",
    russian: "Тель-Авив - Мерказ - Центральная",
    arabic: "تل ابيب – ساڤيدور المركز"
  },
  {
    id: "3500",
    hebrew: "הרצליה",
    english: "Herzliya",
    russian: "Герцлия",
    arabic: "هرتسليا"
  },
  {
    id: "3400",
    hebrew: "בית יהושע",
    english: "Bet Yehoshu'a",
    russian: "Бейт-Иегошуа ",
    arabic: "بيت يهوشوع"
  },
  {
    id: "3300",
    hebrew: "נתניה",
    english: "Netanya",
    russian: "Нетания",
    arabic: "نتانيا"
  },
  {
    id: "3100",
    hebrew: "חדרה - מערב",
    english: "Hadera - West",
    russian: "Хадера - Маарав",
    arabic: "الخضيرة - غرب  "
  },
  {
    id: "2800",
    hebrew: "בנימינה",
    english: "Binyamina",
    russian: "Биньямина",
    arabic: "بنيامينا"
  },
  {
    id: "2820",
    hebrew: "קיסריה - פרדס חנה",
    english: "Caesarea-Pardes Hana",
    russian: "Кейсария - Пардес-Хана",
    arabic: "قيساريا - بارديس حنا"
  },
  {
    id: "2500",
    hebrew: "עתלית",
    english: "Atlit",
    russian: "Атлит",
    arabic: "عتليت"
  },
  {
    id: "2200",
    hebrew: "חיפה - בת גלים",
    english: "Haifa - Bat Galim",
    russian: "Хайфа - Бат-Галим",
    arabic: "حيفا - بات چاليم"
  },
  {
    id: "1300",
    hebrew: "חוצות המפרץ",
    english: "Hutzot HaMifratz",
    russian: "Хоцот ха-Мифрац ",
    arabic: "حوتسوت همفراتس"
  },
  {
    id: "700",
    hebrew: "קריית חיים",
    english: "Kiryat Hayim",
    russian: "Кирьят-Хаим",
    arabic: "كريات حاييم"
  },
  {
    id: "1400",
    hebrew: "קריית מוצקין",
    english: "Kiryat Motzkin",
    russian: "Кирьят-Моцкин",
    arabic: "كريات موتسكين"
  },
  {
    id: "1500",
    hebrew: "עכו",
    english: "Ako",
    russian: "Акко ",
    arabic: "عكا"
  },
  {
    id: "2300",
    hebrew: "חיפה - חוף הכרמל",
    english: "Haifa - Hof HaKarmel",
    russian: "Хайфа Хоф ха - Кармель",
    arabic: "حيفا - شاطئ الكرمل"
  },
  {
    id: "8700",
    hebrew: "כפר סבא - נורדאו",
    english: "Kfar Sava - Nordau",
    russian: "Кфар-Саба – Нордау",
    arabic: "كفار سابا - نورداو"
  },
  {
    id: "1600",
    hebrew: "נהריה",
    english: "Nahariya",
    russian: "Нагария",
    arabic: "نهاريا"
  },
  {
    id: "6300",
    hebrew: "בית שמש",
    english: "Bet Shemesh",
    russian: "Бейт Шемеш",
    arabic: "بيت شيمش"
  },
  {
    id: "7000",
    hebrew: "קריית גת",
    english: "Kiryat Gat",
    russian: "Кирьят-Гат ",
    arabic: "كريات چات"
  },
  {
    id: "5000",
    hebrew: "לוד",
    english: "Lod",
    russian: "Лод",
    arabic: "اللد"
  },
  {
    id: "7300",
    hebrew: "באר שבע - צפון/אוניברסיטה",
    english: "Be'er Sheva - North/University",
    russian: "Беер - Шева Цафон",
    arabic: "بئر السبع - شمال/الجامعة"
  },
  {
    id: "4800",
    hebrew: 'כפר חב"ד',
    english: "Kfar Habad",
    russian: "Кфар ХАБАД",
    arabic: "كفار حباد"
  },
  {
    id: "4600",
    hebrew: "תל אביב - השלום",
    english: "Tel Aviv - HaShalom",
    russian: "Тель-Авив - ха-Шалом",
    arabic: "تل أبيب - السلام"
  },
  {
    id: "2100",
    hebrew: "חיפה - מרכז השמונה",
    english: "Haifa Center - HaShmona",
    russian: "Хайфа - Мерказ - Центральная",
    arabic: "حيفا المركز - هشمونا"
  },
  {
    id: "5010",
    hebrew: "רמלה",
    english: "Ramla",
    russian: "Рамле",
    arabic: "الرملة"
  },
  {
    id: "8800",
    hebrew: "ראש העין - צפון",
    english: "Rosh Ha'Ayin - North",
    russian: "Рош ха - Айн Цафон",
    arabic: "روش هعاين - شمال"
  },
  {
    id: "5300",
    hebrew: "באר יעקב",
    english: "Be'er Ya'akov",
    russian: "Беер-Яаков",
    arabic: "بئير يعكوف"
  },
  {
    id: "5200",
    hebrew: "רחובות",
    english: "Rehovot",
    russian: "Реховот",
    arabic: "رحوڤوت"
  },
  {
    id: "5410",
    hebrew: "יבנה מזרח",
    english: "Yavne - East",
    russian: "Явне - Восток",
    arabic: "ياڤنه - شرق"
  },
  {
    id: "9100",
    hebrew: "ראשון לציון - הראשונים",
    english: "Rishon LeTsiyon - HaRishonim",
    russian: "Ришон ле-Цион - Ха-Ришоним ",
    arabic: "ريشون لتسيون - هريشونيم"
  },
  {
    id: "5800",
    hebrew: "אשדוד עד הלום",
    english: "Ashdod - Ad Halom",
    russian: "Ашдод - ад-Халом",
    arabic: "أشدود - عاد هلوم"
  },
  {
    id: "4250",
    hebrew: "פתח תקווה - סגולה",
    english: "Petah Tikva - Segula",
    russian: "Петах-Тиква - Сгула",
    arabic: "بيتح تكڤا - سچوله"
  },
  {
    id: "4100",
    hebrew: "בני ברק",
    english: "Bnei Brak",
    russian: "Бней-Брак",
    arabic: "بني براك"
  },
  {
    id: "3600",
    hebrew: "תל אביב - אוניברסיטה",
    english: "Tel Aviv - University",
    russian: "Тель-Авив - Университет",
    arabic: "تل أبيب - الجامعة"
  },
  {
    id: "7320",
    hebrew: "באר שבע - מרכז",
    english: "Be'er Sheva - Center",
    russian: "Беер - Шева Мерказ",
    arabic: "بئر السبع - المركز"
  },
  {
    id: "1220",
    hebrew: "מרכזית המפרץ (לב המפרץ)",
    english: "HaMifrats Central Station",
    russian: "Центральная станция Ха-Мифрац",
    arabic: "همفراتس المركزية"
  },
  {
    id: "4900",
    hebrew: "תל אביב - ההגנה",
    english: "Tel Aviv - HaHagana",
    russian: "Тель-Авив - ха-Хагана ",
    arabic: "تل أبيب - ههچناه"
  },
  {
    id: "8600",
    hebrew: "נמל תעופה בן גוריון",
    english: "Ben Gurion Airport",
    russian: "Бен-Гурион Аэропорт",
    arabic: "مطار بن چوريون",
    alias: ["נתבג"]
  },
  // {
  //   id: "6700",
  //   hebrew: "ירושלים - מלחה",
  //   english: "Jerusalem - Malha",
  //   russian: "Иерусалим - Малха",
  //   arabic: "القدس - المالحه",
  // },
  {
    id: "5900",
    hebrew: "אשקלון",
    english: "Ashkelon",
    russian: "Ашкелон ",
    arabic: "أشكلون"
  },
  {
    id: "7500",
    hebrew: "דימונה",
    english: "Dimona",
    russian: "Димона",
    arabic: "ديمونا"
  },
  {
    id: "9200",
    hebrew: "הוד השרון - סוקולוב",
    english: "Hod HaSharon - Sokolov",
    russian: "Ход Хашарон - Соколов",
    arabic: "هود هشارون - سوكولوڤ"
  },
  {
    id: "4170",
    hebrew: "פתח תקווה  - קריית אריה",
    english: "Petah Tikva - Kiryat Arye",
    russian: "Петах Тиква – Кирьят Арье",
    arabic: "بيتح تكڤا - كريات أريه"
  },
  {
    id: "5150",
    hebrew: "לוד גני אביב",
    english: "Lod - Gane Aviv",
    russian: "Лод - Ганей Авив",
    arabic: "اللد - چاني أڤيڤ"
  },
  {
    id: "8550",
    hebrew: "להבים - רהט",
    english: "Lehavim - Rahat",
    russian: "Леавим - Рахат",
    arabic: "لهاڤيم - رهط"
  },
  {
    id: "300",
    hebrew: "פאתי מודיעין",
    english: "Pa'ate Modi'in",
    russian: "Патей Модиин",
    arabic: "بأتي موديعين"
  },
  {
    id: "400",
    hebrew: "מודיעין - מרכז",
    english: "Modi'in - Center",
    russian: "Модиин центр ",
    arabic: "موديعين - المركز"
  },
  {
    id: "4640",
    hebrew: "צומת חולון",
    english: "Holon Junction",
    russian: "Холон - Развязка Холон",
    arabic: "مفترق حولون"
  },
  {
    id: "4660",
    hebrew: "חולון - וולפסון",
    english: "Holon - Wolfson",
    russian: "Холон - Вольфсон",
    arabic: "حولون - ڤولفسون"
  },
  {
    id: "4680",
    hebrew: "בת ים - יוספטל",
    english: "Bat Yam - Yoseftal",
    russian: "Бат Ям - Йосеф Таль",
    arabic: "بات يام - يوسفطال"
  },
  {
    id: "4690",
    hebrew: "בת ים - קוממיות",
    english: "Bat Yam - Komemiyut",
    russian: "Бат Ям - Комемуют",
    arabic: "بات يام - كوميميوت"
  },
  {
    id: "9800",
    hebrew: "ראשון לציון - משה דיין",
    english: "Rishon LeTsiyon - Moshe Dayan",
    russian: "Ришон-Ле-Цион станция им. Моше Даяна",
    arabic: "ريشون لتسيون -موشي ديان"
  },
  {
    id: "9000",
    hebrew: "יבנה מערב",
    english: "Yavne - West",
    russian: "Явне-Запад",
    arabic: "ياڤني - غرب"
  },
  {
    id: "9600",
    hebrew: "שדרות",
    english: "Sderot",
    russian: "Сдерот",
    arabic: "سديروت"
  },
  {
    id: "9650",
    hebrew: "נתיבות",
    english: "Netivot",
    russian: "Нетивот",
    arabic: "نتيفوت"
  },
  {
    id: "9700",
    hebrew: "אופקים",
    english: "Ofakim",
    russian: "Офаким",
    arabic: "أوفاكيم"
  },
  {
    id: "3310",
    hebrew: "נתניה - ספיר",
    english: "Netanya - Sapir",
    russian: "Нетания – Сапир",
    arabic: "نتانيا - سبير"
  },
  {
    id: "1240",
    hebrew: "יקנעם - כפר יהושע",
    english: "Yokne'am - Kfar Yehoshu'a",
    russian: "Йокнеам – Кфар-Иегошуа",
    arabic: "يوكنعام – كفار يهوشوع"
  },
  {
    id: "1250",
    hebrew: "מגדל העמק - כפר ברוך",
    english: "Migdal Ha'emek - Kfar Barukh",
    russian: "Мигдаль-Ха-Эмек – Кфар Барух",
    arabic: "مجدال هعيمك – كفار باروخ"
  },
  {
    id: "1260",
    hebrew: "עפולה ר. איתן",
    english: "Afula R.Eitan",
    russian: "Афула Р. Эйтан",
    arabic: "العفولة  ر. ايتان"
  },
  {
    id: "1280",
    hebrew: "בית שאן",
    english: "Beit She'an",
    russian: "Бейт Шеан",
    arabic: "بيت شآن"
  },
  {
    id: "1820",
    hebrew: "אחיהוד",
    english: "Ahihud",
    russian: "Ахихуд",
    arabic: "احيهود"
  },
  {
    id: "1840",
    hebrew: "כרמיאל",
    english: "Karmiel",
    russian: "Кармиэль",
    arabic: "كرميئيل"
  },
  {
    id: "2940",
    hebrew: "רעננה מערב",
    english: "Ra'anana West",
    russian: "Раанана-Вест",
    arabic: "رعنانا – غرب"
  },
  {
    id: "2960",
    hebrew: "רעננה דרום",
    english: "Ra'anana South",
    russian: "Раанана Южный",
    arabic: "رعنانا الجنوبية"
  },
  {
    id: "6150",
    hebrew: "קריית מלאכי - יואב",
    english: "Kiryat Malakhi – Yoav",
    russian: "Кирьят Малахи-Йоав",
    arabic: "كريات ملاخي – يوآڤ"
  },
  {
    id: "680",
    hebrew: "ירושלים - יצחק נבון",
    english: "Jerusalem - Yitzhak Navon",
    russian: "Иерусалим - Ицхак Навон",
    arabic: "أورشليم – يتسحاق ناڤون",
    blurhash: "9KGSDi?w"
  },
  {
    id: "6900",
    hebrew: "מזכרת בתיה",
    english: "Mazkeret Batya",
    russian: "Мазкерет Батья",
    arabic: "مزكيرت باتيا"
  },
]

type StationsObjectType = {
  [key: string]: {
    id: string
    hebrew: string
    english: string
    russian: string
    arabic: string
    image?: undefined
    blurhash?: string
  }
}

export let stationLocale = "english"

export const stationsObject: StationsObjectType = {}

stations.forEach((station) => {
  stationsObject[station.id] = station
})
