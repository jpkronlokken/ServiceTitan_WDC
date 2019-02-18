(function () {
  var myConnector = tableau.makeConnector();

  myConnector.getSchema = function (schemaCallback) {
    var cols = [{
      id: "jobId",
      alias: "Job ID",
      dataType: tableau.dataTypeEnum.string
    }, {
      id: "city",
      alias: "City",
      dataType: tableau.dataTypeEnum.string
    }, {
      id: "zip",
      alias: "Zip",
      dataType: tableau.dataTypeEnum.float
    }, {
      id: "lat",
      alias: "Latitude",
      dataType: tableau.dataTypeEnum.float
    }, {
      id: "long",
      alias: "Longitude",
      dataType: tableau.dataTypeEnum.float
    }, {
      id: "custId",
      alias: "Customer ID",
      dataType: tableau.dataTypeEnum.string
    }, {
      id: "typeId",
      alias: "Type ID",
      dataType: tableau.dataTypeEnum.float
    },
    {
      id: "typeName",
      alias: "Type Name",
      dataType: tableau.dataTypeEnum.string
    },
    {
      id: "bizUnitId",
      alias: "Business Unit ID",
      dataType: tableau.dataTypeEnum.string
    },
    {
      id: "campaignId",
      alias: "Campaign ID",
      dataType: tableau.dataTypeEnum.string
    },
    {
      id: "campaignName",
      alias: "Campaign Name",
      dataType: tableau.dataTypeEnum.string
    },
    {
      id: "custCreatedOn",
      alias: "Cust Created On",
      dataType: tableau.dataTypeEnum.string
    },
    {
      id: "createdOn",
      alias: "Created On",
      dataType: tableau.dataTypeEnum.string
    },
    {
      id: "scheduledOn",
      alias: "Scheduled On",
      dataType: tableau.dataTypeEnum.string
    },
    {
      id: "invoiceId",
      alias: "Invoice ID",
      dataType: tableau.dataTypeEnum.string
    },
    {
      id: "invoiceTotal",
      alias: "Invoice Total",
      dataType: tableau.dataTypeEnum.string
    },
    {
      id: "leadCallId",
      alias: "Lead Call ID",
      dataType: tableau.dataTypeEnum.float
    },
    {
      id: "leadCallDuration",
      alias: "Lead Call Duration",
      dataType: tableau.dataTypeEnum.string
    },
    {
      id: "status",
      alias: "Job Status",
      dataType: tableau.dataTypeEnum.string
    },
    {
      id: "leadCallUrl",
      alias: "Lead Call Recording URL",
      dataType: tableau.dataTypeEnum.string
    },
    {
      id: "active",
      alias: "Active",
      dataType: tableau.dataTypeEnum.string
    },
    {
      id: "locationId",
      alias: "Location ID",
      dataType: tableau.dataTypeEnum.float
    },
    {
      id: "nocharge",
      alias: "No Charge",
      dataType: tableau.dataTypeEnum.string
    },
    {
      id: "completedOn",
      alias: "Completed On",
      dataType: tableau.dataTypeEnum.string
    },
    {
      id: "projectId",
      alias: "Project ID",
      dataType: tableau.dataTypeEnum.float
    } 
    ];

    var tableSchema = {
      id: "jobsData",
      alias: "Randy's Electric jobs data",
      columns: cols
    };
    schemaCallback([tableSchema]);
  };

  myConnector.getData = function (table, doneCallback) {
    $.getJSON("https://api.servicetitan.com/v1/jobs?filter.createdAfter=2017-01-01T00%3A00%3A00.000&filter.pageSize=30000&serviceTitanApiKey=8e9891b0-181b-4f74-9455-0195f66623d7", function (resp) {
      var feat = resp.data,
        tableData = [];

      // Iterate over the JSON object
      for (var i = 0, len = feat.length; i < len; i++) {
        if (feat[i].leadCall) {
          tableData.push({
            "jobId": feat[i].id,
            "bizUnitId": feat[i].businessUnit.id,
            "campaignId": feat[i].campaign.id,
            "campaignName": feat[i].campaign.name,
            "typeId": feat[i].type.id,
            "typeName": feat[i].type.name,
            "custId": feat[i].customer.id,
            "city": feat[i].location.address.city,
            "zip": feat[i].location.address.zip,
            "lat": feat[i].location.address.latitude,
            "long": feat[i].location.address.longitude,
            "custCreatedOn": feat[i].customer.createdOn,
            "createdOn": feat[i].createdOn,
            "scheduledOn": feat[i].scheduledOn,
            "invoiceId": feat[i].invoice.id,
            "invoiceTotal": feat[i].invoice.total,
            "leadCallId": feat[i].leadCall.id,
            "leadCallDuration": feat[i].leadCall.duration,
            "status": feat[i].status,
            "leadCallUrl": feat[i].leadCall.recordingUrl,
            "Active": feat[i].active,
            "locationId": feat[i].location.id,
            "noCharge": feat[i].nocharge,
            "completedOn": feat[i].completedOn,
            "projectId": feat[i].projectId
          })
        } else {
          tableData.push({
            "jobId": feat[i].id,
            "bizUnitId": feat[i].businessUnit.id,
            "campaignId": feat[i].campaign.id,
            "campaignName": feat[i].campaign.name,
            "typeId": feat[i].type.id,
            "typeName": feat[i].type.name,
            "custId": feat[i].customer.id,
            "city": feat[i].location.address.city,
            "zip": feat[i].location.address.zip,
            "lat": feat[i].location.address.latitude,
            "long": feat[i].location.address.longitude,
            "custCreatedOn": feat[i].customer.createdOn,
            "createdOn": feat[i].createdOn,
            "scheduledOn": feat[i].scheduledOn,
            "invoiceId": feat[i].invoice.id,
            "invoiceTotal": feat[i].invoice.total,
            "status": feat[i].status,
            "Active": feat[i].active,
            "locationId": feat[i].location.id,
            "noCharge": feat[i].nocharge,
            "completedOn": feat[i].completedOn,
            "projectId": feat[i].projectId
          })
        };
      }
      table.appendRows(tableData);
      doneCallback();
    });
  };
  tableau.registerConnector(myConnector);
})();

$(document).ready(function () {
  $("#submitButton").click(function () {
    tableau.connectionName = "Randy's Electric Jobs Data";
    tableau.submit();
  });
});
