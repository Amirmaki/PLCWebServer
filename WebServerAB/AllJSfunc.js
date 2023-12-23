
$(document).ready(function () {

    // prevent to read data back from browser cach
    $.ajaxSetup({ cache: false });
    // CheckPLCConnection();
    read();
    // call oncee the read function
    LoadStatusData();
});

function read() {
    var mainPageName = document.location.href.match(/[^\/]+$/)[0];
    var ReadVariableFile = "";
    switch (mainPageName) {
        case "indexA1.html":
            ReadVariableFile = "ReadVariableA1.html";
            break;
        case "indexA2.html":
            ReadVariableFile = "ReadVariableA2.html";
            break;
        case "indexB1.html":
            ReadVariableFile = "ReadVariableB1.html";
            break;
        case "indexB2.html":
            ReadVariableFile = "ReadVariableB2.html";
            break;
        case "indexC1.html":
            ReadVariableFile = "ReadVariableC1.html";
            break;
        case "indexC2.html":
            ReadVariableFile = "ReadVariableC2.html";
            break;

    }

    $.post(ReadVariableFile, 'no-data')
        .done(function (readData) {				// eventhandler in case of successfull read
            var data = $.parseJSON(readData);	// parse recived DATA into JSON Object
            deploy(data);
            // call setTimout for cyclyc operation
        })
        .fail(function () {
            //        alert( "Network Problem. Press Ok to reload." );
            //         location.reload();
        }
        );
    setTimeout(read, 2000);
}
function write(writeData) {
    var mainPageName = document.location.href.match(/[^\/]+$/)[0];

    var WriteVariableFile = "";
    switch (mainPageName) {
        case "indexA1.html":
            WriteVariableFile = "WriteVariableA1.html";
            break;
        case "indexA2.html":
            WriteVariableFile = "WriteVariableA2.html";
            break;
        case "indexB1.html":
            WriteVariableFile = "WriteVariableB1.html";
            break;
        case "indexB2.html":
            WriteVariableFile = "WriteVariableB2.html";
            break;
        case "indexC1.html":
            WriteVariableFile = "WriteVariableC1.html";
            break;
        case "indexC2.html":
            WriteVariableFile = "WriteVariableC2.html";
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
        case "indexA1.html":
            WriteVariableFile = "ScenarioVariableA1.html";
            break;
        case "indexA2.html":
            WriteVariableFile = "ScenarioVariableA2.html";
            break;
        case "indexB1.html":
            WriteVariableFile = "ScenarioVariableB1.html";
            break;
        case "indexB2.html":
            WriteVariableFile = "ScenarioVariableB2.html";
            break;
        case "indexC1.html":
            WriteVariableFile = "ScenarioVariableC1.html";
            break;
        case "indexC2.html":
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
function deploy(data) {
    ShowEmergencyandFault(data.Emergency, data.FaultStatus);
    StartShowStatus(data.StartStatus);
    ScenarioShowStatus(data.ScenarioType);
    EnableShowStatus(data.EnableStatus);
    LowHighSiloShowStatus(data.LowStatus, data.HighStatus);
    BigSiloShowStatus(data.BigSiloStatus);
    ConveyerShowStatus(data.ConveyerStatus);
    ConveyerRunShowTime(data.RunningDurationTime);
    ConveyerPulseShowTime(data.PauseDurationTime);
    ConveyerOnlineShowTime(data.RunningOnlineTime);
    SampleOnlineShowTime(data.SampleOnlineTime);
    SampleIntervalShowTime(data.SampleIntervalTime);
    SampleDurationShowTime(data.SampleDurationTime);
    FeederIntensityShow(data.FeederVibrationIntensityPercent);
    FeederDelayTimeShow(data.FeederDelayTime);
    ShowB3Status(data);
}
function htmlDecodeEntities(value) {
    return (typeof value === 'undefined') ? '' : $('<div/>').html(value).text();
}
var statuscheck = false;

function LoadStatusData() {
    $('#EnableButton').click(function () {
        var currentStatus = $("#EnableStatus").text();
        if (currentStatus == "Disable") {
            write('"EnableVariable" = 1');
        }
        else {
            write('"EnableVariable" = 0');
        }
    });
    $('#StartButton').click(function () {
        var currentStatus = $("#StartStatus").text();
        var currentEnableStatus = $("#EnableStatus").text();
        if (currentStatus == "Stop" && currentEnableStatus == "Enable") {
            write('"StartVariable" = 1');
        }
        else {
            write('"StartVariable" = 0');
        }
    });
    $('#EmptyLineButton').click(function () {
        write('"EmptyLineVariable" = 1');
    });
    $('#ScenarioSelectInput').change(function () {
        var ScenarioSelectedName = $('#ScenarioSelectInput').val();
        GetDataFromPLCForScenario(ScenarioSelectedName);
    });
    $('#SetDatatoPLC').click(function () {
        var OnTimeInputText = $('#OnTimeInput').val();
        var OffTimeInputText = $('#OffTimeInput').val();
        var SampleIntervalTimeInputText = $('#SampleIntervalTimeInput').val();
        var SampleDurationText = $('#SampleDurationInput').val();
        var FeederDelayTimeText = $('#FeederDelayTimeInput').val();
        var VibratorPercentText = $('#VibratorPercentInput').val();
        write('"ConveyerOnTimeVariable" = T#' + OnTimeInputText + 'S');
        write('"ConveyerOffTimeVariable" = T#' + OffTimeInputText + 'S');
        write('"SamplingTimeVariable" = T#' + SampleIntervalTimeInputText + 'S');
        write('"SamplingOpenTimeVariable" = T#' + SampleDurationText + 'S');
        write('"FeederDelayTimeVariable" = T#' + FeederDelayTimeText + 'S');
        write('"FeederIntensityVariable" = ' + VibratorPercentText);
        write('"SaveData" = 1');
    });

    $('#ConveyorB3LeftButton').click(function () {
        var CurrentStatus = $('#ConveyorB3LeftButton').text();
        if (CurrentStatus == "Conveyor B3 Left") {
            write('"ConveyerB3Left" = 0');
        }
        else {
            write('"ConveyerB3Left" = 1');
        }

    });

    $('#SaveScenarioButton').click(function () {
        var ConveyorOnTimeInputText = $('#OnTimeInput').val();
        var ConveyorOffTimeInputText = $('#OffTimeInput').val();
        var SampleIntervalTimeInputText = $('#SampleIntervalTimeInput').val();
        var SampleDurationInputText = $('#SampleDurationInput').val();
        var VibratorPercentInputText = $('#VibratorPercentInput').val();
        var ScenarioSelectedName = $('#ScenarioSelectInput').val();

        ConveyorOnTimeInputText = ConveyorOnTimeInputText.replace("M", "");
        ConveyorOffTimeInputText = ConveyorOffTimeInputText.replace("M", "");
        SampleIntervalTimeInputText = SampleIntervalTimeInputText.replace("M", "");
        SampleDurationInputText = SampleDurationInputText.replace("M", "");
        switch (ScenarioSelectedName) {
            case "ScenarioA":
                writeScenario('"ConveyerOnTimeScenarioA" = ' + ConveyorOnTimeInputText);
                writeScenario('"ConveyerOffTimeScenarioA" = ' + ConveyorOffTimeInputText);
                writeScenario('"SamplingTimeScenarioA" = ' + SampleIntervalTimeInputText);
                writeScenario('"SamplingOpenTimeScenarioA" = ' + SampleDurationInputText);
                writeScenario('"FeederIntensityScenarioA" = ' + VibratorPercentInputText);
                break;
            case "ScenarioB":
                writeScenario('"ConveyerOnTimeScenarioB" = ' + ConveyorOnTimeInputText);
                writeScenario('"ConveyerOffTimeScenarioB" = ' + ConveyorOffTimeInputText);
                writeScenario('"SamplingTimeScenarioB" = ' + SampleIntervalTimeInputText);
                writeScenario('"SamplingOpenTimeScenarioB" = ' + SampleDurationInputText);
                writeScenario('"FeederIntensityScenarioB" = ' + VibratorPercentInputText);
                break;
            case "ScenarioC":
                writeScenario('"ConveyerOnTimeScenarioC" = ' + ConveyorOnTimeInputText);
                writeScenario('"ConveyerOffTimeScenarioC" = ' + ConveyorOffTimeInputText);
                writeScenario('"SamplingTimeScenarioC" = ' + SampleIntervalTimeInputText);
                writeScenario('"SamplingOpenTimeScenarioC" = ' + SampleDurationInputText);
                writeScenario('"FeederIntensityScenarioC" = ' + VibratorPercentInputText);
                break;
            case "ScenarioD":
                writeScenario('"ConveyerOnTimeScenarioD" = ' + ConveyorOnTimeInputText);
                writeScenario('"ConveyerOffTimeScenarioD" = ' + ConveyorOffTimeInputText);
                writeScenario('"SamplingTimeScenarioD" = ' + SampleIntervalTimeInputText);
                writeScenario('"SamplingOpenTimeScenarioD" = ' + SampleDurationInputText);
                writeScenario('"FeederIntensityScenarioD" = ' + VibratorPercentInputText);
                break;
            case "ScenarioE":
                writeScenario('"ConveyerOnTimeScenarioE" = ' + ConveyorOnTimeInputText);
                writeScenario('"ConveyerOffTimeScenarioE" = ' + ConveyorOffTimeInputText);
                writeScenario('"SamplingTimeScenarioE" = ' + SampleIntervalTimeInputText);
                writeScenario('"SamplingOpenTimeScenarioE" = ' + SampleDurationInputText);
                writeScenario('"FeederIntensityScenarioE" = ' + VibratorPercentInputText);
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
        }
    }
    else {
        $("#FaultStatus").hide();
        $("#EmergencyStatus").show();
    }
}
function StartShowStatus(data) {
    var StartStatusData = htmlDecodeEntities(data);
    if (StartStatusData == '0') {
        $("#StartStatus").text("Stop");
        $("#StartButton").text("Start");
        $("#StartStatus").addClass("btn-danger");
        $("#StartStatus").removeClass("btn-success");
    }
    else {
        $("#StartStatus").text("Start");
        $("#StartButton").text("Stop");
        $("#StartStatus").addClass("btn-success");
        $("#StartStatus").removeClass("btn-danger");

    }
}
function EnableShowStatus(data) {
    var EnableStatusData = htmlDecodeEntities(data);
    if (EnableStatusData == '0') {
        $("#EnableStatus").text("Disable");
        $('#EnableButton').text("Enable");
        $('#EnableStatus').addClass("btn-danger");
        $('#EnableStatus').removeClass("btn-success");

    }
    else {
        $("#EnableStatus").text("Enable");
        $('#EnableButton').text("Disable");
        $('#EnableStatus').addClass("btn-success");
        $('#EnableStatus').removeClass("btn-danger");

    }
}
function ScenarioShowStatus(data) {
    var ScenarioType = htmlDecodeEntities(data);
    switch (ScenarioType) {
        case "1":
            $('#ScenarioSelectShow').text("ScenarioA");
            break;
        case "2":
            $('#ScenarioSelectShow').text("ScenarioB");
            break;
        case "3":
            $('#ScenarioSelectShow').text("ScenarioC");
            break;
        case "4":
            $('#ScenarioSelectShow').text("ScenarioD");
            break;
        case "5":
            $('#ScenarioSelectShow').text("ScenarioE");
            break;
    }
}
function LowHighSiloShowStatus(Low, High) {
    var lowSilo = htmlDecodeEntities(Low);
    var highSilo = htmlDecodeEntities(High);
    if (lowSilo == '0' && highSilo == '0') {
        $("#Silo").removeClass('halffull').addClass('empty');
        $("#Silo").removeClass('full').addClass('empty');
    }
    else if (lowSilo == '1' && highSilo == '0') {
        $("#Silo").removeClass('empty').addClass('halffull');
        $("#Silo").removeClass('full').addClass('halffull');
    }
    else if (lowSilo == '1' && highSilo == '1') {
        $("#Silo").removeClass('empty').addClass('full');
        $("#Silo").removeClass('halffull').addClass('full');
    }
}
function BigSiloShowStatus(data) {
    var siloStatus = htmlDecodeEntities(data);
    if (siloStatus == '1') {
        $("#SiloLoad").text("Silo ↓↓↓↓↓↓↓↓ Silo");
        $("#SiloLoad").fadeOut(500);
        $("#SiloLoad").fadeIn(500);
    }
    else {
        $("#SiloLoad").text("");
        $("#SiloLoad").fadeIn(500);
    }
}
function ConveyerShowStatus(data) {
    var conveyerStatus = htmlDecodeEntities(data);
    if (conveyerStatus == '1') {
        $("#ConveyerLoad").text("Conveyer ←←← Conveyer");
        $("#ConveyerLoad").fadeOut(500);
        $("#ConveyerLoad").fadeIn(500);
    }
    else {
        $("#ConveyerLoad").text("");
        $("#ConveyerLoad").fadeIn(500);
    }
}
function ConveyerRunShowTime(data) {
    var conveyerDuratioTime = htmlDecodeEntities(data).replace(/\_/g, ':');
    conveyerDuratioTime = conveyerDuratioTime.replace('T#', '');
    $("#ConveyerOnTime").text(conveyerDuratioTime);
}
function ConveyerPulseShowTime(data) {
    var conveyerDuratioOffTime = htmlDecodeEntities(data).replace(/\_/g, ':');
    conveyerDuratioOffTime = conveyerDuratioOffTime.replace('T#', '');
    $("#ConveyerOffTime").text(conveyerDuratioOffTime);
}
function ConveyerOnlineShowTime(data) {
    var conveyeronlineTime = htmlDecodeEntities(data).replace(/\_/g, ':');
    conveyeronlineTime = conveyeronlineTime.replace('T#', '');
    $("#TimeToStratConveyorShow").text(conveyeronlineTime);
}
function SampleOnlineShowTime(data) {
    var sampleOnlineTime = htmlDecodeEntities(data).replace(/\_/g, ':');
    sampleOnlineTime = sampleOnlineTime.replace('T#', '');
    $("#TimeToSampleShow").text(sampleOnlineTime);
}
function SampleIntervalShowTime(data) {
    var sampleIntervalTime = htmlDecodeEntities(data).replace(/\_/g, ':');
    sampleIntervalTime = sampleIntervalTime.replace('T#', '');
    $("#SampleIntervalTimeShow").text(sampleIntervalTime);
}
function SampleDurationShowTime(data) {
    var sampleDurationTime = htmlDecodeEntities(data).replace(/\_/g, ':');
    sampleDurationTime = sampleDurationTime.replace('T#', '');
    $("#SampleDurationShow").text(sampleDurationTime);
}

function FeederIntensityShow(data) {
    var FeederIntensity = htmlDecodeEntities(data);
    $("#FeederIntensityShow").text(FeederIntensity);
}
function FeederDelayTimeShow(data) {
    var feederDelayTime = htmlDecodeEntities(data).replace(/\_/g, ':');
    feederDelayTime = feederDelayTime.replace('T#', '');
    $("#FeederDelayTimeShow").text(feederDelayTime);
}
function GetDataFromPLCForScenario(ScenarioName) {
    var mainPageName = document.location.href.match(/[^\/]+$/)[0];
    var ReadVariableFile = "";
    switch (mainPageName) {
        case "indexA1.html":
            ReadVariableFile = "ScenarioVariableA1.html";
            break;
        case "indexA2.html":
            ReadVariableFile = "ScenarioVariableA2.html";
            break;
        case "indexB1.html":
            ReadVariableFile = "ScenarioVariableB1.html";
            break;
        case "indexB2.html":
            ReadVariableFile = "ScenarioVariableB2.html";
            break;
        case "indexC1.html":
            ReadVariableFile = "ScenarioVariableC1.html";
            break;
        case "indexC2.html":
            ReadVariableFile = "ScenarioVariableC2.html";
            break;
    }
    $.post(ReadVariableFile, 'no-data')
        .done(function (readData) {				// eventhandler in case of successfull read
            var data = $.parseJSON(readData);	// parse recived DATA into JSON Object
            ShowDataFromPLCForScenario(ScenarioName, data);
        })
        .fail(function () {
            //        alert( "Network Problem. Press Ok to reload." );
            //         location.reload();
        });
}
function ShowDataFromPLCForScenario(ScenarioName, data) {
    var ConveyerOnTime;
    var ConveyerOffTime;
    var SamplingTime;
    var SamplingOpenTime;
    var FeederIntensity;
    var DurationBigSiloOff;
    var FeederDelayBeforeStopTime;
    var FeederDelayAfterStartTime;
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
            break;
    }
    $('#OnTimeInput').val(ConveyerOnTime);
    $('#OffTimeInput').val(ConveyerOffTime);
    $('#SampleIntervalTimeInput').val(SamplingTime);
    $('#SampleDurationInput').val(SamplingOpenTime);
    $('#VibratorPercentInput').val(FeederIntensity);
}
function PrepareTime(Time) {
    var newTime = Time + "M";
    return newTime;
}
function ShowB3Status(data) {
    var mainPageName = document.location.href.match(/[^\/]+$/)[0];
    if (mainPageName == "indexB1.html" || mainPageName == "indexB2.html") {
        if (data.B3LeftConveyor == "0") {
            $('#ConveyorB3LeftButton').text("Conveyor B3 Left");
        }
        else {
            $('#ConveyorB3LeftButton').text("Conveyor B3 Right");
        }
    }
}
