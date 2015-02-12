/*
    Details controller
 */


// Defining contents to be displayed in detail page
function DetailController($scope, $routeParams) {
    alert($routeParams.item);
    $scope.deviceFields = {
        asset_name: 'iPhone 5S Space Grey',
        asset_cts_id: 12345,
        asset_type: 'iOS',
        asset_model: 'iphone 5S',
        asset_platform_version: 'iOS8',
        asset_udid: 123456,
        asset_imei: 321654,
        asset_serialno: 987654321,
        asset_procurement_id: 42587,
        asset_location: 'DLF',
        asset_description: 'Available'
    };
    alert ();
    $scope.ownerFields = {
        owner_id: 298246,
        owner_name: 'Partheeban Subramani',
        date_tagged: '2015-02-01',
        owner_project: 'Imagine Comunications'
    };
    $scope.params = 1;
}