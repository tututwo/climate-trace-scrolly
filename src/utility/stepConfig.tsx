import { useMemo } from "react";

// Optional: Add metadata for each step if needed
export const STEP_METADATA = {
  0: {
    label: "step 1 overall dots",
    text: (
      <>
        To evaluate Scenario 1, we will start with a map of the world,
        displaying the locations of all <strong>9,624 landfills</strong> tracked
        by Climate TRACE in the world. This visualization shows each landfill as
        a circle, with its size corresponding to the{" "}
        <strong>emissions reduction potential</strong> of that landfill.
      </>
    ),
    sideText: (
      <>
        <strong className="text-[1.2rem] font-thin text-gray-500 tracking-widest">
          Scenario One
        </strong>
        <p className="text-gray-500 text-sm">
          {" "}
          9,624 landfills tracked by Climate TRACE in the world
        </p>
      </>
    ),
    condition: (d: any) => false,
  },

  1: {
    label: "step 2 before animating the annex in",
    text: (
      <>
        In our first scenario, we’ll cap landfills in{" "}
        <strong>Annex I countries</strong> (outlined).
      </>
    ),
    sideText: (
      <>
        <strong className="text-[1.2rem] font-thin text-gray-500 tracking-widest">
          Scenario One
        </strong>
        <p className="text-gray-500 text-sm">
          {" "}
          9,624 landfills tracked by Climate TRACE in the world
        </p>
      </>
    ),
    condition: (d: any) => false,
  },
  2: {
    label: "step 2 annex choropleth",
    text: "",
    sideText: (
      <>
        <strong className="text-[1.2rem] font-thin text-gray-500 tracking-widest">
          Scenario One
        </strong>
        <p className="text-gray-500 text-sm">
          {" "}
          9,624 landfills tracked by Climate TRACE in the world
        </p>
      </>
    ),
    condition: (d: any) => false,
  },
  3: {
    label: "step 3 before circles in",
    text: (
      <>
        In our first scenario, we have capped the{" "}
        <strong>
          100 largest landfills across Annex I countries (highlighted in green)
        </strong>
        . The rest of the 9,624 landfills tracked by Climate TRACE – landfills
        that we have not capped – are displayed in gray. Here, we might begin to
        question our first assumption of working locally:{" "}
        <strong>
          There are a lot of landfills outside of Annex I countries that we have
          ignored.
        </strong>
      </>
    ),

    sideText: (
      <>
        <strong className="text-[1.2rem] font-thin text-gray-500 tracking-widest">
          Scenario One
        </strong>
        <p className="text-gray-500 text-sm">
          {" "}
          9,624 landfills tracked by Climate TRACE in the world
        </p>
      </>
    ),
    condition: (d: any) => d?.top100InAnnex === true,
    dotOpacity: 255,
  },
  4: {
    label: "step 3  circles in",
    text: "",
    sideText: (
      <>
        <strong className="text-[1.2rem] font-thin text-gray-500 tracking-widest">
          Scenario One
        </strong>
        <p className="text-gray-500 text-sm">
          {" "}
          9,624 landfills tracked by Climate TRACE in the world
        </p>
      </>
    ),
    condition: (d: any) => d?.top100InAnnex === true,
  },
  5: {
    label: "step 4 just text 1",
    text: (
      <>
        The <strong>size</strong> of each circle on the map is proportional to
        the{" "}
        <strong>
          emissions that would be reduced if that landfill were capped
        </strong>
        .<br></br>
        <br></br> Often, though,{" "}
        <strong>
          large landfills might not actually benefit from additional capping
        </strong>
        . This is because many waste sites already have good practices in place,
        such that capping would do little to reduce emissions further.
      </>
    ),
    sideText: (
      <>
        <strong className="text-[1.2rem] font-thin text-gray-500 tracking-widest">
          Scenario One
        </strong>
        <p className="text-gray-500 text-sm">
          {" "}
          9,624 landfills tracked by Climate TRACE in the world
        </p>
      </>
    ),
    condition: (d: any) => d?.top100InAnnex === true,
  },
  6: {
    label: "step 4 LA example",
    text: (
      <>
        To choose one example, Puente Hills Landfill in Los Angeles is one of
        the largest in the U.S., but has already been covered since its 2013
        closure, and has even operated an LFG-to-energy station since 1987,
        reducing emissions further. Further effort in a location such as this
        one would reduce emissions by less than 3k tonnes, whereas capping an
        uncapped landfill with similar size could reduce emissions by 20 times,
        in many cases. Thus, we can question the second assumption we made in
        Scenario 1, as well:{" "}
        <strong>
          The largest landfills may not actually provide much return on our
          investment if their emissions intensity is already low.
        </strong>
      </>
    ),
    condition: (d: any) => d?.top100InAnnex === true,
  },
  7: {
    label: "step 5 most emitting landfills bar chart",
    text: "",
    sideText: (
      <>
        <strong className="text-[1.2rem] font-thin text-gray-500 tracking-widest">
          Scenario One
        </strong>
        <p className="text-gray-500 text-sm">
          {" "}
          Total emission quantity avoided in the 100 largest landfills across
          Annex I countries
        </p>
      </>
    ),

    condition: (d: any) => d?.top100InAnnex === true,
    bigNumber: "1.3 Mt",
  },
  8: {
    label: "step 5 most emitting landfills bar chart text",
    text: (
      <>
        To clarify the emissions reductions we are leaving on the table in
        Scenario one, we introduce a bar chart below, sorting all landfills in
        the world by the emissions reductions that would actually result in
        capping them. The chart shows the top 200 such landfills. In our current
        scenario, the 100 landfills that we’ve capped are sprinkled through the
        chart –{" "}
        <strong>
          many landfills in gray have huge potential, but weren’t capped in
          Scenario 1
        </strong>
        . Ultimately, this approach reduces emissions by 1.3Mt (million metric
        tonnes) CH4 or 4.3% of all landfill emissions.
      </>
    ),
    condition: (d: any) => d?.top100InAnnex === true,
    sideText: (
      <>
        <strong className="text-[1.2rem] font-thin text-gray-500 tracking-widest">
          Scenario One
        </strong>
        <p className="text-gray-500 text-sm">
          {" "}
          Total emission quantity avoided in the 100 largest landfills across
          Annex I countries
        </p>
      </>
    ),
    bigNumber: "1.3 Mt",
  },
  9: {
    label: "step 6 pre scenario 2 text",
    text: (
      <>
        Now, let us set aside the two assumptions of Scenario 1 (working locally
        and focusing on largest landfills).{" "}
        <strong>
          In Scenario 2, we instead focus directly on emissions reduction:
        </strong>{" "}
        With the budget to cover 100 landfills, which 100 landfills{" "}
        <strong>anywhere</strong> and <strong>regardless of size</strong> would
        actually have the most impact if they were covered? To do this, we look
        at each landfill globally, and we look at their emissions factors and
        activity to see the actual effect of our actions (i.e. the
        emissionality).
      </>
    ),
    condition: (d: any) => d?.top100InAnnex === true,
    sideText: (
      <>
        <strong className="text-[1.2rem] font-thin text-gray-500 tracking-widest">
          Scenario Two
        </strong>
        <p className="text-gray-500 text-sm">
          {" "}
          Total emission quantity avoided in the 100 largest landfills across
          the world
        </p>
      </>
    ),
    bigNumber: "3.7 Mt",
  },
  10: {
    label: "step 5 most emitting landfills bar chart",
    text: (
      <>
        Without constraining ourselves to Annex I countries, many of the large
        gray circles across the map that we ignored in Scenario 1 have now been
        capped. In the bar chart, we see that the highest-potential 100
        landfills have been precisely targeted. By looking at each landfill and
        measuring the emissions that might be reduced directly, we get a
        <strong>
          {" "}
          whopping 3.7Mt (million metric tonnes) CH4 reduction in emissions, or
          12% of all landfill emissions.
        </strong>
      </>
    ),
    condition: (d: any) => d?.top100OrNot === true,
    sideText: (
      <>
        <strong className="text-[1.2rem] font-thin text-gray-500 tracking-widest">
          Scenario Two
        </strong>
        <p className="text-gray-500 text-sm">
          {" "}
          Total emissions avoided by capping the{" "}
          <strong>100 landfills globally</strong> that will reduce emissions the
          most, once covered.
        </p>
      </>
    ),
    bigNumber: "3.7 Mt",
  },
  11: {
    label: "step 5 most emitting landfills bar chart",
    text: "",
    condition: (d: any) => d?.top100OrNot === true,
    sideText: (
      <>
        <strong className="text-[1.2rem] font-thin text-gray-500 tracking-widest">
          Scenario Two
        </strong>
        <p className="text-gray-500 text-sm">
          {" "}
          Total emissions avoided by capping the{" "}
          <strong>100 landfills globally</strong> that will reduce emissions the
          most, once covered.
        </p>
      </>
    ),
    bigNumber: "3.7 Mt",
  },
} as const;

export const useStepFilteredData = (data: any[], stepIndex: number) => {
  return useMemo(() => {
    const condition = STEP_METADATA[stepIndex].condition;
    return condition ? data.filter(condition) : data;
  }, [data, stepIndex]);
};
const allCountries = [
  {
    longName: "Afghanistan",
    shortName: "AFG",
  },
  {
    longName: "Albania",
    shortName: "ALB",
  },
  {
    longName: "Algeria",
    shortName: "DZA",
  },
  {
    longName: "Angola",
    shortName: "AGO",
  },
  {
    longName: "Antarctica",
    shortName: "ATA",
  },
  {
    longName: "Argentina",
    shortName: "ARG",
  },
  {
    longName: "Armenia",
    shortName: "ARM",
  },
  {
    longName: "Australia",
    shortName: "AUS",
  },
  {
    longName: "Austria",
    shortName: "AUT",
  },
  {
    longName: "Azerbaijan",
    shortName: "AZE",
  },
  {
    longName: "Bahamas",
    shortName: "BHS",
  },
  {
    longName: "Bangladesh",
    shortName: "BGD",
  },
  {
    longName: "Belarus",
    shortName: "BLR",
  },
  {
    longName: "Belgium",
    shortName: "BEL",
  },
  {
    longName: "Belize",
    shortName: "BLZ",
  },
  {
    longName: "Benin",
    shortName: "BEN",
  },
  {
    longName: "Bhutan",
    shortName: "BTN",
  },
  {
    longName: "Bolivia",
    shortName: "BOL",
  },
  {
    longName: "Bosnia and Herzegovina",
    shortName: "BIH",
  },
  {
    longName: "Botswana",
    shortName: "BWA",
  },
  {
    longName: "Brazil",
    shortName: "BRA",
  },
  {
    longName: "Brunei Darussalam",
    shortName: "BRN",
  },
  {
    longName: "Bulgaria",
    shortName: "BGR",
  },
  {
    longName: "Burkina Faso",
    shortName: "BFA",
  },
  {
    longName: "Burundi",
    shortName: "BDI",
  },
  {
    longName: "Cambodia",
    shortName: "KHM",
  },
  {
    longName: "Cameroon",
    shortName: "CMR",
  },
  {
    longName: "Canada",
    shortName: "CAN",
  },
  {
    longName: "Central African Republic",
    shortName: "CAF",
  },
  {
    longName: "Chad",
    shortName: "TCD",
  },
  {
    longName: "Chile",
    shortName: "CHL",
  },
  {
    longName: "China",
    shortName: "CHN",
  },
  {
    longName: "Colombia",
    shortName: "COL",
  },
  {
    longName: "Costa Rica",
    shortName: "CRI",
  },
  {
    longName: "Côte d'Ivoire",
    shortName: "CIV",
  },
  {
    longName: "Croatia",
    shortName: "HRV",
  },
  {
    longName: "Cuba",
    shortName: "CUB",
  },
  {
    longName: "Cyprus",
    shortName: "CYP",
  },
  {
    longName: "Czech Republic",
    shortName: "CZE",
  },
  {
    longName: "Dem. Rep. Korea",
    shortName: "PRK",
  },
  {
    longName: "Democratic Republic of the Congo",
    shortName: "COD",
  },
  {
    longName: "Denmark",
    shortName: "DNK",
  },
  {
    longName: "Djibouti",
    shortName: "DJI",
  },
  {
    longName: "Dominican Republic",
    shortName: "DOM",
  },
  {
    longName: "Ecuador",
    shortName: "ECU",
  },
  {
    longName: "Egypt",
    shortName: "EGY",
  },
  {
    longName: "El Salvador",
    shortName: "SLV",
  },
  {
    longName: "Equatorial Guinea",
    shortName: "GNQ",
  },
  {
    longName: "Eritrea",
    shortName: "ERI",
  },
  {
    longName: "Estonia",
    shortName: "EST",
  },
  {
    longName: "Ethiopia",
    shortName: "ETH",
  },
  {
    longName: "Falkland Islands / Malvinas",
    shortName: "FLK",
  },
  {
    longName: "Fiji",
    shortName: "FJI",
  },
  {
    longName: "Finland",
    shortName: "FIN",
  },
  {
    longName: "France",
    shortName: "FRA",
  },
  {
    longName: "French Southern and Antarctic Lands",
    shortName: "ATF",
  },
  {
    longName: "Gabon",
    shortName: "GAB",
  },
  {
    longName: "Georgia",
    shortName: "GEO",
  },
  {
    longName: "Germany",
    shortName: "DEU",
  },
  {
    longName: "Ghana",
    shortName: "GHA",
  },
  {
    longName: "Greece",
    shortName: "GRC",
  },
  {
    longName: "Greenland",
    shortName: "GRL",
  },
  {
    longName: "Guatemala",
    shortName: "GTM",
  },
  {
    longName: "Guinea",
    shortName: "GIN",
  },
  {
    longName: "Guinea-Bissau",
    shortName: "GNB",
  },
  {
    longName: "Guyana",
    shortName: "GUY",
  },
  {
    longName: "Haiti",
    shortName: "HTI",
  },
  {
    longName: "Honduras",
    shortName: "HND",
  },
  {
    longName: "Hungary",
    shortName: "HUN",
  },
  {
    longName: "Iceland",
    shortName: "ISL",
  },
  {
    longName: "India",
    shortName: "IND",
  },
  {
    longName: "Indonesia",
    shortName: "IDN",
  },
  {
    longName: "Iran",
    shortName: "IRN",
  },
  {
    longName: "Iraq",
    shortName: "IRQ",
  },
  {
    longName: "Ireland",
    shortName: "IRL",
  },
  {
    longName: "Israel",
    shortName: "ISR",
  },
  {
    longName: "Italy",
    shortName: "ITA",
  },
  {
    longName: "Jamaica",
    shortName: "JAM",
  },
  {
    longName: "Japan",
    shortName: "JPN",
  },
  {
    longName: "Jordan",
    shortName: "JOR",
  },
  {
    longName: "Kazakhstan",
    shortName: "KAZ",
  },
  {
    longName: "Kenya",
    shortName: "KEN",
  },
  {
    longName: "Kingdom of eSwatini",
    shortName: "SWZ",
  },
  {
    longName: "Kosovo",
    shortName: "KOS",
  },
  {
    longName: "Kuwait",
    shortName: "KWT",
  },
  {
    longName: "Kyrgyzstan",
    shortName: "KGZ",
  },
  {
    longName: "Lao PDR",
    shortName: "LAO",
  },
  {
    longName: "Latvia",
    shortName: "LVA",
  },
  {
    longName: "Lebanon",
    shortName: "LBN",
  },
  {
    longName: "Lesotho",
    shortName: "LSO",
  },
  {
    longName: "Liberia",
    shortName: "LBR",
  },
  {
    longName: "Libya",
    shortName: "LBY",
  },
  {
    longName: "Lithuania",
    shortName: "LTU",
  },
  {
    longName: "Luxembourg",
    shortName: "LUX",
  },
  {
    longName: "Madagascar",
    shortName: "MDG",
  },
  {
    longName: "Malawi",
    shortName: "MWI",
  },
  {
    longName: "Malaysia",
    shortName: "MYS",
  },
  {
    longName: "Mali",
    shortName: "MLI",
  },
  {
    longName: "Mauritania",
    shortName: "MRT",
  },
  {
    longName: "Mexico",
    shortName: "MEX",
  },
  {
    longName: "Moldova",
    shortName: "MDA",
  },
  {
    longName: "Mongolia",
    shortName: "MNG",
  },
  {
    longName: "Montenegro",
    shortName: "MNE",
  },
  {
    longName: "Morocco",
    shortName: "MAR",
  },
  {
    longName: "Mozambique",
    shortName: "MOZ",
  },
  {
    longName: "Myanmar",
    shortName: "MMR",
  },
  {
    longName: "Namibia",
    shortName: "NAM",
  },
  {
    longName: "Nepal",
    shortName: "NPL",
  },
  {
    longName: "Netherlands",
    shortName: "NLD",
  },
  {
    longName: "New Caledonia",
    shortName: "NCL",
  },
  {
    longName: "New Zealand",
    shortName: "NZL",
  },
  {
    longName: "Nicaragua",
    shortName: "NIC",
  },
  {
    longName: "Niger",
    shortName: "NER",
  },
  {
    longName: "Nigeria",
    shortName: "NGA",
  },
  {
    longName: "North Macedonia",
    shortName: "MKD",
  },
  {
    longName: "Northern Cyprus",
    shortName: "CYN",
  },
  {
    longName: "Norway",
    shortName: "NOR",
  },
  {
    longName: "Oman",
    shortName: "OMN",
  },
  {
    longName: "Pakistan",
    shortName: "PAK",
  },
  {
    longName: "Palestine",
    shortName: "PSX",
  },
  {
    longName: "Panama",
    shortName: "PAN",
  },
  {
    longName: "Papua New Guinea",
    shortName: "PNG",
  },
  {
    longName: "Paraguay",
    shortName: "PRY",
  },
  {
    longName: "Peru",
    shortName: "PER",
  },
  {
    longName: "Philippines",
    shortName: "PHL",
  },
  {
    longName: "Poland",
    shortName: "POL",
  },
  {
    longName: "Portugal",
    shortName: "PRT",
  },
  {
    longName: "Puerto Rico",
    shortName: "PRI",
  },
  {
    longName: "Qatar",
    shortName: "QAT",
  },
  {
    longName: "Republic of Korea",
    shortName: "KOR",
  },
  {
    longName: "Republic of the Congo",
    shortName: "COG",
  },
  {
    longName: "Romania",
    shortName: "ROU",
  },
  {
    longName: "Russian Federation",
    shortName: "RUS",
  },
  {
    longName: "Rwanda",
    shortName: "RWA",
  },
  {
    longName: "Saudi Arabia",
    shortName: "SAU",
  },
  {
    longName: "Senegal",
    shortName: "SEN",
  },
  {
    longName: "Serbia",
    shortName: "SRB",
  },
  {
    longName: "Sierra Leone",
    shortName: "SLE",
  },
  {
    longName: "Slovakia",
    shortName: "SVK",
  },
  {
    longName: "Slovenia",
    shortName: "SVN",
  },
  {
    longName: "Solomon Islands",
    shortName: "SLB",
  },
  {
    longName: "Somalia",
    shortName: "SOM",
  },
  {
    longName: "Somaliland",
    shortName: "SOL",
  },
  {
    longName: "South Africa",
    shortName: "ZAF",
  },
  {
    longName: "South Sudan",
    shortName: "SDS",
  },

  {
    longName: "Spain",
    shortName: "ESP",
  },
  {
    longName: "Sri Lanka",
    shortName: "LKA",
  },
  {
    longName: "Sudan",
    shortName: "SDN",
  },

  {
    longName: "Suriname",
    shortName: "SUR",
  },
  {
    longName: "Sweden",
    shortName: "SWE",
  },
  {
    longName: "Switzerland",
    shortName: "CHE",
  },
  {
    longName: "Syria",
    shortName: "SYR",
  },
  {
    longName: "Taiwan",
    shortName: "TWN",
  },
  {
    longName: "Tajikistan",
    shortName: "TJK",
  },
  {
    longName: "Tanzania",
    shortName: "TZA",
  },
  {
    longName: "Thailand",
    shortName: "THA",
  },
  {
    longName: "The Gambia",
    shortName: "GMB",
  },
  {
    longName: "Timor-Leste",
    shortName: "TLS",
  },
  {
    longName: "Togo",
    shortName: "TGO",
  },
  {
    longName: "Trinidad and Tobago",
    shortName: "TTO",
  },
  {
    longName: "Tunisia",
    shortName: "TUN",
  },
  {
    longName: "Turkey",
    shortName: "TUR",
  },
  {
    longName: "Turkmenistan",
    shortName: "TKM",
  },
  {
    longName: "Uganda",
    shortName: "UGA",
  },
  {
    longName: "Ukraine",
    shortName: "UKR",
  },
  {
    longName: "United Arab Emirates",
    shortName: "ARE",
  },
  {
    longName: "United Kingdom",
    shortName: "GBR",
  },
  {
    longName: "United States",
    shortName: "USA",
  },
  {
    longName: "Uruguay",
    shortName: "URY",
  },
  {
    longName: "Uzbekistan",
    shortName: "UZB",
  },
  {
    longName: "Vanuatu",
    shortName: "VUT",
  },
  {
    longName: "Venezuela",
    shortName: "VEN",
  },
  {
    longName: "Vietnam",
    shortName: "VNM",
  },
  {
    longName: "Western Sahara",
    shortName: "SAH",
  },
  {
    longName: "Yemen",
    shortName: "YEM",
  },
  {
    longName: "Zambia",
    shortName: "ZMB",
  },
  {
    longName: "Zimbabwe",
    shortName: "ZWE",
  },
];

export const top100Conditions = [
  [
    { name: "A", value: 0.25 },
    { name: "B", value: 0.75 },
  ],
  [
    { name: "A", value: 0.25 },
    { name: "B", value: 0.75 },
  ],
  [
    { name: "A", value: 0.25 },
    { name: "B", value: 0.75 },
  ],
];
