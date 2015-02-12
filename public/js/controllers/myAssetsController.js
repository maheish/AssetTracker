/*
 Home controller
 */


// Defining contents to be displayed in home page
function MyAssetsController($scope, Assets) {

    $scope.loadAssets = function(index) {
        Assets.query({
            // 'eventId': $scope.events[index]._id
        }, function(response) {
            $scope.assetDataObject = response;
        });
    };
    $scope.loadAssets();
    $(".btn-group > .btn").click(function() {
        $(".btn-group > .btn").removeClass("active");
        $(this).addClass("active");
    });
}