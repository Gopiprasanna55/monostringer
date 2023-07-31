import { log } from "three";
import { clientData } from "./js/inputdata";

const inputs=document.querySelectorAll("input")
inputs[0].value=2700
inputs[5].value = 20
inputs[6].value = 6
inputs[8].value = 250

var data = {
    monoStringWizard: clientData.monoStringWizard,
    monoString: clientData.monoString,
    calculated: clientData.calculated,
    limits: clientData.limits,
    values: clientData.values,
    tweaks: clientData.tweaks,
    materials: clientData.materials,
    materialsAll: clientData.materialsAll,
    powdercoats: clientData.powdercoats,
    powdercoatColours: clientData.powdercoatColours,
    stringThicknesses: clientData.stringThicknesses,
    headerTypes: clientData.headerTypes,
    treadTypes: clientData.treadTypes,
    noseEdges: clientData.noseEdges,
    riserGrooves: clientData.riserGrooves,
    seamSides: clientData.seamSides,
    pricing: clientData.pricing,
    cadToken: clientData.cadToken,
    waitingToRecalc: false,
    is3D: true,
};

var calFunctions = {
    f2fFinished: function () { return  (+inputs[0].value); },
    treadCountCalculated: function () {
        var calculated = Math.round(this.f2fFinished() / data.limits.targetRise) - 1;
        if (this.f2fFinished() / (calculated + 1) > 190) calculated += 1;
        return !!calculated ? calculated : 0;
    },
    riseCountCalculated: function () {
        return this.treadCountCalculated() + 1;
    },
    risePerStepCalculated: function () {
        var value = this.f2fFinished() / this.riseCountCalculated();
        return !!value ? value : 0;
    },
    topRiserFaceCalculated: function () {
        var val =(Math.max((+inputs[5].value), data.values.topPlateThickness)) +
        (+inputs[6].value);
        return val;
    },
    treadGoingCalculated: function () {
        var val = data.monoStringWizard.useOverallGoing
            ? Math.round(
                (data.monoStringWizard.overallGoing - this.topRiserFaceCalculated()) /
                this.treadCountCalculated()
            )
            : (+inputs[8].value);
        return val;
    },
    overallGoingCalculated: function () {
        var calculated =
            this.treadCountCalculated() * this.risePerStepCalculated()+
            this.topRiserFaceCalculated();
        if (data.monoStringWizard.overallGoing == -99)
            data.monoStringWizard.overallGoing = calculated; // Default override to calculated first time
            
        return calculated;
    },
    stairAngleRadians: function () {
        var val = Math.atan2(this.risePerStepCalculated(), this.treadGoingCalculated());
        return val;

    },
    stairAngleCalculated: function () {
        var val = (this.stairAngleRadians() * 180) / Math.PI
        return val;
    },
    gapBetweenTreads: function () {
        var gap =(this.risePerStepCalculated() - data.monoString.treadThickness);
        if (data.monoString.useSafetyBars) gap -=data.monoString.safetyBarHeight;
        return roundTo(gap, 2);
       
    },
    gapBetweenTreadsOutOfBounds: function () {
        return this.gapBetweenTreads > data.limits.maxGapBetweenTreads;
    },
    treadThicknesses: function () {
        var _this = data;
        var treadType = data.treadTypes.find(function (t) {
            return t.id == _this.monoString.treadsByUsType;
        });
        var options = [];
        if (!!treadType)
            treadType.thicknesses.split(",").forEach(function (i) {
                options.push({ id: parseInt(i), text: i + "mm" });
            });
        if (
            !options.some(function (i) {
                return i.id == _this.monoString.treadsByUsThickness;
            })
        )
            data.monoString.treadsByUsThickness = options[0].id;
        return options;
    }
};

export { calFunctions };