/*
    Details controller
 */


// Defining contents to be displayed in detail page
function DetailController($scope, $routeParams) {
    //alert($routeParams.item);
    var assetDetail = JSON.parse($routeParams.item);

    $scope.deviceFields = {
        asset_name: assetDetail.asset_name,
        asset_cts_id: assetDetail.asset_cts_id,
        asset_type: assetDetail.asset_type,
        asset_model: assetDetail.asset_model,
        asset_platform_version: assetDetail.asset_platform_version,
        asset_udid: assetDetail.asset_udid,
        asset_imei: assetDetail.asset_imei,
        asset_serialno: assetDetail.asset_serialno,
        asset_procurement_id: assetDetail.asset_procurement_id,
        asset_location: assetDetail.asset_location,
        asset_description: assetDetail.asset_description
    };
    $scope.ownerFields = {
        owner_id: assetDetail.owner_id,
        owner_name: assetDetail.owner_name,
        date_tagged: assetDetail.date_tagged,
        owner_project: assetDetail.owner_project
    };
    $scope.params = 1;
}