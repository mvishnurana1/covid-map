import { useState } from "react";
import numbro from "numbro";
import { ICovidResponse, modeOptions } from "../../models/models";
import "./CountryCovidInfo.scss";

interface CovidInfoProps {
  covidData: ICovidResponse;
}

const CountryCovidInfo: React.FC<CovidInfoProps> = ({ covidData }) => {
  const [mode, setMode] = useState<modeOptions>(modeOptions.avg);

  if (!covidData) return;

  return (
    <>
      <div
        style={{
          padding: "1rem",
          textAlign: "center",
        }}
      >
        <img src={covidData.countryInfo.flag} width={"100px"} alt="" />
      </div>
      <div className="modes">
        <div
          className={mode == modeOptions.num ? "mode-button" : ""}
          onClick={() => setMode(modeOptions.num)}
        >
          Numbers
        </div>
        <div
          className={mode == modeOptions.avg ? "mode-button" : ""}
          onClick={() => setMode(modeOptions.avg)}
        >
          Averages
        </div>
      </div>
      <div className="flex-gap-1rem">
        <div className="text">Active per Million:</div>
        <div className="text">
          {numbro(covidData?.activePerOneMillion).format({
            thousandSeparated: mode != modeOptions.avg,
            average: mode == modeOptions.avg,
          })}
        </div>
      </div>
      <div className="flex-gap-1rem">
        <div className="text">Active Cases</div>
        <div className="text">
          {numbro(covidData?.active).format({
            thousandSeparated: mode != modeOptions.avg,
            average: mode == modeOptions.avg,
          })}
        </div>
      </div>
      <div className="flex-gap-1rem">
        <div className="text">Tests Conducted</div>
        <div className="text">
          {numbro(covidData?.tests).format({
            thousandSeparated: mode != modeOptions.avg,
            average: mode == modeOptions.avg,
          })}
        </div>
      </div>
      <div className="flex-gap-1rem">
        <div className="text">Deaths per Million</div>
        <div className="text">
          {numbro(covidData?.deathsPerOneMillion).format({
            thousandSeparated: mode != modeOptions.avg,
            average: mode == modeOptions.avg,
          })}
        </div>
      </div>
      <div className="flex-gap-1rem">
        <div className="text">Deaths</div>
        <div className="text">
          {numbro(covidData?.deaths).format({
            thousandSeparated: mode != modeOptions.avg,
            average: mode == modeOptions.avg,
          })}
        </div>
      </div>
      <div className="flex-gap-1rem">
        <div className="text">Country population</div>
        <div className="text">
          {numbro(covidData?.population).format({
            thousandSeparated: mode != modeOptions.avg,
            average: mode == modeOptions.avg,
          })}
        </div>
      </div>
    </>
  );
};

export default CountryCovidInfo;
