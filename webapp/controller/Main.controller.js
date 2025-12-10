sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/Fragment",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
    
], (Controller ,Fragment, Filter, FilterOperator) => {
    "use strict";

    return Controller.extend("geonosis.table.report.controller.Main", {
        onInit() {
        },
    
        valueHelpRequest () {
        const oView = this.getView()
        if (!this._oVH) {
                Fragment.load({
                    id: oView.getId(),
                    name: "geonosis.table.report.view.fragments.valueHelpProduct",
                    controller: this
                }).then(function (oDialog) {
                    this._oVH = oDialog;
                    oView.addDependent(oDialog);
                    oDialog.open();
                }.bind(this));
            } else {
                this._oVH.open();
            }
    },
    onVHSearch: function(oEvent) {
        const sValue = oEvent.getParameter("value");
        const oFilter = new Filter("categoria", FilterOperator.Contains, sValue);
        const oBinding = oEvent.getSource().getBinding("items");
        oBinding.filter([oFilter]);
    },
    onVHCancel: function(oEvent) {
                const oBinding = oEvent.getSource().getBinding("items");
                oBinding.filter([]);
    },
    onSearch: function () {

            var oModelFilter = this.getOwnerComponent().getModel("filter");
            var oData = oModelFilter.getData();
            var aFilters = [];

            if (oData.Producto) {
                aFilters.push(new Filter("nombre", FilterOperator.Contains, oData.Producto));
            }
            if (oData.Categoria) {
                aFilters.push(new Filter("categoria", FilterOperator.Contains, oData.Categoria));
            }
            if (oData.Precio) {
                aFilters.push(new Filter("precio", FilterOperator.EQ, oData.Precio));
            }
git add README.md
            var oTable = this.byId("idTable");
            var oBinding = oTable.getBinding("items");
            oBinding.filter(aFilters);
        },
    });
});