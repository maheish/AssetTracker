/*
 Home controller
 */


// Defining contents to be displayed in home page
function MyAssetsController($scope, Assets, Global) {

    $scope.allocatesubmitted = false;
    $scope.allocateAssetId = '';

    $scope.owner = {
        owner_id: '',
        owner_name: '',
        owner_mail:'',
        isOwnerAllocate: true,
        allocatorName: Global.username,
        allocatorId: Global.userid,
        allocatorMail: Global.usermail
    }

    $scope.loadAssets = function(index) {
        Assets.query({
            // 'eventId': $scope.events[index]._id
            userid: Global.userid
        }, function(response) {
            $scope.assetDataObject = response;
        });
    };
    $scope.loadAssets();
    $(".btn-group > .btn").click(function() {
        $(".btn-group > .btn").removeClass("active");
        $(this).addClass("active");
    });

    $scope.assignAssetId = function(id) {
        $scope.allocateAssetId = id;
    }

    /*To allocate assets  by admin */
    $scope.allocateAsset = function() {
        $scope.allocatesubmitted = true;

        if ($scope.allocateform.$invalid)
            return;

        Assets.update({
                assetId: $scope.allocateAssetId
            }, $scope.owner,
            function(response) {
                alert("Asset Allocated Succesfully");
                $('#allocateDialog').modal('hide');
                $scope.loadAssets();
            });

    };

}