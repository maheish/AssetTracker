/*
 Blog controller
 */


// To Create Blogs
function AssetAdminController($scope, $http, $route, $modal, $routeParams, Global, Assets) {

    /***********************************************************************************
    Static Contents for Assets Page
    ***********************************************************************************/
    $scope.global = Global;

    $scope.submitted = false;
    $scope.allocatesubmitted = false;
    $scope.allocateAssetId = '';

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
    $scope.owner = {
        owner_id: '',
        owner_name: '',
        owner_mail: '',
        isOwnerAllocate: true,
        allocatorName: Global.username,
        allocatorId: Global.userid,
        allocatorMail: Global.usermail
    }

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
            alert("Asset Added Successfully");
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
                alert("Asset Updated Successfully");
            });
    };


    /*Function to delete assets to the selected region*/
    $scope.deleteAsset = function(index) {
        var asset = $scope.assetDataObject[index];

        Assets.delete({
            assetId: asset._id
        }, function() {
            $scope.assetDataObject.splice(index, 1);
            alert("Asset Deleted Successfully");
            //$window.location.reload();
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

    $scope.checkUserId = function() {
        if($scope.owner.owner_id!=''){
            $http.get('/getUserData', {
                params: {
                    searchid: $scope.owner.owner_id
                }
            }).success(function(_data){
                console.log(_data);
                if(_data!= {}){
                    $scope.owner.owner_name = _data.name.toString();
                    $scope.owner.owner_mail = _data.mail.toString();
                }else{
                    alert('An error occurred while fetching data! You can continue to enter the fields manually');
                }
            }).error(function(_e){
                alert('An error occurred while fetching data! You can continue to enter the fields manually');
            });
        }else{
            alert('Please fill the Associate id field');
        }
    };

    $scope.assignAssetId = function(id) {
        $scope.allocateAssetId = id;
    }

    /*To aloocate assets  by admin */
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