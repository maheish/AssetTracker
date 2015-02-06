/*
 Blog controller
 */


// To Create Blogs
function AssetAdminController($scope, $route, $modal, $routeParams, Global, Assets) {

    /***********************************************************************************
    Static Contents for Assets Page
    ***********************************************************************************/
    $scope.global = Global;

    $scope.submitted = false;

    $scope.addEditMode = '';

    /* Filter Options*/
    $scope.filterByRegion = "region";
    $scope.filterByCategory = "category";

    /* Sort Options*/
    $scope.tagsText = "Tags";
    $scope.descriptionText = "Description";
    $scope.uploadText = "Upload File";
    $scope.regionText = "Region";


    /***********************************************************************************
    Variable Declaration for Blog Page
    ***********************************************************************************/
    $scope.ostypesList = [{
        title: 'iOS',
        value: 'iOS'
    }, {
        title: 'Android',
        value: 'Android'
    }, {
        title: 'MacMini',
        value: 'MacMini'
    }];


    $scope.locationsList = [{
        title: 'Chennai DLF',
        value: 'CHN - DLF'
    }, {
        title: 'Chennai MEPZ',
        value: 'CHN - TBM'
    }, {
        title: 'Chennai Siruseri',
        value: 'CHN - SRZ'
    }];

    $scope.asset = {
        asset_name: '',
        asset_cts_id: '',
        asset_type: '',
        asset_model: '',
        asset_platform_version: '',
        asset_udid: '',
        asset_imei: '',
        asset_serialno: '',
        asset_procurement_id: '',
        asset_location: '',
        asset_description: '',
    };

    /* For Pagination Control*/

    $scope.currentPage = 1;
    $scope.maxSize = 5;

    $scope.clearInputField = function(tagid) {
        document.getElementById(tagid).innerHTML =
            document.getElementById(tagid).innerHTML;
    };

    /***********************************************************************************
    Functions for Blog Page
    ***********************************************************************************/

    /* To reset the form data*/
    $scope.reset = function() {
        $scope.asset = {
            asset_name: '',
            asset_cts_id: '',
            asset_type: '',
            asset_model: '',
            asset_platform_version: '',
            asset_udid: '',
            asset_imei: '',
            asset_serialno: '',
            asset_procurement_id: '',
            asset_location: '',
            asset_description: '',
        };
    };

    $scope.addEditAsset = function(index) {
        if ($scope.addEditMode == 'Edit') {
            $scope.editAsset(index);
        } else {
            $scope.createAssets(index);
        }
    }

    /*Function to add assets to the selected region*/
    $scope.createAssets = function(index) {
        $scope.submitted = true;

        if ($scope.assetsform.$invalid)
            return;

        var asset = new Assets($scope.asset);

        asset.$save(function(response) {
            alert("Asset Added Succesfully");
        });

    };

    /*Function to edit assets to the selected region*/
    $scope.editAsset = function(index) {
        $scope.submitted = true;

        if ($scope.assetsform.$invalid)
            return;

        Assets.update({
            assetId: $scope.asset._id
        }, $scope.asset,
        function(response) {
            alert("Asset Updated Succesfully");
        });
};


/*Function to delete assets to the selected region*/
$scope.deleteAsset = function(index) {
    $scope.submitted = true;

    var asset = $scope.assetDataObject[index];

    asset.$save(function(response) {
        alert("Asset Added Succesfully");
    });
};


$scope.loadAssets = function(index) {
    Assets.query({
        // 'eventId': $scope.events[index]._id
    }, function(response) {
        $scope.assetDataObject = response;
    });
};

$scope.loadAssets();

/*To remove blog by admin*/
// $scope.remove = function(articleIndex) {

//     var article = $scope.articles[articleIndex];
//     Articles.delete({
//         articleId: article._id
//     }, function() {
//         $scope.articles.splice(articleIndex, 1);

//     });
// };
/*To open modal dialog*/

$scope.open = function(index) {

    $scope.articleIndex = index;

    var modalInstance = $modal.open({
        templateUrl: 'deleteDialog-Admin',
        controller: ModalInstanceCtrl,
        resolve: {
            items: function() {

            }
        }

    });
    modalInstance.result.then(function(selectedItem) {
        $scope.remove($scope.articleIndex);

    }, function() {
        $log.info('Modal dismissed at: ' + new Date());

    });

};


$scope.openAddWindow = function(index) {
    $scope.addEditMode = 'Add';
}    
    
$scope.openEditWindow = function(index) {
    $scope.addEditMode = 'Edit';
    $scope.asset = $scope.assetDataObject[index];
}

}

function ModalInstanceCtrl($scope, $modalInstance, items) {


    $scope.ok = function() {
        $modalInstance.close();
    };

    $scope.cancel = function() {
        $modalInstance.dismiss('cancel');
    };
}