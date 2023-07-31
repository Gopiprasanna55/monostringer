import { clientData } from "./inputdata";

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

var functions = {
  floorToFloorLabel: function () {
    return data.monoStringWizard.floorToFloorFinished
      ? "Finished floor-to-floor"
      : "Unfinished floor-to-floor";
  },
  f2fFinished: function () {
    return data.monoStringWizard.floorToFloorFinished
      ? data.monoStringWizard.floorToFloor
      : data.monoStringWizard.floorToFloor -
          data.monoStringWizard.bottomFloorThickness +
          data.monoStringWizard.topFloorThickness;
  },
  f2fUnfinished: function () {
    return !data.monoStringWizard.floorToFloorFinished
      ? data.monoStringWizard.floorToFloor
      : data.monoStringWizard.floorToFloor -
          data.monoStringWizard.topFloorThickness +
          data.monoStringWizard.bottomFloorThickness;
  },
  treadCountCalculated: function () {
    var calculated = Math.round(this.f2fFinished() / data.limits.targetRise) - 1;    
    if (this.f2fFinished() / (calculated + 1) > 190) calculated += 1; // Shooting to be max rise below 190
    data.monoStringWizard.treadCount =
      data.monoStringWizard.treadCount == -99
        ? calculated
        : data.monoStringWizard.treadCount; // Default override to calculated first time
    return data.monoStringWizard.overrideTreadCount
      ? data.monoStringWizard.treadCount
      : calculated;
  },
  riseCountCalculated: function () {
    return this.treadCountCalculated + 1;
  },
  risePerStepCalculated: function () {
    var value = roundTo(this.f2fFinished() / data.riseCountCalculated, 2);
    return !!value ? value : 0;
  },
  riseOutOfBounds: function () {
    return (
      this.risePerStepCalculated() < data.limits.minRise ||
      this.risePerStepCalculated() > data.limits.maxRise
    );
  },
  treadGoingCalculated: function () {
    return data.monoStringWizard.useOverallGoing
      ? Math.round(
          (data.monoStringWizard.overallGoing - this.topRiserFaceCalculated()) /
            this.treadCountCalculated()
        )
      : data.monoStringWizard.treadGoing;
  },
  overallGoingCalculated: function () {
    var calculated =
      this.treadCountCalculated() * this.treadGoingCalculated() +
      this.topRiserFaceCalculated();
    if (data.monoStringWizard.overallGoing == -99)
      data.monoStringWizard.overallGoing = calculated; // Default override to calculated first time
    return calculated;
  },
  topRiserFaceCalculated: function () {
    return (
      Math.max(data.monoString.riserThickness, data.values.topPlateThickness) +
      data.monoString.riserPackout
    );
  },
  goingOutOfBounds: function () {
    return (
      this.treadGoingCalculated() < data.limits.minGoing ||
      this.treadGoingCalculated() > data.limits.maxGoing
    );
  },
  stairAngleRadians: function () {
    return Math.atan2(this.risePerStepCalculated(), this.treadGoingCalculated());
  },
  stairAngleCalculated: function () {
    return roundTo((this.stairAngleRadians() * 180) / Math.PI, 1);
  },
  birdsmouthTooSmall: function () {
    return (
      data.calculated.birdsmouthAt != 0 &&
      data.calculated.birdsmouthAt < data.limits.minBirdsmouth
    );
  },
  isLongSpine: function () {
    return (
      data.calculated.spineTopLength > 4800 || data.monoString.treadCount > 16
    );
  },
  gapBetweenTreads: function () {
    var gap = data.risePerStepCalculated - data.monoString.treadThickness;
    if (data.monoString.useSafetyBars) gap -= data.monoString.safetyBarHeight;
    return roundTo(gap, 2);
  },
  gapBetweenTreadsOutOfBounds: function () {
    return data.gapBetweenTreads > data.limits.maxGapBetweenTreads;
  },
  anyFinalAlerts: function () {
    return this.gapBetweenTreadsOutOfBounds();
  },
  readonly: function () {
    return !!this.monoStringWizard.designId;
  },
  cadPdfLink: function () {
    if (!data.cadToken) return null;
    return (
      environmentData.AppRoot +
      "/MonoString/BlueprintPDF/Session?cadToken=" +
      data.cadToken
    );
  },
  powdercoatCategories: function () {
    return Array.from(
      new Set(
        data.powdercoatColours.map(function (c) {
          return c.category;
        })
      ).values()
    ).map(function (c) {
      return { id: c, text: c };
    });
  },
  powdercoatColoursCategorized: function () {
    var _this = data;
    return data.powdercoatColours.filter(function (c) {
      return c.category == _this.monoString.powdercoatCategory;
    });
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
  },
  hasRiserGroove: function () {
    var _this = data;
    var treadType = data.treadTypes.find(function (t) {
      return t.id == _this.monoString.treadsByUsType;
    });
    if (!!treadType) return treadType.riserGroove;
    return false;
  },
};

export { functions };
