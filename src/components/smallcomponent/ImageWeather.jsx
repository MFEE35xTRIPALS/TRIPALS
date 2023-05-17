import React, { useRef, useState, useEffect } from "react";
import axios from "axios";

const ImageWeather = (props) => {
  // console.log(props.openDataa.records.locations[0].location.filter(value=>value.locationName==props.ID)[0].weatherElement[8]);
  // console.log(
  //   props.openDataa.records.locations[0].location.filter(
  //     (value) => value.locationName == props.ID
  //   )[0].weatherElement[6]
  // );
  //引用父元件svg  父元件設定:ref{svgRef}
  const svgRef = props.svgRef;
  // console.log(svgRef);

  //Day本日 TMR明日 AfterTMR後天
  //低溫State
  const [DayMinTemperature, setDayMinTemperature] = useState(
    props.openDataa.records.locations[0].location.filter(
      (value) => value.locationName == props.ID
    )[0].weatherElement[8].time[0].elementValue[0].value
  );
  const [TMRMinTemperature, setTMRMinTemperature] = useState(
    props.openDataa.records.locations[0].location.filter(
      (value) => value.locationName == props.ID
    )[0].weatherElement[8].time[2].elementValue[0].value
  );
  const [AfterTMRMinTemperature, setAfterTMRMinTemperature] = useState(
    props.openDataa.records.locations[0].location.filter(
      (value) => value.locationName == props.ID
    )[0].weatherElement[8].time[4].elementValue[0].value
  );

  //高溫State
  const [DayMaxTemperature, setDayMaxTemperature] = useState(
    props.openDataa.records.locations[0].location.filter(
      (value) => value.locationName == props.ID
    )[0].weatherElement[12].time[0].elementValue[0].value
  );
  const [TMRMaxTemperature, setTMRMaxTemperature] = useState(
    props.openDataa.records.locations[0].location.filter(
      (value) => value.locationName == props.ID
    )[0].weatherElement[12].time[2].elementValue[0].value
  );
  const [AfterTMRMaxTemperature, setAfterTMRMaxTemperature] = useState(
    props.openDataa.records.locations[0].location.filter(
      (value) => value.locationName == props.ID
    )[0].weatherElement[12].time[4].elementValue[0].value
  );

  //降雨機率
  const [DayRain, setDayRain] = useState(
    props.openDataa.records.locations[0].location.filter(
      (value) => value.locationName == props.ID
    )[0].weatherElement[0].time[0].elementValue[0].value
  );
  const [TMRRain, setTMRRain] = useState(
    props.openDataa.records.locations[0].location.filter(
      (value) => value.locationName == props.ID
    )[0].weatherElement[0].time[2].elementValue[0].value
  );
  const [AfterTMRRain, setAfterTMRRain] = useState(
    props.openDataa.records.locations[0].location.filter(
      (value) => value.locationName == props.ID
    )[0].weatherElement[0].time[4].elementValue[0].value
  );

  //天氣因子icon
  const [DayWeatherIcon, setDayWeatherIcon] = useState(
    props.openDataa.records.locations[0].location.filter(
      (value) => value.locationName == props.ID
    )[0].weatherElement[6].time[0].elementValue[1].value
  );
  const [TMRWeatherIcon, setTMRWeatherIcon] = useState(
    props.openDataa.records.locations[0].location.filter(
      (value) => value.locationName == props.ID
    )[0].weatherElement[6].time[2].elementValue[1].value
  );
  const [AfterTMRWeatherIcon, setAfterTMRWeatherIcon] = useState(
    props.openDataa.records.locations[0].location.filter(
      (value) => value.locationName == props.ID
    )[0].weatherElement[6].time[4].elementValue[1].value
  );

  //城市圖片
  const [MyImage, setMyImage] = useState(
    props.pictureDataa.counties.filter((value) => value.cityName == props.ID)[0]
      .Picture1
  );
  // console.log(MyImage);

  //城市名稱
  const [TaiwanCityName, setTaiwanCityName] = useState(props.ID);

  //-----------------------------
  //全域變數

  // let PictureData = null;
  let openData = null;

  //-----------------------------
  //載入openData

  // useEffect(() => {
  //   axios.get('https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-091', {
  //     params: {
  //       Authorization: 'CWB-48477E54-C467-48A6-A65F-01F95D41D98D',
  //       format: 'JSON',
  //       sort: 'time'
  //     }
  //   })
  //     .then(function (response) {
  //       console.log(response.data);
  //       openData = response.data;
  //       console.log("JSON載入成功");
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // }, []);

  //-----------------------------
  //載入圖片JSON
  //檔案位置 : public

  // useEffect(() => {
  //   axios.get('./TaiwanPictrue.json')
  //     .then(function (response) {
  //       PictureData = response.data;

  //       console.log(response.data);

  //       console.log("圖片本地JSON載入成功");
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // }, []);

  //-----------------------------
  //滑鼠移入function

  const handleCityEnter = (event) => {
    const id = event.target.getAttribute("id"); // pathEnter Get svg id
    // console.log(id);
    //-----------------------------
    //天氣資料
    if (props.openDataa) {
      props.openDataa.records.locations[0].location.forEach(function (
        cityData
      ) {
        if (cityData.locationName === id) {
          const DayMin =
            cityData.weatherElement[8].time[0].elementValue[0].value;
          const TMRMin =
            cityData.weatherElement[8].time[1].elementValue[0].value;
          const AfterTMRMin =
            cityData.weatherElement[8].time[2].elementValue[0].value;

          const DayMax =
            cityData.weatherElement[12].time[0].elementValue[0].value;
          const TMRMax =
            cityData.weatherElement[12].time[1].elementValue[0].value;
          const AfterTMRMax =
            cityData.weatherElement[12].time[2].elementValue[0].value;

          const DayRain =
            cityData.weatherElement[0].time[0].elementValue[0].value; //今天降雨機率
          const TMRRain =
            cityData.weatherElement[0].time[1].elementValue[0].value; //明天降雨機率
          const AfterTMRRain =
            cityData.weatherElement[0].time[2].elementValue[0].value; //後天降雨機率

          const Dayweather =
            cityData.weatherElement[6].time[0].elementValue[1].value; //今天天氣因子
          const TMRweather =
            cityData.weatherElement[6].time[2].elementValue[1].value; //今天天氣因子
          const AfterTMRweather =
            cityData.weatherElement[6].time[4].elementValue[1].value; //今天天氣因子

          setDayMinTemperature(DayMin);
          setTMRMinTemperature(TMRMin);
          setAfterTMRMinTemperature(AfterTMRMin);

          setDayMaxTemperature(DayMax);
          setTMRMaxTemperature(TMRMax);
          setAfterTMRMaxTemperature(AfterTMRMax);

          setDayRain(DayRain);
          setTMRRain(TMRRain);
          setAfterTMRRain(AfterTMRRain);

          setDayWeatherIcon(Dayweather);
          setTMRWeatherIcon(TMRweather);
          setAfterTMRWeatherIcon(AfterTMRweather);

          return;
        }
      });
    }
    //-----------------------------
    //圖片資料
    if (props.pictureDataa) {
      props.pictureDataa.counties.forEach(function (county) {
        // console.log(county.cityName);
        if (county.cityName === id) {
          setMyImage(county.Picture1);
          setTaiwanCityName(county.cityName);
          // console.log(county.Picture1);
          return;
        }
      });
    }
  };
  //-----------------------------------------------
  //天氣icon
  var weatherIcon = "";

  const sunnyWeather = ["01"];
  const sunnyCloudyWeather = ["02", "03"];
  const cloudyWeather = ["04", "05", "06", "07"];
  const showerWeather = [
    "08",
    "09",
    "11",
    "12",
    "13",
    "19",
    "20",
    "21",
    "22",
    "29",
    "30",
  ];
  const rainyWeather = ["14", "15", "16", "17", "18"];

  switch (true) {
    case sunnyWeather.includes(DayWeatherIcon):
    case sunnyWeather.includes(TMRWeatherIcon):
    case sunnyWeather.includes(AfterTMRWeatherIcon):
      // 太陽
      weatherIcon = `fas fa-sun`;
      break;
    case sunnyCloudyWeather.includes(DayWeatherIcon):
    case sunnyCloudyWeather.includes(TMRWeatherIcon):
    case sunnyCloudyWeather.includes(AfterTMRWeatherIcon):
      // 多雲時晴
      weatherIcon = `fa-solid fa-cloud-sun`;
      break;
    case cloudyWeather.includes(DayWeatherIcon):
    case cloudyWeather.includes(TMRWeatherIcon):
    case cloudyWeather.includes(AfterTMRWeatherIcon):
      // 多雲
      weatherIcon = `fas fa-smog`;
      break;
    case showerWeather.includes(DayWeatherIcon):
    case showerWeather.includes(TMRWeatherIcon):
    case showerWeather.includes(AfterTMRWeatherIcon):
      // 短暫陣雨
      weatherIcon = `fas fa-cloud-showers-heavy`;
      break;
    case rainyWeather.includes(DayWeatherIcon):
    case rainyWeather.includes(TMRWeatherIcon):
    case rainyWeather.includes(AfterTMRWeatherIcon):
      // 下雨
      weatherIcon = `fas fa-cloud-rain`;
      break;
  }

  // 降雨機率(雨傘)
  var RainIcon = `fa-solid fa-umbrella `;

  //-----------------------------
  //滑鼠離開
  const handleCityLeave = () => {
    setDayMinTemperature("");
    setTMRMinTemperature("");
    setAfterTMRMinTemperature("");

    setDayMaxTemperature("");
    setTMRMaxTemperature("");
    setAfterTMRMaxTemperature("");

    setDayRain("");
    setTMRRain("");
    setAfterTMRRain("");

    setDayWeatherIcon("");
    setTMRWeatherIcon("");
    setAfterTMRWeatherIcon("");

    setMyImage("");
  };
  function handleCityClick(e) {
    // console.log(e.target.dataset.city);
    sessionStorage.setItem("city", e.target.dataset.city);
    window.location = "/Guides";
  }

  //-----------------------------
  //遍歷path加入監聽事件
  useEffect(() => {
    const paths = svgRef.current.querySelectorAll("path");

    paths.forEach((path) => {
      const city = path.getAttribute("id");
      path.addEventListener("click", handleCityClick);
      path.addEventListener("mouseenter", handleCityEnter);
      path.addEventListener("mouseleave", handleCityLeave);
    });

    return () => {
      paths.forEach((path) => {
        path.removeEventListener("mouseenter", handleCityEnter);
        path.removeEventListener("mouseleave", handleCityLeave);
      });
    };
  }, []);

  return (
    <div>
      <div className="CityImage">
        <div className="CityImageName">{TaiwanCityName}</div>
        <img src={MyImage} alt="" />
        <hr />
      </div>

      <div className="CityWeather">
        <p>
          今天&nbsp;&nbsp; <i className={weatherIcon}></i>&nbsp;&nbsp;
          {DayMinTemperature} °C ~ {DayMaxTemperature} °C &nbsp;&nbsp;{" "}
          <i className={RainIcon}></i>
          {DayRain}%
        </p>
        <p>
          明天&nbsp;&nbsp; <i className={weatherIcon}></i>&nbsp;&nbsp;
          {TMRMinTemperature} °C ~ {TMRMaxTemperature} °C &nbsp;&nbsp;{" "}
          <i className={RainIcon}></i>
          {TMRRain}%
        </p>
        <p>
          後天&nbsp;&nbsp; <i className={weatherIcon}></i>&nbsp;&nbsp;
          {AfterTMRMinTemperature} °C ~ {AfterTMRMaxTemperature} °C &nbsp;&nbsp;{" "}
          <i className={RainIcon}></i>
          {AfterTMRRain}%
        </p>
      </div>
    </div>
  );
};

export default ImageWeather;
