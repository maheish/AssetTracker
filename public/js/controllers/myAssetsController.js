/*
 Home controller
 */


// Defining contents to be displayed in home page
function MyAssetsController($scope, Assets, Global) {

    $scope.loadAssets = function(index) {
        Assets.query({
            // 'eventId': $scope.events[index]._id
            userid : Global.userid
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