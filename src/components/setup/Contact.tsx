import useSetupstore from "@/store/setup/useSetupStore";
import React, { useEffect } from "react";
import Button from "../themes/Button";
import Input from "../themes/Input";
import ThemetypeSelector from "../ux/ThemetypeSelector";
import { useTranslations } from "next-intl";
import Select from "../themes/Select";
import { Divider, SelectItem } from "@heroui/react";
import Paragraph from "../themes/Paragraph";
import Subheading from "../themes/SubHeading";

const Contact = () => {
  const {
    contactName,
    setContactName,
    contactNameError,
    setContactNameError,

    contactWebsite,
    setContactWebsite,
    contactWebsiteError,
    setContactWebsiteError,

    contactCountry,
    setContactCountry,
    contactCountryError,
    setContactCountryError,

    contactCountryCode,
    setContactCountryCode,

    contactPhone,
    setContactPhone,
    contactPhoneError,
    setContactPhoneError,

    currentTab,
    setCurrentTab,
    disabledKeys,
    setDisabledKeys,
  } = useSetupstore();

  useEffect(() => {
    setCurrentTab("contact");
  }, [currentTab]);

  const t = useTranslations("Setup");

  const countries = [
    { key: "AF", label: "Afghanistan" },
    { key: "AX", label: "land Islands" },
    { key: "AL", label: "Albania" },
    { key: "DZ", label: "Algeria" },
    { key: "AS", label: "American Samoa" },
    { key: "AD", label: "Andorra" },
    { key: "AO", label: "Angola" },
    { key: "AI", label: "Anguilla" },
    { key: "AQ", label: "Antarctica" },
    { key: "AG", label: "Antigua and Barbuda" },
    { key: "AR", label: "Argentina" },
    { key: "AM", label: "Armenia" },
    { key: "AW", label: "Aruba" },
    { key: "AU", label: "Australia" },
    { key: "AT", label: "Austria" },
    { key: "AZ", label: "Azerbaijan" },
    { key: "BS", label: "Bahamas" },
    { key: "BH", label: "Bahrain" },
    { key: "BD", label: "Bangladesh" },
    { key: "BB", label: "Barbados" },
    { key: "BY", label: "Belarus" },
    { key: "BE", label: "Belgium" },
    { key: "BZ", label: "Belize" },
    { key: "BJ", label: "Benin" },
    { key: "BM", label: "Bermuda" },
    { key: "BT", label: "Bhutan" },
    { key: "BO", label: "Bolivia" },
    { key: "BA", label: "Bosnia and Herzegovina" },
    { key: "BW", label: "Botswana" },
    { key: "BV", label: "Bouvet Island" },
    { key: "BR", label: "Brazil" },
    { key: "IO", label: "British Indian Ocean Territory" },
    { key: "BN", label: "Brunei Darussalam" },
    { key: "BG", label: "Bulgaria" },
    { key: "BF", label: "Burkina Faso" },
    { key: "BI", label: "Burundi" },
    { key: "KH", label: "Cambodia" },
    { key: "CM", label: "Cameroon" },
    { key: "CA", label: "Canada" },
    { key: "CV", label: "Cape Verde" },
    { key: "KY", label: "Cayman Islands" },
    { key: "CF", label: "Central African Republic" },
    { key: "TD", label: "Chad" },
    { key: "CL", label: "Chile" },
    { key: "CN", label: "China" },
    { key: "CX", label: "Christmas Island" },
    { key: "CC", label: "Cocos (Keeling) Islands" },
    { key: "CO", label: "Colombia" },
    { key: "KM", label: "Comoros" },
    { key: "CG", label: "Congo" },
    { key: "CD", label: "Congo, The Democratic Republic of The" },
    { key: "CK", label: "Cook Islands" },
    { key: "CR", label: "Costa Rica" },
    { key: "CI", label: "C te d'Ivoire" },
    { key: "HR", label: "Croatia" },
    { key: "CU", label: "Cuba" },
    { key: "CY", label: "Cyprus" },
    { key: "CZ", label: "Czech Republic" },
    { key: "DK", label: "Denmark" },
    { key: "DJ", label: "Djibouti" },
    { key: "DM", label: "Dominica" },
    { key: "DO", label: "Dominican Republic" },
    { key: "EC", label: "Ecuador" },
    { key: "EG", label: "Egypt" },
    { key: "SV", label: "El Salvador" },
    { key: "GQ", label: "Equatorial Guinea" },
    { key: "ER", label: "Eritrea" },
    { key: "EE", label: "Estonia" },
    { key: "ET", label: "Ethiopia" },
    { key: "FK", label: "Falkland Islands (Malvinas)" },
    { key: "FO", label: "Faroe Islands" },
    { key: "FJ", label: "Fiji" },
    { key: "FI", label: "Finland" },
    { key: "FR", label: "France" },
    { key: "GF", label: "French Guiana" },
    { key: "PF", label: "French Polynesia" },
    { key: "TF", label: "French Southern Territories" },
    { key: "GA", label: "Gabon" },
    { key: "GM", label: "Gambia" },
    { key: "GE", label: "Georgia" },
    { key: "DE", label: "Germany" },
    { key: "GH", label: "Ghana" },
    { key: "GI", label: "Gibraltar" },
    { key: "GR", label: "Greece" },
    { key: "GL", label: "Greenland" },
    { key: "GD", label: "Grenada" },
    { key: "GP", label: "Guadeloupe" },
    { key: "GU", label: "Guam" },
    { key: "GT", label: "Guatemala" },
    { key: "GN", label: "Guinea" },
    { key: "GW", label: "Guinea-Bissau" },
    { key: "GY", label: "Guyana" },
    { key: "HT", label: "Haiti" },
    { key: "HM", label: "Heard Island and McDonald Islands" },
    { key: "VA", label: "Holy See (Vatican City State)" },
    { key: "HN", label: "Honduras" },
    { key: "HK", label: "Hong Kong" },
    { key: "HU", label: "Hungary" },
    { key: "IS", label: "Iceland" },
    { key: "IN", label: "India" },
    { key: "ID", label: "Indonesia" },
    { key: "IR", label: "Iran, Islamic Republic of" },
    { key: "IQ", label: "Iraq" },
    { key: "IE", label: "Ireland" },
    { key: "IL", label: "Israel" },
    { key: "IT", label: "Italy" },
    { key: "JM", label: "Jamaica" },
    { key: "JP", label: "Japan" },
    { key: "JO", label: "Jordan" },
    { key: "KZ", label: "Kazakhstan" },
    { key: "KE", label: "Kenya" },
    { key: "KI", label: "Kiribati" },
    { key: "KP", label: "Korea, Democratic People's Republic of" },
    { key: "KR", label: "Korea, Republic of" },
    { key: "KW", label: "Kuwait" },
    { key: "KG", label: "Kyrgyzstan" },
    { key: "LA", label: "Lao People's Democratic Republic" },
    { key: "LV", label: "Latvia" },
    { key: "LB", label: "Lebanon" },
    { key: "LS", label: "Lesotho" },
    { key: "LR", label: "Liberia" },
    { key: "LY", label: "Libyan Arab Jamahiriya" },
    { key: "LI", label: "Liechtenstein" },
    { key: "LT", label: "Lithuania" },
    { key: "LU", label: "Luxembourg" },
    { key: "MO", label: "Macao" },
    { key: "MK", label: "Macedonia, The Former Yugoslav Republic of" },
    { key: "MG", label: "Madagascar" },
    { key: "MW", label: "Malawi" },
    { key: "MY", label: "Malaysia" },
    { key: "MV", label: "Maldives" },
    { key: "ML", label: "Mali" },
    { key: "MT", label: "Malta" },
    { key: "MH", label: "Marshall Islands" },
    { key: "MQ", label: "Martinique" },
    { key: "MR", label: "Mauritania" },
    { key: "MU", label: "Mauritius" },
    { key: "YT", label: "Mayotte" },
    { key: "MX", label: "Mexico" },
    { key: "FM", label: "Micronesia, Federated States of" },
    { key: "MD", label: "Moldova" },
    { key: "MC", label: "Monaco" },
    { key: "MN", label: "Mongolia" },
    { key: "ME", label: "Montenegro" },
    { key: "MS", label: "Montserrat" },
    { key: "MA", label: "Morocco" },
    { key: "MZ", label: "Mozambique" },
    { key: "MM", label: "Myanmar" },
    { key: "NA", label: "Namibia" },
    { key: "NR", label: "Nauru" },
    { key: "NP", label: "Nepal" },
    { key: "NL", label: "Netherlands" },
    { key: "NC", label: "New Caledonia" },
    { key: "NZ", label: "New Zealand" },
    { key: "NI", label: "Nicaragua" },
    { key: "NE", label: "Niger" },
    { key: "NG", label: "Nigeria" },
    { key: "NU", label: "Niue" },
    { key: "NF", label: "Norfolk Island" },
    { key: "MP", label: "Northern Mariana Islands" },
    { key: "NO", label: "Norway" },
    { key: "OM", label: "Oman" },
    { key: "PK", label: "Pakistan" },
    { key: "PW", label: "Palau" },
    { key: "PS", label: "Palestinian Territory, Occupied" },
    { key: "PA", label: "Panama" },
    { key: "PG", label: "Papua New Guinea" },
    { key: "PY", label: "Paraguay" },
    { key: "PE", label: "Peru" },
    { key: "PH", label: "Philippines" },
    { key: "PN", label: "Pitcairn" },
    { key: "PL", label: "Poland" },
    { key: "PT", label: "Portugal" },
    { key: "PR", label: "Puerto Rico" },
    { key: "QA", label: "Qatar" },
    { key: "RE", label: "Réunion" },
    { key: "RO", label: "Romania" },
    { key: "RU", label: "Russian Federation" },
    { key: "RW", label: "Rwanda" },
    { key: "BL", label: "Saint Barthélemy" },
    { key: "SH", label: "Saint Helena, Ascension and Tristan da Cunha" },
    { key: "KN", label: "Saint Kitts and Nevis" },
    { key: "LC", label: "Saint Lucia" },
    { key: "MF", label: "Saint Martin (French part)" },
    { key: "PM", label: "Saint Pierre and Miquelon" },
    { key: "VC", label: "Saint Vincent and the Grenadines" },
    { key: "WS", label: "Samoa" },
    { key: "SM", label: "San Marino" },
    { key: "ST", label: "Sao Tome and Principe" },
    { key: "SA", label: "Saudi Arabia" },
    { key: "SN", label: "Senegal" },
    { key: "RS", label: "Serbia" },
    { key: "SC", label: "Seychelles" },
    { key: "SL", label: "Sierra Leone" },
    { key: "SG", label: "Singapore" },
    { key: "SX", label: "Sint Maarten (Dutch part)" },
    { key: "SK", label: "Slovakia" },
    { key: "SI", label: "Slovenia" },
    { key: "SB", label: "Solomon Islands" },
    { key: "SO", label: "Somalia" },
    { key: "ZA", label: "South Africa" },
    { key: "GS", label: "South Georgia and the South Sandwich Islands" },
    { key: "SS", label: "South Sudan" },
    { key: "ES", label: "Spain" },
    { key: "LK", label: "Sri Lanka" },
    { key: "SD", label: "Sudan" },
    { key: "SR", label: "Suriname" },
    { key: "SJ", label: "Svalbard and Jan Mayen" },
    { key: "SZ", label: "Swaziland" },
    { key: "SE", label: "Sweden" },
    { key: "CH", label: "Switzerland" },
    { key: "SY", label: "Syrian Arab Republic" },
    { key: "TW", label: "Taiwan, Province of China" },
    { key: "TJ", label: "Tajikistan" },
    { key: "TZ", label: "Tanzania, United Republic of" },
    { key: "TH", label: "Thailand" },
    { key: "TL", label: "Timor-Leste" },
    { key: "TG", label: "Togo" },
    { key: "TK", label: "Tokelau" },
    { key: "TO", label: "Tonga" },
    { key: "TT", label: "Trinidad and Tobago" },
    { key: "TN", label: "Tunisia" },
    { key: "TR", label: "Turkey" },
    { key: "TM", label: "Turkmenistan" },
    { key: "TC", label: "Turks and Caicos Islands" },
    { key: "TV", label: "Tuvalu" },
    { key: "UG", label: "Uganda" },
    { key: "UA", label: "Ukraine" },
    { key: "AE", label: "United Arab Emirates" },
    { key: "GB", label: "United Kingdom" },
    { key: "US", label: "United States" },
    { key: "UM", label: "United States Minor Outlying Islands" },
    { key: "UY", label: "Uruguay" },
    { key: "UZ", label: "Uzbekistan" },
    { key: "VU", label: "Vanuatu" },
    { key: "VE", label: "Venezuela, Bolivarian Republic of" },
    { key: "VN", label: "Viet Nam" },
    { key: "VG", label: "Virgin Islands, British" },
    { key: "VI", label: "Virgin Islands, U.S." },
    { key: "WF", label: "Wallis and Futuna" },
    { key: "EH", label: "Western Sahara" },
    { key: "YE", label: "Yemen" },
    { key: "ZM", label: "Zambia" },
    { key: "ZW", label: "Zimbabwe" },
  ];

  const countryCodes = [
    {
      country: "AF",
      countryCode: "+93",
    },
    {
      country: "AL",
      countryCode: "+355",
    },
    {
      country: "DZ",
      countryCode: "+213",
    },
    {
      country: "AD",
      countryCode: "+376",
    },
    {
      country: "AO",
      countryCode: "+244",
    },
    {
      country: "AG",
      countryCode: "+1268",
    },
    {
      country: "AR",
      countryCode: "+54",
    },
    {
      country: "AM",
      countryCode: "+374",
    },
    {
      country: "AU",
      countryCode: "+61",
    },
    {
      country: "AT",
      countryCode: "+43",
    },
    {
      country: "AZ",
      countryCode: "+994",
    },
    {
      country: "BH",
      countryCode: "+973",
    },
    {
      country: "BD",
      countryCode: "+880",
    },
    {
      country: "BB",
      countryCode: "+1246",
    },
    {
      country: "BY",
      countryCode: "+375",
    },
    {
      country: "BE",
      countryCode: "+32",
    },
    {
      country: "BZ",
      countryCode: "+501",
    },
    {
      country: "BJ",
      countryCode: "+229",
    },
    {
      country: "BM",
      countryCode: "+1441",
    },
    {
      country: "BT",
      countryCode: "+975",
    },
    {
      country: "BO",
      countryCode: "+591",
    },
    {
      country: "BA",
      countryCode: "+387",
    },
    {
      country: "BW",
      countryCode: "+267",
    },
    {
      country: "BR",
      countryCode: "+55",
    },
    {
      country: "BN",
      countryCode: "+673",
    },
    {
      country: "BG",
      countryCode: "+359",
    },
    {
      country: "BF",
      countryCode: "+226",
    },
    {
      country: "BI",
      countryCode: "+257",
    },
    {
      country: "KH",
      countryCode: "+855",
    },
    {
      country: "CM",
      countryCode: "+237",
    },
    {
      country: "CA",
      countryCode: "+1",
    },
    {
      country: "CV",
      countryCode: "+238",
    },
    {
      country: "CF",
      countryCode: "+236",
    },
    {
      country: "TD",
      countryCode: "+235",
    },
    {
      country: "CL",
      countryCode: "+56",
    },
    {
      country: "CN",
      countryCode: "+86",
    },
    {
      country: "CN",
      countryCode: "+86",
    },
    {
      country: "CR",
      countryCode: "+506",
    },
    {
      country: "CI",
      countryCode: "+225",
    },
    {
      country: "HR",
      countryCode: "+385",
    },
    {
      country: "CU",
      countryCode: "+53",
    },
    {
      country: "CY",
      countryCode: "+357",
    },
    {
      country: "CZ",
      countryCode: "+420",
    },
    {
      country: "DK",
      countryCode: "+45",
    },
    {
      country: "DJ",
      countryCode: "+253",
    },
    {
      country: "DM",
      countryCode: "+1809",
    },
    {
      country: "DO",
      countryCode: "+1809",
    },
    {
      country: "EC",
      countryCode: "+593",
    },
    {
      country: "EG",
      countryCode: "+20",
    },
    {
      country: "SV",
      countryCode: "+503",
    },
    {
      country: "GQ",
      countryCode: "+240",
    },
    {
      country: "ER",
      countryCode: "+291",
    },
    {
      country: "EE",
      countryCode: "+372",
    },
    {
      country: "ET",
      countryCode: "+251",
    },
    {
      country: "FI",
      countryCode: "+358",
    },
    {
      country: "FR",
      countryCode: "+33",
    },
    {
      country: "GA",
      countryCode: "+241",
    },
    {
      country: "GM",
      countryCode: "+220",
    },
    {
      country: "GE",
      countryCode: "+995",
    },
    {
      country: "DE",
      countryCode: "+49",
    },
    {
      country: "GH",
      countryCode: "+233",
    },
    {
      country: "GR",
      countryCode: "+30",
    },
    {
      country: "GD",
      countryCode: "+1473",
    },
    {
      country: "GT",
      countryCode: "+502",
    },
    {
      country: "GN",
      countryCode: "+245",
    },
    {
      country: "GQ",
      countryCode: "+240",
    },
    {
      country: "GT",
      countryCode: "+502",
    },
    {
      country: "HT",
      countryCode: "+509",
    },
    {
      country: "HU",
      countryCode: "+36",
    },
    {
      country: "IS",
      countryCode: "+354",
    },
    {
      country: "IN",
      countryCode: "+91",
    },
    {
      country: "ID",
      countryCode: "+62",
    },
    {
      country: "IR",
      countryCode: "+98",
    },
    {
      country: "IQ",
      countryCode: "+964",
    },
    {
      country: "IE",
      countryCode: "+353",
    },
    {
      country: "IL",
      countryCode: "+972",
    },
    {
      country: "IT",
      countryCode: "+39",
    },
    {
      country: "JM",
      countryCode: "+1876",
    },
    {
      country: "JP",
      countryCode: "+81",
    },
    {
      country: "JO",
      countryCode: "+962",
    },
    {
      country: "KZ",
      countryCode: "+7",
    },
    {
      country: "KE",
      countryCode: "+254",
    },
    {
      country: "KI",
      countryCode: "+686",
    },
    {
      country: "KP",
      countryCode: "+850",
    },
    {
      country: "KR",
      countryCode: "+82",
    },
    {
      country: "KW",
      countryCode: "+965",
    },
    {
      country: "KG",
      countryCode: "+996",
    },
    {
      country: "LA",
      countryCode: "+856",
    },
    {
      country: "LV",
      countryCode: "+371",
    },
    {
      country: "LB",
      countryCode: "+961",
    },
    {
      country: "LS",
      countryCode: "+266",
    },
    {
      country: "LR",
      countryCode: "+231",
    },
    {
      country: "LY",
      countryCode: "+218",
    },
    {
      country: "LI",
      countryCode: "+423",
    },
    {
      country: "LT",
      countryCode: "+370",
    },
    {
      country: "LU",
      countryCode: "+352",
    },
    {
      country: "MO",
      countryCode: "+853",
    },
    {
      country: "MK",
      countryCode: "+389",
    },
    {
      country: "MG",
      countryCode: "+261",
    },
    {
      country: "MW",
      countryCode: "+265",
    },
    {
      country: "MY",
      countryCode: "+60",
    },
    {
      country: "MV",
      countryCode: "+960",
    },
    {
      country: "ML",
      countryCode: "+223",
    },
    {
      country: "MT",
      countryCode: "+356",
    },
    {
      country: "MH",
      countryCode: "+692",
    },
    {
      country: "MQ",
      countryCode: "+596",
    },
    {
      country: "MR",
      countryCode: "+222",
    },
    {
      country: "MU",
      countryCode: "+230",
    },
    {
      country: "YT",
      countryCode: "+262",
    },
    {
      country: "MX",
      countryCode: "+52",
    },
    {
      country: "FM",
      countryCode: "+691",
    },
    {
      country: "MD",
      countryCode: "+373",
    },
    {
      country: "MC",
      countryCode: "+377",
    },
    {
      country: "MN",
      countryCode: "+976",
    },
    {
      country: "ME",
      countryCode: "+382",
    },
    {
      country: "MS",
      countryCode: "+1664",
    },
    {
      country: "MA",
      countryCode: "+212",
    },
    {
      country: "MZ",
      countryCode: "+258",
    },
    {
      country: "MM",
      countryCode: "+95",
    },
    {
      country: "NA",
      countryCode: "+264",
    },
    {
      country: "NR",
      countryCode: "+674",
    },
    {
      country: "NP",
      countryCode: "+977",
    },
    {
      country: "NL",
      countryCode: "+31",
    },
    {
      country: "NC",
      countryCode: "+687",
    },
    {
      country: "NZ",
      countryCode: "+64",
    },
    {
      country: "NI",
      countryCode: "+505",
    },
    {
      country: "NE",
      countryCode: "+227",
    },
    {
      country: "NG",
      countryCode: "+234",
    },
    {
      country: "NU",
      countryCode: "+683",
    },
    {
      country: "NF",
      countryCode: "+672",
    },
    {
      country: "MP",
      countryCode: "+1670",
    },
    {
      country: "NO",
      countryCode: "+47",
    },
    {
      country: "OM",
      countryCode: "+968",
    },
    {
      country: "PK",
      countryCode: "+92",
    },
    {
      country: "PW",
      countryCode: "+680",
    },
    {
      country: "PS",
      countryCode: "+970",
    },
    {
      country: "PA",
      countryCode: "+507",
    },
    {
      country: "PG",
      countryCode: "+675",
    },
    {
      country: "PY",
      countryCode: "+595",
    },
    {
      country: "PE",
      countryCode: "+51",
    },
    {
      country: "PH",
      countryCode: "+63",
    },
    {
      country: "PN",
      countryCode: "+64",
    },
    {
      country: "PL",
      countryCode: "+48",
    },
    {
      country: "PT",
      countryCode: "+351",
    },
    {
      country: "PR",
      countryCode: "+1939",
    },
    {
      country: "QA",
      countryCode: "+974",
    },
    {
      country: "RE",
      countryCode: "+262",
    },
    {
      country: "RO",
      countryCode: "+40",
    },
    {
      country: "RU",
      countryCode: "+7",
    },
    {
      country: "RW",
      countryCode: "+250",
    },
    {
      country: "BL",
      countryCode: "+590",
    },
    {
      country: "SH",
      countryCode: "+290",
    },
    {
      country: "KN",
      countryCode: "+1869",
    },
    {
      country: "LC",
      countryCode: "+1758",
    },
    {
      country: "MF",
      countryCode: "+1599",
    },
    {
      country: "PM",
      countryCode: "+508",
    },
    {
      country: "VC",
      countryCode: "+1784",
    },
    {
      country: "WS",
      countryCode: "+685",
    },
    {
      country: "SM",
      countryCode: "+378",
    },
    {
      country: "ST",
      countryCode: "+239",
    },
    {
      country: "SA",
      countryCode: "+966",
    },
    {
      country: "SN",
      countryCode: "+221",
    },
    {
      country: "RS",
      countryCode: "+381",
    },
    {
      country: "SC",
      countryCode: "+248",
    },
    {
      country: "SL",
      countryCode: "+232",
    },
    {
      country: "SG",
      countryCode: "+65",
    },
    {
      country: "SK",
      countryCode: "+421",
    },
    {
      country: "SI",
      countryCode: "+386",
    },
    {
      country: "SB",
      countryCode: "+677",
    },
    {
      country: "SO",
      countryCode: "+252",
    },
    {
      country: "ZA",
      countryCode: "+27",
    },
    {
      country: "GS",
      countryCode: "+500",
    },
    {
      country: "ES",
      countryCode: "+34",
    },
    {
      country: "LK",
      countryCode: "+94",
    },
    {
      country: "SD",
      countryCode: "+249",
    },
    {
      country: "SR",
      countryCode: "+597",
    },
    {
      country: "SZ",
      countryCode: "+268",
    },
    {
      country: "SE",
      countryCode: "+46",
    },
    {
      country: "CH",
      countryCode: "+41",
    },
    {
      country: "SY",
      countryCode: "+963",
    },
    {
      country: "TJ",
      countryCode: "+992",
    },
    {
      country: "TZ",
      countryCode: "+255",
    },
    {
      country: "TH",
      countryCode: "+66",
    },
    {
      country: "TG",
      countryCode: "+228",
    },
    {
      country: "TK",
      countryCode: "+690",
    },
    {
      country: "TO",
      countryCode: "+676",
    },
    {
      country: "TT",
      countryCode: "+1868",
    },
    {
      country: "TN",
      countryCode: "+216",
    },
    {
      country: "TR",
      countryCode: "+90",
    },
    {
      country: "TM",
      countryCode: "+993",
    },
    {
      country: "TC",
      countryCode: "+1649",
    },
    {
      country: "TV",
      countryCode: "+688",
    },
    {
      country: "UG",
      countryCode: "+256",
    },
    {
      country: "UA",
      countryCode: "+380",
    },
    {
      country: "AE",
      countryCode: "+971",
    },
    {
      country: "GB",
      countryCode: "+44",
    },
    {
      country: "US",
      countryCode: "+1",
    },
    {
      country: "UM",
      countryCode: "+1",
    },
    {
      country: "UY",
      countryCode: "+598",
    },
    {
      country: "UZ",
      countryCode: "+998",
    },
    {
      country: "VU",
      countryCode: "+678",
    },
    {
      country: "VA",
      countryCode: "+379",
    },
    {
      country: "VE",
      countryCode: "+58",
    },
    {
      country: "VN",
      countryCode: "+84",
    },
    {
      country: "VG",
      countryCode: "+1284",
    },
    {
      country: "VI",
      countryCode: "+1340",
    },
    {
      country: "WF",
      countryCode: "+681",
    },
    {
      country: "EH",
      countryCode: "+212",
    },
    {
      country: "YE",
      countryCode: "+967",
    },
    {
      country: "ZM",
      countryCode: "+260",
    },
    {
      country: "ZW",
      countryCode: "+263",
    },
  ];

  useEffect(() => {
    const countryObj = countries.find(
      (country) => country.label === contactCountry
    );
    const countryKey = countryObj ? countryObj.key : "";

    const countryCodeObj = countryCodes.find(
      (countryCode) => countryCode.country === countryKey
    );
    const countryCode = countryCodeObj ? countryCodeObj.countryCode : "";

    setContactCountryCode(countryCode);
  }, [contactCountry]);

  const handleNext = () => {
    if (contactName === "") {
      setContactNameError(true);
      return;
    }

    if (contactWebsite === "") {
      setContactWebsiteError(true);
      return;
    }
    if (contactCountry === "") {
      setContactCountryError(true);
      return;
    }
    if (contactPhone === "") {
      setContactPhoneError(true);
      return;
    }

    setDisabledKeys(["smtp", "advanced", "apps"]);
    setCurrentTab("admin");
  };

  return (
    <div className="w-full h-full">
      <div className="w-full h-[calc(100%-50px)] flex flex-col gap-4  max-h-[calc(100%-50px)] overflow-y-auto scrollbar-hide">
        <div>
          <Subheading>{t("Contact.subheading")}</Subheading>
          <Divider className="w-[75%] my-1" />
          <Input
            label={t("Contact.name")}
            type="text"
            labelPlacement="outside"
            value={contactName}
            onValueChange={(e) => {
              setContactName(e);
              setContactNameError(false);
            }}
            errorMessage={contactNameError ? t("Contact.nameError") : ""}
            isInvalid={contactNameError}
          />
        </div>
        <Input
          label={t("Contact.website")}
          type="text"
          labelPlacement="outside"
          value={contactWebsite}
          onValueChange={(e) => {
            setContactWebsite(e);
            setContactWebsiteError(false);
          }}
          errorMessage={contactWebsiteError ? t("Contact.websiteError") : ""}
          isInvalid={contactWebsiteError}
        />

        <Select
          label={t("Contact.country")}
          labelPlacement="outside"
          errorMessage={contactCountryError ? t("Contact.countryError") : ""}
          isInvalid={contactCountryError}
          selectedKeys={[contactCountry]}
          onChange={(e) => {
            setContactCountry(e.target.value);
            setContactCountryError(false);
          }}
        >
          {countries.map((orgsize) => (
            <SelectItem
              classNames={{
                base: "text-textcolor",
              }}
              key={orgsize.label}
            >
              {orgsize.label}
            </SelectItem>
          ))}
        </Select>

        <Input
          label={t("Contact.phone")}
          type="text"
          labelPlacement="outside"
          value={contactPhone}
          onValueChange={(e) => {
            setContactPhone(e);
            setContactPhoneError(false);
          }}
          errorMessage={contactPhoneError ? t("Contact.phoneError") : ""}
          isInvalid={contactPhoneError}
          startContent={
            <div className="pointer-events-none flex items-center">
              <span className="text-default-400 text-small">
                {contactCountryCode}
              </span>
            </div>
          }
        />
      </div>
      <div className="w-full h-[50px] flex items-center justify-end">
        <div className="mr-4">
          <Button onPress={handleNext}>{t("next2")}</Button>
        </div>
      </div>
    </div>
  );
};

export default Contact;
