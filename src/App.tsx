import "./App.css";

import { useParentSize, ParentSize, useScreenSize } from "@visx/responsive";

import { useState, useCallback, useEffect, useMemo } from "react";

import * as d3 from "d3";
import { Scrollama, Step } from "react-scrollama";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// NOTE: Data

// import steelplant from "@/data/steel-plant.csv";
import data from "@/data/data.csv";
// import stackedBarChartData from "@/data/stackedBarChart.csv";
// NOTE: config + static data
import {
  useStepFilteredData,
  STEP_METADATA,
  top100Conditions,
} from "@/utility/stepConfig.tsx";

import { hslaToRGBA } from "@/lib/utils";
// NOTE: Custom UI components
import Legend from "@/components/custom-ui-components/Legend";
import VisibleTextBlock from "@/components/custom-ui-components/VisibleTextBlock";
import ClimateTraceHeader from "@/components/custom-ui-components/ClimateTraceHeader";
import ScrollIndicator from "@/components/custom-ui-components/ScrollIndicator";
// NOTE: Reusable UI components
// import { Slider } from "@/components/reusable-ui-components/slider";

// NOTE: Big Container components
import DeckglMap from "./components/containers/DeckglMap";
import HeaderArticle from "./components/containers/HeaderArticle";
// NOTE: Custom Chart components
import BarChart from "./components/custom-chart-components/BarChart";
import PieChart from "./components/custom-chart-components/PieChart";
const X_VARIABLE = "emissions_quantity_avoided";
const Y_VARIABLE = "asset_id";
const COLOR_VARIABLE = "gap";
const margin = { top: 20, right: 20, bottom: 30, left: 40 };
const topNumber = 100;
const SORT_VARIABLE = "emissions_quantity_avoided";
const SORTED_DATA = data.sort((a, b) => +b[SORT_VARIABLE] - +a[SORT_VARIABLE]);

const top100Emitting = new Set(
  [...SORTED_DATA]
    .sort(
      (a, b) =>
        Number(b.emissions_quantity) - Number(a.emissions_quantity) ||
        a.asset_id.localeCompare(b.asset_id)
    )
    .slice(0, topNumber)
    .map((d) => d.asset_id)
);

const top100AnnexIds = new Set(
  [...SORTED_DATA.filter((d) => (d["annexOrNot"] == "true" ? true : false))]
    .sort(
      (a, b) =>
        Number(b.emissions_quantity) - Number(a.emissions_quantity) ||
        a.asset_id.localeCompare(b.asset_id)
    )
    .slice(0, topNumber)
    .map((d) => d.asset_id)
);

SORTED_DATA.forEach((d, i) => {
  d[SORT_VARIABLE] = +d[SORT_VARIABLE];
  d["emissions_quantity"] = +d["emissions_quantity"];
  d["lat"] = +d["lat"];
  d["lon"] = +d["lon"];
  d["annexOrNot"] = d["annexOrNot"] == "true" ? true : false;
  d.top100OrNot = i < topNumber;
  d.top100Emitting = top100Emitting.has(d.asset_id);
  d.top100InAnnex = top100AnnexIds.has(d.asset_id);
});

const TotalNumberOfBars = 200;
const filteredData = SORTED_DATA.slice(0, TotalNumberOfBars);
const radiusScale = d3
  .scaleSqrt()
  .domain(d3.extent(SORTED_DATA, (d) => +d[X_VARIABLE]))
  .range([3, 30]);

// Color related
const defaultColor = "hsla(0, 0%, 65%, 0.2)";
const highlightColor = "hsla(68, 73%, 48%, 0.5)";
const strokeColor = "hsla(68, 73%, 48%, 1.0)";

// Move your current App component content into a new LandfillView component
function LandfillView() {
  const { parentRef } = useParentSize();
  const [sliderValue, setSliderValue] = useState([33]);
  const { width: screenWidth } = useScreenSize();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  // This callback fires when a Step hits the offset threshold. It receives the
  // data prop of the step, which in this demo stores the index of the step.
  const onStepEnter = ({ data }) => {
    console.log("Step entered:", data);
    if (data > 0) {
      setCurrentStepIndex(data);
    }
  };

  const onStepExit = ({ data }) => {
    console.log("Step exited:", data);
  };

  const onStepProgress = ({ progress }) => {
    // console.log("Step progress:", progress);
  };

  return (
    <>
      <div
        className="absolute top-[10px] z-[9999999999999] "
        style={{ left: `${margin.left}px` }}
      >
        <ClimateTraceHeader />
      </div>
      <div className=" relative bg-[#EBE6E6]">
        <HeaderArticle shadowColor={defaultColor} />

        <main className="flex flex-col ">
          <div className=" relative ">
            {/* sticky content starts */}
            {/* NOTE: Sticky Map Container */}
            <div className="sticky w-full h-screen top-0 overflow-hidden flex flex-col items-center justify-center z-[1000000] ">
              {/* I'm sticky. The current triggered step index is: {currentStepIndex} */}
              {/* <Slider
                className="w-full"
                defaultValue={[1]}
                max={1}
                step={0.1}
                onValueChange={(value) => setSliderValue(value)}
              /> */}
              {currentStepIndex >= 1 && (
                <>
                  <section
                    className="absolute top-[100px]  max-w-[34vw] h-screen"
                    style={{ left: `${margin.left}px` }}
                  >
                    {/* <VisibleTextBlock
                      currentStepCondition={
                        STEP_METADATA[currentStepIndex]?.sideText
                      }
                    /> */}
                    <div
                      className="w-[300px] h-[120px] text-lg tracking-tight leading-tight font-thin"
                      style={{
                        display: STEP_METADATA[currentStepIndex]?.sideText
                          ? "block"
                          : "none",
                      }}
                    >
                      {STEP_METADATA[currentStepIndex]?.sideText}
                      <h2 className="text-[2rem] font-semibold mt-2">
                        {STEP_METADATA[currentStepIndex]?.bigNumber}
                      </h2>
                    </div>

                    <div
                      className="absolute  left-0"
                      style={{
                        bottom:
                          currentStepIndex >= 8
                            ? screenWidth >= 1440
                              ? // big screen  bar chart
                                "calc(11vh + 300px)"
                              : // small screen  bar chart
                                "calc(45vh)"
                            : screenWidth >= 1440
                            ? // big screen no bar
                              "calc(11vh + 100px)"
                            : // small screen no bar
                              "calc(33vh)",
                      }}
                    >
                      <Legend
                        highlightColor={highlightColor}
                        defaultColor={defaultColor}
                        currentStepIndex={currentStepIndex}
                      />
                    </div>
                  </section>
                </>
              )}
              ,
              {/* 
            <h2
              className="z-[100] mt-4 text-xl font-semibold"
              style={{ display: currentStepIndex == 0 ? "none" : "block" }}
            >
              {STEP_METADATA[currentStepIndex]?.label}
            </h2> */}
              <figure
                ref={parentRef}
                className="w-full h-full z-[0] overflow-hidden absolute right-0 top-0"
              >
                <ParentSize>
                  {({ width, height }) => {
                    return (
                      <DeckglMap
                        data={SORTED_DATA.slice().sort((a, b) =>
                          d3.ascending(
                            a.emissions_quantity_avoided,
                            b.emissions_quantity_avoided
                          )
                        )}
                        colorVariable={COLOR_VARIABLE}
                        xVariable={X_VARIABLE}
                        yVariable={Y_VARIABLE}
                        width={width}
                        height={height}
                        currentStepIndex={currentStepIndex}
                        highlightColor={hslaToRGBA(highlightColor)}
                        defaultColor={hslaToRGBA(defaultColor)}
                        strokeColor={hslaToRGBA(strokeColor)}
                        radiusScale={radiusScale}
                        currentStepCondition={STEP_METADATA[currentStepIndex]}
                        screenWidth={screenWidth}
                      />
                    );
                  }}
                </ParentSize>
              </figure>
              {/* NOTE: Bottom Bar Chart Container */}
              <div
                style={{ display: currentStepIndex >= 3 ? "flex" : "none" }}
                className="h-[30vh] w-full absolute bottom-0 left-0 justify-center items-center"
              >
                <figure className="h-full w-full bg-[hsla(195, 10%, 100%, 0.582)] box-shadow-[0_0_10px_0_rgba(0,0,0,0.1)] rounded-md z-[50]">
                  {currentStepIndex >= 8 && (
                    <ParentSize>
                      {({ width, height }) => (
                        <BarChart
                          width={width}
                          height={height}
                          data={filteredData}
                          fillCondition={
                            STEP_METADATA[currentStepIndex]?.condition
                          }
                          xVariable={Y_VARIABLE}
                          yVariable={X_VARIABLE}
                          defaultColor={defaultColor.replace(
                            /(\d?\.?\d+)\)$/,
                            ".3)"
                          )}
                          highlightColor={highlightColor.replace(
                            /(\d?\.?\d+)\)$/,
                            "1)"
                          )}
                          margin={margin}
                        />
                      )}
                    </ParentSize>
                  )}
                </figure>
              </div>
            </div>

            {/* sticky content ends */}
            {/* NOTE: Steps Container: flowing text */}
            <div className="relative z-[99999999] mt-[-100vh] w-full">
              <Scrollama
                offset={0.5}
                onStepEnter={onStepEnter}
                onStepExit={onStepExit}
                onStepProgress={onStepProgress}
              >
                {Object.values(STEP_METADATA).map((stepblock, stepIndex) => (
                  <Step data={stepIndex} key={stepIndex}>
                    <div
                      style={{
                        paddingTop: `${stepIndex == 0 ? "100vh" : "0vh"}`,
                        paddingBottom: "100vh",
                        opacity: stepblock.text ? 1 : 0,
                      }}
                      id="g-header-container"
                      className="justify-center items-center w-[45%] mx-auto"
                    >
                      <section
                        id="interactive-header"
                        className=" h-[40vh]  flex flex-col justify-center items-center"
                      >
                        {/* <h1
                        id="interactive-heading"
                        data-testid="headline"
                        className="text-[3rem] font-semibold tracking-widest"
                      >
                        Methane Matters
                      </h1> */}
                        {/* <h2 className="text-[#42959D] text-[2rem]">
                        {STEP_METADATA[stepIndex]?.label}
                      </h2> */}
                        <p
                          id="interactive-leadin"
                          data-testid="interactive-leadin"
                          className="lg:text-xl text-left leading-tight"
                        >
                          {STEP_METADATA[stepIndex]?.text}
                        </p>
                      </section>
                    </div>
                  </Step>
                ))}
              </Scrollama>
            </div>
          </div>

          <section className="h-[110vh] w-screen bg-[#EBE6E6] pt-[10vh] flex flex-col justify-center items-center ">
            <div className="max-w-[650px] m-auto">
              <h1 className="text-[2rem] font-semibold leading-widest  text-center">
                Conclusion: Optimizing for Impact
              </h1>
              <p className="mt-8 text-left">
                These scenarios in the Waste sector demonstrate that effective
                climate action is best served with emissionality – focusing
                globally based on impact, rather than prioritizing local action
                and large emissions sources.
              </p>
              <div className="flex-grow  flex justify-center items-center">
                {/* {top100Conditions.map((d, i) => ( */}
                <figure
                  className="w-full max-w-[850px] h-[40vh]"
                  style={{ height: screenWidth < 1440 ? "30vh" : "40vh" }}
                >
                  <ParentSize>
                    {({ width, height }) => (
                      <BarChart
                        width={width}
                        height={height}
                        data={[
                          {
                            asset_id: "Global Most Impactful Landfills",
                            emissions_quantity_avoided: 3.7,
                          },
                          // {
                          //   asset_id: "Annex 1 Most Impactful Landfills",
                          //   emissions_quantity_avoided: 2.2,
                          // },
                          {
                            asset_id: "Annex 1 Largest Landfills",
                            emissions_quantity_avoided: 1.3,
                          },
                        ]}
                        xVariable="emissions_quantity_avoided"
                        yVariable="asset_id"
                        horizontal={true}
                        fill={defaultColor.replace(/(\d?\.?\d+)\)$/, "1)")}
                        yAxisAnnotations={true}
                        margin={{ top: 20, right: 20, bottom: 30, left: 250 }}
                        defaultColor="hsla(0, 0%, 78%, 1.0)"
                      />
                    )}
                  </ParentSize>
                </figure>
                {/* ))} */}
              </div>
              <p className="mt-8 text-left">
                In the scenarios above, wealthy country donors employing
                emissionality (a global, impact-focused approach) would reduce
                2.8x more emissions for the same investment of resources. This
                is similar to results Climate TRACE finds in other sectors and
                scenarios. For example, corporations will often see a multiple
                on their impact per investment employing emissionality rather
                than a localized approach to decarbonizing their operational
                footprint and supply chain.
                <br></br> <br></br> Policymakers and decision makers whose goal
                is to drive maximum emissions reductions may wish to pursue
                policies of this kind.
              </p>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}

// Create a new App component that handles routing
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirect root to /landfill/ */}
        <Route path="/" element={<Navigate to="/landfill/" replace />} />
        {/* Main landfill view */}
        <Route path="/landfill/" element={<LandfillView />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
