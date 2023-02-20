import React from "react";
import "./AdminUser.scss";

import AdminService from "../../../../services/AdminService";

import Pagination from "@material-ui/lab/Pagination";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import Snackbar from "@material-ui/core/Snackbar";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";

import FusionCharts from "fusioncharts";
import Charts from "fusioncharts/fusioncharts.charts";
import ReactFC from "react-fusioncharts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";

ReactFC.fcRoot(FusionCharts, Charts, FusionTheme);

const chartConfigs = {
  type: "column2d",
  width: 500,
  height: 330,
  dataFormat: "json",
  dataSource: {
    chart: {
      caption: "Vehicle Rentel System",
      subCaption: "Display Graph Base On Pending Data",
      xAxisName: "Month",
      yAxisName: "Booking",
      numberSuffix: "",
      theme: "fusion",
    },
    data: [],
  },
};

const chartConfigs1 = {
  type: "column2d",
  width: 500,
  height: 330,
  dataFormat: "json",
  dataSource: {
    chart: {
      caption: "Vehicle Rentel System",
      subCaption: "Display Graph Base On Cancel Data",
      xAxisName: "Month",
      yAxisName: "Booking",
      numberSuffix: "",
      theme: "fusion",
    },
    data: [],
  },
};

const chartConfigs2 = {
  type: "column2d",
  width: 500,
  height: 330,
  dataFormat: "json",
  dataSource: {
    chart: {
      caption: "Vehicle Rentel System",
      subCaption: "Display Graph Base On Accept Data",
      xAxisName: "Month",
      yAxisName: "Booking",
      numberSuffix: "",
      theme: "fusion",
    },
    data: [],
  },
};

const chartConfigs3 = {
  type: "column2d",
  width: 500,
  height: 330,
  dataFormat: "json",
  dataSource: {
    chart: {
      caption: "Vehicle Rentel System",
      subCaption: "Display Graph Base On Reject Data",
      xAxisName: "Month",
      yAxisName: "Booking",
      numberSuffix: "",
      theme: "fusion",
    },
    data: [],
  },
};

const adminService = new AdminService();

export default function AdminUser() {
  const [PendingData, setPendingData] = React.useState({
    type: "column2d",
    width: 500,
    height: 330,
    dataFormat: "json",
    dataSource: {
      chart: {
        caption: "Vehicle Rentel System",
        subCaption: "Display Graph Base On Pending Status Data",
        xAxisName: "Month",
        yAxisName: "Booking",
        numberSuffix: "",
        theme: "fusion",
      },
      data: [
        // {
        //   label: "Jan",
        //   value: 0,
        // },
        // {
        //   label: "Feb",
        //   value: 1,
        // },
        // {
        //   label: "Mar",
        //   value: 0,
        // },
        // {
        //   label: "Apr",
        //   value: 0,
        // },
        // {
        //   label: "May",
        //   value: 0,
        // },
        // {
        //   label: "June",
        //   value: 0,
        // },
        // {
        //   label: "July",
        //   value: 0,
        // },
        // {
        //   label: "Aug",
        //   value: 0,
        // },
        // {
        //   label: "Sep",
        //   value: 0,
        // },
        // {
        //   label: "Oct",
        //   value: 0,
        // },
        // {
        //   label: "Nov",
        //   value: 0,
        // },
        // {
        //   label: "Dec",
        //   value: 0,
        // },
      ],
    },
  });
  const [SuccessData, setSuccessData] = React.useState({
    type: "column2d",
    width: 500,
    height: 330,
    dataFormat: "json",
    dataSource: {
      chart: {
        caption: "Vehicle Rentel System",
        subCaption: "Display Graph Base On Success Status Data",
        xAxisName: "Month",
        yAxisName: "Booking",
        numberSuffix: "",
        theme: "fusion",
      },
      data: [
        // {
        //   label: "Jan",
        //   value: 0,
        // },
        // {
        //   label: "Feb",
        //   value: 1,
        // },
        // {
        //   label: "Mar",
        //   value: 0,
        // },
        // {
        //   label: "Apr",
        //   value: 0,
        // },
        // {
        //   label: "May",
        //   value: 0,
        // },
        // {
        //   label: "June",
        //   value: 0,
        // },
        // {
        //   label: "July",
        //   value: 0,
        // },
        // {
        //   label: "Aug",
        //   value: 0,
        // },
        // {
        //   label: "Sep",
        //   value: 0,
        // },
        // {
        //   label: "Oct",
        //   value: 0,
        // },
        // {
        //   label: "Nov",
        //   value: 0,
        // },
        // {
        //   label: "Dec",
        //   value: 0,
        // },
      ],
    },
  });
  const [RejectData, setRejectData] = React.useState({
    type: "column2d",
    width: 500,
    height: 330,
    dataFormat: "json",
    dataSource: {
      chart: {
        caption: "Vehicle Rentel System",
        subCaption: "Display Graph Base On Reject Status Data",
        xAxisName: "Month",
        yAxisName: "Booking",
        numberSuffix: "",
        theme: "fusion",
      },
      data: [
        // {
        //   label: "Jan",
        //   value: 0,
        // },
        // {
        //   label: "Feb",
        //   value: 1,
        // },
        // {
        //   label: "Mar",
        //   value: 0,
        // },
        // {
        //   label: "Apr",
        //   value: 0,
        // },
        // {
        //   label: "May",
        //   value: 0,
        // },
        // {
        //   label: "June",
        //   value: 0,
        // },
        // {
        //   label: "July",
        //   value: 0,
        // },
        // {
        //   label: "Aug",
        //   value: 0,
        // },
        // {
        //   label: "Sep",
        //   value: 0,
        // },
        // {
        //   label: "Oct",
        //   value: 0,
        // },
        // {
        //   label: "Nov",
        //   value: 0,
        // },
        // {
        //   label: "Dec",
        //   value: 0,
        // },
      ],
    },
  });
  const [CancelData, setCancelData] = React.useState({
    type: "column2d",
    width: 500,
    height: 330,
    dataFormat: "json",
    dataSource: {
      chart: {
        caption: "Vehicle Rentel System",
        subCaption: "Display Graph Base On Cancel Status Data",
        xAxisName: "Month",
        yAxisName: "Booking",
        numberSuffix: "",
        theme: "fusion",
      },
      data: [
        // {
        //   label: "Jan",
        //   value: 0,
        // },
        // {
        //   label: "Feb",
        //   value: 1,
        // },
        // {
        //   label: "Mar",
        //   value: 0,
        // },
        // {
        //   label: "Apr",
        //   value: 0,
        // },
        // {
        //   label: "May",
        //   value: 0,
        // },
        // {
        //   label: "June",
        //   value: 0,
        // },
        // {
        //   label: "July",
        //   value: 0,
        // },
        // {
        //   label: "Aug",
        //   value: 0,
        // },
        // {
        //   label: "Sep",
        //   value: 0,
        // },
        // {
        //   label: "Oct",
        //   value: 0,
        // },
        // {
        //   label: "Nov",
        //   value: 0,
        // },
        // {
        //   label: "Dec",
        //   value: 0,
        // },
      ],
    },
  });
  const [SnackBar, setSnackBar] = React.useState({
    openSnackBar: false,
    snackBarMessage: "",
  });

  React.useEffect(() => {
    GetGraph();
  }, []);

  const GetGraph = async () => {
    adminService
      .GetGraph()
      .then((data) => {
        console.log("GetGraph Pending Data : ", data.data.pendingData);
        chartConfigs.dataSource.data = data.data.pendingData;
        setPendingData({ ...PendingData, data: data.data.pendingData });
        console.log("GetGraph Cancel Data : ", data.data.cancelData);
        chartConfigs1.dataSource.data = data.data.cancelData;
        setCancelData({ ...CancelData, data: data.data.cancelData });
        console.log("GetGraph Success Data : ", data.data.successData);
        chartConfigs2.dataSource.data = data.data.successData;
        setSuccessData({ ...SuccessData, data: data.data.successData });
        console.log("GetGraph Reject Data : ", data.data.rejectData);
        chartConfigs3.dataSource.data = data.data.rejectData;
        setRejectData({ ...RejectData, data: data.data.rejectData });
      })
      .catch((error) => {
        console.error("GetGraph Error : ", error);
      });
  };

  const handleSnackBarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackBar({
      ...SnackBar,
      openSnackBar: false,
      snackBarMessage: "",
    });
  };

  return (
    <div className="adminStock-Container w-100 h-100">
      <div className="adminStock-SubContainer h-100 p-4 w-100 d-flex justify-content-center align-items-center">
        <div>
          <ReactFC {...chartConfigs} />
          <ReactFC {...chartConfigs1} />
        </div>
        <div>
          <ReactFC {...chartConfigs2} />
          <ReactFC {...chartConfigs3} />
        </div>
      </div>
    </div>
  );
}
