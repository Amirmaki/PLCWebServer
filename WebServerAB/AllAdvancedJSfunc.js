$(document).ready(function () {
    // prevent to read data back from browser cach
    $.ajaxSetup({ cache: false });
    read();
    // call oncee the read function
    LoadStatusData();

});
function read() {
    var mainPageName = document.location.href.match(/[^\/]+$/)[0];
    var ReadVariableFile = "";
    switch (mainPageName) {
        case "advancedA1.html":
            ReadVariableFile = "ReadVaribleA1advanced.html";
            break;
        case "advancedA2.html":
            ReadVariableFile = "ReadVaribleA2advanced.html";
            break;
        case "advancedB1.html":
            ReadVariableFile = "ReadVaribleB1advanced.html";
            break;
        case "advancedB2.html":
            ReadVariableFile = "ReadVaribleB2advanced.html";
            break;
        case "advancedC1.html":
            ReadVariableFile = "ReadVaribleC1advanced.html";
            break;
        case "advancedC2.html":
            ReadVariableFile = "ReadVaribleC2advanced.html";
            break;

    }

    $.post(ReadVariableFile, 'no-data')
        .done(function (readData) {				// eventhandler in case of successfull read
            var data = $.parseJSON(readData);	// parse recived DATA into JSON Object
            deploy(data);
            console.log(data);				// call the deploy function
            setTimeout(read, 2000);				// call setTimout for cyclyc operation
        })
        .fail(function () {
            //        alert( "Network Problem. Press Ok to reload." );
            //         location.reload();
        });
}
function write(writeData) {
    var mainPageName = document.location.href.match(/[^\/]+$/)[0];

    var WriteVariableFile = "";
    switch (mainPageName) {
        case "advancedA1.html":
            WriteVariableFile = "WriteVaribleA1advanced.html";
            break;
        case "advancedA2.html":
            WriteVariableFile = "WriteVaribleA2advanced.html";
            break;
        case "advancedB1.html":
            WriteVariableFile = "WriteVaribleB1advanced.html";
            break;
        case "advancedB2.html":
            WriteVariableFile = "WriteVaribleB2advanced.html";
            break;
        case "advancedC1.html":
            WriteVariableFile = "WriteVaribleC1advanced.html";
            break;
        case "advancedC2.html":
            WriteVariableFile = "WriteVaribleC2advanced.html";
            break;

    }
    $.post(WriteVariableFile, writeData)
        .done(function (readData) {				// eventhandler in case of successfull read
            console.log("writeDone");
            var data = $.parseJSON(readData);	// parse recived DATA into JSON Object
            //    deploy(data);
            // call the deploy function
        });
}

function writeScenario(writeData) {
    var mainPageName = document.location.href.match(/[^\/]+$/)[0];
    var WriteVariableFile = "";
    switch (mainPageName) {
        case "advancedA1.html":
            WriteVariableFile = "ScenarioVariableA1.html";
            break;
        case "advancedA2.html":
            WriteVariableFile = "ScenarioVariableA2.html";
            break;
        case "advancedB1.html":
            WriteVariableFile = "ScenarioVariableB1.html";
            break;
        case "advancedB2.html":
            WriteVariableFile = "ScenarioVariableB2.html";
            break;
        case "advancedC1.html":
            WriteVariableFile = "ScenarioVariableC1.html";
            break;
        case "advancedC2.html":
            WriteVariableFile = "ScenarioVariableC2.html";
            break;
    }
    console.log(WriteVariableFile);
    $.post(WriteVariableFile, writeData)
        .done(function (readData) {				// eventhandler in case of successfull read
            console.log("writeDone!!");
            var data = $.parseJSON(readData);	// parse recived DATA into JSON Object
            //    deploy(data);
            // call the deploy function
        });
}
function GetDataFromPLCForScenario(ScenarioName) {
    var mainPageName = document.location.href.match(/[^\/]+$/)[0];
    var ReadVariableFile = "";
    switch (mainPageName) {
        case "advancedA1.html":
            ReadVariableFile = "ScenarioVariableA1.html";
            break;
        case "advancedA2.html":
            ReadVariableFile = "ScenarioVariableA2.html";
            break;
        case "advancedB1.html":
            ReadVariableFile = "ScenarioVariableB1.html";
            break;
        case "advancedB2.html":
            ReadVariableFile = "ScenarioVariableB2.html";
            break;
        case "advancedC1.html":
            ReadVariableFile = "ScenarioVariableC1.html";
            break;
        case "advancedC2.html":
            ReadVariableFile = "ScenarioVariableC2.html";
            break;
    }
    $.post(ReadVariableFile, 'no-data')
        .done(function (readData) {
            // eventhandler in case of successfull read
            var data = $.parseJSON(readData);	// parse recived DATA into JSON Object
            ShowDataFromPLCForScenario(ScenarioName, data);
        })
        .fail(function () {
            //        alert( "Network Problem. Press Ok to reload." );
            //         location.reload();
        });
}

function ShowDataFromPLCForScenario(ScenarioName, data) {
    switch (ScenarioName) {
        case "ScenarioA":
            ConveyerOnTime = PrepareTime(data.ConveyerOnTimeScenarioA);
            ConveyerOffTime = PrepareTime(data.ConveyerOffTimeScenarioA);
            SamplingTime = PrepareTime(data.SamplingTimeScenarioA);
            SamplingOpenTime = PrepareTime(data.SamplingOpenTimeScenarioA);
            FeederIntensity = data.FeederIntensityScenarioA;
            DurationBigSiloOff = PrepareTime(data.DurationBigSiloOffScenarioA);
            FeederDelayBeforeStopTime = PrepareTime(data.FeederDelayBeforeStopTimeScenarioA);
            FeederDelayAfterStartTime = PrepareTime(data.FeederDelayAfterStartTimeScenarioA);
            EmptyLineTime = PrepareTime(data.EmptyLineTimeScenarioA);
            break;
        case "ScenarioB":
            ConveyerOnTime = PrepareTime(data.ConveyerOnTimeScenarioB);
            ConveyerOffTime = PrepareTime(data.ConveyerOffTimeScenarioB);
            SamplingTime = PrepareTime(data.SamplingTimeScenarioB);
            SamplingOpenTime = PrepareTime(data.SamplingOpenTimeScenarioB);
            FeederIntensity = data.FeederIntensityScenarioB;
            DurationBigSiloOff = PrepareTime(data.DurationBigSiloOffScenarioB);
            FeederDelayBeforeStopTime = PrepareTime(data.FeederDelayBeforeStopTimeScenarioB);
            FeederDelayAfterStartTime = PrepareTime(data.FeederDelayAfterStartTimeScenarioB);
            EmptyLineTime = PrepareTime(data.EmptyLineTimeScenarioB);
            break;
        case "ScenarioC":
            ConveyerOnTime = PrepareTime(data.ConveyerOnTimeScenarioC);
            ConveyerOffTime = PrepareTime(data.ConveyerOffTimeScenarioC);
            SamplingTime = PrepareTime(data.SamplingTimeScenarioC);
            SamplingOpenTime = PrepareTime(data.SamplingOpenTimeScenarioC);
            FeederIntensity = data.FeederIntensityScenarioC;
            DurationBigSiloOff = PrepareTime(data.DurationBigSiloOffScenarioC);
            FeederDelayBeforeStopTime = PrepareTime(data.FeederDelayBeforeStopTimeScenarioC);
            FeederDelayAfterStartTime = PrepareTime(data.FeederDelayAfterStartTimeScenarioC);
            EmptyLineTime = PrepareTime(data.EmptyLineTimeScenarioC);
            break;
        case "ScenarioD":
            ConveyerOnTime = PrepareTime(data.ConveyerOnTimeScenarioD);
            ConveyerOffTime = PrepareTime(data.ConveyerOffTimeScenarioD);
            SamplingTime = PrepareTime(data.SamplingTimeScenarioD);
            SamplingOpenTime = PrepareTime(data.SamplingOpenTimeScenarioD);
            FeederIntensity = data.FeederIntensityScenarioD;
            DurationBigSiloOff = PrepareTime(data.DurationBigSiloOffScenarioD);
            FeederDelayBeforeStopTime = PrepareTime(data.FeederDelayBeforeStopTimeScenarioD);
            FeederDelayAfterStartTime = PrepareTime(data.FeederDelayAfterStartTimeScenarioD);
            EmptyLineTime = PrepareTime(data.EmptyLineTimeScenarioD);
            break;
        case "ScenarioE":
            ConveyerOnTime = PrepareTime(data.ConveyerOnTimeScenarioE);
            ConveyerOffTime = PrepareTime(data.ConveyerOffTimeScenarioE);
            SamplingTime = PrepareTime(data.SamplingTimeScenarioE);
            SamplingOpenTime = PrepareTime(data.SamplingOpenTimeScenarioE);
            FeederIntensity = data.FeederIntensityScenarioE;
            DurationBigSiloOff = PrepareTime(data.DurationBigSiloOffScenarioE);
            FeederDelayBeforeStopTime = PrepareTime(data.FeederDelayBeforeStopTimeScenarioE);
            FeederDelayAfterStartTime = PrepareTime(data.FeederDelayAfterStartTimeScenarioE);
            EmptyLineTime = PrepareTime(data.EmptyLineTimeScenarioE);
            break;
    }
    $('#DurationofBigSiloNonStartTimeInput').val(DurationBigSiloOff);
    $('#FeederDelayBeforeStopTimeInput').val(FeederDelayBeforeStopTime);
    $('#FeederDelayAfterStartTimeInput').val(FeederDelayAfterStartTime);
    $('#EmptyLineTimeInput').val(EmptyLineTime);
}
function deploy(data) {
    ShowEmergencyandFault(data.Emergency, data.FaultStatus);
    EnableManualShowStatus(data.EnableStatus, data.StartStatus, data.ManualStatus);
    StartConveyorShowStatus(data.ConveyorStatus);
    StartBigSiloShowStatus(data.BigSiloStatus);
    StartConveyorBelowShowStatus(data.BelowConveyor);
    StartFeederShowStatus(data.FeederStatus);
    StartSamplePneumaticShowStatus(data.SampleStatus);

    DurationBigSiloNonStartShowStatus(data.BigSiloStopTime);
    FeederDelayBeforeStopTimeShowTime(data.FeederDelayBeforeStopTime);
    FeederDelayAfterStartTimeShowTime(data.FeederDelayAfterStartTime);
    EmptyLineShowTime(data.EmptyLineTime);
}
function htmlDecodeEntities(value) {
    return (typeof value === 'undefined') ? '' : $('<div/>').html(value).text();
}
var statuscheck = false;

function LoadStatusData() {
    $('#ManualEnableButton').click(function () {
        var currentStatus = $("#ManualEnableStatus").text();
        if (currentStatus == "Disable") {
            write('"EnableManualVariable" = 1');
        }
        else {
            write('"EnableManualVariable" = 0');
        }
    });

    $('#ConveyorMotorStartButton').click(function () {
        var currentStatus = $("#ConveyorMotorStartStatus").text();
        if (currentStatus == "Stop") {
            write('"StartConveyorManualVariable" = 1');
        }
        else {
            write('"StartConveyorManualVariable" = 0');
        }
    });

    $('#BigSiloStartButton').click(function () {
        var currentStatus = $("#BigSiloStartStatus").text();
        if (currentStatus == "Stop") {
            write('"StartBigSiloManualVariable" = 1');
        }
        else {
            write('"StartBigSiloManualVariable" = 0');
        }
    });

    $('#ConveyorBelowStartButton').click(function () {
        var currentStatus = $("#ConveyorBelowStartStatus").text();
        if (currentStatus == "Stop") {
            write('"StartBelowConveyorStartVariable" = 1');
        }
        else {
            write('"StartBelowConveyorStartVariable" = 0');
        }
    });

    $('#FeederStartButton').click(function () {
        var currentStatus = $("#FeederStartStatus").text();
        if (currentStatus == "Stop") {
            write('"StartFeederVariable" = 1');
        }
        else {
            write('"StartFeederVariable" = 0');
        }
    });

    $('#SamplePneumaticStartButton').click(function () {
        var currentStatus = $("#SamplePneumaticStartStatus").text();
        if (currentStatus == "Stop") {
            write('"StartSampleManualVariable" = 1');
        }
        else {
            write('"StartSampleManualVariable" = 0');
        }
    });
    $('#ScenarioSelectInput').change(function () {
        var ScenarioSelectedName = $('#ScenarioSelectInput').val();
        GetDataFromPLCForScenario(ScenarioSelectedName);
    });

    $('#SetDatatoPLC').click(function () {
        var FeederDelayBeforeStopTimeInputText = $('#FeederDelayBeforeStopTimeInput').val();
        var FeederDelayAfterStartTimeInputText = $('#FeederDelayAfterStartTimeInput').val();
        var EmptyLineTimeInputText = $('#EmptyLineTimeInput').val();
        var DurationofBigSiloNonStartTimeInputText = $('#DurationofBigSiloNonStartTimeInput').val();

        write('"FeederDelayBeforeStopTime" = T#' + FeederDelayBeforeStopTimeInputText + 'S');
        write('"FeederDelayAfterStartTime" = T#' + FeederDelayAfterStartTimeInputText + 'S');
        write('"EmptyLineTime" = T#' + EmptyLineTimeInputText + 'S');
        write('"DurationofBigSiloNonStartTime" = T#' + DurationofBigSiloNonStartTimeInputText + 'S');

    });

    $('#SaveScenarioButton').click(function () {
        var FeederDelayBeforeStopTimeInputText = $('#FeederDelayBeforeStopTimeInput').val();
        var FeederDelayAfterStartTimeInputText = $('#FeederDelayAfterStartTimeInput').val();
        var EmptyLineTimeInputText = $('#EmptyLineTimeInput').val();
        var DurationofBigSiloNonStartTimeInputText = $('#DurationofBigSiloNonStartTimeInput').val();
        var ScenarioSelectedName = $('#ScenarioSelectInput').val();

        FeederDelayBeforeStopTimeInputText = FeederDelayBeforeStopTimeInputText.replace("M","");
        FeederDelayAfterStartTimeInputText = FeederDelayAfterStartTimeInputText.replace("M","");
        DurationofBigSiloNonStartTimeInputText = DurationofBigSiloNonStartTimeInputText.replace("M","");
        EmptyLineTimeInputText = EmptyLineTimeInputText.replace("M","");
        switch (ScenarioSelectedName) {
            case "ScenarioA":
                console.log("salam");
                writeScenario('"FeederDelayBeforeStopTimeScenarioA" = ' + FeederDelayBeforeStopTimeInputText);
                writeScenario('"FeederDelayAfterStartTimeScenarioA" = ' + FeederDelayAfterStartTimeInputText);
                writeScenario('"EmptyLineTimeScenarioA" = ' + EmptyLineTimeInputText);
                writeScenario('"DurationBigSiloOffScenarioA" = ' + DurationofBigSiloNonStartTimeInputText);
                break;
            case "ScenarioB":
                writeScenario('"FeederDelayBeforeStopTimeScenarioB" = ' + FeederDelayBeforeStopTimeInputText );
                writeScenario('"FeederDelayAfterStartTimeScenarioB" = ' + FeederDelayAfterStartTimeInputText);
                writeScenario('"EmptyLineTimeScenarioB" = ' + EmptyLineTimeInputText );
                writeScenario('"DurationBigSiloOffScenarioB" = ' + DurationofBigSiloNonStartTimeInputText );
                break;
            case "ScenarioC":
                writeScenario('"FeederDelayBeforeStopTimeScenarioC" = ' + FeederDelayBeforeStopTimeInputText );
                writeScenario('"FeederDelayAfterStartTimeScenarioC" = ' + FeederDelayAfterStartTimeInputText );
                writeScenario('"EmptyLineTimeScenarioC" = ' + EmptyLineTimeInputText );
                writeScenario('"DurationBigSiloOffScenarioC" = ' + DurationofBigSiloNonStartTimeInputText  );
                break;
            case "ScenarioD":
                writeScenario('"FeederDelayBeforeStopTimeScenarioD" = ' + FeederDelayBeforeStopTimeInputText );
                writeScenario('"FeederDelayAfterStartTimeScenarioD" = ' + FeederDelayAfterStartTimeInputText );
                writeScenario('"EmptyLineTimeScenarioD" = ' + EmptyLineTimeInputText );
                writeScenario('"DurationBigSiloOffScenarioD" = ' + DurationofBigSiloNonStartTimeInputText );
                break;
            case "ScenarioE":
                writeScenario('"FeederDelayBeforeStopTimeScenarioE" = ' + FeederDelayBeforeStopTimeInputText );
                writeScenario('"FeederDelayAfterStartTimeScenarioE" = ' + FeederDelayAfterStartTimeInputText );
                writeScenario('"EmptyLineTimeScenarioE" = ' + EmptyLineTimeInputText );
                writeScenario('"DurationBigSiloOffScenarioE" = ' + DurationofBigSiloNonStartTimeInputText );
                break;
        }
    });
}

function ShowEmergencyandFault(emergency, fault) {
    var emergencyStatus = htmlDecodeEntities(emergency);
    var faultStatus = htmlDecodeEntities(fault);
    if (emergencyStatus == '0') {
        $("#EmergencyStatus").hide();
        if (faultStatus == '0') {
            $("#FaultStatus").hide();
        }
        else {
            $("#FaultStatus").show();
            $("#FaultStatus").fadeOut(500);
            $("#FaultStatus").fadeIn(500);
        }
    }
    else {
        $("#FaultStatus").hide();
        $("#EmergencyStatus").show();
        $("#EmergencyStatus").fadeOut(500);
        $("#EmergencyStatus").fadeIn(500);
    }
}

function EnableManualShowStatus(Enable, start, Manual) {
    if (Enable == '0') {
        $('#ManualEnableStatus').text("Line Disabled");
        $('#ManualEnableButton').text("-----");
        DisableManualButton();
    }
    else {
        if (start == '1') {
            $('#ManualEnableStatus').text("Line Started");
            $('#ManualEnableButton').text("-----");
            DisableManualButton();
        }
        else {
            if (Manual == '0') {
                $('#ManualEnableStatus').text("Disable");
                $('#ManualEnableButton').text("Enable");
                $("#ManualEnableStatus").addClass("btn-danger");
                $("#ManualEnableStatus").removeClass("btn-success");
                DisableManualButton(true);
            }
            else {
                $("#ManualEnableStatus").text("Enable");
                $('#ManualEnableButton').text("Disable");
                $("#ManualEnableStatus").addClass("btn-success");
                $("#ManualEnableStatus").removeClass("btn-danger");
                EnableManualButton();
            }
        }
    }
}
function DisableManualButton(MainButton = false) {
    
    $("#ManualEnableButton").attr("disabled", "disabled");
    $("#ConveyorMotorStartButton").attr("disabled", "disabled");
    $("#BigSiloStartButton").attr("disabled", "disabled");
    $("#ConveyorBelowStartButton").attr("disabled", "disabled");
    $("#FeederStartButton").attr("disabled", "disabled");
    $("#SamplePneumaticStartButton").attr("disabled", "disabled");
    if (MainButton)
    {
        $("#ManualEnableButton").removeAttr("disabled");
    }
}
function EnableManualButton() {
    $("#ConveyorMotorStartButton").removeAttr("disabled");
    $("#BigSiloStartButton").removeAttr("disabled");
    $("#ConveyorBelowStartButton").removeAttr("disabled");
    $("#FeederStartButton").removeAttr("disabled");
    $("#SamplePneumaticStartButton").removeAttr("disabled");
}
function StartConveyorShowStatus(data) {
    var ConveyorShowStatus = htmlDecodeEntities(data);
    if (ConveyorShowStatus == '0') {
        $("#ConveyorMotorStartStatus").text("Stop");
        $("#ConveyorMotorStartButton").text("Start");
        $("#ConveyorMotorStartStatus").addClass("btn-danger");
        $("#ConveyorMotorStartStatus").removeClass("btn-success");
    }
    else {
        $("#ConveyorMotorStartStatus").text("Start");
        $("#ConveyorMotorStartButton").text("Stop");
        $("#ConveyorMotorStartStatus").addClass("btn-success");
        $("#ConveyorMotorStartStatus").removeClass("btn-danger");
    }
}

function StartBigSiloShowStatus(data) {
    var BigSiloShowStatus = htmlDecodeEntities(data);
    if (BigSiloShowStatus == '0') {
        $("#BigSiloStartStatus").text("Stop");
        $("#BigSiloStartButton").text("Start");
        $("#BigSiloStartStatus").addClass("btn-danger");
        $("#BigSiloStartStatus").removeClass("btn-success");
    }
    else {
        $("#BigSiloStartStatus").text("Start");
        $("#BigSiloStartButton").text("Stop");
        $("#BigSiloStartStatus").addClass("btn-success");
        $("#BigSiloStartStatus").removeClass("btn-danger");
    }
}


function StartConveyorBelowShowStatus(data) {
    var ConveyorBelowShowStatus = htmlDecodeEntities(data);
    if (ConveyorBelowShowStatus == '0') {
        $("#ConveyorBelowStartStatus").text("Stop");
        $("#ConveyorBelowStartButton").text("Start");
        $("#ConveyorBelowStartStatus").addClass("btn-danger");
        $("#ConveyorBelowStartStatus").removeClass("btn-success");
    }
    else {
        $("#ConveyorBelowStartStatus").text("Start");
        $("#ConveyorBelowStartButton").text("Stop");
        $("#ConveyorBelowStartStatus").addClass("btn-success");
        $("#ConveyorBelowStartStatus").removeClass("btn-danger");
    }
}

function StartFeederShowStatus(data) {
    var FeederShowStatus = htmlDecodeEntities(data);
    if (FeederShowStatus == '0') {
        $("#FeederStartStatus").text("Stop");
        $("#FeederStartButton").text("Start");
        $("#FeederStartStatus").addClass("btn-danger");
        $("#FeederStartStatus").removeClass("btn-success");
    }
    else {
        $("#FeederStartStatus").text("Start");
        $("#FeederStartButton").text("Stop");
        $("#FeederStartStatus").addClass("btn-success");
        $("#FeederStartStatus").removeClass("btn-danger");
    }
}

function StartSamplePneumaticShowStatus(data) {
    var pneumaticShowStatus = htmlDecodeEntities(data);
    if (pneumaticShowStatus == '0') {
        $("#SamplePneumaticStartStatus").text("Stop");
        $("#SamplePneumaticStartButton").text("Start");
        $("#SamplePneumaticStartStatus").addClass("btn-danger");
        $("#SamplePneumaticStartStatus").removeClass("btn-success");
    }
    else {
        $("#SamplePneumaticStartStatus").text("Start");
        $("#SamplePneumaticStartButton").text("Stop");
        $("#SamplePneumaticStartStatus").addClass("btn-success");
        $("#SamplePneumaticStartStatus").removeClass("btn-danger");
    }
}

function DurationBigSiloNonStartShowStatus(data) {
    var DuratioBigSiloTime = htmlDecodeEntities(data).replace(/\_/g, ':');
    DuratioBigSiloTime = DuratioBigSiloTime.replace('T#', '');
    $("#DurationofBigSiloNonStartTimeShow").text(DuratioBigSiloTime);
}

function FeederDelayBeforeStopTimeShowTime(data) {
    var FeederDelayBeforeStop = htmlDecodeEntities(data).replace(/\_/g, ':');
    FeederDelayBeforeStop = FeederDelayBeforeStop.replace('T#', '');
    $("#FeederDelayBeforeStopTimeShow").text(FeederDelayBeforeStop);
}

function FeederDelayAfterStartTimeShowTime(data) {
    var DelayAfterStart = htmlDecodeEntities(data).replace(/\_/g, ':');
    DelayAfterStart = DelayAfterStart.replace('T#', '');
    $("#FeederDelayAfterStartTimeShow").text(DelayAfterStart);
}

function EmptyLineShowTime(data) {
    var EmptyLine = htmlDecodeEntities(data).replace(/\_/g, ':');
    EmptyLine = EmptyLine.replace('T#', '');
    $("#EmptyLineTimeShow").text(EmptyLine);
}
function PrepareTime(Time) {
    var newTime = Time + "M";
    return newTime;
}