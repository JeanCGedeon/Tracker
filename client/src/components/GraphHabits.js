import React from "react";
import { useEffect, useState } from "react";
import { Chart } from "react-google-charts";

const GraphHabits = (props) => {
  const [tables, setTables] = useState({ habits: [] });
  const [goodHabits, setGoodHabits] = useState({ good: [] });
  const [badHabits, setBadHabits] = useState({ good: [] });
  const [goodMonthsHabits, setGoodMonthsHabits] = useState({
    jan: [],
    feb: [],
    mar: [],
    may: [],
    apr: [],
    may: [],
    june: [],
    july: [],
    aug: [],
    sept: [],
    oct: [],
    nov: [],
    dec: [],
  });
  const [badMonthsHabits, setBadMonthsHabits] = useState({
    jan: [],
    feb: [],
    mar: [],
    may: [],
    apr: [],
    may: [],
    june: [],
    july: [],
    aug: [],
    sept: [],
    oct: [],
    nov: [],
    dec: [],
  });
  const [userEmail, setUserEmail] = useState({});

  const [errors, setErrors] = useState([]);

  const getUserEmail = async () => {
    try {
      const response = await fetch(`/api/v1/habits/email/:id`);
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`;
        const error = new Error(errorMessage);
        throw error;
      }
      const parsedResponse = await response.json();
      setUserEmail(parsedResponse.email);
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`);
    }
  };

  useEffect(() => {
    getUserEmail();
  }, []);

  //Good Months
  let [habitsTotalCount, setHabitsTotalCount] = useState(0);
  let [goodHabitsCount, setGoodHabitsCount] = useState(0);
  let [badHabitsCount, setBadHabitsCount] = useState(0);
  let [goodJanHabitsCount, setGoodJanHabitsCount] = useState(0);
  let [goodFebHabitsCount, setGoodFebHabitsCount] = useState(0);
  let [goodMarHabitsCount, setGoodMarHabitsCount] = useState(0);
  let [goodAprHabitsCount, setGoodAprHabitsCount] = useState(0);
  let [goodMayHabitsCount, setGoodMayHabitsCount] = useState(0);
  let [goodJuneHabitsCount, setGoodJuneHabitsCount] = useState(0);
  let [goodJulyHabitsCount, setGoodJulyHabitsCount] = useState(0);
  let [goodAugHabitsCount, setGoodAugHabitsCount] = useState(0);
  let [goodSeptHabitsCount, setGoodSeptHabitsCount] = useState(0);
  let [goodOctHabitsCount, setGoodOctHabitsCount] = useState(0);
  let [goodNovHabitsCount, setGoodNovHabitsCount] = useState(0);
  let [goodDecHabitsCount, setGoodDecHabitsCount] = useState(0);

  //Bad Months

  let [badJanHabitsCount, setBadJanHabitsCount] = useState(0);
  let [badFebHabitsCount, setBadFebHabitsCount] = useState(0);
  let [badMarHabitsCount, setBadMarHabitsCount] = useState(0);
  let [badAprHabitsCount, setBadAprHabitsCount] = useState(0);
  let [badMayHabitsCount, setBadMayHabitsCount] = useState(0);
  let [badJuneHabitsCount, setBadJuneHabitsCount] = useState(0);
  let [badJulyHabitsCount, setBadJulyHabitsCount] = useState(0);
  let [badAugHabitsCount, setBadAugHabitsCount] = useState(0);
  let [badSeptHabitsCount, setBadSeptHabitsCount] = useState(0);
  let [badOctHabitsCount, setBadOctHabitsCount] = useState(0);
  let [badNovHabitsCount, setBadNovHabitsCount] = useState(0);
  let [badDecHabitsCount, setBadDecHabitsCount] = useState(0);

  const [newHabit, setNewHabit] = useState({
    title: "",
    description: "",
    good: false,
    bad: false,
    date: "",
  });
  const [shouldRedirect, setShouldRedirect] = useState(false);
  if (shouldRedirect) {
    return <Redirect to="/habits" />;
  }

  const getTables = async () => {
    try {
      const userId = userEmail.id;

      const response = await fetch(`/api/v1/graphs/:id`);
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`;
        const error = new Error(errorMessage);
        throw error;
      }
      const parsedResponse = await response.json();
      setTables(parsedResponse.user);
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`);
    }
  };

  const getGoodHabits = async () => {
    try {
      // const userId = props.match.params.id;
      const userId = userEmail.id;
      const response = await fetch(`/api/v1/graphs/:id/goodHabits`);
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`;
        const error = new Error(errorMessage);
        throw error;
      }
      const parsedResponse = await response.json();
      setGoodHabits(parsedResponse.userGoodHabits);
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`);
    }
  };

  const getBadHabits = async () => {
    try {
      // const userId = props.match.params.id;
      const userId = userEmail.id;
      const response = await fetch(`/api/v1/graphs/:id/badHabits`);
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`;
        const error = new Error(errorMessage);
        throw error;
      }
      const parsedResponse = await response.json();
      setBadHabits(parsedResponse.userBadHabits);
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`);
    }
  };

  const getGoodMonthsHabits = async () => {
    try {
      // const userId = props.match.params.id;
      const userId = userEmail.id;
      const response = await fetch(`/api/v1/graphs/:id/allGood`);
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`;
        const error = new Error(errorMessage);
        throw error;
      }
      const parsedResponse = await response.json();
      setGoodMonthsHabits(parsedResponse.userGoodHabits);
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`);
    }
  };

  const getBadMonthsHabits = async () => {
    try {
      // const userId = props.match.params.id;
      const userId = userEmail.id;
      const response = await fetch(`/api/v1/graphs/:id/allBad`);
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`;
        const error = new Error(errorMessage);
        throw error;
      }
      const parsedResponse = await response.json();
      setBadMonthsHabits(parsedResponse.userBadHabits);
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`);
    }
  };

  //get Use Effects
  useEffect(() => {
    getTables();
  }, []);

  useEffect(() => {
    getGoodHabits();
  }, []);

  useEffect(() => {
    getBadHabits();
  }, []);

  useEffect(() => {
    getGoodMonthsHabits();
  }, []);
  useEffect(() => {
    getBadMonthsHabits();
  }, []);

  //Count use effects
  useEffect(() => {
    const numberAllHabits = tables.habits.length;
    setHabitsTotalCount(numberAllHabits);
  });

  useEffect(() => {
    const numberGoodHabits = goodHabits.good.length;
    setGoodHabitsCount(numberGoodHabits);
  });

  useEffect(() => {
    const numberBadHabits = badHabits.good.length;
    setBadHabitsCount(numberBadHabits);
  });
  //==============================================================================================
  //months
  useEffect(() => {
    const numberGoodMonthsJan = goodMonthsHabits.jan.length;
    setGoodJanHabitsCount(numberGoodMonthsJan);
  });
  useEffect(() => {
    const numberGoodMonthsFeb = goodMonthsHabits.feb.length;
    setGoodFebHabitsCount(numberGoodMonthsFeb);
  });
  useEffect(() => {
    const numberGoodMonthsMar = goodMonthsHabits.mar.length;
    setGoodMarHabitsCount(numberGoodMonthsMar);
  });
  useEffect(() => {
    const numberGoodMonthsApr = goodMonthsHabits.apr.length;
    setGoodAprHabitsCount(numberGoodMonthsApr);
  });
  useEffect(() => {
    const numberGoodMonthsMay = goodMonthsHabits.may.length;
    setGoodMayHabitsCount(numberGoodMonthsMay);
  });
  useEffect(() => {
    const numberGoodMonthsJune = goodMonthsHabits.june.length;
    setGoodJuneHabitsCount(numberGoodMonthsJune);
  });
  useEffect(() => {
    const numberGoodMonthsJuly = goodMonthsHabits.july.length;
    setGoodJulyHabitsCount(numberGoodMonthsJuly);
  });
  useEffect(() => {
    const numberGoodMonthsAug = goodMonthsHabits.aug.length;
    setGoodAugHabitsCount(numberGoodMonthsAug);
  });
  useEffect(() => {
    const numberGoodMonthsSept = goodMonthsHabits.sept.length;
    setGoodSeptHabitsCount(numberGoodMonthsSept);
  });
  useEffect(() => {
    const numberGoodMonthsOct = goodMonthsHabits.oct.length;
    setGoodOctHabitsCount(numberGoodMonthsOct);
  });
  useEffect(() => {
    const numberGoodMonthsNov = goodMonthsHabits.nov.length;
    setGoodNovHabitsCount(numberGoodMonthsNov);
  });
  useEffect(() => {
    const numberGoodMonthsDec = goodMonthsHabits.dec.length;
    setGoodDecHabitsCount(numberGoodMonthsDec);
  });
  //==============================================================================================

  useEffect(() => {
    const numberBadMonthsJan = badMonthsHabits.jan.length;
    setBadJanHabitsCount(numberBadMonthsJan);
  });
  useEffect(() => {
    const numberBadMonthsFeb = badMonthsHabits.feb.length;
    setBadFebHabitsCount(numberBadMonthsFeb);
  });
  useEffect(() => {
    const numberBadMonthsMar = badMonthsHabits.mar.length;
    setBadMarHabitsCount(numberBadMonthsMar);
  });
  useEffect(() => {
    const numberBadMonthsApr = badMonthsHabits.apr.length;
    setBadAprHabitsCount(numberBadMonthsApr);
  });
  useEffect(() => {
    const numberBadMonthsMay = badMonthsHabits.may.length;
    setBadMayHabitsCount(numberBadMonthsMay);
  });
  useEffect(() => {
    const numberBadMonthsJune = badMonthsHabits.june.length;
    setBadJuneHabitsCount(numberBadMonthsJune);
  });
  useEffect(() => {
    const numberBadMonthsJuly = badMonthsHabits.july.length;
    setBadJulyHabitsCount(numberBadMonthsJuly);
  });
  useEffect(() => {
    const numberBadMonthsAug = badMonthsHabits.aug.length;
    setBadAugHabitsCount(numberBadMonthsAug);
  });
  useEffect(() => {
    const numberBadMonthsSept = badMonthsHabits.sept.length;
    setBadSeptHabitsCount(numberBadMonthsSept);
  });
  useEffect(() => {
    const numberBadMonthsOct = badMonthsHabits.oct.length;
    setBadOctHabitsCount(numberBadMonthsOct);
  });
  useEffect(() => {
    const numberBadMonthsNov = badMonthsHabits.nov.length;
    setBadNovHabitsCount(numberBadMonthsNov);
  });
  useEffect(() => {
    const numberBadMonthsDec = badMonthsHabits.dec.length;
    setBadDecHabitsCount(numberBadMonthsDec);
  });
  //=============================================================================
  let allHabits = habitsTotalCount;

  let janGoodCount = goodJanHabitsCount;
  let febGoodCount = goodFebHabitsCount;
  let marGoodCount = goodMarHabitsCount;
  let aprGoodCount = goodAprHabitsCount;
  let mayGoodCount = goodMayHabitsCount;
  let juneGoodCount = goodJuneHabitsCount;
  let julyGoodCount = goodJulyHabitsCount;
  let augGoodCount = goodAugHabitsCount;
  let septGoodCount = goodSeptHabitsCount;
  let octGoodCount = goodOctHabitsCount;
  let novGoodCount = goodNovHabitsCount;
  let decGoodCount = goodDecHabitsCount;

  let janBadCount = badJanHabitsCount;
  let febBadCount = badFebHabitsCount;
  let marBadCount = badMarHabitsCount;
  let aprBadCount = badAprHabitsCount;
  let mayBadCount = badMayHabitsCount;
  let juneBadCount = badJuneHabitsCount;
  let julyBadCount = badJulyHabitsCount;
  let augBadCount = badAugHabitsCount;
  let septBadCount = badSeptHabitsCount;
  let octBadCount = badOctHabitsCount;
  let novBadCount = badNovHabitsCount;
  let decBadCount = badDecHabitsCount;

  let data = [
    ["Months", "Total Habits", "Bad Habits", "Good habits"],
    ["January", goodJanHabitsCount + badJanHabitsCount, goodJanHabitsCount, badJanHabitsCount],
    ["February", goodFebHabitsCount + badFebHabitsCount, goodFebHabitsCount, badFebHabitsCount],
    ["March", goodMarHabitsCount + badMarHabitsCount, goodMarHabitsCount, badMarHabitsCount],
    ["April", goodAprHabitsCount + badAprHabitsCount, goodAprHabitsCount, badAprHabitsCount],
    ["May", goodMayHabitsCount + badMayHabitsCount, goodMayHabitsCount, badMayHabitsCount],
    ["June", goodJuneHabitsCount + badJuneHabitsCount, goodJuneHabitsCount, badJuneHabitsCount],
    ["July", goodJulyHabitsCount + badJulyHabitsCount, goodJulyHabitsCount, badJulyHabitsCount],
    ["August", goodAugHabitsCount + badAugHabitsCount, goodAugHabitsCount, badAugHabitsCount],
    [
      "September",
      goodSeptHabitsCount + badSeptHabitsCount,
      goodSeptHabitsCount,
      badSeptHabitsCount,
    ],
    ["October", goodOctHabitsCount + badOctHabitsCount, goodOctHabitsCount, badOctHabitsCount],
    ["November", goodNovHabitsCount + badNovHabitsCount, goodNovHabitsCount, badNovHabitsCount],
    ["December", goodDecHabitsCount + badDecHabitsCount, goodDecHabitsCount, badNovHabitsCount],
  ];

  let options = {
    chart: {
      title: "Your 2022 Habits Count",
      subtitle: "All Habits, Good Habits, Bad Habits: 2022",
    },
    backgroundColor: {
      fill: "transparent",
    },

    colors: ["#322E2E", "FFA500", "004BED"],
    hAxis: {
      textStyle: { color: "#FFF" },
      baseLineColor: "FFF",
    },
    bar: { groupWidth: "90%" },
    chartArea:{left:60,width:'87%',height:'75%', },
  legend:{textStyle: {color: 'white', fontSize: 16}},
    vAxis: {
      colors: ["transparent"],
      textStyle: { color: "#FFF" },
      gridlines: { color: "transparent" },
    },
  };
  return (
    <div className="column-chart">
      <Chart
        chartType="ColumnChart"
        // width={"1460px"}
        height={"400px"}
        data={data}
        options={options}
      />
    </div>
  );
};

export default GraphHabits;
